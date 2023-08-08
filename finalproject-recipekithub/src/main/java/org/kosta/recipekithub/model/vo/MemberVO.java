package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class MemberVO {
	private String memberEmail;
	private String memberPassword;
	private String memberName;
	private String memberNick;
	private String memberAddress;
	private String memberPhone;
	private String memberBirthday;
	private String memberType;
	private String memberStatus;
	private String memberRegDate;
}
