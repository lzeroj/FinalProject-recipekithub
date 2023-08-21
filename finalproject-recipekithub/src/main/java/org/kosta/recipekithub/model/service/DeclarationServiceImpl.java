package org.kosta.recipekithub.model.service;

import java.util.List;

import org.kosta.recipekithub.model.mapper.DeclarationMapper;
import org.kosta.recipekithub.model.vo.DeclarationVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DeclarationServiceImpl implements DeclarationService {
	
	private final DeclarationMapper declarationMapper;
	
	@Override
	public int insertDeclaration(DeclarationVO dvo) {
		return declarationMapper.insertDeclaration(dvo);
	}

	@Override
	public List<RecipeBoardVO> selectAllReportList() {
		return declarationMapper.selectAllReportList();
	}

	@Override
	public List<DeclarationVO> selectReportListByRecipeBoardId(int recipeBoardId) {
		return declarationMapper.selectReportListByRecipeBoardId(recipeBoardId);
	}

}
