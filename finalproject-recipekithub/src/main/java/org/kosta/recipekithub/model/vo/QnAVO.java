package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QnAVO {
	private int boardId;
	private String boardTitle;
	private String boardContent;
	private String boardRegDate;
	private String boardEditDate;
	private String boardType;
	private MemberVO memberVO;
}
