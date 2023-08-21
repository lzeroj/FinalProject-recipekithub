package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.RecipePagination;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;

public interface RecipeBoardService {

	List<RecipeBoardVO> findAllRecipeBoard(String type, String ingredients, String method, String sort, String searchValue, RecipePagination pagination);

	int insertRecipeBoard(RecipeBoardVO recipeBoardVO);

	RecipeBoardVO findDetailRecipe(long id);

	int updateRecipe(RecipeBoardVO recipeBoardVO);

	int deleteRecipe(long recipeBoardId);

	long findTotalPostCount(String type, String ingredients, String method, String searchValue);

	long updateRecipeHits(long id);

	long likeCount(long recipeBoardId);

	List<RecipeBoardVO> likeRecipeList();

}
