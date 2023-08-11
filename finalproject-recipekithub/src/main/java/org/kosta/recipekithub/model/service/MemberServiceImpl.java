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
}
