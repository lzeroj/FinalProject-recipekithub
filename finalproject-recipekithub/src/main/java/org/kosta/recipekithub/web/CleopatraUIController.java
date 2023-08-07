package org.kosta.recipekithub.web;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;
import com.cleopatra.ui.PageGenerator;


@Controller
public class CleopatraUIController {
	Logger log = LoggerFactory.getLogger(getClass());
	public CleopatraUIController() {

	}

	@PostConstruct
	private void initPageGenerator() throws IOException {
		PageGenerator instance = PageGenerator.getInstance();
		instance.setURLSuffix(".clx");
	}

	@RequestMapping("/**/*.clx")
	public View index(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		return new UIView();
	}
	
}