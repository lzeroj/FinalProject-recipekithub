package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.ChefVO;

@Mapper
public interface ChefMapper {

	List<ChefVO> findChefListByRecipe();

	List<ChefVO> findChefRecipeListByMemberEmail(String memberEmail);

}
