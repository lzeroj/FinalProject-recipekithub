package org.kosta.recipekithub.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MealkitStarScoreMapper {

	void insertMealkitStar(String memberEmail, int mealkitNo, int mealkitStar);

}
