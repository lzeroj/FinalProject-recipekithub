package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.CartMapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.ChartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.SalesVO;
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
	public List<CartVO> findCartNoByMemberEmail(String memberEmail) {
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

	@Override
	public int isCheckedChange(String chkinfo, int mealkitNo) {
		return cartMapper.isCheckedChange(chkinfo,mealkitNo);
	}

	@Override
	public int deleteMyCart(int mealkitNo, int cartNo) {
		return cartMapper.deleteMyCart(mealkitNo,cartNo);
	}

	@Override
	public List<CartVO> findCartNoByMemberEmailOrderSuccess(String memberEmail) {
		return cartMapper.findCartNoByMemberEmailOrderSuccess(memberEmail);
	}

	@Override
	public String findMyCartStatusYN(String memberEmail) {
		return cartMapper.findMyCartStatusYN(memberEmail);
	}

	@Override
	public int creatMyCart(String memberEmail) {
		return cartMapper.creatMyCart(memberEmail);
	}

	@Override
	public int insertMyCartDetail(int mealkitNo, int cartNO, int cartDetailQuantity) {
		return cartMapper.insertMyCartDetail(mealkitNo,cartNO,cartDetailQuantity);
	}

	@Override
	public int findDuplicateMealkitCount(String memberEmail, int mealkitNo) {
		return cartMapper.findDuplicateMealkitCount(memberEmail,mealkitNo);
	}

	@Override
	public int updateCartDetailQuantity(int cartDetailQuantity, int mealkitNo, int cartNo) {
		return cartMapper.updateCartDetailQuantity(cartDetailQuantity,mealkitNo,cartNo);
	}

	@Override
	public List<SalesVO> findSalesRankAdmin() {
		return cartMapper.findSalesRankAdmin();
	}

	@Override
	public List<ChartVO> findTotalLikeRecipe() {
		return cartMapper.findTotalLikeRecipe();
	}

	@Override
	public List<ChartVO> findTotalLikeMealkit() {
		return cartMapper.findTotalLikeMealkit();
	}

}
