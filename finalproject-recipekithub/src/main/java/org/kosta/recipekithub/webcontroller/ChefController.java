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
		for(int i=0;i<chefList.size();i++) {
			System.out.println(chefList.get(i).toString());
		}
		dataRequest.setResponse("chefList", chefList);
		return new JSONDataView();
	}
}
