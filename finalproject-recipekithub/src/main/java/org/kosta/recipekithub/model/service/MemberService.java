package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MemberVO;

public interface MemberService {

	MemberVO findMemberByEmail(String memberEmail);

	MemberVO login(String memberEmail, String memberPassword);

	int getTotalMemberCount();

	int registerMember(MemberVO memberVO);

	int updateMember(MemberVO memberVO);
	
	int deleteMember(String memberEmail);

	List<MemberVO> findMemberList();

	int checkDuplicateEmail(String memberEmail);

	int checkDuplicateNick(String memberNick);

	String findEmailByNamePhoneBirthday(String memberName, String memberPhone, String memberBirthday);

	String findPswdByEmailNamePhone(String memberEmail, String memberName, String memberPhone);

	//int insertProfileImg(String memberEmail, String memberImage);
	
	int deleteProfileImg(String memberEmail);

}