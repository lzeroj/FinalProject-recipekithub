package org.kosta.recipekithub.webcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MealkitCommentService;
import org.kosta.recipekithub.model.service.MealkitStarScoreService;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MealkitStarScore;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeCommentPagination;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MealkitCommentController {

	private final MealkitCommentService mealkitCommentService;
	private final MealkitStarScoreService mealkitStarScoreService;
	
	@RequestMapping("/insertComment")
	public View insertMealkitComment(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		
		ParameterGroup param = dataRequest.getParameterGroup("commentMap");
		String comment = param.getValue("comment");
		int mealkitNo = Integer.parseInt(param.getValue("mealkitNo"));
		double star = Integer.parseInt(param.getValue("star"));
		log.info("comment, mealkitNo, star = {}, {},{} ", comment, mealkitNo, star);
		HttpSession session = request.getSession(false);
		MemberVO member = (MemberVO)session.getAttribute("member");

		int num = mealkitCommentService.insertMealkitComment(comment, mealkitNo, member);
		mealkitStarScoreService.insertMealkitStar(member.getMemberEmail(), num, star);
		
		MealkitCommentVO mealkitComment = mealkitCommentService.findCommentByNo(num);
		dataRequest.setResponse("commentReturn", mealkitComment);
		dataRequest.setResponse("mealkitReturn", mealkitComment.getMealkitBoard().getMealkitNo());
		dataRequest.setResponse("memberReturn", member.getMemberEmail());
		
		return new JSONDataView();
	}
	
	@RequestMapping("/deleteComment")
	public View deleteMealkitComment(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("commentId");
		int num = Integer.parseInt(param.getValue("mealkitCommentId"));
		log.info("mealkitCommentId 삭제 = ", num);
		mealkitCommentService.deleteMealkitComment(num);
		return new JSONDataView();
	}
	
	@RequestMapping("/commentList")
	public View mealkitList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param= dataRequest.getParameterGroup("commentList");
		long mealkitNo = Long.parseLong(param.getValue("mealkitNo")); //밀키트 게시판 번호
		long mealkitCommentNum = mealkitCommentService.mealkitCommentCnt(mealkitNo);//댓글 개수
		
		ParameterGroup pageParam = dataRequest.getParameterGroup("pageNo");
		String pageNo = pageParam.getValue("pageNo");
		RecipeCommentPagination pagination = null;
		if(pageNo==null) {
			pagination = new RecipeCommentPagination(mealkitCommentNum);   
		}else {
			pagination = new RecipeCommentPagination(mealkitCommentNum,Long.parseLong(pageNo));
		}
		
		List<MealkitCommentVO> list = mealkitCommentService.findCommentListByMealkit(mealkitNo,pagination);
		List<MealkitStarScore> starList= mealkitStarScoreService.findCommentStarList(mealkitNo,pagination);
		
		dataRequest.setResponse("mealkitCommentList", list);
		dataRequest.setResponse("mealkitCommentNum", mealkitCommentNum);
		dataRequest.setResponse("mealkitStarList", starList);
		return new JSONDataView();
	}

}
