package org.kosta.recipekithub.model.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;

@Mapper
public interface MealkitStarScoreMapper {

	void insertMealkitStar(String memberEmail, int mealkitCommentNo, double mealkitStar);

	List<MealkitStarScore> findMealkitStarList(int mealkitCommentId);
	
	int mealkitStarCnt();

	List<MealkitStarScore> findCommentStarList(long num, RecipeCommentPagination pagination);

	List<MealkitboardVO> findMealkitNoList();

	Optional<Double> findMealkitStarAvg(int num);
}
