package org.kosta.recipekithub.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/memberUI")
public class MemberUIController {
	private final MemberService memberService;
	
	@RequestMapping("/loginForm")
	public View findLoginForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		return new UIView("ui/member/login-form.clx"); 
	}
	
	@RequestMapping("/registerForm")
	public View findRegisterForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		return new UIView("ui/member/register-form.clx"); 
	}
	
	@RequestMapping("/profileForm")
	public View findMypageForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		return new UIView("ui/member/profile-form.clx"); 
	}
	
	@RequestMapping("/logout")
	public View logout(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		// Map<String, Object> message = new HashMap<String, Object>();
		
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		
		// message.put("uri", "login/login");
		// dataRequest.setMetadata(true, message);
		
		return new UIView("ui/index.clx");
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
		
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("memberEmail", member.getMemberEmail());
		initParam.put("memberPassword", member.getMemberPassword());
		initParam.put("memberName", member.getMemberName());
		initParam.put("memberNick", member.getMemberNick());
		initParam.put("memberBirthday", member.getMemberBirthday());
		initParam.put("memberPhone", member.getMemberPhone());
		initParam.put("memberAddress", member.getMemberAddress());
		
		System.out.println("map : " + initParam);
		
		return new UIView("ui/member/profile-form.clx", initParam);
	}
}
