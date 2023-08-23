package org.kosta.recipekithub.model.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.RecipePagination;

@Mapper
public interface MealkitMapper {
	
	void insertMealKit(MealKitBoard mealKit);

	MealKitBoard findMealKitByNo(int mealkitNo);
	
	List<MealKitBoard> findMealKitList();

	void updateMealkit(MealKitBoard mealkit);

	void deleteMealkit(int mealkitNo);

	long increaseMealkitHits(int mealkitNo);

	long findTotalPostCount(String mealkitCategory, String searchMealkit);

	List<MealKitBoard> findAllMealkitBoard(String mealkitCategory, String sort, String searchMealkit,RecipePagination pagination);

}
