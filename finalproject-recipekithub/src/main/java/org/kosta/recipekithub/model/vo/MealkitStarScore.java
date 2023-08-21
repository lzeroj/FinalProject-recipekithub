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
public class MealkitStarScore {
	
	private MemberVO memberVO;
	private MealkitCommentVO mealkitCommentVO;
	private double mealkitStarScore;

}
