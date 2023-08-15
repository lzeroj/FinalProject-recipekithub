package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.PaymentVO;

@Mapper
public interface PaymentMapper {

	int paymentInsert(int paymentTotal, int cartNo);

	int mealkitInventoryUpdate(int cartNo,int cartQuantity);

	int updateCartOrderStatus();

	int updateCartDetailOrderStatus(int cartNO,int mealkitNo);

	int deleteCartNoneOrder();

	List<PaymentVO> findMyPaymentList(String memberEmail);

	List<CartdetailVO> findMealkitNameAndCount(String memberEmail, int cartNO, int paymentId);

	List<PaymentVO> searchMyPaymentList(String memberEmail, String combovalue, String inputvalue);

}
