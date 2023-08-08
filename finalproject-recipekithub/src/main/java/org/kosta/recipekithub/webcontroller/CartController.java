package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	
	@RequestMapping("/selectMyCart")
	public View selectMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequst) {
		
//		HttpSession session = request.getSession(false);
//		MemberVO mvo = (MemberVO)session.getAttribute("member");
		MemberVO mvo = new MemberVO();
		mvo.setMemberEmail("shj");
		List<CartVO> myCartInfo = new ArrayList<>();
		if(mvo != null) {
			myCartInfo = cartService.selectMyCart(mvo.getMemberEmail());
		}
		
		dataRequst.setResponse("cartlist", myCartInfo);
		
		return new JSONDataView();
	}
	
}
