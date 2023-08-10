package org.kosta.recipekithub.model.service;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;

public interface PaymentService {

	int paymentInsert(int paymentTotal, int cartNo) throws NotEnoughStockException;

	int mealkitInventoryUpdate(int cartNo, int cartQuantity);

	int updateCartOrderStatus();

}