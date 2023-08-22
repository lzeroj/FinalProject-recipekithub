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
public class MealKitBoard {

	
	private int mealkitNo;
	private String mealkitName;
	private String mealkitInfo;
	private String mealkitIngredients;
	private int mealkitPrice;
	private String mealkitRegDate;
	private String mealkitEditDate;
	private int mealkitInventory;
	private String mealkitCategory;
	private String mealkitImage;
	private int mealkitBoardHits;
	private MemberVO memberVO;
}
