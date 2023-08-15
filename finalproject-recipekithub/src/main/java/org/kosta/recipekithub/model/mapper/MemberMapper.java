package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MemberVO;

@Mapper
public interface MemberMapper {

	MemberVO findMemberByEmail(String memberEmail);
	
	MemberVO login(String memberEmail, String memberPassword);

	int getTotalMemberCount();

	int registerMember(MemberVO memberVO);

	int updateMember(MemberVO memberVO);
	
	int deleteMember(String memberEmail);
	
	List<MemberVO> findMemberList();
	
	int checkDuplicateEmail(String memberEmail);

	int checkDuplicateNick(String memberNick);

}