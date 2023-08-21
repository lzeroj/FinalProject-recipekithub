package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.DeclarationVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;

public interface DeclarationService {

	int insertDeclaration(DeclarationVO dvo);

	List<RecipeBoardVO> selectAllReportList();

	List<DeclarationVO> selectReportListByRecipeBoardId(int recipeBoardId);

}