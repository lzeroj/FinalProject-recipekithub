package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.mapper.LikeMapper;
import org.kosta.recipekithub.model.service.LikeService;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UnitTestLike {
	@Autowired
	LikeService likeService;
    @Autowired
    LikeMapper likeMapper; // LikeMapper 인터페이스 주입
	
	
	@Test
	public void showLike() {
		int mealkitNo = 177;
		String memberEmail = "shj";
		int result = likeService.showLike(memberEmail,mealkitNo);
		Assertions.assertEquals(0, result);
	}
	
	@Test
	public void insertLike() {
		int mealkitNo = 177;
		String memberEmail = "shj";

		int result = likeService.insertLike(mealkitNo,memberEmail);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void deleteLike() {
		int mealkitNo = 177;
		String memberEmail = "shj";

		int result = likeService.deleteLike(mealkitNo,memberEmail);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void findMealkitLikeList() {
		String memberEmail = "shj";
		List<MealkitboardVO> mealkitLikeList = likeService.findMealkitLikeList(memberEmail);
		Assertions.assertEquals(1, mealkitLikeList.size());
	}
	
	@Test
	public void countRecipeLikeList() {
		int recipeBoardId = 39;
		int count = likeService.countRecipeLikeList(recipeBoardId);
		System.out.println(count);
	}
	
	@Test
	public void insertRecipeLike() {
		int recipeBoardId = 27;
		String memberEmail = "shj";

		int result = likeService.insertRecipeLike(recipeBoardId,memberEmail);
		Assertions.assertEquals(1, result);
	}

	@Test
	public void deleteRecipeLike() {
		int recipeBoardId = 27;
		String memberEmail = "shj";

		int result = likeService.deleteRecipeLike(recipeBoardId,memberEmail);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void showRecipeLike() {
		int recipeBoardId = 27;
		String memberEmail = "shj";
		int result = likeService.showRecipeLike(recipeBoardId,memberEmail);
		Assertions.assertEquals(0, result);
	}
	
	@Test
	public void findRecipeLikeList() {
		List<RecipeBoardVO> result = likeService.findRecipeLikeList("shj");
		for(int i=0;i<result.size();i++) {
			System.out.println(result.get(i).toString());
		}
	}

}
