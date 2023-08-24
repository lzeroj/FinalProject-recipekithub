package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;
import org.kosta.recipekithub.model.vo.MealkitboardVO;

@Mapper
public interface MealkitStarScoreMapper {

	void insertMealkitStar(String memberEmail, int mealkitCommentNo, double mealkitStar);

	List<MealkitStarScore> findMealkitStarList(int mealkitCommentId);
	
	int mealkitStarCnt();

	List<MealkitStarScore> findCommentStarList(long num, RecipeCommentPagination pagination);
	List<MealkitStarScore> findCommentStarList(int num);

	List<MealkitboardVO> findMealkitNoList();
}
