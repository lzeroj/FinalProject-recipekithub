package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MealkitService;
import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MealkitController {
	
	private final MealkitService mealKitService;
	
	
	@RequestMapping("/mealkitList")
	public View mealkitList(HttpServletRequest request,HttpServletResponse response, DataRequest dataRequst) {
		
		List<MealKitBoard> list = mealKitService.findMealKitList();
		dataRequst.setResponse("mealkitList", list);
		return new JSONDataView();
		
	}
	
	
	@GetMapping("/mealkitDetail/{mealkitNo}") //밀키트 상세 페이지
	public View mealKit(@PathVariable int mealkitNo, DataRequest dataRequest, HttpServletRequest request) {
		//HttpSession session = request.getSession(false);
		//MemberVO sessionMember = (MemberVO)session.getAttribute("member");
		
		
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		log.info("Controller mealkit의 정보를 알아보자 {} ", mealkit);
		//MemberVO member = memberService.findMemberByEmail(mealkit.getMemberVO().getMemberEmail());
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("mealkitNo", mealkit.getMealkitNo());
		initParam.put("mealkitName", mealkit.getMealkitName());
		initParam.put("mealkitInfo", mealkit.getMealkitInfo());
		initParam.put("mealkitPrice", String.valueOf(mealkit.getMealkitPrice()));
		initParam.put("mealkitInventory", String.valueOf(mealkit.getMealkitInventory()));
		initParam.put("mealkitIngredients", mealkit.getMealkitIngredients());
		initParam.put("mealkitMember", mealkit.getMemberVO().getMemberNick());	
		initParam.put("mealkitRegDate", mealkit.getMealkitRegDate());
		initParam.put("mealkitHits", mealkit.getMealkitHits());
		
		//initParam.put("sessionMember", sessionMember.getMemberNick());
		return new UIView("/ui/mealkit/mealkitDetail.clx", initParam);
	}
	
	@RequestMapping("/insertMealkitForm")
	public View insertMealKitForm() {
		
		return new UIView("/ui/mealkit/insertMealkit.clx");
	}
	
	@RequestMapping("/insertMealkit")
	public View insertMealKit(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		//HttpSession session = request.getSession(false);
		//MemberVO sessionMember = (MemberVO)session.getAttribute("member");
		//if(sessionMember == null) {
		//	return new UIView("/ui/index.clx");	
		//}
		
		ParameterGroup param = dataRequest.getParameterGroup("mealkitMap");
		String mealkitName = param.getValue("mealkitName");
		String mealkitInfo = param.getValue("mealkitInfo");
		String mealkitIngredients = param.getValue("mealkitIngredients");
		int mealkitPrice = Integer.parseInt(param.getValue("mealkitPrice"));
		int mealkitInventory = Integer.parseInt(param.getValue("mealkitInventory"));
		String mealkitCategory = param.getValue("mealkitCategory");
		
		MealKitBoard mealkit = new MealKitBoard();
		mealkit.setMealkitName(mealkitName);
		mealkit.setMealkitInfo(mealkitInfo);
		mealkit.setMealkitIngredients(mealkitIngredients);
		mealkit.setMealkitPrice(mealkitPrice);
		mealkit.setMealkitInventory(mealkitInventory);
		mealkit.setMealkitCategory(mealkitCategory);

		MemberVO member = new MemberVO("hellojava@naver.com", "123", "재헌강", "유스타스캡틴재헌", "성남", "01012345678", "1998-01-01", "1", "Y", null);
		mealkit.setMemberVO(member);
		System.out.println("Service mealkit = " + mealkit);
		
		
		int mealkitNo = mealKitService.insertMealKit(mealkit);
		
		Map<String, Object> mealkitMap = new HashMap<>();
		mealkitMap.put("result", mealkitNo);
		dataRequest.setMetadata(true, mealkitMap);
		//dataRequest.setResponse("member", member);
		return new JSONDataView();
	}
	
	@GetMapping("/updateMealkitForm/{mealkitNo}")
	public View editMealkitForm(@PathVariable int mealkitNo) {
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("mealkitNo", mealkit.getMealkitNo());
		initParam.put("mealkitName", mealkit.getMealkitName());
		initParam.put("mealkitInfo", mealkit.getMealkitInfo());
		initParam.put("mealkitIngredients", mealkit.getMealkitIngredients());
		initParam.put("mealkitPrice", String.valueOf(mealkit.getMealkitPrice()));
		initParam.put("mealkitInventory", String.valueOf(mealkit.getMealkitInventory()));
		initParam.put("mealkitCategory", mealkit.getMealkitCategory());
		
		return new UIView("/ui/mealkit/updateMealkit.clx", initParam);
	}
	

//	@RequestMapping("/editMealkit")
//	public View editMealkit(HttpServletRequest request, HttpServletResponse response ,DataRequest dataRequest) {
//		//수정 필요
//		MealKitBoard mealkit = new MealKitBoard();
//		
//		HttpSession session = request.getSession(false);
//		if(session != null) {
//			MemberVO member = (MemberVO)session.getAttribute("mvo");
//			mealKitService.editMealkit(mealkit, member);
//		}
//		return new JSONDataView();
//	}
	
	
	@PostMapping("/deleteMealkit/{mealkitNo}")
	public View deleteMealkit(@PathVariable int mealkitNo, HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		MemberVO member = (MemberVO)session.getAttribute("member");
		log.info("member = {} ", member);
		MealKitBoard mealkit = mealKitService.findMealKitByNo(mealkitNo);
		log.info("mealkit 정보 = {} ", mealkit);
		if(mealkit.getMemberVO().getMemberNick().equals(member.getMemberEmail())) {
			log.info("mealkit = {} ", mealkit);
			mealKitService.deleteMealkit(mealkitNo);
		}
		
		return new UIView("/ui/index.clx");//추후 변경
	}

}
