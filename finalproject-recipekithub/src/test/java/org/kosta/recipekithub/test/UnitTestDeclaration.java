package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.DeclarationService;
import org.kosta.recipekithub.model.vo.DeclarationVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UnitTestDeclaration {

	@Autowired
	DeclarationService declarationService; 
	
	@Test
	public void insertDeclaration() {
		String memberEmail = "shj";
		int recipeBoardId = 39;
		String reportTitle = "Title : 내용이 조금 이상한것 같습니다";
		String reportContent = "Content : 내용이 조금 이상한것 같습니다";
		String declarationType = "적절하지 않은 내용";
		
		DeclarationVO dvo = new DeclarationVO();
		dvo.setMemberEmail(memberEmail);
		dvo.setRecipeBoardId(recipeBoardId);
		dvo.setReportTitle(reportTitle);
		dvo.setReportContent(reportContent);
		dvo.setDeclarationType(declarationType);
		
		int result = declarationService.insertDeclaration(dvo);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void selectAllReportList() {
		List<RecipeBoardVO> recipelist = declarationService.selectAllReportList();
		for(int i=0;i<recipelist.size();i++) {
			System.out.println(recipelist.get(i));
		}
	}
	
	@Test
	public void selectReportListByRecipeBoardId() {
		int recipeBoardId = 39; 
		List<DeclarationVO> selectReportList = declarationService.selectReportListByRecipeBoardId(recipeBoardId);
		for(int i=0;i<selectReportList.size();i++) {
			System.out.println(selectReportList.get(i));
		}
	}
	

}
