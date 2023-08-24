package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;

public interface MealkitStarScoreService {

	 void insertMealkitStar(String email, int mealkitNo, double mealkitStar);

	 double findMealkitStarList(int mealkitCommentId);
	 
	 //int mealkitStarCnt();
	 
	 List<MealkitStarScore> findCommentStarList(long mealkitNo, RecipeCommentPagination pagination);
}
