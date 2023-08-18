package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.Pagination;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;

public interface RecipeBoardService {

	List<RecipeBoardVO> findAllRecipeBoard(Pagination pagination);

	int insertRecipeBoard(RecipeBoardVO recipeBoardVO);

	RecipeBoardVO findDetailRecipe(long id);

	int updateRecipe(RecipeBoardVO recipeBoardVO);

	int deleteRecipe(long recipeBoardId);

	long findTotalPostCount();

	long updateRecipeHits(long id);

	long likeCount(long recipeBoardId);

}
