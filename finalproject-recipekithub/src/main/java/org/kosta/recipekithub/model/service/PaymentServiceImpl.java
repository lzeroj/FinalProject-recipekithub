package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.exception.NotEnoughStockException;
import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.mapper.PaymentMapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

	private final PaymentMapper paymentMapper;
	private final CartMapper cartMapper;
	
	@Override // Exception 을 통한 재고처리 구현
	@Transactional
	public int paymentInsert(int paymentTotal, int cartNo) throws NotEnoughStockException {
		System.out.println("paymentInsert PaymentServiceImpl 진입");
		List<CartVO> cartlist = cartMapper.mealkitQuantityComparisonByCart(cartNo);
		for(int i=0;i<cartlist.size();i++) {
			int cartQuantity = cartlist.get(i).getCartdetailVO().getCartDetailQuantity();
			System.out.println("cartQuantity : "+cartQuantity);
			int mealkitInventory = cartlist.get(i).getMealkitboardVO().getMealkitInventory();
			System.out.println("mealkitInventory : "+mealkitInventory);
			if(cartQuantity > mealkitInventory) {
				throw new NotEnoughStockException("재고수량이 충분하지 않습니다");
			}else {
				System.out.println("업데이트 성공");
				mealkitInventoryUpdate(cartlist.get(i).getMealkitboardVO().getMealkitNo(), cartQuantity);
				System.out.println(cartlist.get(i).getMealkitboardVO().getMealkitNo());
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

}
