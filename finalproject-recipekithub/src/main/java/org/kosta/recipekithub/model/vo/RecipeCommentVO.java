package org.kosta.recipekithub.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeCommentVO {
	private long recipeCommentId;
	private RecipeBoardVO recipeBoardVO; 
	private MemberVO memberVO;
	private String recipeCommentContent;
	private String recipeCommentDate;
	private String recipeCommentEditDate;
}
   