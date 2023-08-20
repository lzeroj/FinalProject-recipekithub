package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.QnAAnswerVO;
import org.kosta.recipekithub.model.vo.QnAVO;

public interface QnAService {

	int insertQnA(String memberEmail, String boardTitle, String boardContent);

	List<QnAVO> selectQnaList();

	QnAVO selectQnaDetail(int boardId);

	int updateQnA(int boardId, String boardTitle, String boardContent);

	List<QnAVO> selectQnaListAdmin();

	QnAVO selectQnaDetailAdmin(int boardId);

	int insertQnAAnswer(QnAAnswerVO answerVO);

	int updateBoardResponseStatus(int boardId);

	QnAAnswerVO selectChkQnAAnswer(int boardId);

}