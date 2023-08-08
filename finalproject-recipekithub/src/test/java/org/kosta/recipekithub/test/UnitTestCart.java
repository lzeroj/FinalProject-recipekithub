package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.CartService;
import org.kosta.recipekithub.model.vo.CartVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestCart {
	@Autowired
	CartService cartService; 
	
	@Test
	public void selectMyCart() {
		String memberEmail = "shj";
		List<CartVO> cartlist = cartService.selectMyCart(memberEmail);
		System.out.println(cartlist.toString());
		Assertions.assertEquals(1, cartlist.size());
	}
	
	@Test
	public void insertCart() {
		int result = cartService.insertCart();
		System.out.println(result);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void updateCart() {
		int cartNo = 2;
		int mealkiitNo = 1;
		int cartDetailQuantity = 3;
		int result = cartService.updateCart(cartNo,mealkiitNo,cartDetailQuantity);
		Assertions.assertEquals(1, result);
	}
}
