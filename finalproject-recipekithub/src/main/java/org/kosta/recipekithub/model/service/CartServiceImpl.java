package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
	
	private final CartMapper cartMapper; 
	
	@Override
	public int insertCart() {
		return cartMapper.insertCart();
	}

	@Override
	public List<CartVO> selectMyCart(String memberEmail) {
		return cartMapper.selectMyCart(memberEmail);
	}

}
