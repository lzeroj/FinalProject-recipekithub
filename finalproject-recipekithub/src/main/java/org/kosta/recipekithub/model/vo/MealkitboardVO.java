package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealkitboardVO {
	private int mealkitNo;
	private String mealkitName;
	private String mealkitInfo;
	private String mealkitIngredients;
	private int mealkitPrice;
	private String mealkitCategory;
	private String mealkitProductionDate;
	private String mealkitExpirationDate;
	private int mealkitInventory;
	private String mealkitImage;
	private MemberVO memberVO;
	private int mealkitStarScore;
}
