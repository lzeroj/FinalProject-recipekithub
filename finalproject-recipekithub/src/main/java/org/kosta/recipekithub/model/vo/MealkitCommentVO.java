package org.kosta.recipekithub.model.vo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MealkitCommentVO {

	private int mealkitCommentId;
	private MealKitBoard mealkitBoard;
	private MemberVO memberVO;
	private String mealkitCommentContent;
	private String mealkitCommentDate;
	private String mealkitCommentEditDate;
	
	//별점 평균을 위한
	//private double mealkitStarAvg;
}
