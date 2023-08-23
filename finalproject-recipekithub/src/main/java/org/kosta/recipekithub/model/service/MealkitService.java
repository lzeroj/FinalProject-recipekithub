package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.RecipePagination;


public interface MealkitService {

	int insertMealKit(MealKitBoard mealKitBoard);
	
	MealKitBoard findMealKitByNo(int mealkitNo);

	List<MealKitBoard> findMealKitList();
	
	MealKitBoard updateMealkit(MealKitBoard mealkit);

	void deleteMealkit(int mealkitNo);
	
	void increaseHits(int mealkitNo);

	long findTotalPostCount(String mealkitCategory, String searchMealkit);

	List<MealKitBoard> findAllMealkitBoard(String mealkitCategory, String sort, String searchMealkit,RecipePagination pagination);
	
	

}

