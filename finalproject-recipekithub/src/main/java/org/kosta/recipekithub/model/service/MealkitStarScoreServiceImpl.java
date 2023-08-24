package org.kosta.recipekithub.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.print.attribute.HashAttributeSet;

import org.kosta.recipekithub.model.mapper.MealkitStarScoreMapper;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MealkitStarScoreServiceImpl implements MealkitStarScoreService {

	private final MealkitStarScoreMapper mealkitStarScoreMapper;
	private final MealkitCommentService mealkitCommentService;
	
	@Override
	public void insertMealkitStar(String email, int mealkitCommentNo, double mealkitStar) {
		mealkitStarScoreMapper.insertMealkitStar(email, mealkitCommentNo, mealkitStar);
		
	}
	
	@Override
	public double findMealkitStarList(int mealkitCommentId) { //평균을 구하기 위한 double
		List<MealkitStarScore> list= mealkitStarScoreMapper.findMealkitStarList(mealkitCommentId);
		double num = 0;
		for(MealkitStarScore star : list) {
			num += star.getMealkitStarScore();
		}
		
		int cnt = mealkitCommentService.mealkitCommentCnt(mealkitCommentId);
		double avg = num / cnt;
		double result = Math.round(avg * 10.0) / 10.0;
		return result;
	}
	
	@Override
	public List<MealkitStarScore> findCommentStarList(int num) {
		return mealkitStarScoreMapper.findCommentStarList(num);
	}

	@Override
	public List<MealkitboardVO> findMealkitNoList() {
		return mealkitStarScoreMapper.findMealkitNoList();
	}
	
	@Override
	public double findMealkitStarAvg(int num) {
		double avg = mealkitStarScoreMapper.findMealkitStarAvg(num);
		return avg;
	}

}
