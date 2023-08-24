package org.kosta.recipekithub.model.service;

import java.util.List;
import java.util.Map;

import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;

public interface MealkitStarScoreService {

	 void insertMealkitStar(String email, int mealkitNo, double mealkitStar);

	 double findMealkitStarList(int mealkitCommentId);
	 
	 //int mealkitStarCnt();
	 
	 //List<MealkitStarScore> findCommentStarList(int num);
	 
	 List<MealkitboardVO> findMealkitNoList();	
		
	 double findMealkitStarAvg(int num);

	List<MealkitStarScore> findCommentStarList(long num, RecipeCommentPagination pagination);
}
