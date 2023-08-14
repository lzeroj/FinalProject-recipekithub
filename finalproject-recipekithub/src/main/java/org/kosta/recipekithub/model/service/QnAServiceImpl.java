package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.QnAMapper;
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
	public List<QnAVO> selectQnaList() {
		return qnAMapper.selectQnaList();
	}

	@Override
	public QnAVO selectQnaDetail(int boardId) {
		return qnAMapper.selectQnaDetail(boardId);
	}

	@Override
	public int updateQnA(int boardId, String boardTitle, String boardContent) {
		return qnAMapper.updateQnA(boardId,boardTitle,boardContent);
	}

}
