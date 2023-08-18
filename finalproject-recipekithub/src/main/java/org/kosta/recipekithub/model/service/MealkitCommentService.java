package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MemberVO;

public interface MealkitCommentService {

	
	int insertMealkitComment(String comment, int mealkitNo, MemberVO member);

	MealkitCommentVO findCommentByNo(int num);
	
	void deleteMealkitComment(int mealkitNo);
	
	int updateCommentByNo(MealkitCommentVO mealkit);
	
	List<MealkitCommentVO> findCommentListByMealkit(int num);
}
