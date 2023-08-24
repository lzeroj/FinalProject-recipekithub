package org.kosta.recipekithub.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.kosta.recipekithub.model.mapper.MealkitMapper;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MealkitServiceImpl implements MealkitService {

	private final MealkitMapper mealKitMapper;
	private static Map<String, Long> checkHits = new HashMap<>();


	@Override
	public int insertMealKit(MealKitBoard mealKitBoard) {
		//유효성 검사 코드 필요..!!
		mealKitMapper.insertMealKit(mealKitBoard);
		int num = mealKitBoard.getMealkitNo();
		System.out.println("num은 잘 나오니? = " + num);
		
		MealKitBoard mealkit = mealKitMapper.findMealKitByNo(num);
		System.out.println("mealkit 상태를 알아보자 = " + mealkit.getStatus());
		return num;
	}
	
	@Override
	public MealKitBoard findMealKitByNo(int mealkitNo) {
		
		MealKitBoard mealkit = mealKitMapper.findMealKitByNo(mealkitNo);
		System.out.println(mealkit.getStatus());
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
	
	@Override
	public void increaseHits(int mealkitNo) {
		mealKitMapper.increaseMealkitHits(mealkitNo);
	}
	
	@Override
	public long findTotalPostCount(String mealkitType, String searchMealkit) {
		return mealKitMapper.findTotalPostCount(mealkitType, searchMealkit);
	}

	@Override
	public List<MealKitBoard> findAllMealkitBoard(String mealkitType, String sort, String searchMealkit,
			RecipePagination pagination) {
		return mealKitMapper.findAllMealkitBoard(mealkitType, sort, searchMealkit, pagination);
	}
	
	@Override
	public List<MealKitBoard> findMealkitByName(String mealkitName) {
		return mealKitMapper.findMealkitByName(mealkitName);
	}
}
