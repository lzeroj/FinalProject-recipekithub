package org.kosta.recipekithub.webcontroller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.kosta.recipekithub.model.service.MemberService;
import org.kosta.recipekithub.model.vo.MemberVO;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	// ---[ 전체 회원 정보 조회 ]---//
	@RequestMapping("/memberlist")
	public View findMemberList(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		// 로그인 상태 여부 확인
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 조회가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}
		// 전체 회원 정보 저장
		List<MemberVO> findMemberList = memberService.findMemberList();
		dataRequest.setResponse("ds_member", findMemberList);
		return new JSONDataView();
	}

	// ---[ 로그인 ]---//
	@RequestMapping("/login")
	public View login(HttpServletRequest request, DataRequest dataRequest)	throws Exception {
		// `DataRequest`: 서브미션 통신에 대한 데이터
		// `ParameterGroup` : 서브미션 request 데이터를 받음
		// login-form.clx에서 서브미션(sub_login)을 통해 요청 데이터(데이터맵 : dm_login)을 전달 받음
		ParameterGroup memberParam = dataRequest.getParameterGroup("dm_login");
		// 로그인 화면에서 사용자가 입력한 email
		String memberEmail = memberParam.getValue("member_email");
		// 로그인 화면에서 사용자가 입력한 password
		String memberPassword = memberParam.getValue("member_password");

		boolean loginSuccess = false;

		Map<String, Object> message = new HashMap<>();

		// 요청 데이터가 존재하는 경우
		if (memberParam != null) {
			// 사용자가 이메일과 비밀번호를 공란 없이 입력한 경우
			if (memberEmail != null && memberPassword != null) {
				HttpSession session = request.getSession(false);
				if (session != null) {
					session.invalidate();
				}

				// 로그인 메서드 호출
				MemberVO member = memberService.login(memberEmail, memberPassword);
				log.debug("member 로그인 {}", member);

				// 사용자가 입력한 이메일과 비밀번호에 대응하는 회원정보가 존재하지 않는 경우
				if (member == null) {
					message.put("loginFailMessage", "로그인 정보를\n다시 확인해주시기 바랍니다.");
					return new JSONDataView(loginSuccess, message); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
				}

				// 사용자가 입력한 이메일과 비밀번호에 대응하는 회원정보가 DB에 존재하는 경우, 세션 정보 저장
				session = request.getSession(true);
				session.setAttribute("member", member);
				loginSuccess = true;

				message.put("path", "index");
			}
		}
		return new JSONDataView(loginSuccess, message); 	// 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입 ]---//
	@RequestMapping("/register")
	public View registerMember(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		// register-form.clx에서 서브미션(sub_register)을 통해 요청 데이터(데이터맵 : dm_register_member)을 전달 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberEmail = param.getValue("member_email");

		boolean registerSuccessFlag = false;

		Map<String, Object> message = new HashMap<>();

		// 중복되는 회원정보가 있는지 확인
		if (memberService.findMemberByEmail(memberEmail) != null) {
			message.put("registerFailMessage", "입력하신 정보를\n다시 확인해주시기 바랍니다.");
			return new JSONDataView(registerSuccessFlag, message);
		}

		String memberPassword = param.getValue("member_password");
		String memberName = param.getValue("member_name");
		String memberNick = param.getValue("member_nick");
		String memberBirthday = param.getValue("member_birthday");
		String memberPhone = param.getValue("member_phone");
		String memberPostcode = param.getValue("member_postcode");
		String memberAddress = param.getValue("member_address");
		String memberAddressDetail = param.getValue("member_address_detail");

		// 중복되는 회원정보가 없는 경우, 새로운 회원 객체 정보를 생성 및 회원가입 메서드 호출
		MemberVO member = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode,
				memberAddress, memberAddressDetail, memberPhone, memberBirthday);
		int result = memberService.registerMember(member);
		log.debug("member 회원가입 정보 : {}", member);
		log.debug("member 회원가입 성공여부(if '1' succes) : {}", result);

		registerSuccessFlag = true;
		message.put("path", "member/login-form");

		return new JSONDataView(registerSuccessFlag, message); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입시 이메일 중복 체크 ]---//
	@RequestMapping("/checkEmail")
	@ResponseBody
	public View checkEmail(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_check_email");
		String memberEmail = param.getValue("member_email");
		int checkResult = memberService.checkDuplicateEmail(memberEmail);
		Map<String, Object> message = new HashMap<>();

		if (checkResult == 0) {
			message.put("ok", "이메일 사용 가능");
		} else if (checkResult > 0) {
			message.put("fail", "이메일 중복");
		}
		return new JSONDataView(true, message); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입시 닉네임 중복 체크 ]---//
	@RequestMapping("/checkNick")
	@ResponseBody
	public View checkNick(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_check_nick");
		String memberNick = param.getValue("member_nick");
		int checkResult = memberService.checkDuplicateNick(memberNick);
		Map<String, Object> message = new HashMap<>();

		if (checkResult == 0) {
			message.put("ok", "닉네임 사용 가능");
		} else if (checkResult > 0) {
			message.put("fail", "닉네임 중복");
		}
		return new JSONDataView(true, message); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원 프로필 조회 ]---//
	@RequestMapping("/profileInfo")
	public View viewMyProfile(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		// 로그인 여부 확인
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 정보 조회가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}

		MemberVO member = (MemberVO) session.getAttribute("member"); // 현재 session에 담겨있는 회원 정보 가져오기
		log.debug("member 프로필 정보 : {}", member);

		List<MemberVO> myProfile = new ArrayList<>();
		myProfile.add(member);
		dataRequest.setResponse("ds_profile", myProfile);

		return new JSONDataView();
	}

	// ---[ 회원정보 수정 ]---//
	@RequestMapping("/updateMember")
	public View updateMember(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		// 로그인 상태 여부 확인
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 정보 수정이 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}

		MemberVO member = (MemberVO) session.getAttribute("member");

		// myProfile.clx에서 서브미션(sub_update)을 통해 요청 데이터(데이터맵 : dm_update)을 전달 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_update");
		String memberEmail = param.getValue("memberEmail");
		String memberPassword = param.getValue("memberPassword");
		String memberName = param.getValue("memberName");
		String memberNick = param.getValue("memberNick");
		String memberBirthday = param.getValue("memberBirthday");
		String memberPhone = param.getValue("memberPhone");
		String memberPostcode = param.getValue("memberPostcode");
		String memberAddress = param.getValue("memberAddress");
		String memberAddressDetail = param.getValue("memberAddressDetail");
		String memberImage = param.getValue("memberImage");

		// 새로운 이미지가 업로드 되었는지 확인
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		if (uploadFiles != null && uploadFiles.containsKey("memberImage")) {
			UploadFile[] uploadFile = uploadFiles.get("memberImage");

			// uploadFile 이 null이 아닌지 확인
			if (uploadFile != null && uploadFile.length > 0) {
				// 기존에 이미지가 있는 경우 삭제
				if (memberImage != null) {
					File existImageFile = new File("C:\\upload\\profile\\" + memberImage);
					if (existImageFile.exists()) {
						existImageFile.delete();
					}
				}

				// 새로운 이미지 업로드
				File orgName = uploadFile[0].getFile();
				String saveName = uploadFile[0].getFileName();
				String savePath = "C:\\upload\\profile\\";
				String uuid = UUID.randomUUID().toString();

				// 새로운 파일을 디렉토리에 저장
				FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));

				// 이미지 업데이트
				member.setMemberImage(uuid + "_" + saveName);
				memberImage = member.getMemberImage();
			}
		}

		// 변경된 회원 객체 정보를 생성 
		MemberVO memberVO = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode,
				memberAddress, memberAddressDetail, memberPhone, memberBirthday, null, null, null, memberImage);

		// 변경된 회원 객체 정보가 존재하는 경우, 회원정보 업데이트 메서드 호출 및 변경된 정보에 따른 새로운 세션 정보 설정
		if (memberVO != null) {
			int result = memberService.updateMember(memberVO);
			log.debug("member 회원정보 수정 성공여부(if '1' succes) : {}", result);
			session.setAttribute("member", memberVO);
			log.debug("member update 정보 : {}", memberVO);
		}

		dataRequest.setResponse("ds_profile", memberVO);
		return new JSONDataView();
	}

	// ---[ 회원 탈퇴 ]---//
	@RequestMapping("/deleteMember")
	public View deleteMember(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 탈퇴가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}

		// email에 해당하는 회원정보 삭제
		ParameterGroup param = dataRequest.getParameterGroup("dm_delete");
		String memberEmail = param.getValue("memberEmail");
		int result = memberService.deleteMember(memberEmail);
		log.debug("member 회원탈퇴 성공여부(if '1' succes) : {}", result);

		return new JSONDataView();
	}

	// ---[ 관리자 전체 회원 조회 페이지 : 회원 강퇴 ]---//
	@RequestMapping("/deleteMembers")
	public View deleteMembers(HttpServletRequest request,  DataRequest dataRequest) throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 관리가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}

		ParameterGroup paramGroup = dataRequest.getParameterGroup("ds_member");
		// 삭제하기 위해 선택한 복수의 행 (회원 정보) 저장
		Iterator<ParameterRow> deletedRows = paramGroup.getDeletedRows();
		while (deletedRows.hasNext()) {
			ParameterRow row = deletedRows.next();
			// 선택한 행으로부터 Email 반환
			String memberEmail = row.getValue("memberEmail");
			// 회원정보 삭제 수행
			int result = memberService.deleteMember(memberEmail);
			log.debug("member 회원탈퇴 성공여부(if '1' success) : {}", result);
		}
		return new JSONDataView();
	}

	// ---[ 로그아웃 ]---//
	@RequestMapping("/logout")
	public View logout(HttpServletRequest request,  DataRequest dataRequest) throws Exception {
		HttpSession session = request.getSession(false);
		// 세션이 존재하는 경우, 세션 무효화
		if (session != null) {
			session.invalidate();
		}
		return new JSONDataView();
	}

	// ---[ 회원 이메일 찾기 ]---//
	@RequestMapping("/findEmail")
	public View findEmailByNamePhoneBirthday(HttpServletRequest request,  DataRequest dataRequest) throws Exception {
		// find-email-pswd.clx에서 서브미션(sub_findEmail)을 통해 요청 데이터(데이터맵 : dm_find_email)을 전달 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_find_email");
		String memberName = param.getValue("member_name");
		String memberPhone = param.getValue("member_phone");
		String memberBirthday = param.getValue("member_birthday");

		// 이메일 찾기 메서드 호출
		String findEmailResult = memberService.findEmailByNamePhoneBirthday(memberName, memberPhone, memberBirthday);

		Map<String, Object> email = new HashMap<>();
		// 이메일 찾기 메서드를 호출하여 이메일 정보를 성공적으로 찾은 경우
		if (findEmailResult != null) {
			email.put("ok", findEmailResult);
			// 이메일 찾기 메서드를 호출하여 이메일 정보를 찾지 못한 경우
		} else {
			email.put("fail", "이메일 찾기 실패");
		}

		List<Map<String, Object>> memberEmail = new ArrayList<>();
		memberEmail.add(email);
		return new JSONDataView(true, email);
	}

	// ---[ 회원 비밀번호 찾기 ]---//
	@RequestMapping("/findPassword")
	public View findPswdByEmailNamePhone(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		// find-email-pswd.clx에서 서브미션(sub_findPswd)을 통해 요청 데이터(데이터맵 : dm_find_pswd)을 전달 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_find_pswd");
		String memberEmail = param.getValue("member_email");
		String memberName = param.getValue("member_name");
		String memberPhone = param.getValue("member_phone");

		// 비밀번호 찾기 메서드 호출
		String findPswdResult = memberService.findPswdByEmailNamePhone(memberEmail, memberName, memberPhone);

		Map<String, Object> password = new HashMap<>();
		// 비밀번호 찾기 메서드를 호출하여 비밀번호 정보를 성공적으로 찾은 경우
		if (findPswdResult != null) {
			password.put("ok", findPswdResult);
		// 비밀번호 찾기 메서드를 호출하여 비밀번호 정보를 찾지 못한 경우
		} else {
			password.put("fail", "비밀번호 찾기 실패");
		}

		List<Map<String, Object>> memberPassword = new ArrayList<>();
		memberPassword.add(password);
		return new JSONDataView(true, password);
	}

	// ---[ 프로필 조회 화면 : 프로필 사진 삭제 ]---//
	@RequestMapping("/deleteProfileImage")
	public View deleteProfileImg(HttpServletRequest request, DataRequest dataRequest) throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 프로필 사진 삭제가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}

		MemberVO member = (MemberVO) session.getAttribute("member");

		ParameterGroup param = dataRequest.getParameterGroup("dm_profile");
		String memberEmail = param.getValue("memberEmail");

		String savePath = "C:\\upload\\profile\\";
		String memberImage = member.getMemberImage();
		File existImageFile = new File(savePath + memberImage);
		if (existImageFile.exists()) {
			existImageFile.delete();
		}

		int result = memberService.deleteProfileImg(memberEmail);
		log.debug("member 프로필 사진 삭제 성공여부(if '1' succes) : {}", result);

		return new JSONDataView();
	}
	
	// ---[ 관리자 전체 회원 조회 페이지 : 회원 검색 ]---//
	@RequestMapping("/searchMember")
	public View searchMembers(HttpServletRequest request, DataRequest dataRequest) {
		// 로그인 상태 여부 확인
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			log.debug("---[로그인 상태가 아니므로 회원 관리가 불가합니다.]---");
			Map<String, Object> message = new HashMap<>();
			message.put("error", "세션이 만료되어\n 현재 비로그인 상태입니다");
			return new JSONDataView(false, message);
		}
		
		// keyword를 받아와 DB에서 회원 정보 조회
		ParameterGroup param = dataRequest.getParameterGroup("dm_search");
		String searchKeyword = param.getValue("searchKeyword");
		Map<String, String> searchParams = new HashMap<String, String>();
		searchParams.put("searchKeyword", "%" + searchKeyword + "%");
		List<MemberVO> memberList = memberService.searchMembers(searchParams);
		dataRequest.setResponse("ds_member", memberList);
		return new JSONDataView();
	}
}
