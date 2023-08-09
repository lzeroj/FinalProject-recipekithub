package org.kosta.recipekithub.webcontroller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;
import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.service.PaymentService;
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
public class PaymentController {

	private final PaymentService paymentService;
	private final CartService cartService;
	
	@RequestMapping("/paymentInsert")
	public View paymentInsert(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest, int totalpay) {
//		HttpSession session = request.getSession(false);
//		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberEmail("shj");
		if(memberVO != null) {
			// 멤버의 활성화된 카트를 가져온다
			CartVO cvo = cartService.findCartNoByMemberEmail(memberVO.getMemberEmail());
			Map<String,Object> errormsg = new HashMap<>();
			try {
				paymentService.paymentInsert(totalpay, cvo.getCartNo());
				errormsg.put("errormsg", "success");
				Map<String,Object> message = new HashMap<>();
				message.put("insertInfo", "success");
				dataRequest.setMetadata(true, message);
			} catch (NotEnoughStockException e) {
				e.printStackTrace();
				String message = e.getMessage();
				
				
				errormsg.put("errormsg", message);
				
			}
			dataRequest.setMetadata(true, errormsg);
		}
		return new JSONDataView();
	}
	
}
