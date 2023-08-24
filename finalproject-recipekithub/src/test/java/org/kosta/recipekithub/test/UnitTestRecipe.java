package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.MealkitService;
import org.kosta.recipekithub.model.service.RecipeBoardService;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestRecipe {
	
	@Autowired
	RecipeBoardService recipeBoardService;
	@Autowired
	MealkitService mealkitService;
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
	@Test
	public void test() {
		
		List<MealKitBoard> list = mealkitService.findAllMealkitBoard("전체/전체/전체", "별점순", "", new RecipePagination(17, 1));
		System.out.println(list);
	}
}
