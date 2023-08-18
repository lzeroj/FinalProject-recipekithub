package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.RecipeBoardMapper;
import org.kosta.recipekithub.model.vo.Pagination;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RecipeBoardServiceImpl implements RecipeBoardService {
	
	private final RecipeBoardMapper recipeBoardMapper;
	@Override
	public List<RecipeBoardVO> findAllRecipeBoard(Pagination pagination) {
		return recipeBoardMapper.findAllRecipeBoard(pagination);
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
	public long findTotalPostCount() {
		return recipeBoardMapper.findTotalPostCount();
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
