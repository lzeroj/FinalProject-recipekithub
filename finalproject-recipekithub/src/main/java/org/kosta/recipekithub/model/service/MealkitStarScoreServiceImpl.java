package org.kosta.recipekithub.model.service;

import org.kosta.recipekithub.model.mapper.MealkitStarScoreMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MealkitStarScoreServiceImpl implements MealkitStarScoreService {

	private final MealkitStarScoreMapper mealkitStarScoreMapper; 
	
	@Override
	public void insertMealkitStar(String email, int mealkitNo, int mealkitStar) {
		mealkitStarScoreMapper.insertMealkitStar(email, mealkitNo, mealkitStar);
		
	}
	
}
