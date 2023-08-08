package org.kosta.recipekithub.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

@Controller
public class IndexController {
	Logger log = LoggerFactory.getLogger(getClass());
	@RequestMapping("/")
	public View index1(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		log.debug("테스트");
		return new UIView("ui/index.clx"); 
	}
}
