package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.MemberMapper;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberMapper memberMapper;
	
	@Override
	public MemberVO findMemberByEmail(String memberEmail) {
		return memberMapper.findMemberByEmail(memberEmail);
	}

	@Override
	public MemberVO login(String memberEmail, String memberPassword) {
		return memberMapper.login(memberEmail, memberPassword);
	}

	@Override
	public int getTotalMemberCount() {
		return memberMapper.getTotalMemberCount();
	}

	@Override
	public int registerMember(MemberVO memberVO) {
		return memberMapper.registerMember(memberVO);
	}

	@Override
	public int updateMember(MemberVO memberVO) {
		return memberMapper.updateMember(memberVO);
	}

	@Override
	public int deleteMember(String memberEmail) {
		return memberMapper.deleteMember(memberEmail);
	}

	@Override
	public List<MemberVO> findMemberList() {
		return memberMapper.findMemberList();
	}

	@Override
	public int checkDuplicateEmail(String memberEmail) {
		return memberMapper.checkDuplicateEmail(memberEmail);
	}

	@Override
	public int checkDuplicateNick(String memberNick) {
		return memberMapper.checkDuplicateNick(memberNick);
	}

	@Override
	public String findEmailByNamePhoneBirthday(String memberName, String memberPhone, String memberBirthday) {
		return memberMapper.findEmailByNamePhoneBirthday(memberName, memberPhone, memberBirthday);
	}

	@Override
	public String findPswdByEmailNamePhone(String memberEmail, String memberName, String memberPhone) {
		return memberMapper.findPswdByEmailNamePhone(memberEmail, memberName, memberPhone);
	}

	/*
	@Override
	public int insertProfileImg(String memberEmail, String memberImage) {
		return memberMapper.insertProfileImg(memberEmail, memberImage);
	}
	*/

	@Override
	public int deleteProfileImg(String memberEmail) {
		return memberMapper.deleteProfileImg(memberEmail);
	}

}
