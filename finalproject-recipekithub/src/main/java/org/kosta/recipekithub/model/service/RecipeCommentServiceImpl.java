package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.RecipeCommentMapper;
import org.kosta.recipekithub.model.vo.RecipeCommentVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecipeCommentServiceImpl implements RecipeCommentService {
	
	private final RecipeCommentMapper recipeCommentMapper;
	
	@Override
	public List<RecipeCommentVO> findCommentListByRecipeId(long recipeBoardId) {
		// TODO Auto-generated method stub
		return recipeCommentMapper.findCommentListByRecipeId(recipeBoardId);
	}

	@Override
	public int deleteRecipeCommentByCommentId(long recipeCommentId) {
		return recipeCommentMapper.deleteRecipeCommentByCommentId(recipeCommentId);
	}

	@Override
	public int insertRecipeComment(long recipeBoardId, String memberEmail, String commentContent) {
		return recipeCommentMapper.insertRecipeComment(recipeBoardId, memberEmail, commentContent);
	}

	@Override
	public long findCountCommentByRecipeId(long recipeBoardId) {
		return recipeCommentMapper.findCountCommentByRecipeId(recipeBoardId);
	}
}
