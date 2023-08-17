package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeclarationVO {
	private int recipeBoardId;
	private String memberEmail;
	private String reportDate;
	private String reportContent;
	private String declarationType;
	private String reportTitle;
	private int reportCount;
}
