package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealkitboardVO;

public interface LikeService {

	int showLike(String memberEmail, int mealkitNo);

	int insertLike(int mealkitNo, String memberEmail);

	int deleteLike(int mealkitNo, String memberEmail);

	List<MealkitboardVO> findMealkitLikeList(String memberEmail);


}