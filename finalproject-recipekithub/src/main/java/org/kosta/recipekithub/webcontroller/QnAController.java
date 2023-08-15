package org.kosta.recipekithub.webcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.QnAService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.kosta.recipekithub.model.vo.QnAVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class QnAController {
	private final QnAService qnAService;
	
	@RequestMapping("/insertQnaForm")
	public View insertQnaForm() {
		return new UIView("ui/embedded/myPageQnARegisterForm.clx");
	}
	
	@RequestMapping("/insertQnA")
	public View insertQnA(HttpServletRequest request,DataRequest dataRequest) {
		
		// 로그인 확인
//		HttpSession session = request.getSession(false);
//		MemberVO member = (MemberVO) session.getAttribute("member");
//		String memberId = member.getMemberEmail();
		String memberId = "shj";
		if(memberId == null || memberId == "") { // Guard Claues
			return new UIView("ui/index.clx");
		}
		
		// 전달된 제목과 내용
		ParameterGroup param = dataRequest.getParameterGroup("qnaparam");
		String boardTitle = param.getValue("boardTitle");
		String boardContent = param.getValue("boardContent");
		System.out.println(boardTitle+" "+boardContent);
		
		// QnA 등록
		int result = qnAService.insertQnA(memberId, boardTitle, boardContent);
		
		// View에 전달할 메세지 등록
		Map<String, Object> message = new HashMap<>();
		message.put("insertResult",result);
		
		return new JSONDataView(true,message);
	}
	
	@RequestMapping("/selectQnaList")
	public View selectQnaList(HttpServletRequest request,DataRequest dataRequest) {
		List<QnAVO> qnalist = qnAService.selectQnaList();
		dataRequest.setResponse("qnadslist", qnalist);
		return new JSONDataView();
	}
	
	@RequestMapping("/selectQnaDetail")
	public View selectQnaDetail(HttpServletRequest request,DataRequest dataRequest,int boardId) {
		QnAVO qnAVO =  qnAService.selectQnaDetail(boardId);
		List<QnAVO> list = new ArrayList<>();
		list.add(qnAVO);
		dataRequest.setResponse("responseqnaselect", list);
		return new JSONDataView();
	}
	
	@RequestMapping("/updateQnA")
	public View updateResult(HttpServletRequest request,DataRequest dataRequest) {
		ParameterGroup param = dataRequest.getParameterGroup("updateqna");
		int boardId = Integer.parseInt(param.getValue("boardId"));
		String boardTitle = param.getValue("boardTitle");
		String boardContent = param.getValue("boardContent");
		int result = qnAService.updateQnA(boardId, boardTitle, boardContent);
		
		// View에 전달할 메세지 등록
		Map<String, Object> message = new HashMap<>();
		message.put("insertResult",result);
		
		return new JSONDataView(true,message);
	}
	
	
}
