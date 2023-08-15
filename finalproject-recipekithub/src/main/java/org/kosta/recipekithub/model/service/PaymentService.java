package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.PaymentVO;

public interface PaymentService {

	int paymentInsert(int paymentTotal, int cartNo) throws NotEnoughStockException;

	int mealkitInventoryUpdate(int cartNo, int cartQuantity);

	int updateCartOrderStatus();

	int updateCartDetailOrderStatus(int cartNO,int mealkitNo);

	int deleteCartNoneOrder();

	List<PaymentVO> findMyPaymentList(String memberEmail);

	List<CartdetailVO> findMealkitNameAndCount(String memberEmail, int cartNO, int paymentId);

	List<PaymentVO> searchMyPaymentList(String memberEmail,String combovalue, String inputvalue);

}