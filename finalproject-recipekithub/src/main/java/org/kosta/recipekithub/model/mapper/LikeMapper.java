package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealkitboardVO;

@Mapper
public interface LikeMapper {

	int showLike(String memberEmail, int mealkitNo);

	int insertLike(int mealkitNo, String memberEmail);

	int deleteLike(int mealkitNo, String memberEmail);

	List<MealkitboardVO> findMealkitLikeList(String memberEmail);


}
