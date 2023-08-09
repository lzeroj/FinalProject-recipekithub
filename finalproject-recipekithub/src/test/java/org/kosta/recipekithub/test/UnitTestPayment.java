package org.kosta.recipekithub.test;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.PaymentService;
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
	
}
