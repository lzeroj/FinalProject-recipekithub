package org.kosta.recipekithub.webcontroller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.RecipeCommentService;
import org.kosta.recipekithub.model.vo.RecipeCommentVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class RecipeCommentController {

	private final RecipeCommentService recipeCommentService;

	@RequestMapping("/recipeCommentList")
	public View findRecipeCommentListByRecipeId(HttpServletRequest request, HttpServletResponse response,
			DataRequest dataRequest) throws IOException {
		ParameterGroup initParam = dataRequest.getParameterGroup("dmRecipeBoardId");
		long recipeBoardId = Long.parseLong(initParam.getValue("recipeBoardId"));
		System.out.println(recipeBoardId);
		List<RecipeCommentVO> list = recipeCommentService.findCommentListByRecipeId(recipeBoardId);
		System.out.println(list);
		dataRequest.setResponse("recipeCommentList", list);
		return new JSONDataView();
	}

	@RequestMapping("/deleteRecipeComment")
	public View deleteRecipeComment(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws IOException {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("비인증");
			return new UIView("/ui/index.clx");
		}
		ParameterGroup initParam = dataRequest.getParameterGroup("dmRecipeCommentId");
		long recipeCommentId = Long.parseLong(initParam.getValue("recipeCommentId"));
		recipeCommentService.deleteRecipeCommentByCommentId(recipeCommentId);
		return new JSONDataView();
	}  
}
