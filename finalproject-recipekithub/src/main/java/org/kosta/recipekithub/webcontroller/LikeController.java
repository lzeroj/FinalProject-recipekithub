package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.LikeService;
import org.kosta.recipekithub.model.vo.MealkitboardVO;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.RecipeBoardVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LikeController {
	private final LikeService likeService;
	
	// 페이지 로드시 좋아요 표시 출력
	@RequestMapping("/showLike")
	public View showLike(HttpServletRequest request,DataRequest dataRequest,int mealkitNo) {
		
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		int result = 0;
		if(session != null) {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
			result = likeService.showLike(memberEmail, mealkitNo);
		}else {
			result = 0;
		}
		Map<String,Object> message = new HashMap<>();
		message.put("likeresult", result);
		dataRequest.setMetadata(true, message);
		return new JSONDataView();
	}
	
	@RequestMapping("/clickLike")
	public View clickLike(HttpServletRequest request,DataRequest dataRequest,int mealkitNo) {
		
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		if(session != null) {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		System.out.println("mealkitNo : "+mealkitNo);
		int result = likeService.showLike(memberEmail, mealkitNo);
		if(result == 0) {
			likeService.insertLike(mealkitNo, memberEmail);
			result = 1;
		}else {
			likeService.deleteLike(mealkitNo, memberEmail);
			result = 0;
		}
		
		Map<String,Object> message = new HashMap<>();
		message.put("likeresult", result);
		dataRequest.setMetadata(true, message);
		return new JSONDataView();
	}
	
	@RequestMapping("/findMealkitLikeList")
	public View findMealkitLikeList(HttpServletRequest request,DataRequest dataRequest) {
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		if(session != null) {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		
		// 밀키트 찜 리스트 출력
		List<MealkitboardVO> mllist = likeService.findMealkitLikeList(memberEmail);
		List<Integer> likeresult = new ArrayList<>();
		int result = 0;
		
		List<MemberVO> memlist = new ArrayList<>();
		MemberVO mvo = null;
		for(int i=0;i<mllist.size();i++) {
			result = likeService.showLike(memberEmail,mllist.get(i).getMealkitNo());
			likeresult.add(result);
			
			mvo = new MemberVO();
			mvo.setMemberEmail(mllist.get(i).getMemberVO().getMemberEmail());
			memlist.add(mvo);
		}
		Map<String,Object> message = new HashMap<>();
		message.put("mealLikeList", memlist);
		message.put("likeYN", likeresult);
		
		dataRequest.setResponse("mealkitLikeList", mllist);
		dataRequest.setMetadata(true, message);
		return new JSONDataView();
	}

	// 레시피 좋아요
	@RequestMapping("/countRecipeLikeList")
	public View countRecipeLikeList(HttpServletRequest request,DataRequest dataRequest,int recipeBoardId) {
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		if(session != null) {
			MemberVO memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		int result = likeService.countRecipeLikeList(recipeBoardId);
		int showlike = likeService.showRecipeLike(recipeBoardId,memberEmail);
		Map<String,Object> message = new HashMap<String, Object>();
		message.put("countRecipeLike", result);
		message.put("showlikestatus", showlike);
		return new JSONDataView(true,message);
	}

	@RequestMapping("/clickRecipeLike")
	public View clickRecipeLike(HttpServletRequest request,DataRequest dataRequest,int recipeBoardId) {
		
		// 세션 적용
		HttpSession session = request.getSession(false);
		String memberEmail = null;
		MemberVO memberVO = null;
		if(session != null) {
			memberVO = (MemberVO) session.getAttribute("member");
			memberEmail = memberVO.getMemberEmail();
		}
		int result = likeService.showRecipeLike(recipeBoardId,memberEmail);
		if(result == 0) {
			likeService.insertRecipeLike(recipeBoardId, memberEmail);
			result = 1;
		}else {
			likeService.deleteRecipeLike(recipeBoardId, memberEmail);
			result = 0;
		}
		
		Map<String,Object> message = new HashMap<>();
		message.put("likeresult", result);
		return new JSONDataView(true, message);
	}
	
	@RequestMapping("/findRecipeLikeList")
	public View findRecipeLikeList(HttpServletRequest request,DataRequest dataRequest) {
		// 세션 적용
		HttpSession session = request.getSession(false);
		MemberVO memberVO = (MemberVO) session.getAttribute("member");
		String memberEmail = memberVO.getMemberEmail();
		if(memberEmail == null || memberEmail == "") {
			return new UIView();
		}
		List<RecipeBoardVO> result = likeService.findRecipeLikeList(memberEmail);
		dataRequest.setResponse("dsrecipelikelist", result);
		return new JSONDataView();
	}
	
}
