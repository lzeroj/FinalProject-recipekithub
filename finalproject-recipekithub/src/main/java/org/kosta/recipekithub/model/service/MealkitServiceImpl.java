package org.kosta.recipekithub.model.service;

import java.util.List;
import java.util.Optional;

import org.kosta.recipekithub.model.mapper.MealkitMapper;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MealkitServiceImpl implements MealkitService {

	private final MealkitMapper mealKitMapper;

	@Override
	public int insertMealKit(MealKitBoard mealKitBoard) {
		//유효성 검사 코드 필요..!!
		mealKitMapper.insertMealKit(mealKitBoard);
		int num = mealKitBoard.getMealkitNo();
		MealKitBoard mealkit = mealKitMapper.findMealKitByNo(num);
		return num;
	}
	
	@Override
	public MealKitBoard findMealKitByNo(int mealkitNo) {
		
		MealKitBoard mealkit = mealKitMapper.findMealKitByNo(mealkitNo);
		return mealkit;
	}
	
	@Override
	public List<MealKitBoard> findMealKitList() {
		List<MealKitBoard> list = mealKitMapper.findMealKitList();
		return list;
	}
	
	@Override
	public MealKitBoard updateMealkit(MealKitBoard mealkit) {
		mealKitMapper.updateMealkit(mealkit);		
		return mealkit;
	}
	
	@Override
	public void deleteMealkit(int mealkitNo) {
		mealKitMapper.deleteMealkit(mealkitNo);
		
	}
	

}
