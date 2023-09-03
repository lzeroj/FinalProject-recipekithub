package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import com.cleopatra.spring.UIView;

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
		
		ParameterGroup parammealkit = dataRequest.getParameterGroup("selectList");
		String[] mealkitary = parammealkit.getValues("mealkitName");
		
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		MemberVO memberVO = null;
		if(session != null) {
			memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		if(memberVO != null) {
			// 멤버의 활성화된 카트를 가져온다
			List<CartVO> cvo = cartService.findCartNoByMemberEmail(memberEmail);
			Map<String,Object> errormsg = new HashMap<>();
			try {
				// payment 테이블에 인서트
				int result = paymentService.paymentInsert(totalpay, cvo.get(0).getCartNo());
				if(result == 1) {
				
					// 장바구니 상태 업데이트
					paymentService.updateCartOrderStatus();
					
					// 장바구니 상세보기 업데이트
					for(int i=0; i<mealkitary.length;i++) {
						MealkitboardVO mealkitVO = cartService.findMealkitBoardByMealkitName(mealkitary[i]);
						paymentService.updateCartDetailOrderStatus(cvo.get(0).getCartNo(),mealkitVO.getMealkitNo());
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
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		MemberVO memberVO = null;
		if(session != null) {
			memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		List<PaymentVO> paymentlist = paymentService.findMyPaymentList(memberEmail);
		
		// 밀키트 데이터
		List<MealkitboardVO> sendMealkitInfo = new ArrayList<>();
		List<Map<String,Object>> mealkitinfo = new ArrayList<>();
		Map<String,Object> mealkitInfoDetailmap = null;
		
		MealkitboardVO mlvo = null;
		StringBuilder mealkitdetail = null;
		StringBuilder mealkitdetailinfo = null;
		
//		for(int i=0;i<paymentlist.size();i++) {
//			mlvo = new MealkitboardVO();
//			mlvo.setMealkitName(paymentlist.get(i).getMealkitVO().getMealkitName());
//			mlvo.setMealkitNo(paymentlist.get(i).getMealkitVO().getMealkitNo());
//			
//			int cartNO = paymentlist.get(i).getCartVO().getCartNo();
//			int paymentId = paymentlist.get(i).getPaymentId();
//			List<CartdetailVO> mealkitNameAndCount = paymentService.findMealkitNameAndCount(memberVO.getMemberEmail(), cartNO, paymentId);
//			
//			String mealkitName = null;
//			int cartDetailQuantity = 0;
//			for(int j=0; j<mealkitNameAndCount.size(); j++) {
//				mealkitdetail = new StringBuilder();
//				mealkitdetailinfo = new StringBuilder();
//				mealkitInfoDetailmap = new HashMap<>();
//				
//				mealkitName = mealkitNameAndCount.get(j).getMealkitboardVO().getMealkitName();
//				cartDetailQuantity = mealkitNameAndCount.get(j).getCartDetailQuantity();
//				System.out.println(mealkitName+" "+cartDetailQuantity);
//				
//				if(mealkitNameAndCount.size()>1) {
//					mealkitdetailinfo.append(mealkitName+" x "+cartDetailQuantity).append("\n");
//				}else {
//					mealkitdetailinfo.append(mealkitName+" x "+cartDetailQuantity);
//				}
//				mealkitdetail.append(mealkitName+" 외 "+(mealkitNameAndCount.size()-1)+"개");
//				mealkitInfoDetailmap.put("mealkitdetailinfo", mealkitdetailinfo);
//				mealkitInfoDetailmap.put("mealkitdetail", mealkitdetail);
//				
//			    if (j == 0) {
//			        mealkitinfo.add(mealkitInfoDetailmap);
//			    }
////				mealkitinfo.add(mealkitInfoDetailmap);
////				System.out.println("mealkitdetailinfo : "+mealkitdetailinfo);
//			}
//			sendMealkitInfo.add(mlvo);
//		}
		
		for (int i = 0; i < paymentlist.size(); i++) {
		    mlvo = new MealkitboardVO();
		    mlvo.setMealkitName(paymentlist.get(i).getMealkitVO().getMealkitName());
		    mlvo.setMealkitNo(paymentlist.get(i).getMealkitVO().getMealkitNo());

		    int cartNO = paymentlist.get(i).getCartVO().getCartNo();
		    int paymentId = paymentlist.get(i).getPaymentId();
		    List<CartdetailVO> mealkitNameAndCount = paymentService.findMealkitNameAndCount(memberVO.getMemberEmail(), cartNO, paymentId);

		    if (!mealkitNameAndCount.isEmpty()) {
		        mealkitdetail = new StringBuilder();
		        mealkitdetailinfo = new StringBuilder();
		        mealkitInfoDetailmap = new HashMap<>();

		        // Process the first item separately
		        CartdetailVO firstCartItem = mealkitNameAndCount.get(0);
		        String firstMealkitName = firstCartItem.getMealkitboardVO().getMealkitName();
		        int firstCartDetailQuantity = firstCartItem.getCartDetailQuantity();
		        System.out.println(firstMealkitName + " " + firstCartDetailQuantity);

		        mealkitdetailinfo.append(firstMealkitName + " x " + firstCartDetailQuantity);
		        mealkitdetail.append(firstMealkitName + " 외 " + (mealkitNameAndCount.size() - 1) + "개");
		        mealkitInfoDetailmap.put("mealkitdetailinfo", mealkitdetailinfo);
		        mealkitInfoDetailmap.put("mealkitdetail", mealkitdetail);

		        for (int j = 1; j < mealkitNameAndCount.size(); j++) {
		            // Process the rest of the items if any
		            String mealkitName = mealkitNameAndCount.get(j).getMealkitboardVO().getMealkitName();
		            int cartDetailQuantity = mealkitNameAndCount.get(j).getCartDetailQuantity();
//		            System.out.println(mealkitName + " " + cartDetailQuantity);

		            mealkitdetailinfo.append("\n" + mealkitName + " x " + cartDetailQuantity);
		            mealkitInfoDetailmap.put("mealkitdetail", mealkitdetail);
		        }

		        mealkitinfo.add(mealkitInfoDetailmap);
		    }

		    sendMealkitInfo.add(mlvo);
		}
		
		Map<String,Object> map = new HashMap<>();
		map.put("sendMealkitInfo", sendMealkitInfo);
		map.put("mealkitinfoString", mealkitinfo);
		dataRequest.setResponse("myPaymentList", paymentlist);
		dataRequest.setMetadata(true, map);
		return new JSONDataView();
	}
	
	@RequestMapping("/searchMyPaymentList")
	public View searchMyPaymentList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest,String inputvalue, String combovalue) {
		System.out.println(inputvalue+" "+combovalue);
		
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		MemberVO memberVO = null;
		if(session != null) {
			memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		String memberId = memberVO.getMemberEmail();
		
		// 검색하기
		List<PaymentVO> searchList = paymentService.searchMyPaymentList(memberId, combovalue, inputvalue);

		// 밀키트 데이터
		List<MealkitboardVO> sendMealkitInfo = new ArrayList<>();
		List<Map<String,Object>> mealkitinfo = new ArrayList<>();
		Map<String,Object> mealkitInfoDetailmap = null;
		
		MealkitboardVO mlvo = null;
		StringBuilder mealkitdetail = null;
		StringBuilder mealkitdetailinfo = null;
		
		for(int i=0;i<searchList.size();i++) {
			mlvo = new MealkitboardVO();
			mlvo.setMealkitName(searchList.get(i).getMealkitVO().getMealkitName());
			mlvo.setMealkitNo(searchList.get(i).getMealkitVO().getMealkitNo());
			
			String mealkitName = null;
			int cartDetailQuantity = 0;
			for(int j=0; j<searchList.size(); j++) {
				mealkitdetail = new StringBuilder();
				mealkitdetailinfo = new StringBuilder();
				mealkitInfoDetailmap = new HashMap<>();
				
				mealkitName = searchList.get(j).getMealkitVO().getMealkitName();
				cartDetailQuantity = searchList.get(j).getCartdetailVO().getCartDetailQuantity();
				System.out.println(mealkitName+" "+cartDetailQuantity);
				
				if(searchList.size()>1) {
					mealkitdetailinfo.append(mealkitName+" x "+cartDetailQuantity).append("\n");
				}else {
					mealkitdetailinfo.append(mealkitName+" x "+cartDetailQuantity);
				}
				mealkitdetail.append(mealkitName+" 외 "+(searchList.size()-1)+"개");
				mealkitInfoDetailmap.put("mealkitdetailinfo", mealkitdetailinfo);
				mealkitInfoDetailmap.put("mealkitdetail", mealkitdetail);
				mealkitinfo.add(mealkitInfoDetailmap);
			}
			sendMealkitInfo.add(mlvo);
		}
		
		Map<String,Object> map = new HashMap<>();
		map.put("sendMealkitInfo", sendMealkitInfo);
		map.put("mealkitinfoString", mealkitinfo);
		dataRequest.setResponse("myPaymentList", searchList);
		dataRequest.setMetadata(true, map);
		
		dataRequest.setResponse("searchList", searchList);
		
		return new JSONDataView();
	}
	
}
