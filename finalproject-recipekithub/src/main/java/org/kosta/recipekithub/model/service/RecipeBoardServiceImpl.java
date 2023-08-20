package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.RecipeBoardMapper;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RecipeBoardServiceImpl implements RecipeBoardService {
	
	private final RecipeBoardMapper recipeBoardMapper;
	@Override
	public List<RecipeBoardVO> findAllRecipeBoard(String type, String ingredients, String method, String sort ,String searchValue, RecipePagination pagination) {
		return recipeBoardMapper.findAllRecipeBoard(type, ingredients, method, sort, searchValue, pagination);
	}
	@Override
	public int insertRecipeBoard(RecipeBoardVO recipeBoardVO) {
		return recipeBoardMapper.insertRecipeBoard(recipeBoardVO);
	}
	@Override
	public RecipeBoardVO findDetailRecipe(long id) {
		return recipeBoardMapper.findDetailRecipe(id);
	}
	@Override
	public int updateRecipe(RecipeBoardVO recipeBoardVO) {
		return recipeBoardMapper.updateRecipe(recipeBoardVO);
	}
	@Override
	public int deleteRecipe(long recipeBoardId) {
		return recipeBoardMapper.deleteRecipe(recipeBoardId);
	}
	@Override
	public long findTotalPostCount(String type, String ingredients, String method, String searchValue) {
		return recipeBoardMapper.findTotalPostCount(type, ingredients, method, searchValue);
	}
	@Override
	public long updateRecipeHits(long id) {
		return recipeBoardMapper.updateRecipeHits(id);
	}
	@Override
	public long likeCount(long recipeBoardId) {
		return recipeBoardMapper.likeCount(recipeBoardId);
	}
}
