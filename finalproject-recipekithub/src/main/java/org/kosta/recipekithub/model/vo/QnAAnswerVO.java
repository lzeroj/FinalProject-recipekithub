package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QnAAnswerVO {
	private int boardId;
	private String boardAnswerTitle;
	private String boardAnswerContent;
	private String boardAnswerRegDate;
	private String boardAnswerEditDate;
	private String boardType;
	private String answerMember;
}
