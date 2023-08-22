package org.kosta.recipekithub.webcontroller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {
	private final MemberService memberService;

	// ---[ 전체 회원 정보 조회 ]---//
	// ---> 아직 사용하지 않음
	@RequestMapping("/memberlist")
	public View findMemberList(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		List<MemberVO> findMemberList = memberService.findMemberList();
		dataRequest.setResponse("memberList", findMemberList);
		return new JSONDataView();
	}

	// ---[ 로그인 ]---//
	@RequestMapping("/login")
	public View login(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {

		// `DataRequest`: 서브미션 통신에 대한 데이터
		// `ParameterGroup` : 서브미션 request 데이터를 받음
		ParameterGroup param = dataRequest.getParameterGroup("dm_login");
		String memberEmail = param.getValue("member_email");
		String memberPassword = param.getValue("member_password");

		MemberVO member = memberService.login(memberEmail, memberPassword);
		log.debug("member 로그인 {}", member);

		if (member == null) {
			return new UIView("ui/index.clx");
		}

		HttpSession session = request.getSession();
		session.setAttribute("member", member);
		dataRequest.setResponse("ds_member", member);
		System.out.println(session.getAttribute("member"));

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입 ]---//
	@RequestMapping("/register")
	public View registerMember(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberEmail = param.getValue("member_email");

		if (memberService.findMemberByEmail(memberEmail) != null) {
			return new UIView("ui/index.clx");
		}

		String memberPassword = param.getValue("member_password");
		String memberName = param.getValue("member_name");
		String memberNick = param.getValue("member_nick");
		String memberBirthday = param.getValue("member_birthday");
		String memberPhone = param.getValue("member_phone");
		String memberPostcode = param.getValue("member_postcode");
		String memberAddress = param.getValue("member_address");
		String memberAddressDetail = param.getValue("member_address_detail");

		MemberVO member = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode,
				memberAddress, memberAddressDetail, memberPhone, memberBirthday);
		int result = memberService.registerMember(member);
		log.debug("member 회원가입 정보 : {}", member);
		log.debug("member 회원가입 성공여부(if '1' succes) : {}", result);
		dataRequest.setResponse("ds_member", member);

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입시 이메일 중복 체크 ]---//
	@RequestMapping("/checkEmail")
	@ResponseBody
	public View checkEmail(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_check_email");
		// ParameterGroup param = dataRequest.getParameterGroup("dm_register_member");
		String memberEmail = param.getValue("member_email");
		int checkResult = memberService.checkDuplicateEmail(memberEmail);
		Map<String, Object> message = new HashMap<>();

		if (checkResult == 0) {
			message.put("ok", "이메일 사용 가능");
		} else if (checkResult > 0) {
//		} else {
			message.put("fail", "이메일 중복");
		}
		dataRequest.setMetadata(true, message);

		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원가입시 닉네임 중복 체크 ]---//
	@RequestMapping("/checkNick")
	@ResponseBody
	public View checkNick(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_check_nick");
		String memberNick = param.getValue("member_nick");
		int checkResult = memberService.checkDuplicateNick(memberNick);
		Map<String, Object> message = new HashMap<>();

		if (checkResult == 0) {
			message.put("ok", "닉네임 사용 가능");
		} else if (checkResult > 0) {
//		} else {
			message.put("fail", "닉네임 중복");
		}
		dataRequest.setMetadata(true, message);
		return new JSONDataView(); // 'JSONDataView : eXbuilder6의 clx로 데이터를 통신하기 위해 JSON형태로 넘겨주는 부분
	}

	// ---[ 회원 프로필 조회 ]---//
	@RequestMapping("/profileInfo")
	public View viewMyProfile(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		// 로그인 여부 확인
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 정보 조회가 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}

		MemberVO member = (MemberVO) session.getAttribute("member"); // 현재 session에 담겨있는 회원 정보 가져오기
		System.out.println(member);

		List<MemberVO> myProfile = new ArrayList<>();
		myProfile.add(member);
		dataRequest.setResponse("ds_profile", myProfile);
		
		//Map<String, Object> initParam = new HashMap<String, Object>();
		//initParam.put("member", member);
		return new JSONDataView();
	}

	/*
	// ---[ 회원정보 수정 ]---//
	@RequestMapping("/updateMember")
	public View updateMember(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest,
			String cartDetailQuantity, String mealkitName) throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 정보 수정이 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}

		//MemberVO member = (MemberVO) session.getAttribute("member");

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
		MemberVO member = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode,
				memberAddress, memberAddressDetail, memberPhone, memberBirthday);

		if (member != null) {
			int result = memberService.updateMember(member);
			log.debug("member 회원정보 수정 성공여부(if '1' succes) : {}", result);
		}

		dataRequest.setResponse("ds_profile", member);
		return new JSONDataView();
	}
	*/
	
	// ---[ 회원정보 수정 ]---//
	@RequestMapping("/updateMember")
	public View updateMember(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest,
			String cartDetailQuantity, String mealkitName) throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 정보 수정이 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}
		
		MemberVO member = (MemberVO) session.getAttribute("member");
		
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
		
		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		UploadFile[] uploadFile = uploadFiles.get("memberImage");
		File orgName = uploadFile[0].getFile();
		String saveName = uploadFile[0].getFileName();
		// String savePath =
		// "C:\\kosta260\\mygit-study\\FinalProject-recipekithub\\finalproject-recipekithub\\clx-src\\theme\\uploadrecipeimage\\";
		String savePath = "C:\\upload\\profile\\";
		String uuid = UUID.randomUUID().toString();
		FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
		
		member.setMemberImage(uuid + "_" + saveName);
		String memberImage = member.getMemberImage();
		
		// 사진을 변경했으면 삭제 후 저장
				if (uploadFiles.size() != 0) {
					if (memberImage != null) {
						File existImageFile = new File(savePath + memberImage);
						if (existImageFile.exists()) {
							existImageFile.delete();
						}
					}
					uploadFile = uploadFiles.get("memberImage");
					orgName = uploadFile[0].getFile();
					saveName = uploadFile[0].getFileName();
					System.out.println(saveName);
					uuid = UUID.randomUUID().toString();
					FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
					member.setMemberImage(uuid + "_" + saveName);
				}
		
		//int insertImgResult = memberService.insertProfileImg(memberEmail, memberImage);
		//log.debug("member 프로필 사진 등록/수정 성공여부(if '1' succes) : {}", insertImgResult);
		
		MemberVO memberVO = new MemberVO(memberEmail, memberPassword, memberName, memberNick, memberPostcode,
				memberAddress, memberAddressDetail, memberPhone, memberBirthday, null, null, null, memberImage);
		log.debug("member 정보 : {}", memberVO);

		if (memberVO != null) {
			int result = memberService.updateMember(memberVO);
			log.debug("member 회원정보 수정 성공여부(if '1' succes) : {}", result);
		}
		
		dataRequest.setResponse("ds_profile", memberVO);
		return new JSONDataView();
	}

	// ---[ 회원 탈퇴 ]---//
	@RequestMapping("/deleteMember")
	public View deleteMyCart(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 회원 탈퇴가 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}

		ParameterGroup param = dataRequest.getParameterGroup("dm_delete");
		String memberEmail = param.getValue("memberEmail");
		int result = memberService.deleteMember(memberEmail);
		log.debug("member 회원탈퇴 성공여부(if '1' succes) : {}", result);

		return new JSONDataView();
	}

	// ---[ 로그아웃 -> 메인 화면으로 이동 ]---//
	@RequestMapping("/logout")
	public View logout(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}

		// Map<String, Object> message = new HashMap<String, Object>();
		// message.put("uri", "login/login");
		// dataRequest.setMetadata(true, message);

		return new JSONDataView();
	}

	@RequestMapping("/findEmail")
	public View findEmailByNamePhoneBirthday(HttpServletRequest request, HttpServletResponse response,
			DataRequest dataRequest) throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_find_email");
		String memberName = param.getValue("member_name");
		String memberPhone = param.getValue("member_phone");
		String memberBirthday = param.getValue("member_birthday");
		String findEmailResult = memberService.findEmailByNamePhoneBirthday(memberName, memberPhone, memberBirthday);

		Map<String, Object> email = new HashMap<>();
		if (findEmailResult != null) {
			email.put("ok", findEmailResult);
		} else {
			email.put("fail", "이메일 찾기 실패");
		}

		List<Map<String, Object>> memberEmail = new ArrayList<>();
		memberEmail.add(email);

		dataRequest.setMetadata(true, email);
		// dataRequest.setResponse("ds_member", memberEmail);
		return new JSONDataView();
	}

	@RequestMapping("/findPassword")
	public View findPswdByEmailNamePhone(HttpServletRequest request, HttpServletResponse response,
			DataRequest dataRequest) throws Exception {
		ParameterGroup param = dataRequest.getParameterGroup("dm_find_pswd");
		String memberEmail = param.getValue("member_email");
		String memberName = param.getValue("member_name");
		String memberPhone = param.getValue("member_phone");
		String findPswdResult = memberService.findPswdByEmailNamePhone(memberEmail, memberName, memberPhone);

		Map<String, Object> password = new HashMap<>();
		if (findPswdResult != null) {
			password.put("ok", findPswdResult);
		} else {
			password.put("fail", "비밀번호 찾기 실패");
		}

		List<Map<String, Object>> memberPassword = new ArrayList<>();
		memberPassword.add(password);

		dataRequest.setMetadata(true, password);
		// dataRequest.setResponse("ds_member", memberPassword);
		return new JSONDataView();
	}

	/*
	@RequestMapping("/insertProfileImage")
	public View insertProfileImg(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 프로필 사진 등록/변경이 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
		}
		
		MemberVO member = (MemberVO) session.getAttribute("member");

		ParameterGroup param = dataRequest.getParameterGroup("dm_profile");
		String memberEmail = param.getValue("memberEmail");

		Map<String, UploadFile[]> uploadFiles = dataRequest.getUploadFiles();
		UploadFile[] uploadFile = uploadFiles.get("image");
		File orgName = uploadFile[0].getFile();
		String saveName = uploadFile[0].getFileName();
		// String savePath =
		// "C:\\kosta260\\mygit-study\\FinalProject-recipekithub\\finalproject-recipekithub\\clx-src\\theme\\uploadrecipeimage\\";
		String savePath = "C:\\upload\\profile\\";
		String uuid = UUID.randomUUID().toString();
		FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));

		member.setMemberImage(uuid + "_" + saveName);
		String memberImage = member.getMemberImage();
		
		// 사진을 변경했으면 삭제 후 저장
		if (uploadFiles.size() != 0) {
			if (memberImage != null) {
				File existImageFile = new File(savePath + memberImage);
				if (existImageFile.exists()) {
					existImageFile.delete();
				}
			}
			uploadFile = uploadFiles.get("image");
			orgName = uploadFile[0].getFile();
			saveName = uploadFile[0].getFileName();
			uuid = UUID.randomUUID().toString();
			FileCopyUtils.copy(orgName, new File(savePath + uuid + "_" + saveName));
			member.setMemberImage(uuid + "_" + saveName);
		}

		int result = memberService.insertProfileImg(memberEmail, memberImage);
		log.debug("member 프로필 사진 등록/수정 성공여부(if '1' succes) : {}", result);

		dataRequest.setResponse("dm_member", member);
		log.debug("member 정보 : {}", member);

		return new JSONDataView();
	}
	*/

	@RequestMapping("/deleteProfileImage")
	public View deleteProfileImg(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest)
			throws Exception {
		HttpSession session = request.getSession(false);
		if (session == null || session.getAttribute("member") == null) {
			System.out.println("---[로그인 상태가 아니므로 프로필 사진 삭제가 불가합니다.]---");
			return new UIView("ui/member/login-form.clx");
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

}
