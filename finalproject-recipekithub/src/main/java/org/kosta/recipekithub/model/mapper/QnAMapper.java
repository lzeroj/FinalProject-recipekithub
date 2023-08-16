package org.kosta.recipekithub.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.kosta.recipekithub.model.vo.QnAVO;

@Mapper
public interface QnAMapper {

	int insertQnA(String memberEmail, String boardTitle, String boardContent);

	List<QnAVO> selectQnaList();

	QnAVO selectQnaDetail(int boardId);

	int updateQnA(int boardId, String boardTitle, String boardContent);

}