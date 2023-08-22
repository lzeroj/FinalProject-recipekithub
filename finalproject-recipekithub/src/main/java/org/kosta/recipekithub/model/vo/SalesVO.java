package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesVO {
	private int mealkitNo;
	private int mealkitTotalPrice;
	private int cartDetailQuantity;
	
}
