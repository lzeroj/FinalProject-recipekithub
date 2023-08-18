package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.RecipeBoardService;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestRecipe {
	
	@Autowired
	RecipeBoardService recipeBoardService;
	
	@Test
	public void moveDetailRecipe(){
		RecipeBoardVO recipeBoardVO = recipeBoardService.findDetailRecipe(50);
		log.debug("recipeBoardVO : {}" , recipeBoardVO);
	}
	
	@Test
	public void findRecipeListByCategry(){
		//List<RecipeBoardVO> list= recipeBoardService.findAllRecipeBoard();
		//log.debug("list : {}" , list);
	}
}
