package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.RecipeCommentVO;

@Mapper
public interface RecipeCommentMapper {

	List<RecipeCommentVO> findCommentListByRecipeId(long recipeBoardId);

	int deleteRecipeCommentByCommentId(long recipeCommentId);

}