package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.PaymentService;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class UnitTestPayment {
	@Autowired
	PaymentService paymentService;
	
	@Test
	public void paymentInsert() {
		int paymentTotal = 5000;
		int cartNo = 2;
//		int result = paymentService.paymentInsert(paymentTotal,cartNo);
//		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void mealkitInventoryUpdate() {
		int cartNo = 2;
		int cartQuantity = 1;
		
		int result = paymentService.mealkitInventoryUpdate(cartNo,cartQuantity);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void updateCartDetailOrderStatus() {
		int cartNO = 2;
		int mealkitNo = 14;
		int result = paymentService.updateCartDetailOrderStatus(cartNO,mealkitNo);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void findMealkitNameAndCount() {
		int cartNO = 3;
		int paymentId = 19;
		String memberEmail = "shj";
		List<CartdetailVO> list = paymentService.findMealkitNameAndCount(memberEmail,cartNO,paymentId);
		Assertions.assertEquals(3, list.size());
	}
	
	@Test
	public void searchMyPaymentList() {
		String combovalue = "mealkitName";
		String inputvalue = "기울어진";
		String memberEmail = "shj";
		List<PaymentVO> list = paymentService.searchMyPaymentList(memberEmail,combovalue,inputvalue);
		Assertions.assertEquals(1, list.size());
	}

	
}
