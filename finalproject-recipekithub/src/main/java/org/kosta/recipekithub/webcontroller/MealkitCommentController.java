package org.kosta.recipekithub.webcontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MealkitCommentService;
import org.kosta.recipekithub.model.vo.MealkitCommentVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@PostMapping("/insertComment")
	public View insertMealkitComment(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		
		ParameterGroup param = dataRequest.getParameterGroup("commentMap");
		String comment = param.getValue("comment");
		int mealkitNo = Integer.parseInt(param.getValue("mealkitNo"));
		
		log.info("comment, mealkitNo = {}, {} ", comment, mealkitNo);
		HttpSession session = request.getSession(false);
		MemberVO member = (MemberVO)session.getAttribute("member");

		int num = mealkitCommentService.insertMealkitComment(comment, mealkitNo, member);
		MealkitCommentVO mealkitComment = mealkitCommentService.findCommentByNo(num);
		dataRequest.setResponse("commentReturn", mealkitComment);
		dataRequest.setResponse("mealkitReturn", mealkitComment.getMealkitBoard().getMealkitNo());
		dataRequest.setResponse("memberReturn", mealkitComment.getMemberVO().getMemberEmail());
		
		/*
		Map<String, Object> initParam = new HashMap<>();
		initParam.put("commentNo", mealkitComment.getCommentId());
		initParam.put("mealkNo", mealkitComment.getMealkitBoard().getMealkitNo());
		initParam.put("memberEmail", mealkitComment.getMember().getMemberEmail());
		initParam.put("commentContent", mealkitComment.getCommentRegDate());
		initParam.put("commentRegDate", mealkitComment.getCommentId());
		initParam.put("commentEditDate", mealkitComment.getCommentEditDate());
		*/
		return new JSONDataView();
	}
	
	@PostMapping("/deleteComment")
	public View deleteMealkitComment(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		return null;
	}
	
	@GetMapping("/commentList")
	public View mealkitList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) {
		ParameterGroup param= dataRequest.getParameterGroup("mealkitNoMap");
		int mealkitNo = Integer.parseInt(param.getValue("mealkitNo"));
		List<MealkitCommentVO> list = mealkitCommentService.findCommentListByMealkit(mealkitNo);
		dataRequest.setResponse("commentListSub", list);
		return new JSONDataView();
	}
}
