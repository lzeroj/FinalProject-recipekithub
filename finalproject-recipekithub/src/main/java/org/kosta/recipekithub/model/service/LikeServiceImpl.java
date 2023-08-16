package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.LikeMapper;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.springframework.beans.factory.annotation.Autowired;
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


}
