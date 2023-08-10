package org.kosta.recipekithub.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {

	int paymentInsert(int paymentTotal, int cartNo);

	int mealkitInventoryUpdate(int cartNo,int cartQuantity);

	int updateCartOrderStatus();

	int updateCartDetailOrderStatus(int cartNO,int mealkitNo);

	int deleteCartNoneOrder();

}
