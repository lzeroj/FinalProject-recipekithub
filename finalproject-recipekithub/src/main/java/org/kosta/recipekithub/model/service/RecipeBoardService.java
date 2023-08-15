package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.RecipeBoardVO;

public interface RecipeBoardService {

	List<RecipeBoardVO> findAllRecipeBoard();

	int insertRecipeBoard(RecipeBoardVO recipeBoardVO);

	RecipeBoardVO findDetailRecipe(long id);
	
}
