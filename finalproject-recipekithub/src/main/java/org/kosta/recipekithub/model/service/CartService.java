package org.kosta.recipekithub.model.service;

import java.util.ArrayList;
import java.util.List;

import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;

public interface CartService {

	int insertCart();

	List<CartVO> selectMyCart(String memberEmail);

	int updateCart(int cartNo, int mealkiitNo, int cartDetailQuantity);

	CartVO findCartNoByMemberEmail(String memberEmail);

	MealkitboardVO findMealkitBoardByMealkitName(String mealkitName);

	List<CartVO> mealkitQuantityComparisonByCart(int cartNo);

}