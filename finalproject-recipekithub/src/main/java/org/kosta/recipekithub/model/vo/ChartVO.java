package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChartVO {
	//LIKE COUNT CHART RECIPE
	private String recipeBoardTitle;
	private String memberEmail;
	private int recipeLikeCount;
	
	//LIKE COUNT CHART MEALKIT
	private String mealkitName;
	private int mealkitCount;
}
