package org.kosta.recipekithub.model.service;

import java.util.List;
import java.util.Map;

import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;

public interface MealkitCommentService {

	
	int insertMealkitComment(String comment, int mealkitNo, MemberVO member);

	MealkitCommentVO findCommentByNo(int num);
	
	void deleteMealkitComment(int mealkitNo);
	
	int updateCommentByNo(MealkitCommentVO mealkit);
	
	List<MealkitCommentVO> findCommentListByMealkit(long mealkitNo, RecipeCommentPagination pagination);

	int mealkitCommentCnt(long mealkitNo);

	//long updateHits(int mealkitNo);

}
