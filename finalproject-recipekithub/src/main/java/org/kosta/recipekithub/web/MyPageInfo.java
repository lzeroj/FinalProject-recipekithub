package org.kosta.recipekithub.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

@Controller
public class MyPageInfo {

	@RequestMapping("/findMyPageForm")
	public View findMyCartForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		System.out.println("form controller");
		return new UIView("ui/member/myPage.clx"); 
	}

}
