package org.kosta.recipekithub.model.service;

import java.util.List;
import java.util.Map;

import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MemberVO;



public interface MealkitService {

	int insertMealKit(MealKitBoard mealKitBoard);
	
	MealKitBoard findMealKitByNo(int mealkitNo);

	List<MealKitBoard> findMealKitList();
	
	MealKitBoard updateMealkit(MealKitBoard mealkit);

	void deleteMealkit(int mealkitNo);

	
	

}
