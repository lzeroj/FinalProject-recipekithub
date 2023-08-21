package org.kosta.recipekithub.test;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.kosta.recipekithub.model.service.ChefService;
import org.kosta.recipekithub.model.vo.ChefVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UnitTestChef {
	@Autowired
	ChefService chefService;
	
	@Test
	public void findChefListByRecipe() {
		List<ChefVO> chefList = chefService.findChefListByRecipe();
		for(int i=0;i<chefList.size();i++) {
			System.out.println(chefList.get(i).toString());
		}
	}
}
