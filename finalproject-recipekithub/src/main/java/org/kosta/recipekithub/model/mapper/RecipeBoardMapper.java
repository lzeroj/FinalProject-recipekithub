package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.Pagination;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
@Mapper
public interface RecipeBoardMapper {

	List<RecipeBoardVO> findAllRecipeBoard(Pagination pagination);

	int insertRecipeBoard(RecipeBoardVO recipeBoardVO);

	RecipeBoardVO findDetailRecipe(long id);

	int updateRecipe(RecipeBoardVO recipeBoardVO);

	int deleteRecipe(long recipeBoardId);

	long findTotalPostCount();

}
