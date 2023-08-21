package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeBoardVO {
	private long recipeBoardId;
	private MemberVO memberVO;
	private String recipeBoardTitle;
	private String recipeBoardContent;
	private String recipeRegDate;
	private String recipeEditDate;
	private long recipeBoardHits;
	private String categoryType;
	private String categoryIngredients;
	private String categoryMethod;
	private String recipeBoardImage;
	private String memberEmail;
}
