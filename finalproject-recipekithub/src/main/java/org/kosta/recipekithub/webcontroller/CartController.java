package org.kosta.recipekithub.webcontroller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	
	@RequestMapping("/findMyCartForm")
	public View findMyCartForm(HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {	
		System.out.println("form controller");
		return new UIView("ui/cart/cartForm.clx"); 
	}
	
	@RequestMapping("/selectMyCart")
	public View selectMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		
		MemberVO mvo = new MemberVO();
		mvo.setMemberEmail("shj");
		List<CartVO> myCartInfo = new ArrayList<>();
		if(mvo != null) {
			myCartInfo = cartService.selectMyCart(mvo.getMemberEmail());
			System.out.println(myCartInfo);
			
			// 밀키트 데이터
			List<MealkitboardVO> mlkitlist = new ArrayList<>();
			MealkitboardVO mlvo = null;
			for(int i=0;i<myCartInfo.size();i++) {
				mlvo = new MealkitboardVO();
				mlvo.setMealkitName(myCartInfo.get(i).getMealkitboardVO().getMealkitName());
				mlvo.setMealkitImage(myCartInfo.get(i).getMealkitboardVO().getMealkitImage());
				mlvo.setMealkitPrice(myCartInfo.get(i).getMealkitboardVO().getMealkitPrice());
				mlkitlist.add(mlvo);
			}
			
			// cart_detail 데이터
//			List<Integer> cartDetailQuantity = new ArrayList<>();
//			for(int i=0;i<myCartInfo.size();i++) {
//				cartDetailQuantity.add(myCartInfo.get(i).getCartdetailVO().getCartDetailQuantity());
//			}
			List<CartdetailVO> cartDetailQuantity = new ArrayList<>();
			CartdetailVO cdvo = null;
			for(int i=0;i<myCartInfo.size();i++) {
				cdvo = new CartdetailVO();
				cdvo.setIsChecked(myCartInfo.get(i).getCartdetailVO().getIsChecked());
				cdvo.setCartDetailQuantity(myCartInfo.get(i).getCartdetailVO().getCartDetailQuantity());
				cartDetailQuantity.add(cdvo);
			}
			
			
			Map<String,Object> map = new HashMap<>();
			map.put("cartInfoEtc", mlkitlist);
			map.put("cartDetail",cartDetailQuantity);
			
			dataRequest.setResponse("cartlist", myCartInfo);
			dataRequest.setMetadata(true, map);
		}
		return new JSONDataView();
	}
	
	@RequestMapping("/updateMyCart")
	public View updateMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest, String cartDetailQuantity, String mealkitName) {
//		HttpSession session = request.getSession(false);
//		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberEmail("shj");
		if(memberVO != null) {
			// 장바구니 번호 조회
			CartVO cvo = cartService.findCartNoByMemberEmail(memberVO.getMemberEmail());
			// 밀키트 번호 조회
			MealkitboardVO mlvo = cartService.findMealkitBoardByMealkitName(mealkitName);
			// 수량 업데이트
			cartService.updateCart(cvo.getCartNo(), mlvo.getMealkitNo(), Integer.parseInt(cartDetailQuantity));
		}
		return new JSONDataView();
	}
	
	@RequestMapping("/isCheckedChange")
	public View isCheckedChange(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest,String isCheck,String mealkitName) {
		MealkitboardVO mlvo = cartService.findMealkitBoardByMealkitName(mealkitName);
		cartService.isCheckedChange(isCheck, mlvo.getMealkitNo());
		return new JSONDataView();
	}
	
	@RequestMapping("/deleteMyCart")
	public View deleteMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("selectList");
//		ArrayList<String> list = param.getValue("mealkitName");
		String ary[] = param.getValues("mealkitName");
//		HttpSession session = request.getSession(false);
//		session.getAttribute("member");
		MemberVO mvo = new MemberVO();
		mvo.setMemberEmail("shj");
		
		CartVO cvo = cartService.findCartNoByMemberEmail(mvo.getMemberEmail());
		for(int i=0;i<ary.length;i++) {
			System.out.println(ary[i]);
			MealkitboardVO mlvo = cartService.findMealkitBoardByMealkitName(ary[i]);
			cartService.deleteMyCart(mlvo.getMealkitNo(), cvo.getCartNo());
		} 
		return new JSONDataView();
	}
	
}
