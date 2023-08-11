package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;
import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.service.PaymentService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.PaymentVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class PaymentController {

	private final PaymentService paymentService;
	private final CartService cartService;
	
	@RequestMapping("/paymentInsert")
	public View paymentInsert(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("paymentTotal");
		int totalpay = Integer.parseInt(param.getValue("totalpay"));
		System.out.println(totalpay);
		
		ParameterGroup parammealkit = dataRequest.getParameterGroup("selectList");
		String[] mealkitary = parammealkit.getValues("mealkitName");
		
		for(int i=0;i<mealkitary.length;i++) {
			System.out.println(mealkitary[i]);
		}
		
//		HttpSession session = request.getSession(false);
//		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberEmail("shj");
		if(memberVO != null) {
			// 멤버의 활성화된 카트를 가져온다
			CartVO cvo = cartService.findCartNoByMemberEmail(memberVO.getMemberEmail());
			Map<String,Object> errormsg = new HashMap<>();
			try {
				// payment 테이블에 인서트
				int result = paymentService.paymentInsert(totalpay, cvo.getCartNo());
				if(result == 1) {
				
					// 장바구니 상태 업데이트
					paymentService.updateCartOrderStatus();
					
					// 장바구니 상세보기 업데이트
					for(int i=0; i<mealkitary.length;i++) {
						MealkitboardVO mealkitVO = cartService.findMealkitBoardByMealkitName(mealkitary[i]);
						paymentService.updateCartDetailOrderStatus(cvo.getCartNo(),mealkitVO.getMealkitNo());
					}
					
					// 장바구니 정리 (주문하지 않은 목록 삭제)
					paymentService.deleteCartNoneOrder();
				}
				Map<String,Object> message = new HashMap<>();
				message.put("insertInfo", "success");
				dataRequest.setMetadata(true, message);
				
				errormsg.put("errormsg", "결제가 정상적으로 완료되었습니다");
			} catch (NotEnoughStockException e) {
				e.printStackTrace();
				String message = e.getMessage();
				
				errormsg.put("errormsg", message);
			}
			dataRequest.setMetadata(true, errormsg);
		}
		return new JSONDataView();
	}
	
	@RequestMapping("/findMyPaymentList")
	public View findMyPaymentList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
//		HttpSession session = request.getSession(false);
//		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberEmail("shj");
		
		List<PaymentVO> paymentlist = paymentService.findMyPaymentList(memberVO.getMemberEmail());
		// 밀키트 데이터
		List<MealkitboardVO> sendMealkitInfo = new ArrayList<>();
		MealkitboardVO mlvo = null;
		for(int i=0;i<paymentlist.size();i++) {
			mlvo = new MealkitboardVO();
			mlvo.setMealkitName(paymentlist.get(i).getMealkitVO().getMealkitName());
			mlvo.setMealkitNo(paymentlist.get(i).getMealkitVO().getMealkitNo());
			sendMealkitInfo.add(mlvo);
		}
		
		StringBuilder sb = new StringBuilder();
//		for() {
//			sb.append("음식명 X 갯수");
//		}
		
		
		List<CartdetailVO> senCartDetailInfo = new ArrayList<>();
		CartdetailVO cartdetailVO = null;
		
		Map<String,Object> map = new HashMap<>();
		map.put("sendMealkitInfo", sendMealkitInfo);
		map.put("listmealkitname", map);
		dataRequest.setResponse("myPaymentList", paymentlist);
		dataRequest.setMetadata(true, map);
		return new JSONDataView();
	}
	
}
