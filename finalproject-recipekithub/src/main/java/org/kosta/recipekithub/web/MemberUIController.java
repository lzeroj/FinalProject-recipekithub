package org.kosta.recipekithub.web;

import java.io.IOException;

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
	
	@RequestMapping("/mypageForm")
	public View findMypageForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		return new UIView("ui/member/mypage-form.clx"); 
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
	
}
