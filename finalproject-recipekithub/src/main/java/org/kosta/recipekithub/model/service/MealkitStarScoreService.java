package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealkitStarScore;

public interface MealkitStarScoreService {

	 void insertMealkitStar(String email, int mealkitNo, double mealkitStar);

	 double findMealkitStarList(int mealkitCommentId);
	 
	 //int mealkitStarCnt();
}
