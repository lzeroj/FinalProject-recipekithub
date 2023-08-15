package org.kosta.recipekithub.model.vo;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
public class MemberVO implements Serializable{
	// 인증 정보이므로  리로딩시 직렬화하여 백업하도록 객체 직렬화 한다.
	private static final long serialVersionUID = -9187921837124678644L;
	
	@NonNull
	private String memberEmail;
	@NonNull
	private String memberPassword;
	@NonNull
	private String memberName;
	@NonNull
	private String memberNick;
	@NonNull
	private String memberPostcode;
	@NonNull
	private String memberAddress;
	@NonNull
	private String memberAddressDetail;
	@NonNull
	private String memberPhone;
	@NonNull
	private String memberBirthday;
	private String memberType;
	private String memberStatus;
	private String memberRegDate;
	
	
}
