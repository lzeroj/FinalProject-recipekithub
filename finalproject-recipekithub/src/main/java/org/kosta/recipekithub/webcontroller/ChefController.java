package org.kosta.recipekithub.webcontroller;

import java.util.List;

import org.kosta.recipekithub.model.service.ChefService;
import org.kosta.recipekithub.model.vo.ChefVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChefController {
	private final ChefService chefService;
	
	@RequestMapping("/findChefListByRecipe")
	public View findChefListByRecipe(DataRequest dataRequest) {
		List<ChefVO> chefList = chefService.findChefListByRecipe();
		dataRequest.setResponse("chefList", chefList);
		return new JSONDataView();
	}

	@RequestMapping("/findChefRecipeListByMemberEmail")
	public View findChefRecipeListByMemberEmail(DataRequest dataRequest,String memberEmail) {
		List<ChefVO> recipeList = chefService.findChefRecipeListByMemberEmail(memberEmail);
		dataRequest.setResponse("recipeList", recipeList);
		return new JSONDataView();
	}

}
