package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.service.PaymentService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestMember {
	@Autowired
	MemberService memberService;
	@Autowired
	PaymentService paymentService;
	
	@Test
	public void memberServiceDI() {
		log.debug("test memberService DI {}", memberService);
		Assertions.assertNotNull(memberService);
	}
	
	@Test
	public void getTotalMemberCount() {
		int totalMemberCount = memberService.getTotalMemberCount();
		log.info("totalMemberCount:{}", totalMemberCount);	// 1이 출력된다
		Assertions.assertEquals(8, totalMemberCount);
	}
	
	@Test
	public void findMemberByEmail() {
		String memberEmail = "kjooniewetwet@kakao.com";
		MemberVO member = memberService.findMemberByEmail(memberEmail);
		Assertions.assertNotNull(member);
	}
	
	@Test
	public void login() {
		String memberEmail = "kjoonie@naver.com";
		String memberPassword = "asdf";
		MemberVO member = memberService.login(memberEmail, memberPassword);
		log.debug(member.toString());
		Assertions.assertNotNull(member);
	}
	
	@Test
	public void findMemberList() {
		List<MemberVO> list = memberService.findMemberList();
		log.debug(list.toString());
		Assertions.assertEquals(8, list.size());
	}
	
	@Test
	public void updateMember() {
		MemberVO member = new MemberVO("kjoonie@kakao.com", "asdf", "금동준", "kdj9315", "123456", "성남시 분당구", "정자일로135", "01081639834", "19930105");
		int result = memberService.updateMember(member);
		log.debug("result : {}", result);	// 1이 출력된다
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void registerMember() {
		String memberEmail = "kjoonie@kakao.com";
		String memberPassword = "asdf";
		String memberName = "금동준";
		String memberNick = "kdj77";
		String memberPostcode = "987234";
		String memberAddress = "성남시 분당구";
		String memberAddressDetail = "정자일로136";
		String memberPhone = "01012345678";
		String memberBirthday = "19930105";
		//String memberType = "2";
		//String memberStatus = "Y";
		//String memberRegDate = "20230808";
		
		MemberVO member = memberService.findMemberByEmail(memberEmail);
		if(member == null) {
			int result = memberService.registerMember(new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode, memberAddress, memberAddressDetail, memberPhone, memberBirthday));
			//int result = memberService.registerMember(new MemberVO(memberEmail, memberPassword, memberName, memberNick,  memberAddress, memberPhone, memberBirthday, memberType, memberStatus, memberRegDate));
			log.debug("result:{}", result);	
			Assertions.assertEquals(1, result); // 1이 출력된다
		} else {
			System.out.println("아이디가 중복됩니다.");
			// throw new DuplicateIDException("아이디가 중복됩니다.");
		}
	}
	
	@Test
	public void deleteMember() {
		String memberEmail = "kjoonie456@naver.com";
		int result = memberService.deleteMember(memberEmail);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void findMyPaymentList() {
		String memberEmail = "shj";
		List<PaymentVO> list = paymentService.findMyPaymentList(memberEmail);
		for(int i=0;i<list.size();i++) {
			System.out.println(list.get(i));
		}
	}
	
	public void checkDuplicateEmail() {
		String memberEmail = "kjoonie@naver.com";
		int result = memberService.checkDuplicateEmail(memberEmail);
		Assertions.assertEquals(1, result);	// 중복되는 이메일이 있으면 1, 없으면 0
	}
	
	@Test
	public void checkDuplicateNick() {
		String memberNick = "kdj";
		int result = memberService.checkDuplicateNick(memberNick);
		Assertions.assertEquals(1, result);	// 중복되는 닉네임이 있으면 1, 없으면 0
	}
	
	@Test
	public void findEmailByNamePhoneBirthday() {
		String memberName = "금동준";
		String memberPhone = "01012345678";
		String memberBirthday = "19930105";
		String memberEmail = memberService.findEmailByNamePhoneBirthday(memberName, memberPhone, memberBirthday);
		log.info("가입 이메일 찾기 : {}", memberEmail);	// 1이 출력된다
		Assertions.assertNotNull(memberEmail);
	}
	
	@Test
	public void findPswdByEmailNamePhone() {
		String memberEmail = "kjoonie@kakao.com";
		String memberName = "금동준";
		String memberPhone = "01081639834";
		String memberPassword = memberService.findPswdByEmailNamePhone(memberEmail, memberName, memberPhone);
		log.info("비밀번호 찾기 : {}", memberPassword);	// 1이 출력된다
		Assertions.assertNotNull(memberPassword);
	}
	
}
