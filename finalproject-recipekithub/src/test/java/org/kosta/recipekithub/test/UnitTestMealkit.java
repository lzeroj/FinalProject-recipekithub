package org.kosta.recipekithub.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.MealkitService;
import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestMealkit {

	@Autowired
	private MealkitService mealkitService;
	@Autowired
	private MemberService memberService;
	
	
	@Test
	void insert() {
		MealKitBoard mealkit = new MealKitBoard();
		mealkit.setMealkitName("ㅎㅇㅎㅇㅎㅇㅎㅇ");
		mealkit.setMealkitInfo("ㅎㅇㅎㅇㅎㅇㅎㅇ");
		mealkit.setMealkitIngredients("ㅎㅇㅎㅇㅎㅇ");
		mealkit.setMealkitPrice(5500);
		mealkit.setMealkitInventory(100);
		mealkit.setMealkitCategory("찌개/국/밥");
		
		//HttpSession session = request.getSession(false);
		//MemberVO member = (MemberVO)session.getAttribute("mvo");
		MemberVO member = new MemberVO("hellojava@naver.com", "123", "재헌강", "유스타스캡틴재헌", "성남", "01012345678", "1998-01-01", "1", "Y", null);
		mealkit.setMemberVO(member);
		int num = mealkitService.insertMealKit(mealkit);
		log.debug("게시판 번호는 = {} ", num); //85
		MealKitBoard meal= mealkitService.findMealKitByNo(num);
		log.debug("mealkit에 대해 알아보자 = {} ", meal);
		Assertions.assertNotNull(meal.getMemberVO().getMemberEmail());
		
	}
	
	@Test
	void delete() {
		MealKitBoard mealkit =  mealkitService.findMealKitByNo(89);
		log.debug("mealkit 정보에 대해 알아보자 {}  ", mealkit);
		//mealkitService.deleteMealkit(63);
		Assertions.assertNotNull(mealkit);
	}
	
	@Test
	void findByNo() {
		MealKitBoard mealkit= mealkitService.findMealKitByNo(26);
		log.debug("mealkit에 대해 알아보자 = {} ", mealkit);
		Assertions.assertNotNull(mealkit);
	}
	

}
