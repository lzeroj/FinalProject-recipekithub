package org.kosta.recipekithub.webcontroller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.kosta.recipekithub.model.service.RecipeBoardService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
public class RecipeBoardController {
	 
	private final RecipeBoardService recipeBoardService;
	
	@RequestMapping("/findRecipeBoardList")
	public View findRecipeBoardList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		List<RecipeBoardVO> list = recipeBoardService.findAllRecipeBoard();
		 Map<String, Object> initParam = new HashMap<String, Object>();	
		 initParam.put("recipe_board", list);
		//dataRequest.setResponse("recipe_board", list);
		return new UIView("ui/recipe/recipe.clx",initParam);
	}

	@RequestMapping("/insertRecipe")
	public View insertRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		ParameterGroup initParam = dataRequest.getParameterGroup("recipe");
		
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		UploadFile[] uploadFile = uploadFiles.get("image");
		File orgName = uploadFile[0].getFile();
		String saveName = uploadFile[0].getFileName();
		String savePath = "C:\\kosta260\\mygit-study\\FinalProject-recipekithub\\finalproject-recipekithub\\clx-src\\theme\\uploadrecipeimage\\";
		String uuid = UUID.randomUUID().toString();
		FileCopyUtils.copy(orgName, new File(savePath+uuid+"_"+saveName));
		
		String title = initParam.getValue("RECIPE_BOARD_TITLE");
		String content = initParam.getValue("RECIPE_BOARD_CONTENT");
		String type = initParam.getValue("CATEGORY_TYPE");
		String ingredients = initParam.getValue("CATEGORY_INGREDIENTS");
		String method = initParam.getValue("CATEGORY_METHOD");		
		RecipeBoardVO recipeBoardVO = new RecipeBoardVO();
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberEmail("test@naver.com");
		recipeBoardVO.setMemberVO(memberVO);
		recipeBoardVO.setRecipeBoardTitle(title);
		recipeBoardVO.setRecipeBoardContent(content);
		recipeBoardVO.setCategoryType(type);
		recipeBoardVO.setCategoryIngredients(ingredients);
		recipeBoardVO.setCategoryMethod(method);
		recipeBoardVO.setRecipeBoardImage(uuid+"_"+saveName);
		recipeBoardService.insertRecipeBoard(recipeBoardVO);
		
		long recpieBoardId = recipeBoardVO.getRecipeBoardId();
		
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("recipeBoardId", recpieBoardId);
		dataRequest.setMetadata(true, message);
		
		
/*		if(uploadFiles != null && uploadFiles.size() > 0) {
			Set<Entry<String, UploadFile[]>> entries = uploadFiles.entrySet();
			for(Entry<String, UploadFile[]> entry : entries) {
				UploadFile[] uFiles = entry.getValue();
				for(UploadFile uFile : uFiles){
					File file = uFile.getFile();		
					String strFileName = uFile.getFileName();				
					System.out.println(strFileName);
					file.renameTo(new File(savePath+uuid+"_"+strFileName));			
				}
			}
		}*/
		return new JSONDataView();
	}
	
	@RequestMapping("/detailRecipe")
	public View moveDetailRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		long id = Integer.parseInt(dataRequest.getParameter("recipeBoardId"));
		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(id);
		 Map<String, Object> initParam = new HashMap<String, Object>();	
		 initParam.put("recipeBoardVO", recipeBoardVO);
		return new UIView("ui/recipe/detailrecipe.clx",initParam);	
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
	@RequestMapping("/moveUpdateRecipe")
	public View moveUpdateRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		long id = Integer.parseInt(dataRequest.getParameter("recipeBoardId"));
		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(id);
		String imagePath =  "theme\\uploadrecipeimage\\" + recipeBoardVO.getRecipeBoardImage();
		 Map<String, Object> initParam = new HashMap<String, Object>();	
		 initParam.put("recipeBoardVO", recipeBoardVO);
		 initParam.put("imagePath", imagePath);
		 System.out.println(recipeBoardVO);
		return new UIView("ui/recipe/updaterecipe.clx",initParam);	
	}
	
	@RequestMapping("/updateRecipe")
	public View updateRecipe(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		long id = Integer.parseInt(dataRequest.getParameter("recipeBoardId"));
//		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(id);
//		String imagePath =  "theme\\uploadrecipeimage\\" + recipeBoardVO.getRecipeBoardImage();
//		 Map<String, Object> initParam = new HashMap<String, Object>();	
//		 initParam.put("recipeBoardVO", recipeBoardVO);
//		 initParam.put("imagePath", imagePath);
//		 System.out.println(recipeBoardVO);
		return new JSONDataView();
	}
}

