package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.LikeMapper;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
	
	private final LikeMapper likeMapper;

	@Override
	public int showLike(String memberEmail, int mealkitNo) {
		return likeMapper.showLike(memberEmail,mealkitNo);
	}

	@Override
	public int insertLike(int mealkitNo, String memberEmail) {
		return likeMapper.insertLike(mealkitNo,memberEmail);
	}

	@Override
	public int deleteLike(int mealkitNo, String memberEmail) {
		return likeMapper.deleteLike(mealkitNo,memberEmail);
	}

	@Override
	public List<MealkitboardVO> findMealkitLikeList(String memberEmail) {
		return likeMapper.findMealkitLikeList(memberEmail);
	}

	@Override
	public int countRecipeLikeList(int recipeBoardId) {
		return likeMapper.countRecipeLikeList(recipeBoardId);
	}

	@Override
	public int insertRecipeLike(int recipeBoardId, String memberEmail) {
		return likeMapper.insertRecipeLike(recipeBoardId,memberEmail);
	}

	@Override
	public int deleteRecipeLike(int recipeBoardId, String memberEmail) {
		return likeMapper.deleteRecipeLike(recipeBoardId,memberEmail);
	}

	@Override
	public int showRecipeLike(int recipeBoardId, String memberEmail) {
		return likeMapper.showRecipeLike(recipeBoardId,memberEmail);
	}

	@Override
	public List<RecipeBoardVO> findRecipeLikeList(String memberEmail) {
		return likeMapper.findRecipeLikeList(memberEmail);
	}


}
