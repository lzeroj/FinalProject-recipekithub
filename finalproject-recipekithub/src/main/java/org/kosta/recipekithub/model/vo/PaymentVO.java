package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVO {
	private int paymentId;
	private String paymentDate;
	private String paymentState;
	private int paymentTotal;
	private CartVO cartVO;
	private MealkitboardVO mealkitVO;
	private CartdetailVO cartdetailVO;
	
}
