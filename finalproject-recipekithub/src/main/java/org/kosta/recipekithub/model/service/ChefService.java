package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.vo.ChefVO;

public interface ChefService {

	List<ChefVO> findChefListByRecipe();

}