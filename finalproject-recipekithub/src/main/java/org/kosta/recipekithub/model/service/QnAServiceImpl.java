package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.QnAMapper;
import org.kosta.recipekithub.model.vo.QnAAnswerVO;
import org.kosta.recipekithub.model.vo.QnAVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnAServiceImpl implements QnAService {
	
	private final QnAMapper qnAMapper;
	
	@Override
	public int insertQnA(String memberEmail, String boardTitle, String boardContent) {
		return qnAMapper.insertQnA(memberEmail,boardTitle,boardContent);
	}

	@Override
	public List<QnAVO> selectQnaList(String memberEmail) {
		return qnAMapper.selectQnaList(memberEmail);
	}

	@Override
	public QnAVO selectQnaDetail(int boardId) {
		return qnAMapper.selectQnaDetail(boardId);
	}

	@Override
	public int updateQnA(int boardId, String boardTitle, String boardContent) {
		return qnAMapper.updateQnA(boardId,boardTitle,boardContent);
	}

	@Override
	public List<QnAVO> selectQnaListAdmin() {
		return qnAMapper.selectQnaListAdmin();
	}

	@Override
	public QnAVO selectQnaDetailAdmin(int boardId) {
		return qnAMapper.selectQnaDetailAdmin(boardId);
	}

	@Override
	public int insertQnAAnswer(QnAAnswerVO answerVO) {
		return qnAMapper.insertQnAAnswer(answerVO);
	}

	@Override
	public int updateBoardResponseStatus(int boardId) {
		return qnAMapper.updateBoardResponseStatus(boardId);
	}

	@Override
	public QnAAnswerVO selectChkQnAAnswer(int boardId) {
		return qnAMapper.selectChkQnAAnswer(boardId);
	}

}
