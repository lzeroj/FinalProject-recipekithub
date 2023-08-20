package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;
import org.kosta.recipekithub.model.vo.RecipeCommentVO;

@Mapper
public interface RecipeCommentMapper {

	List<RecipeCommentVO> findCommentListByRecipeId(long recipeBoardId, RecipeCommentPagination pagination);

	int deleteRecipeCommentByCommentId(long recipeCommentId);

	int insertRecipeComment(long recipeBoardId, String memberEmail, String commentContent);

	long findCountCommentByRecipeId(long recipeBoardId);

}
