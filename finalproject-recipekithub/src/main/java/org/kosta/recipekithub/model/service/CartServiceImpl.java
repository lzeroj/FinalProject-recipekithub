package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
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

	@Override
	public int updateCart(int cartNo, int mealkiitNo, int cartDetailQuantity) {
		return cartMapper.updateCart(cartNo,mealkiitNo,cartDetailQuantity);
	}

	@Override
	public CartVO findCartNoByMemberEmail(String memberEmail) {
		return cartMapper.findCartNoByMemberEmail(memberEmail);
	}

	@Override
	public MealkitboardVO findMealkitBoardByMealkitName(String mealkitName) {
		return cartMapper.findMealkitBoardByMealkitName(mealkitName);
	}

	@Override
	public List<CartVO> mealkitQuantityComparisonByCart(int cartNo) {
		return cartMapper.mealkitQuantityComparisonByCart(cartNo);
	}

}
