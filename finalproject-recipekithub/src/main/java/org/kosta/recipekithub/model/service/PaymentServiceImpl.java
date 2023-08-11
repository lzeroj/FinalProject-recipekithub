package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;
import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.mapper.PaymentMapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.CartdetailVO;
import org.kosta.recipekithub.model.vo.PaymentVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final PaymentMapper paymentMapper;
	private final CartMapper cartMapper;
	
	@Override // Exception 을 통한 재고처리 구현
	@Transactional
	public int paymentInsert(int paymentTotal, int cartNo) throws NotEnoughStockException {
		List<CartVO> cartlist = cartMapper.mealkitQuantityComparisonByCart(cartNo);
		for(int i=0;i<cartlist.size();i++) {
			int cartQuantity = cartlist.get(i).getCartdetailVO().getCartDetailQuantity();
			System.out.println("cartQuantity : "+cartQuantity);
			int mealkitInventory = cartlist.get(i).getMealkitboardVO().getMealkitInventory();
			System.out.println("mealkitInventory : "+mealkitInventory);
			if(cartQuantity > mealkitInventory) {
				throw new NotEnoughStockException("재고수량이 충분하지 않습니다");
			}else {
				mealkitInventoryUpdate(cartlist.get(i).getMealkitboardVO().getMealkitNo(), cartQuantity);
			}
		}
		return paymentMapper.paymentInsert(paymentTotal,cartNo);
	}

	@Override
	public int mealkitInventoryUpdate(int cartNo, int cartQuantity) {
		return paymentMapper.mealkitInventoryUpdate(cartNo,cartQuantity);
	}

	@Override
	public int updateCartOrderStatus() {
		return paymentMapper.updateCartOrderStatus();
	}

	@Override
	public int updateCartDetailOrderStatus(int cartNO,int mealkitNo) {
		return paymentMapper.updateCartDetailOrderStatus(cartNO,mealkitNo);
	}

	@Override
	public int deleteCartNoneOrder() {
		return paymentMapper.deleteCartNoneOrder();
	}

	@Override
	public List<PaymentVO> findMyPaymentList(String memberEmail) {
		return paymentMapper.findMyPaymentList(memberEmail);
	}

	@Override
	public List<CartdetailVO> findMealkitNameAndCount(String memberEmail, int cartNO, int paymentId) {
		return paymentMapper.findMealkitNameAndCount(memberEmail,cartNO,paymentId);
	}

}
