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

import org.kosta.recipekithub.model.service.RecipeBoardService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
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
public class RecipeBoardController {
      
	private final RecipeBoardService recipeBoardService;
                 
	@RequestMapping("/recipeBoardList")
	public View recipeBoardList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		String search = dataRequest.getParameter("search");
		Map<String, Object> searchParam = new HashMap<String, Object>();
		if(search !=null || search != "") {	
			searchParam.put("searchValue", search); 
		}
		return new UIView("ui/recipe/recipe.clx",searchParam);
	}                 
             
	@RequestMapping("/findRecipeBoardList")
	public View findRecipeBoardList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		// 페이지 번호 값
		ParameterGroup pageParam = dataRequest.getParameterGroup("dmPage");
		String pageNo = pageParam.getValue("pageNo"); 
		// 카테고리 별 값
		ParameterGroup categoryParam = dataRequest.getParameterGroup("dmCategory");
		String type = categoryParam.getValue("type");
		String ingredients = categoryParam.getValue("ingredients");
		String method = categoryParam.getValue("method");
		// 분류 별 값
		ParameterGroup sortParam = dataRequest.getParameterGroup("dmSort"); 
		String sort = sortParam.getValue("sort"); 
		// 검색 바 값
		ParameterGroup searchParam = dataRequest.getParameterGroup("dmSearch");
		String searchValue = searchParam.getValue("searchValue"); 
		 
		log.info("검색 창  : {}",searchValue);
		log.info("type, ingredients, method, sort : {}, {}, {}, {}",type,ingredients,method,sort); 
		      
		RecipePagination pagination = null;
		long totalRecipeCount = recipeBoardService.findTotalPostCount(type, ingredients, method, searchValue);
		if(pageNo==null) {
			pagination = new RecipePagination(totalRecipeCount);   
		}else {  
			pagination = new RecipePagination(totalRecipeCount,Long.parseLong(pageNo));
		}
		   
		List<RecipeBoardVO> list = recipeBoardService.findAllRecipeBoard(type, ingredients, method,  sort, searchValue, pagination);
		
		//각 레시피별 좋아요 값
		List<Long> likeCounts = new ArrayList<>();
		for(RecipeBoardVO vo : list) {
			long likeCount = recipeBoardService.likeCount(vo.getRecipeBoardId());
			likeCounts.add(likeCount);
		}
		
		dataRequest.setResponse("likeCounts", likeCounts);
		dataRequest.setResponse("recipe_board", list); 
		dataRequest.setResponse("pagination", pagination);
		dataRequest.setResponse("totalRecipeCount", totalRecipeCount);
		return new JSONDataView();
	}		 
	//메인 화면 추천 레시피
	@RequestMapping("/likeRecipeList")
	public View likeRecipeList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		List<RecipeBoardVO> list = recipeBoardService.likeRecipeList();
		dataRequest.setResponse("likeRecipeList", list);
		return new JSONDataView();
	}		   
	@PostMapping("/insertRecipeForm") 
	public View insertRecipeForm(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
//		HttpSession session = request.getSession(false);
//		if (session == null || session.getAttribute("member") == null) {
//			log.debug("비인증");
//			System.out.println("비인증"); 
//			return new UIView("/");
//		}  
		return new UIView("/ui/recipe/insertrecipe.clx");
	}
	
	@PostMapping("/insertRecipe")
	public View insertRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
			HttpSession session = request.getSession(false);
//		if (session == null || session.getAttribute("member") == null) {
//			log.debug("비인증");
//		}  
		
		ParameterGroup initParam = dataRequest.getParameterGroup("recipe");
		String title = initParam.getValue("RECIPE_BOARD_TITLE");
		String content = initParam.getValue("RECIPE_BOARD_CONTENT");
		String type = initParam.getValue("CATEGORY_TYPE"); 
		String ingredients = initParam.getValue("CATEGORY_INGREDIENTS");
		String method = initParam.getValue("CATEGORY_METHOD");
 
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		UploadFile[] uploadFile = uploadFiles.get("image");
		File orgName = uploadFile[0].getFile();
		String saveName = uploadFile[0].getFileName();
		// "C:\\kosta260\\mygit-study\\FinalProject-recipekithub\\finalproject-recipekithub\\clx-src\\theme\\uploadrecipeimage\\";
		String savePath = "C:\\upload\\recipe\\";
		String uuid = UUID.randomUUID().toString();
		FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
    
		RecipeBoardVO recipeBoardVO = new RecipeBoardVO();
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		recipeBoardVO.setMemberVO(memberVO);
		recipeBoardVO.setRecipeBoardTitle(title);
		recipeBoardVO.setRecipeBoardContent(content);
		recipeBoardVO.setCategoryType(type);
		recipeBoardVO.setCategoryIngredients(ingredients);
		recipeBoardVO.setCategoryMethod(method);
		recipeBoardVO.setRecipeBoardImage(uuid + "_" + saveName);
		recipeBoardService.insertRecipeBoard(recipeBoardVO);

		long recpieBoardId = recipeBoardVO.getRecipeBoardId();

		Map<String, Object> message = new HashMap<String, Object>();
		message.put("recipeBoardId", recpieBoardId);
		dataRequest.setMetadata(true, message);

		/*
		 * if(uploadFiles != null && uploadFiles.size() > 0) { Set<Entry<String,
		 * UploadFile[]>> entries = uploadFiles.entrySet(); for(Entry<String,
		 * UploadFile[]> entry : entries) { UploadFile[] uFiles = entry.getValue();
		 * for(UploadFile uFile : uFiles){ File file = uFile.getFile(); String
		 * strFileName = uFile.getFileName(); System.out.println(strFileName);
		 * file.renameTo(new File(savePath+uuid+"_"+strFileName)); } } }
		 */
		return new JSONDataView();
	}

	@RequestMapping("/detailRecipe")
	public View moveDetailRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		long id = Long.parseLong(dataRequest.getParameter("recipeBoardId"));
		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(id);
		
		//조회수 중복방지 구현
		Cookie reCookie = null;
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("hitsRecipe")) {
					reCookie = cookie;
				}
			}
		}
		if (reCookie != null) {
			if (!reCookie.getValue().contains("[" + id + "]")) {
				recipeBoardService.updateRecipeHits(id);
				reCookie.setValue(reCookie.getValue() + "_[" + id + "]");
				reCookie.setPath("/"); 
				reCookie.setMaxAge(60*60*24);
				response.addCookie(reCookie);
				}
			} else {
				recipeBoardService.updateRecipeHits(id);
				Cookie newCookie = new Cookie("hitsRecipe", "[" + id + "]"); 
				newCookie.setPath("/");
				newCookie.setMaxAge(60*60*24);
				response.addCookie(newCookie);
			}
  
		Map<String, Object> initParam = new HashMap<String, Object>();
		initParam.put("recipeBoardVO", recipeBoardVO);
		return new UIView("ui/recipe/detailrecipe.clx", initParam);
	}
 
	/*
	 * @RequestMapping("/detailRecipe") public View detailRecipe(HttpServletRequest
	 * request, HttpServletResponse response, DataRequest dataRequest) {
	 * ParameterGroup initParam = dataRequest.getParameterGroup("dm1"); long id =
	 * Integer.parseInt(initParam.getValue("recipeBoardId")); RecipeBoardVO
	 * recipeBoardVO = recipeBoardService.findDetailRecipe(id);
	 * //System.out.println(recipeBoardVO); dataRequest.setResponse("recipeBoard",
	 * recipeBoardVO); return new JSONDataView(); }
	 */
	@PostMapping("/updateRecipe")
	public View moveUpdateRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
//		HttpSession session = request.getSession(false);
//		if (session == null || session.getAttribute("member") == null) {
//			log.debug("비인증");
//			return new UIView("/");
//		}
		long recipeBoardId = Long.parseLong(dataRequest.getParameter("recipeBoardId"));   
		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(recipeBoardId);
		String imagePath = recipeBoardVO.getRecipeBoardImage();
		Map<String, Object> initParam = new HashMap<String, Object>();
		initParam.put("recipeBoardVO", recipeBoardVO);
		initParam.put("imagePath", imagePath);
		initParam.put("recipeBoardId", recipeBoardId);
		return new UIView("ui/recipe/updaterecipe.clx", initParam);   
	}
 
	@RequestMapping("/updateSaveRecipe")
	public View updateRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
//		HttpSession session = request.getSession(false);
//		if (session == null || session.getAttribute("member") == null) {
//			log.debug("비인증");
//		}
		
		ParameterGroup initParam = dataRequest.getParameterGroup("recipe");
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		String title = initParam.getValue("RECIPE_BOARD_TITLE");
		String content = initParam.getValue("RECIPE_BOARD_CONTENT");
		String type = initParam.getValue("CATEGORY_TYPE");
		String ingredients = initParam.getValue("CATEGORY_INGREDIENTS");
		String method = initParam.getValue("CATEGORY_METHOD");
		long recipeBoardId = Long.parseLong(initParam.getValue("RECIPE_BOARD_ID"));
		// String savePath =
		// "C:\\kosta260\\mygit-study\\FinalProject-recipekithub\\finalproject-recipekithub\\clx-src\\theme\\uploadrecipeimage\\";
		String savePath = "C:\\upload\\recipe\\";
		String recipeBoardImage = recipeBoardService.findDetailRecipe(recipeBoardId).getRecipeBoardImage();
		RecipeBoardVO recipeBoardVO = new RecipeBoardVO();
     
		// 사진을 변경했으면 삭제 후 저장
		if (uploadFiles.size() != 0) {
			if (recipeBoardImage != null) {
				File existImageFile = new File(savePath + recipeBoardImage);
				if (existImageFile.exists()) {
					existImageFile.delete(); 
				}
			}
			UploadFile[] uploadFile = uploadFiles.get("image");
			File orgName = uploadFile[0].getFile();
			String saveName = uploadFile[0].getFileName();
			String uuid = UUID.randomUUID().toString();
			FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
			recipeBoardVO.setRecipeBoardImage(uuid + "_" + saveName);
		}
		recipeBoardVO.setRecipeBoardId(recipeBoardId);  
		recipeBoardVO.setRecipeBoardTitle(title);
		recipeBoardVO.setRecipeBoardContent(content);
		recipeBoardVO.setCategoryType(type);
		recipeBoardVO.setCategoryIngredients(ingredients);
		recipeBoardVO.setCategoryMethod(method);
		recipeBoardService.updateRecipe(recipeBoardVO);
		System.out.println(recipeBoardVO);
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("recipeBoardId", recipeBoardId);
		dataRequest.setMetadata(true, message);

		return new JSONDataView();
	}      
    
	@RequestMapping("/deleteRecipe")
	public View deleteRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
//		HttpSession session = request.getSession(false);
//		if (session == null || session.getAttribute("member") == null) {
//			log.debug("비인증");
//		}         
		ParameterGroup initParam = dataRequest.getParameterGroup("recipeBoardId");
		long recipeBoardId = Long.parseLong(initParam.getValue("RECIPE_BOARD_ID"));
		String savePath = "C:\\upload\\recipe\\";
		String recipeBoardImage = recipeBoardService.findDetailRecipe(recipeBoardId).getRecipeBoardImage();
		File existImageFile = new File(savePath + recipeBoardImage);
		if (existImageFile.exists()) {
			existImageFile.delete();
		}
		recipeBoardService.deleteRecipe(recipeBoardId);
		return new JSONDataView();
	}
}
