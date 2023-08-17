package org.kosta.recipekithub.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.DeclarationVO;

@Mapper
public interface DeclarationMapper {

	int insertDeclaration(DeclarationVO dvo);

}
