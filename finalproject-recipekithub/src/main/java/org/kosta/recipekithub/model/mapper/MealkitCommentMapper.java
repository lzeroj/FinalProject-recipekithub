package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;

@Mapper
public interface MealkitCommentMapper {

	int insertMealkitComment(MealkitCommentVO mealkitComment);

	MealkitCommentVO findCommentByNo(int num);

	void deleteComment(int commentNo);

	int updateCommentByNo(MealkitCommentVO mealkit);
	
	List<MealkitCommentVO> findCommentListByMealkit(int num);

	int mealkitCommentCnt(int mealkitNo);

	void increaseMealkitHits(int mealkitNo);


}
