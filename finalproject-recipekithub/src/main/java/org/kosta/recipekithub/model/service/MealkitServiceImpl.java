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
		//MealKitBoard MadeMealkit= makeMealKit(param, request);
		System.out.println("mealkit 객체를 알아보자" + mealKitBoard);
		mealKitMapper.insertMealKit(mealKitBoard);
		int num = mealKitBoard.getMealkitNo();
		return num;
	}
	
	@Override
	public MealKitBoard findMealKitByNo(int mealkitNo) {
		
		Optional<MealKitBoard> mealkit = mealKitMapper.findMealKitByNo(mealkitNo);
		MealKitBoard meal = mealkit.orElse(null);
		return meal;
	}
	
	@Override
	public List<MealKitBoard> findMealKitList() {
		List<MealKitBoard> list = mealKitMapper.findMealKitList();
		return list;
	}
	
	@Override
	public MealKitBoard editMealkit(MealKitBoard mealkit, MemberVO member) {
		
		if(mealkit.getMemberVO().getMemberEmail().equals(member.getMemberEmail())) {
			mealKitMapper.editMealkit(mealkit);
		}else {
			//밀키트 작성자와 로그인한 사람이 다른 사람일 경우
		}
		
		return mealkit;
	}

}
