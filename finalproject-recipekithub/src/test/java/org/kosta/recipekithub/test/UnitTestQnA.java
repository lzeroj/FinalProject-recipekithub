package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.QnAService;
import org.kosta.recipekithub.model.vo.QnAAnswerVO;
import org.kosta.recipekithub.model.vo.QnAVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class UnitTestQnA {
	@Autowired
	QnAService qnAService;
	
	@Test
	public void insertQnA() {
		String memberEmail = "shj";
		String boardTitle = "오늘 가입했습니다";
		String boardContent = "가입했는데 밀키트 상품을 담을수가 없네요 ㅜㅜ";
		int result = qnAService.insertQnA(memberEmail,boardTitle,boardContent);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void selectQnaList() {
		List<QnAVO> qnAList = qnAService.selectQnaList("shj");
		Assertions.assertEquals(1, qnAList.size());
	}
	
	@Test
	public void selectQnaDetail() {
		int boardId = 4;
		QnAVO qnAVO = qnAService.selectQnaDetail(boardId);
		Assertions.assertNotNull(qnAVO);
	}
	
	@Test
	public void updateQnA() {
		int boardId = 4;
		String boardTitle = "오늘 가입했습니다";
		String boardContent = "가입했는데 밀키트 상품을 담을수가 없네요 ㅜㅜ";
		int result = qnAService.updateQnA(boardId,boardTitle,boardContent);
		Assertions.assertEquals(1, result);
	}
	
	@Test
	public void insertQnAAnswer() {
		int boardId = 5;
		String boardAnswerTitle = "네네 끝났습니다";
		String boardAnswerContent = "끝났어용";
		String answerMember = "shj";
		
		QnAAnswerVO answerVO = new QnAAnswerVO();
		answerVO.setBoardId(boardId);
		answerVO.setAnswerMember(answerMember);
		answerVO.setBoardAnswerTitle(boardAnswerTitle);
		answerVO.setBoardAnswerContent(boardAnswerContent);
		int result = qnAService.insertQnAAnswer(answerVO);
		System.out.println(result);
	}
	
	@Test
	public void selectChkQnAAnswer() {
		int boardId = 8;
		
		QnAAnswerVO answerVO = qnAService.selectChkQnAAnswer(boardId);
		System.out.println(answerVO.toString());
	}

}
