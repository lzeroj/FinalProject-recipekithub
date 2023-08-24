package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;

@Mapper
public interface MealkitCommentMapper {

	int insertMealkitComment(MealkitCommentVO mealkitComment);

	MealkitCommentVO findCommentByNo(int num);

	void deleteComment(int commentNo);

	int updateCommentByNo(MealkitCommentVO mealkit);
	
	List<MealkitCommentVO> findCommentListByMealkit(long num, RecipeCommentPagination pagination);

	int mealkitCommentCnt(long mealkitNo);

	void increaseMealkitHits(int mealkitNo);


}
