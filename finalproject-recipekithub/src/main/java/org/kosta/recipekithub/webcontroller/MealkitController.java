package org.kosta.recipekithub.webcontroller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MealkitCommentService;
import org.kosta.recipekithub.model.service.MealkitService;
import org.kosta.recipekithub.model.service.MealkitStarScoreService;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MealkitController {
	
	private final MealkitService mealKitService;
	private final MealkitStarScoreService mealkitStarScoreService;
	private final MealkitCommentService mealkitCommentService;
	
	
	@RequestMapping("/mealkitList")
	public View mealkitList(HttpServletRequest request,HttpServletResponse response, DataRequest dataRequst) {
		HttpSession session = request.getSession(false);
		String email = null;
		if(session != null && session.getAttribute("member") != null) {
			MemberVO member = (MemberVO)session.getAttribute("member");
			email = member.getMemberEmail();
			
		}else {
			email = "guest";
		}
		String search = dataRequst.getParameter("search");
		List<MealKitBoard> list = mealKitService.findMealKitList();
		////////////////////////////////////////
		List<Double> mealkitStarList = new ArrayList<>();
		List<Integer> commentCount = new ArrayList<>();
		for(MealKitBoard mealkit : list) {
			mealkitStarList.add(mealkitStarScoreService.findMealkitStarList(mealkit.getMealkitNo()));
			commentCount.add(mealkitCommentService.mealkitCommentCnt(mealkit.getMealkitNo()));
		}
		
		Map<String, Object> initParam = new HashMap<String, Object>();
		initParam.put("mealkitList", list);
		initParam.put("member", email);
		initParam.put("searchMealkit", search);
		initParam.put("mealkitStarList", mealkitStarList);
		initParam.put("commentCount", commentCount);
		return new UIView("ui/mealkit/mealkitList.clx", initParam);
		
	}
	
	@RequestMapping("/findMealkitList")
	public View findMealkitList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		//페이지 번호 값
		ParameterGroup pageParam = dataRequest.getParameterGroup("mePage");
		String pageNo = pageParam.getValue("pageNo");
		//카테고리별
		ParameterGroup categoryParam = dataRequest.getParameterGroup("meCategory");
		String mealkitType = categoryParam.getValue("mealkitType");
		//분류별
		ParameterGroup sortParam = dataRequest.getParameterGroup("meSort");
		String sort = sortParam.getValue("sort");
		//검색바
		ParameterGroup searchParam = dataRequest.getParameterGroup("meSearch");
		String searchMealkit = searchParam.getValue("searchMealkit");
		
		RecipePagination pagination = null;
		long totalMealkitCnt = mealKitService.findTotalPostCount(mealkitType, searchMealkit);
		if(pageNo == null) {
			pagination = new RecipePagination(totalMealkitCnt);
		}else {
			pagination = new RecipePagination(totalMealkitCnt, Integer.parseInt(pageNo));
		}
		
		List<MealKitBoard> list = mealKitService.findAllMealkitBoard(mealkitType, sort, searchMealkit, pagination);
		
		List<Double> starAvgList = new ArrayList<>();
		List<Long> commentCnt = new ArrayList<>();
		for(MealKitBoard mb : list) {
			double starMap = mealkitStarScoreService.findMealkitStarAvg(mb.getMealkitNo());
			long count = mealkitCommentService.mealkitCommentCnt(mb.getMealkitNo());
			commentCnt.add(count);
			starAvgList.add(starMap);
		}
		
		dataRequest.setResponse("mealkitAllList", list);
		dataRequest.setResponse("totalMealkitCnt", totalMealkitCnt);
		dataRequest.setResponse("findStarAvgByNo", starAvgList);
		dataRequest.setResponse("commentCnt", commentCnt);
		return new JSONDataView();
	}
	
	
	@GetMapping("/mealkitDetail/{mealkitNo}") //밀키트 상세 페이지
	public View mealKit(@PathVariable int mealkitNo, DataRequest dataRequest, HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		String user = null;
		if(session != null && session.getAttribute("member") != null) {
			MemberVO sessionMember = (MemberVO)session.getAttribute("member");
			user = sessionMember.getMemberNick();
		}else {
			user = "guest";
		}
		
		
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		double avg = mealkitStarScoreService.findMealkitStarList(mealkitNo);
		
		//조회수 중복방지 구현
		Cookie reCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("mealkitHits")) {
					reCookie = cookie;
				}
			}
		}
		if (reCookie != null) {
			if (!reCookie.getValue().contains("[" + mealkitNo + "]")) {
				mealKitService.increaseHits(mealkitNo);
				reCookie.setValue(reCookie.getValue() + "_[" + mealkitNo + "]");
				reCookie.setPath("/");
				response.addCookie(reCookie);
			}
		} else {
			mealKitService.increaseHits(mealkitNo);
			Cookie newCookie = new Cookie("mealkitHits", "[" + mealkitNo + "]");
			newCookie.setPath("/");
			response.addCookie(newCookie);
					}
		
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("mealkitNo", mealkit.getMealkitNo());
		initParam.put("mealkitName", mealkit.getMealkitName());
		initParam.put("mealkitInfo", mealkit.getMealkitInfo());
		initParam.put("mealkitPrice", String.valueOf(mealkit.getMealkitPrice()));
		initParam.put("mealkitInventory", String.valueOf(mealkit.getMealkitInventory()));
		initParam.put("mealkitIngredients", mealkit.getMealkitIngredients());
		initParam.put("mealkitMember", mealkit.getMemberVO().getMemberNick());	
		initParam.put("mealkitRegDate", mealkit.getMealkitRegDate());
		initParam.put("mealkitHits", mealkit.getMealkitBoardHits());
		initParam.put("mealkitImg", mealkit.getMealkitImage());
		initParam.put("mealkitCategory", mealkit.getMealkitCategory());		
		initParam.put("sessionMember", user);
		initParam.put("mealkitEditDate", mealkit.getMealkitEditDate());
		initParam.put("avg", avg);
		

		return new UIView("/ui/mealkit/mealkitDetail.clx", initParam);
	}
	
	@GetMapping("/insertMealkitForm")
	public View insertMealKitForm(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session == null) {
			return new UIView("/ui/index.clx");	 
		}

		return new UIView("/ui/mealkit/insertMealkit.clx");
	}
	
	@PostMapping("/insertMealkit")
	public View insertMealKit(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws IOException {
		HttpSession session = request.getSession(false);
		MemberVO sessionMember = (MemberVO)session.getAttribute("member");
		if(sessionMember == null) {
			return new UIView("/ui/index.clx");	
		} 
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		System.out.println("uploadFiles = " + uploadFiles);
		UploadFile[] uploadFile = uploadFiles.get("image");
		System.out.println(uploadFile[0]);
		File orgName = uploadFile[0].getFile();
		String saveName = uploadFile[0].getFileName();
		String savePath = "C:\\upload\\mealkit\\";
		String uuid = UUID.randomUUID().toString();
		FileCopyUtils.copy(orgName, new File(savePath+uuid+"_"+saveName));
		
		ParameterGroup param = dataRequest.getParameterGroup("mealkitMap");
		String mealkitName = param.getValue("mealkitName");
		String mealkitInfo = param.getValue("mealkitInfo");
		String mealkitIngredients = param.getValue("mealkitIngredients");
		int mealkitPrice = Integer.parseInt(param.getValue("mealkitPrice"));
		int mealkitInventory = Integer.parseInt(param.getValue("mealkitInventory"));
		String mealkitCategory = param.getValue("mealkitCategory");
		String mealkitType = param.getValue("mealkitType");
		System.out.println("mealkitInfo = " + mealkitInfo);
		MealKitBoard mealkit = new MealKitBoard();
		mealkit.setMealkitName(mealkitName);
		mealkit.setMealkitInfo(mealkitInfo);
		mealkit.setMealkitIngredients(mealkitIngredients);
		mealkit.setMealkitPrice(mealkitPrice);
		mealkit.setMealkitInventory(mealkitInventory);
		mealkit.setMealkitCategory(mealkitCategory);
		mealkit.setMealkitImage(uuid+"_"+saveName);
		mealkit.setStatus("Y");
		mealkit.setMealkitType(mealkitType);
		
		MemberVO member = null;
		if(session != null && session.getAttribute("member") != null) {
			member = (MemberVO)session.getAttribute("member");
		}else {
			member = new MemberVO();
			member.setMemberNick("guest");
		}  
		
		mealkit.setMemberVO(member);
		int mealkitNo = mealKitService.insertMealKit(mealkit);
		
		Map<String, Object> mealkitMap = new HashMap<>();
		mealkitMap.put("result", mealkitNo);
		dataRequest.setMetadata(true, mealkitMap);
		return new JSONDataView();
	}
	
	@GetMapping("/updateMealkitForm/{mealkitNo}")
	public View updateMealkitGet(@PathVariable int mealkitNo, HttpServletRequest request) {
		return new UIView("/ui/index.clx");
	}
	
	@PostMapping("/updateMealkitForm/{mealkitNo}")
	public View updateMealkitPost(@PathVariable int mealkitNo, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if(session == null) {
			return new UIView("/ui/index.clx");
		}
		
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("mealkitNo", String.valueOf(mealkit.getMealkitNo()));
		initParam.put("mealkitName", mealkit.getMealkitName());
		initParam.put("mealkitInfo", mealkit.getMealkitInfo());
		initParam.put("mealkitIngredients", mealkit.getMealkitIngredients());
		initParam.put("mealkitPrice", String.valueOf(mealkit.getMealkitPrice()));
		initParam.put("mealkitInventory", String.valueOf(mealkit.getMealkitInventory()));
		initParam.put("mealkitCategory", mealkit.getMealkitCategory());
		initParam.put("mealkitMember", mealkit.getMemberVO().getMemberEmail());
		initParam.put("mealkitImg", mealkit.getMealkitImage());
		
		return new UIView("/ui/mealkit/updateMealkit.clx", initParam);
	}
	

	@RequestMapping("/updateMealkit")
	public View editMealkit(HttpServletRequest request, HttpServletResponse response ,DataRequest dataRequest) throws IOException {
		
		//수정 필요
		ParameterGroup param = dataRequest.getParameterGroup("updateMealkit");
		int mealkitNo = Integer.parseInt(param.getValue("mealkitNo"));
		String name = param.getValue("mealkitName");
		String info = param.getValue("mealkitInfo");
		String ingredients = param.getValue("mealkitIngredients");
		String price = param.getValue("mealkitPrice");
		String inventory = param.getValue("mealkitInventory");
		String category = param.getValue("mealkitCategory");
		String email = param.getValue("mealkitMember");
		String type = param.getValue("mealkitType");
		String img = param.getValue("image");
		
		log.info("mealkitNo = {}", mealkitNo);
		log.info("info = {}", info);
		log.info("name = {}", name);
		log.info("ingredients = {}", ingredients);
		log.info("price = {}", price);
		log.info("inventory = {}", inventory);
		log.info("type = {}", type);
		log.info("img = {}", img);
		
		
		String savePath = "C:\\upload\\mealkit\\";
		String mealkitImage = mealKitService.findMealKitByNo(mealkitNo).getMealkitImage();
		log.info("recipeBoardImage = {} ", mealkitImage);
		MealKitBoard mealkit = new MealKitBoard();
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		// 사진을 변경했으면 삭제 후 저장
				if (uploadFiles.size() != 0) {
					if (mealkitImage != null) {
						File existImageFile = new File(savePath + mealkitImage);
						if (existImageFile.exists()) {
							existImageFile.delete(); 
						}
					}
					UploadFile[] uploadFile = uploadFiles.get("img");
					File orgName = uploadFile[0].getFile();
					String saveName = uploadFile[0].getFileName();
					String uuid = UUID.randomUUID().toString();
					FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
					mealkit.setMealkitImage(uuid + "_" + saveName);
				}
		log.info("uploadFiles = {} ", uploadFiles);
		
		mealkit.setMealkitNo(mealkitNo);
		mealkit.setMealkitName(name);
		mealkit.setMealkitInfo(info);
		mealkit.setMealkitIngredients(ingredients);
		mealkit.setMealkitPrice(Integer.parseInt(price));
		mealkit.setMealkitInventory(Integer.parseInt(inventory));
		mealkit.setMealkitCategory(category);
		mealkit.setMealkitType(type);
		MemberVO member = new MemberVO();
		member.setMemberEmail(email);
		mealkit.setMemberVO(member);
		
		HttpSession session = request.getSession(false);
		MemberVO sessionMember = (MemberVO)session.getAttribute("member");
		if(sessionMember.getMemberEmail().equals(mealkit.getMemberVO().getMemberEmail())) {
		mealKitService.updateMealkit(mealkit);
		Map<String, Object> returnMealkitNo = new HashMap<>();
		returnMealkitNo.put("result", mealkit.getMealkitNo());
		dataRequest.setMetadata(true, returnMealkitNo);
		}
		return new JSONDataView();
	}
		
	@PostMapping("/deleteMealkit/{mealkitNo}")
	public View deleteMealkit(@PathVariable int mealkitNo, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		MemberVO member = (MemberVO)session.getAttribute("member");	
		
		String savePath = "C:\\upload\\mealkit\\";
		String mealkitImg= mealKitService.findMealKitByNo(mealkitNo).getMealkitImage();
		File existImageFile = new File(savePath + mealkitImg);
		if(existImageFile.exists()) {
			existImageFile.delete();
		}
		
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		if(mealkit.getMemberVO().getMemberEmail().equals(member.getMemberEmail())) {
			mealKitService.deleteMealkit(mealkitNo);
		}
		
		return new UIView("/ui/mealkit/mealkitList.clx");//추후 변경
	}
	
	@GetMapping("/deleteMealkit/{mealkitNo}")
	public View deleteMealkitGet(@PathVariable int mealkitNo, HttpServletRequest request) {
		return new UIView("/ui/index.clx");
	}
	
	// 현준
	@RequestMapping("/findMealkitStarNO")
	public View findMealkitStarNO(DataRequest dataRequest) {
		// 번호에 관한 star 리스트뽑기
		List<MealkitboardVO> starScore = mealkitStarScoreService.findMealkitNoList();
		dataRequest.setResponse("findMealkitStarList", starScore);
		
		return new JSONDataView();
	}
	


}
