package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.RecipeBoardMapper;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RecipeBoardServiceImpl implements RecipeBoardService {
	
	private final RecipeBoardMapper recipeBoardMapper;
	@Override
	public List<RecipeBoardVO> findAllRecipeBoard() {
		return recipeBoardMapper.findAllRecipeBoard();
	}
	@Override
	public int insertRecipeBoard(RecipeBoardVO recipeBoardVO) {
		return recipeBoardMapper.insertRecipeBoard(recipeBoardVO);
	}
	@Override
	public RecipeBoardVO findDetailRecipe(long id) {
		return recipeBoardMapper.findDetailRecipe(id);
	}
}
