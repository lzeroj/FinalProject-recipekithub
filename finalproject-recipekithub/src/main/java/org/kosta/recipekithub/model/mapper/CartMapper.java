package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.CartVO;

@Mapper
public interface CartMapper {

	int insertCart();

	List<CartVO> selectMyCart(String memberEmail);

	int updateCart(int cartNo, int mealkiitNo, int cartDetailQuantity);

}
