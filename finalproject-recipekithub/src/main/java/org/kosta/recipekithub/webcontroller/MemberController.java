package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	//---[ 전체 회원 정보 조회 ]---//
	//---> 아직 사용하지 않음
	@RequestMapping("/memberlist")
	public View findMemberList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		List<MemberVO> findMemberList = memberService.findMemberList();
		dataRequest.setResponse("memberList", findMemberList);
		return new JSONDataView();
	}

	//---[ 로그인 ]---//
	@RequestMapping("/login")
	public View login(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {

		// `DataRequest`: 서브미션 통신에 대한 데이터
		// `ParameterGroup` : 서브미션 request 데이터를 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_login");
		String memberEmail = param.getValue("member_email");
		String memberPassword = param.getValue("member_password");
		System.out.println("memberEmail : " + memberEmail + ", memberPassword : " + memberPassword);

		MemberVO member = memberService.login(memberEmail, memberPassword);
		System.out.println(member);

		if (member == null) {
			return new UIView("ui/index.clx");
		}

		HttpSession session = request.getSession();
		session.setAttribute("member", member); 
		dataRequest.setResponse("ds_member", member); 

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	//---[ 회원가입 ]---//
	@RequestMapping("/register")
	public View registerMember(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberEmail = param.getValue("member_email");
		
		if(memberService.findMemberByEmail(memberEmail) != null) {
			return new UIView("ui/index.clx");
		}
		
		String memberPassword = param.getValue("member_password");
		String memberName = param.getValue("member_name"); 
		String memberNick = param.getValue("member_nick"); 
		String memberBirthday = param.getValue("member_birthday");
		String memberPhone = param.getValue("member_phone"); 
		String memberAddress = param.getValue("member_address");
		
		MemberVO member = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberAddress, memberPhone, memberBirthday);
		int result = memberService.registerMember(member);
		log.info("member 회원가입 {}", member);
		dataRequest.setResponse("ds_member", member); 
		System.out.println(result);

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	//---[ 회원가입시 이메일 중복 체크 ]---//
	@RequestMapping("/checkEmail")
	@ResponseBody
	public View checkEmail(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberEmail = param.getValue("member_email");
		int checkResult = memberService.checkDuplicateEmail(memberEmail);
		String result = null;
		if (checkResult == 0) {
			result = "ok";
		} else {
			result = "fail";
		}
		request.setAttribute("responsebody", result);
		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}
	
	//---[ 회원가입시 닉네임 중복 체크 ]---//
	@RequestMapping("/checkNick")
	@ResponseBody
	public View checkNick(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberNick = param.getValue("member_nick");
		int checkResult = memberService.checkDuplicateNick(memberNick);
		String result = null;
		if (checkResult == 0) {
			result = "ok";
		} else {
			result = "fail";
		}
		request.setAttribute("responsebody", result);
		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}
	
	//---[ 회원 프로필 조회 ]---//
	@RequestMapping("/profileInfo")
	public View viewMyProfile(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		// 로그인 여부 확인
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 정보 조회가 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}
		
		MemberVO member = (MemberVO)session.getAttribute("member");	// 현재 session에 담겨있는 회원 정보 가져오기
		System.out.println(member);
		
		/*
		List<MemberVO> myProfile = new ArrayList<>();
		MemberVO mvo = null;
		mvo.setMemberEmail(member.getMemberEmail());
		mvo.setMemberPassword(member.getMemberPassword());
		mvo.setMemberName(member.getMemberName());
		mvo.setMemberNick(member.getMemberNick());
		mvo.setMemberBirthday(member.getMemberBirthday());
		mvo.setMemberPhone(member.getMemberPhone());
		mvo.setMemberAddress(member.getMemberAddress());
		myProfile.add(mvo);
		*/
		
		
//		Map<String, Object> map = new HashMap<>();
//		map.put("myProfile", member);
//		System.out.println("map : " + map);
		List<MemberVO> memlist = new ArrayList<>();
		memlist.add(member);
		
		dataRequest.setResponse("ds_profile", memlist);
//		dataRequest.setMetadata(true, map);
		
		return new JSONDataView();
	}
	
	//---[ 회원정보 수정 ]---//
	@RequestMapping("/updateMember")
	public View updateMember(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest, String cartDetailQuantity, String mealkitName) {
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 정보 수정이 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}
		
		ParameterGroup param = dataRequest.getParameterGroup("dm_update");
		String memberEmail = param.getValue("member_email");
		String memberPassword = param.getValue("member_password");
		String memberName = param.getValue("member_name"); 
		String memberNick = param.getValue("member_nick"); 
		String memberBirthday = param.getValue("member_birthday");
		String memberPhone = param.getValue("member_phone"); 
		String memberAddress = param.getValue("member_address");
		
		MemberVO member = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberAddress, memberPhone, memberBirthday);
		if(member != null) {
			int result = memberService.updateMember(member);
			log.info("member 회원 정보 수정 {}", result);
		}
		return new JSONDataView();
	}
	
	//---[ 회원 탈퇴 ]---//
	@RequestMapping("/deleteMember")
	public View deleteMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 탈퇴가 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}
		
		//session.getAttribute("member");
		//String memberEmail = session.getId();
		//System.out.println(email);
		
		// MemberVO member = (MemberVO)session.getAttribute("member");

		
		ParameterGroup param = dataRequest.getParameterGroup("dm_delete");
		String memberEmail = param.getValue("member_email");
		
		int result = memberService.deleteMember(memberEmail);
		System.out.println(result);
		log.info("member 회원 탈퇴 {}", result);

		return new JSONDataView();
	}
	
}
