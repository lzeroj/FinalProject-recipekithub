package org.kosta.recipekithub.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/memberUI")
public class MemberUIController {
	// private final MemberService memberService;

	// ---[ 로그인 화면으로 이동 ]---//
	@RequestMapping("/loginForm")
	public View findLoginForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		return new UIView("ui/member/login-form.clx");
	}

	// ---[ 회원가입 화면으로 이동 ]---//
	@RequestMapping("/registerForm")
	public View findRegisterForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		return new UIView("ui/member/register-form.clx");
	}

	// ---[ 프로필 조회/수정 화면으로 이동 ]---//
	@RequestMapping("/profileForm")
	public View findMypageForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
		return new UIView("ui/member/profile-form.clx");
	}

}
