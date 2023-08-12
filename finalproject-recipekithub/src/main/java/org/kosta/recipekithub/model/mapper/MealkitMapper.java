package org.kosta.recipekithub.model.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealKitBoard;

@Mapper
public interface MealkitMapper {
	
	void insertMealKit(MealKitBoard mealKit);

	Optional<MealKitBoard> findMealKitByNo(int mealkitNo);
	
	List<MealKitBoard> findMealKitList();

	void editMealkit(MealKitBoard mealkit);

}
