package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealkitboardVO;

public interface LikeService {
	// 밀키트 좋아요
	int showLike(String memberEmail, int mealkitNo);

	int insertLike(int mealkitNo, String memberEmail);

	int deleteLike(int mealkitNo, String memberEmail);

	List<MealkitboardVO> findMealkitLikeList(String memberEmail);
	
	// 레시피 좋아요
	int countRecipeLikeList(int recipeBoardId);

	int insertRecipeLike(int recipeBoardId, String memberEmail);

	int deleteRecipeLike(int recipeBoardId, String memberEmail);

	int showRecipeLike(int recipeBoardId, String memberEmail);

}