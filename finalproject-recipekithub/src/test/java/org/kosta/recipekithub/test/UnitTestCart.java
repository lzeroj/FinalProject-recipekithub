package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestCart {
	@Autowired
	CartService cartService; 
	@Autowired
	CartMapper cartMapper;
	
	@Test
	public void selectMyCart() {
		String memberEmail = "shj";
		List<CartVO> cartlist = cartService.selectMyCart(memberEmail);
		System.out.println(cartlist.get(0));
		System.out.println(cartlist.get(1));
		for(int i=0;i<cartlist.size();i++) {
			System.out.println(cartlist.get(i));
		}
		Assertions.assertEquals(2, cartlist.size());
	}
	
	@Test
	public void insertCart() {
		int result = cartService.insertCart();
		System.out.println(result);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void updateCart() {
		int cartNo = 5;
		int mealkiitNo = 70;
		int cartDetailQuantity = 3;
		int result = cartService.updateCart(cartNo,mealkiitNo,cartDetailQuantity);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void findCartNoByMemberEmail() {
		String memberEmail = "shj";
		CartVO cartVO = cartService.findCartNoByMemberEmail(memberEmail);
		System.out.println(cartVO.toString());
		Assertions.assertNotNull(cartVO);
	}
	
	@Test
	public void findCartNoByMemberEmailOrderSuccess() {
		String memberEmail = "shj";
		List<CartVO> list = cartService.findCartNoByMemberEmailOrderSuccess(memberEmail);
		Assertions.assertEquals(2,list.size());
	}

	
	@Test
	public void findMealkitBoardByMealkitName() {
		String mealkitName = "로제 떡볶이";
		MealkitboardVO mealkitboardVO = cartService.findMealkitBoardByMealkitName(mealkitName);
		Assertions.assertNotNull(mealkitboardVO);
	}
	
	@Test
	public void mealkitQuantityComparisonByCart() {
		int cartNo = 2;
//		ArrayList<HashMap<String,Integer>> 
		List<CartVO> listcart = cartService.mealkitQuantityComparisonByCart(cartNo);
		for(int i=0;i<listcart.size();i++) {
			System.out.println(listcart.toString());
		}
	}
	
	@Test
	public void ttss(){
		int cartNo = 2;
		List<CartVO> cartlist = cartMapper.mealkitQuantityComparisonByCart(cartNo);
		for(int i=0;i<cartlist.size();i++) {
			System.out.println(cartlist.toString());
		}
	}
	
	@Test
	public void isCheckedChange() {
		int result = 0;
		int mealkitNo = 1;
		String chkinfo = "N";
		if(chkinfo == "N") {
			chkinfo = "Y";
			result = cartService.isCheckedChange(chkinfo,mealkitNo);
		}else { // chkbox==false
			chkinfo = "N";
			result = cartService.isCheckedChange(chkinfo,mealkitNo);
		}
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void deleteMyCart() {
		int mealkitNo = 14;
		int cartNo = 2;
		int result = cartService.deleteMyCart(mealkitNo,cartNo);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void creatMyCart() {
		String memberEmail = "shj"; //로그인한 멤버 이메일
		String cartN1o = cartService.findMyCartStatusYN(memberEmail);
		
		// 만약 카트에 값이 있으면 cartNO 반환
		int cartNO = 0;
		if(cartN1o != null) {		
			cartNO = Integer.parseInt(cartN1o);
		}
		int mealkitNo = 70; //밀키트 번호
		int cartDetailQuantity = 1; //밀키트 수량
		
		int resultDetail = 0;
		if(cartN1o == null) {
			int createresult = cartService.creatMyCart(memberEmail);
			if(createresult == 1) {
				// 생성한뒤 cartNO 재조회
				cartNO =  Integer.parseInt(cartService.findMyCartStatusYN(memberEmail));
				
				// 활성화된 카트에 주문하려는 해당 밀키트가 존재하는지 확인한다
				int duplicatecount = cartService.findDuplicateMealkitCount(memberEmail,mealkitNo);
				if(duplicatecount == 1) {
					resultDetail = cartService.updateCart(cartDetailQuantity,mealkitNo,cartNO);
				}else {
					// 밀키트 주문
					resultDetail = cartService.insertMyCartDetail(mealkitNo,cartNO,cartDetailQuantity);
				}
			}
		}else {
			// 활성화된 카트에 주문하려는 해당 밀키트가 존재하는지 확인한다
			int duplicatecount = cartService.findDuplicateMealkitCount(memberEmail,mealkitNo);
			if(duplicatecount == 1) {
				resultDetail = cartService.updateCart(cartDetailQuantity,mealkitNo,cartNO);
			}else {
				// 밀키트 주문
				resultDetail = cartService.insertMyCartDetail(mealkitNo,cartNO,cartDetailQuantity);
			}
		}
	}
	
	@Test
	public void findDuplicateMealkitCount() {
		String memberEmail = "shj"; //로그인한 멤버 이메일
		int mealkitNo = 177;
		
		int duplicatecount = cartService.findDuplicateMealkitCount(memberEmail,mealkitNo);
		System.out.println(duplicatecount);
	}
	
	@Test
	public void updateCartDetailQuantity() {
		int cartDetailQuantity = 1;
		int mealkitNo = 177;
		int cartNo = 9;
		
		int duplicatecount = cartService.updateCartDetailQuantity(cartDetailQuantity,mealkitNo,cartNo);
		System.out.println(duplicatecount);
	}
}
