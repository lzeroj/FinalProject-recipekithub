package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
@Mapper
public interface RecipeBoardMapper {

	List<RecipeBoardVO> findAllRecipeBoard();

	int insertRecipeBoard(RecipeBoardVO recipeBoardVO);

	RecipeBoardVO findDetailRecipe(long id);

}
