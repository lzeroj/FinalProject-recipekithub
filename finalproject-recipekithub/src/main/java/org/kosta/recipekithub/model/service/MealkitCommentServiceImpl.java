package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.MealkitCommentMapper;
import org.kosta.recipekithub.model.vo.MealKitBoard;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;
import org.kosta.recipekithub.model.vo.RecipePagination;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MealkitCommentServiceImpl implements MealkitCommentService {

	private final MealkitCommentMapper mealkitCommentMapper;
	private final MealkitService mealkitService;

	@Override
	public int insertMealkitComment(String mealkitComtent, int mealkitNo, MemberVO member) {
		
		MealKitBoard mealkit= mealkitService.findMealKitByNo(mealkitNo);
		MealkitCommentVO comment = new MealkitCommentVO();
		comment.setMealkitCommentContent(mealkitComtent);
		comment.setMealkitBoard(mealkit);
		comment.setMemberVO(member);
		
		log.info("mealkit = {}", mealkit);
		log.info("comment = {}", comment);
		mealkitCommentMapper.insertMealkitComment(comment);
		log.info("comment = {}", comment);
		
		return comment.getMealkitCommentId();
	}
	
	@Override
	public MealkitCommentVO findCommentByNo(int num) {
		MealkitCommentVO mealkit = mealkitCommentMapper.findCommentByNo(num);
		
		return mealkit;
	}
	
	@Override
	public int updateCommentByNo(MealkitCommentVO mealkit) {
		int updatedMealkit = mealkitCommentMapper.updateCommentByNo(mealkit);
		return updatedMealkit;
	}
	
	
	@Override
	public void deleteMealkitComment(int commentNo) {
		mealkitCommentMapper.deleteComment(commentNo);
		
	}
	
	@Override
	public List<MealkitCommentVO> findCommentListByMealkit(long num, RecipeCommentPagination pagination) {
		return mealkitCommentMapper.findCommentListByMealkit(num, pagination);
	}
	
	@Override
	public int mealkitCommentCnt(long mealkitNo) {
		return mealkitCommentMapper.mealkitCommentCnt(mealkitNo);
	}
}
