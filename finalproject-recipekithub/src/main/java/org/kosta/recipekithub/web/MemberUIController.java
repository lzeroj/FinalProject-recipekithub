package org.kosta.recipekithub.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MemberService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/memberUI")
public class MemberUIController {
	private final MemberService memberService;
	
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
