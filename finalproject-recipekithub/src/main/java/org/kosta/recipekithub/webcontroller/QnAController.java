package org.kosta.recipekithub.webcontroller;

import org.kosta.recipekithub.model.service.QnAService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class QnAController {
	private final QnAService qnAService;
	
	@RequestMapping("/insertQnaForm")
	public View insertQnaForm() {
		return new UIView("ui/embedded/myPageQnARegisterForm.clx");
	}
	
	
}
