package org.kosta.recipekithub.webcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	@RequestMapping("/memberlist")
	public View findMemberList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		List<MemberVO> findMemberList = memberService.findMemberList();
		dataRequest.setResponse("memberList", findMemberList);
		return new JSONDataView();
	}

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
			// dataRequest.setParameter("loginFail","loginFail");
			return new UIView("ui/index.clx");
		}

		HttpSession session = request.getSession();
		session.setAttribute("member", member); // 세션값에 담는작업
		dataRequest.setResponse("ds_member", member); // 데이터 셋이 바인딩

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

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
		System.out.println(result);
		dataRequest.setResponse("ds_member", member); // 데이터 셋이 바인딩

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	
}
