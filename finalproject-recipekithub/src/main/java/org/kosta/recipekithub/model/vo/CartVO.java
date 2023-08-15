package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartVO {
	private int cartNo;
	private char cartOrderedStatus;
	private int cartTotal;
	private MemberVO memberVO;
	private CartdetailVO cartdetailVO;
	private MealkitboardVO mealkitboardVO;
}
