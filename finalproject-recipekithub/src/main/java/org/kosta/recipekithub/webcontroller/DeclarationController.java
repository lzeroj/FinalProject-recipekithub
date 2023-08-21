package org.kosta.recipekithub.webcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.kosta.recipekithub.model.service.DeclarationService;
import org.kosta.recipekithub.model.service.RecipeBoardService;
import org.kosta.recipekithub.model.vo.DeclarationVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class DeclarationController {
	private final DeclarationService declarationService;
	private final RecipeBoardService recipeBoardService;
	
	@RequestMapping("/insertDeclaration")
	public View insertDeclaration(HttpServletRequest request, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("dmdeclaration");
		int recipeBoardId = Integer.parseInt(param.getValue("recipeBoardId")); 
		String inputtext = param.getValue("inputtext");
		String textbox = param.getValue("textbox");
		String declarationType = param.getValue("declarationType");
		if(recipeBoardId == 0) {
			return new UIView();
		}
//		 로그인 확인
//		HttpSession session = request.getSession(false);
//		MemberVO member = (MemberVO) session.getAttribute("member");
//		String memberId = member.getMemberEmail();
		String memberEmail = "shj";
		
		DeclarationVO dvo = new DeclarationVO();
		dvo.setMemberEmail(memberEmail);
		dvo.setRecipeBoardId(recipeBoardId);
		dvo.setReportTitle(inputtext);
		dvo.setReportContent(textbox);
		dvo.setDeclarationType(declarationType);
		
		int result = declarationService.insertDeclaration(dvo);
		
		Map<String,Object> message = new HashMap<String, Object>();
		message.put("insertresult", result);
		
		return new JSONDataView(true,message);
	}
	
	@RequestMapping("/selectAllReportList")
	public View selectAllReportList(HttpServletRequest request, DataRequest dataRequest) {
		List<RecipeBoardVO> recipelist = declarationService.selectAllReportList();
		dataRequest.setResponse("dsreportlist", recipelist);
		return new JSONDataView();
	}
	
	@RequestMapping("/selectReportListByRecipeBoardId")
	public View selectReportListByRecipeBoardId(HttpServletRequest request, DataRequest dataRequest, int recipeBoardId) {
		List<DeclarationVO> selectReportList = declarationService.selectReportListByRecipeBoardId(recipeBoardId);
		if(selectReportList == null) {
			return new UIView();
		}
		Map<String,Object> message = new HashMap<>();
		message.put("selectReportListResult", 1);
		
		dataRequest.setResponse("dsselectreportlist", selectReportList);
		return new JSONDataView(true, message);
	}
	
	@RequestMapping("/deleteRecipeById")
	public View deleteRecipeById(HttpServletRequest request, DataRequest dataRequest, int recipeBoardId) {
		int result = recipeBoardService.deleteRecipe(recipeBoardId);
		if(result == 1) {
			Map<String,Object> message = new HashMap<>();
			message.put("deleteRecipeByIdResult", 1);
			dataRequest.setMetadata(true, message);
		}
		return new JSONDataView();
	}
	
}
