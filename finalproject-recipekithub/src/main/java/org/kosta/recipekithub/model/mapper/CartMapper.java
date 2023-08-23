package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.CartVO;
import org.kosta.recipekithub.model.vo.ChartVO;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.SalesVO;

@Mapper
public interface CartMapper {

	int insertCart();

	List<CartVO> selectMyCart(String memberEmail);

	int updateCart(int cartNo, int mealkiitNo, int cartDetailQuantity);

	CartVO findCartNoByMemberEmail(String memberEmail);

	MealkitboardVO findMealkitBoardByMealkitName(String mealkitName);

	List<CartVO> mealkitQuantityComparisonByCart(int cartNo);

	int isCheckedChange(String chkinfo, int mealkitNo);

	int deleteMyCart(int mealkitNo, int cartNo);

	List<CartVO> findCartNoByMemberEmailOrderSuccess(String memberEmail);

	String findMyCartStatusYN(String memberEmail);

	int creatMyCart(String memberEmail);

	int insertMyCartDetail(int mealkitNo, int cartNO, int cartDetailQuantity);

	int findDuplicateMealkitCount(String memberEmail, int mealkitNo);

	int updateCartDetailQuantity(int cartDetailQuantity, int mealkitNo, int cartNo);

	List<SalesVO> findSalesRankAdmin();

	List<ChartVO> findTotalLikeRecipe();

	List<ChartVO> findTotalLikeMealkit();

}
