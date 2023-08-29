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

	long findTotalPostCount(String mealkitType, String searchMealkit);

	List<MealKitBoard> findAllMealkitBoard(String mealkitType, String sort, String searchMealkit,RecipePagination pagination);
	
	List<MealKitBoard> findMealkitByName(String mealkitName);
}

