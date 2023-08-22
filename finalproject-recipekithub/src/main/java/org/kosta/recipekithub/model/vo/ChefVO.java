package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChefVO {
	private String memberEmail;
	private String memberName;
	private String memberNick;
	private String memberImage;
	private int recipeCount;
	private int recipeBoardId;
	private String recipeBoardTitle;
	private String recipeBoardImage;
}
