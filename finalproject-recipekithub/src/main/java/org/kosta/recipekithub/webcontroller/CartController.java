package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.ChartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.SalesVO;
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
public class CartController {
	
	private final CartService cartService;
	
	@RequestMapping("/selectMyCart")
	public View selectMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			return new UIView("ui/member/login-form.clx");
		}
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		
		List<CartVO> myCartInfo = new ArrayList<>();
		if(memberVO != null) {
			myCartInfo = cartService.selectMyCart(memberVO.getMemberEmail());
			
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
	
	@RequestMapping("/updateMyCart") //밀키트 이름이 똑같으면 exception 남
	public View updateMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest, String cartDetailQuantity, String mealkitName) {
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			return new UIView("ui/member/login-form.clx");
		}
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
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
		String ary[] = param.getValues("mealkitName");
		
		HttpSession session = request.getSession(false);
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		if(memberVO == null || memberVO.getMemberEmail() == "") {
			return new UIView(("ui/member/index.clx"));
		}
		
		CartVO cvo = cartService.findCartNoByMemberEmail(memberVO.getMemberEmail());
		for(int i=0;i<ary.length;i++) {
			System.out.println(ary[i]);
			MealkitboardVO mlvo = cartService.findMealkitBoardByMealkitName(ary[i]);
			cartService.deleteMyCart(mlvo.getMealkitNo(), cvo.getCartNo());
		} 
		return new JSONDataView();
	}
	
	@RequestMapping("/creatMyCart")
	public View creatMyCart(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("mealkit");
		int mealkitNo = Integer.parseInt(param.getValue("mealkitNo")); //해당 페이지의 밀키트 번호
		int cartDetailQuantity = Integer.parseInt(param.getValue("cartDetailQuantity")); //밀키트 수량
		
		HttpSession session = request.getSession(false);
		if(session == null || session.getAttribute("member") == null) {
			return new UIView("ui/member/login-form.clx");
		}
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String memberEmail = memberVO.getMemberEmail();
		String cartN1o = cartService.findMyCartStatusYN(memberEmail);
		
		// 만약 카트에 값이 있으면 cartNO 반환
		int cartNO = 0;
		if(cartN1o != null) {		
			cartNO = Integer.parseInt(cartN1o);
		}
		
		int resultDetail = 0;
		if(cartN1o == null) {
			int createresult = cartService.creatMyCart(memberEmail);
			if(createresult == 1) {
				// 생성한뒤 cartNO 재조회
				cartNO =  Integer.parseInt(cartService.findMyCartStatusYN(memberEmail));
				
				// 활성화된 카트에 주문하려는 해당 밀키트가 존재하는지 확인한다
				int duplicatecount = cartService.findDuplicateMealkitCount(memberEmail,mealkitNo);
				if(duplicatecount == 1) {
					resultDetail = cartService.updateCartDetailQuantity(cartDetailQuantity,mealkitNo,cartNO);
				}else {
					// 밀키트 주문
					resultDetail = cartService.insertMyCartDetail(mealkitNo,cartNO,cartDetailQuantity);
				}
			}
		}else {
			// 활성화된 카트에 주문하려는 해당 밀키트가 존재하는지 확인한다
			int duplicatecount = cartService.findDuplicateMealkitCount(memberEmail,mealkitNo);
			if(duplicatecount == 1) {
				resultDetail = cartService.updateCartDetailQuantity(cartDetailQuantity,mealkitNo,cartNO);
			}else {
				// 밀키트 주문
				resultDetail = cartService.insertMyCartDetail(mealkitNo,cartNO,cartDetailQuantity);
			}
		}		
		
		Map<String, Object> message = new HashMap<>();
		message.put("resultDetail", resultDetail);
		
		return new JSONDataView(true,message);
	}
	
	// 차트
	@RequestMapping("/findSalesRankAdmin")
	public View findSalesRankAdmin(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		List<SalesVO> salesRankList = cartService.findSalesRankAdmin();
		dataRequest.setResponse("dsmealkitSalesAdmin", salesRankList);
		return new JSONDataView();
	}
	
	@RequestMapping("/findTotalLikeRecipe")
	public View findTotalLikeRecipe(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		List<ChartVO> recipeLikeRankList = cartService.findTotalLikeRecipe();
		dataRequest.setResponse("dsrecipeLikeAdmin", recipeLikeRankList);
		return new JSONDataView();
	}
	
	@RequestMapping("/findTotalLikeMealkit")
	public View findTotalLikeMealkit(HttpServletRequest request,HttpServletResponse response,DataRequest dataRequest) {
		List<ChartVO> mealkitLikeRankList = cartService.findTotalLikeMealkit();
		dataRequest.setResponse("dsmealkitLikeAdmin", mealkitLikeRankList);
		return new JSONDataView();
	}
	
	
	
}
