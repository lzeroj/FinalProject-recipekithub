package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestMember {
	@Autowired
	MemberService memberService;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Test
	public void memberServiceDI() {
		logger.debug("test memberService DI {}", memberService);
		Assertions.assertNotNull(memberService);
	}
	
	@Test
	public void getTotalMemberCount() {
		int totalMemberCount = memberService.getTotalMemberCount();
		logger.info("totalMemberCount:{}", totalMemberCount);	// 1이 출력된다
		Assertions.assertEquals(8, totalMemberCount);
	}
	
	@Test
	public void findMemberByEmail() {
		String memberEmail = "kjoonie@naver.com";
		MemberVO member = memberService.findMemberByEmail(memberEmail);
		Assertions.assertNotNull(member);
	}
	
	@Test
	public void checkDuplicateId() {
		String memberEmail = "kjoonie@naver.com";
		int result = memberService.checkDuplicateEmail(memberEmail); // 중복되는 이메일이 있으면 1, 없으면 0
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void login() {
		String memberEmail = "kjoonie@naver.com";
		String memberPassword = "asdf";
		MemberVO member = memberService.login(memberEmail, memberPassword);
		logger.debug(member.toString());
		Assertions.assertNotNull(member);
	}
	
	@Test
	public void findMemberList() {
		List<MemberVO> list = memberService.findMemberList();
		logger.debug(list.toString());
		Assertions.assertEquals(8, list.size());
	}
	
	
	@Test
	public void updateMember() {
		MemberVO member = new MemberVO("kjoonie7@gmail.com", "asdf", "금동준", "kdj9315", "성남시 분당구","01012345678", "19930105");
		int result = memberService.updateMember(member);
		logger.info("result : {}", result);	// 1이 출력된다
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void registerMember() {
		String memberEmail = "kjoonie7@gmail.com";
		String memberPassword = "asdf";
		String memberName = "금동준";
		String memberNick = "kdj7";
		String memberAddress = "성남시 분당구";
		String memberPhone = "01012345678";
		String memberBirthday = "19930105";
		//String memberType = "2";
		//String memberStatus = "Y";
		//String memberRegDate = "20230808";
		
		MemberVO member = memberService.findMemberByEmail(memberEmail);
		if(member == null) {
			int result = memberService.registerMember(new MemberVO(memberEmail, memberPassword, memberName, memberNick,  memberAddress, memberPhone, memberBirthday));
			//int result = memberService.registerMember(new MemberVO(memberEmail, memberPassword, memberName, memberNick,  memberAddress, memberPhone, memberBirthday, memberType, memberStatus, memberRegDate));
			logger.info("result:{}", result);	// 1이 출력된다
			Assertions.assertEquals(1, result);
		} else {
			System.out.println("아이디가 중복됩니다.");
			// throw new DuplicateIDException("아이디가 중복됩니다.");
		}
	}
	
	@Test
	public void deleteMember() {
		String memberEmail = "kjoonie7@gmail.com";
		int result = memberService.deleteMember(memberEmail);
		Assertions.assertEquals(1, result);
	}
}