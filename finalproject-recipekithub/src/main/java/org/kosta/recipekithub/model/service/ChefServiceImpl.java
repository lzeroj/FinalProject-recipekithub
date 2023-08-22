package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.ChefMapper;
import org.kosta.recipekithub.model.vo.ChefVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChefServiceImpl implements ChefService {
	
	private final ChefMapper chefMapper;
	
	@Override
	public List<ChefVO> findChefListByRecipe() {
		return chefMapper.findChefListByRecipe();
	}

	@Override
	public List<ChefVO> findChefRecipeListByMemberEmail(String memberEmail) {
		return chefMapper.findChefRecipeListByMemberEmail(memberEmail);
	}

}
