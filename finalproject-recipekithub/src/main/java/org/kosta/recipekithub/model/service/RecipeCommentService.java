package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.RecipePagination;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;
import org.kosta.recipekithub.model.vo.RecipeCommentVO;

public interface RecipeCommentService {

	List<RecipeCommentVO> findCommentListByRecipeId(long recipeBoardId, RecipeCommentPagination pagination);

	int deleteRecipeCommentByCommentId(long recipeCommentId);

	int insertRecipeComment(long recipeBoardId, String memberEmail, String commentContent);

	long findCountCommentByRecipeId(long recipeBoardId);

}
