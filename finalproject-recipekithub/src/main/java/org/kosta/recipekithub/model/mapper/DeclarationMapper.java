package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.DeclarationVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;

@Mapper
public interface DeclarationMapper {

	int insertDeclaration(DeclarationVO dvo);

	List<RecipeBoardVO> selectAllReportList();

	List<DeclarationVO> selectReportListByRecipeBoardId(int recipeBoardId);

}
