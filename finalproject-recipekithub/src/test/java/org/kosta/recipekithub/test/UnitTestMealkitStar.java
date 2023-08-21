package org.kosta.recipekithub.test;

import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.MealkitStarScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UnitTestMealkitStar {

	@Autowired
	MealkitStarScoreService mealkitStarScoreService;
	
	@Test
	void insertStar() {
		String memberEmail = "helloajax";
		//mealkitStarScoreService.insertMealkitStar(memberEmail, mealkitNo, mealkitStar);
	}
}
