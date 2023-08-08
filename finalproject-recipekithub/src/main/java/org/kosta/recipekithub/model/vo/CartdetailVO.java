package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartdetailVO {
	private CartVO cartVO;
	private MealkitboardVO mealkitboardVO;
	private int cartDetailQuantity;
}
