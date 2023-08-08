package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.CartVO;

public interface CartService {

	int insertCart();

	List<CartVO> selectMyCart(String memberEmail);

}