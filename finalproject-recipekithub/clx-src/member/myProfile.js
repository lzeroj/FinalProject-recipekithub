/************************************************
 * myProfile.js
 * Created at 2023. 8. 10. 오후 3:52:23.
 *
 * @author kjoon
 ************************************************/

// sessionStorage에서 저장된 데이터를 찾는 데 사용되는 함수. key(회원 로그인 Email 정보)을 인수로 받는다.
function getTimedSessionData(key) {
	// storedData는 제공된 key(회원 로그인 Email 정보) 를 사용하여 sessionStorage에서 검색한 값을 저장.
	var storedData = sessionStorage.getItem(key);
	
	// storedData가 존재하는지 확인
	if (storedData) {
		// 저장된 JSON 문자열(회원 로그인 Email 정보)을 JavaScript 객체로 파싱하고 data에 저장
		var data = JSON.parse(storedData);
		//currentTime은 현재 시간을 밀리초 단위로 저장.
		var currentTime = new Date().getTime();
		
		// 현재 시간이 data에 저장된 만료 시간보다 작은지 확인
		if (currentTime < data.expirationTime) {
			// 데이터가 만료되지 않았다면 data.value에 저장된 값을 반환
			return data.value;
		} else {
			// 데이터가 만료되었다면 sessionStorage에서 해당 항목을 제거
			sessionStorage.removeItem(key);
		}
	}
	// storedData가 존재하지 않거나 만료되었다면 함수는 null을 반환. 만료된 경우에는 sessionStorage에서도 제거
	return null;
}


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	var submission = app.lookup("sub_profile");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
// 화면 로드시 서브미션을 전송한 후, 통신이 성공적이면 프로필 화면에 정보를 출력
function onSub_profileSubmitSuccess(e) {
	var sub_profile = e.control;
	var dsProfile = app.lookup("ds_profile");
	app.lookup("ipbEmail").text = dsProfile.getValue(0, "memberEmail");
	app.lookup("ipbPassword1").text = dsProfile.getValue(0, "memberPassword");
	app.lookup("ipbName").text = dsProfile.getValue(0, "memberName");
	app.lookup("ipbNick").text = dsProfile.getValue(0, "memberNick");
	app.lookup("address").text = dsProfile.getValue(0, "memberAddress");
	app.lookup("postCode").mask = dsProfile.getValue(0, "memberPostcode");
	app.lookup("detailAddress").text = dsProfile.getValue(0, "memberAddressDetail");
	app.lookup("ipbPhone").text = dsProfile.getValue(0, "memberPhone");
	app.lookup("ipbBirthday").value = dsProfile.getValue(0, "memberBirthday");
	app.lookup("profileImg").src = "/upload/profile/" + dsProfile.getValue(0, "memberImage");
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_profileSubmitError(e){
	var sub_profile = e.control;
	var sessionExpired = sub_profile.getMetadata("error");
	sessionStorage.clear();
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = sessionExpired;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
//---[ password1이 변경될 때마다 호출되어 비밀번호 유효성을 확인하고, password2와의 일치 여부를 갱신 ]---//
function onIpbPassword1Keyup(e) {
	var ipbPassword1 = e.control;
	var checkPswd1Flag = false; 	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var password1 = app.lookup("ipbPassword1");
	var imgPswd1 = app.lookup("imgPswdChk1");
	var checkPswdResult1 = app.lookup("opbCheckPassword");
	var pswd1 = ipbPassword1.displayText;
	var pswd1Value = String(pswd1);
	// 회원가입시 사용가능한 비밀번호 정규식을 체크하는 변수 : 8-25자 사이, 숫자, 대소문자, 특수 문자 모두 포함
	var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W]{8,25}$/;
	
	// 1. 비밀번호 입력칸이 빈칸인 경우
	if (pswd1Value === "") { 															
		checkPswdResult1.style.css("color", "pink");
		checkPswdResult1.value = "비밀번호를 입력해주세요.";
		imgPswd1.src = "";
		
	// 2. 비밀번호로 입력한 값이 30자를 초과한 경우
	} else if (pswd1Value.length < 8 || pswd1Value.length > 25) { 		
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.value = "비밀번호는 8자 이상 25자 이하이어야 합니다.";
		imgPswd1.src = "../ui/theme/images/member/cross.png";
	
	//3. 입력한 값이 비밀번호 형식에 적합하지 않아 사용할 수 없는 경우
	} else if (regExp.test(pswd1Value) == false) { 							
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.value = "비밀번호 형식을 확인해주시기 바랍니다.";
		imgPswd1.src = "../ui/theme/images/member/cross.png";
	
	//4. 입력한 비밀번호에 공백이 포함되어 사용할 수 없는 경우
	} else if (pswd1Value.search(" ") != -1) { 									
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.value = "비밀번호는 공백을 포함할 수 없습니다.";
		imgPswd1.src = "../ui/theme/images/member/cross.png";
	
	// 5. 입력한 비밀번호에 같은 문자가 연속하여 3번 이상 사용된 경우
	} else if (/(.)\1\1/.test(pswd1Value)) { 									
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.value = "같은 문자를 연속하여 3번 사용할 수 없습니다.";
		imgPswd1.src = "../ui/theme/images/member/cross.png";
	
	// 6. 입력한 비밀번호가 사용 가능한 경우
	} else { 																					
		checkPswd1Flag = true;
		checkPswdResult1.style.css("color", "blue");
		checkPswdResult1.value = "사용가능한 비밀번호입니다.";
		imgPswd1.src = "../ui/theme/images/member/checked.png";
	}
	
	// password1이 변경될 때마다 password2와의 일치 여부를 검사하여 password2의 확인 상태를 갱신
	var ipbPassword2 = app.lookup("ipbPassword2");
	var pswd2 = ipbPassword2.displayText;
	var pswd2Value = String(pswd2);
	var checkPswdResult2 = app.lookup("opbCheckPassword2");
	
	if (pswd2Value !== "") { 		// password2가 비어 있지 않은 경우에만 확인
		if (pswd1Value !== pswd2Value) {
			checkPswdResult2.style.css("color", "red");
			checkPswdResult2.value = "위의 비밀번호와 일치하지 않습니다.";
			app.lookup("imgPswdChk2").src = "../ui/theme/images/member/cross.png";
		} else {
			checkPswdResult2.style.css("color", "blue");
			checkPswdResult2.value = "비밀번호가 일치합니다.";
			app.lookup("imgPswdChk2").src = "../ui/theme/images/member/checked.png";
		}
	}
}

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
//---[ password2가 변경될 때마다 호출되어 password1과의 일치 여부를 확인 ]---//
function onIpbPassword2Keyup(e) {
	var ipbPassword2 = e.control;
	var ipbPassword1 = app.lookup("ipbPassword1");
	var imgPswd2 = app.lookup("imgPswdChk2");
	var pswd1 = ipbPassword1.displayText;
	var pswd1Value = String(pswd1);
	var pswd2 = ipbPassword2.displayText;
	var pswd2Value = String(pswd2);
	var checkPswdResult2 = app.lookup("opbCheckPassword2");
	
	if (pswd2Value === "") {
		checkPswdResult2.text = "";
		imgPswd2.src = "";
	} else if (pswd1Value != pswd2Value) {
		checkPswdResult2.style.css("color", "red");
		checkPswdResult2.value = "위의 비밀번호와 일치하지 않습니다.";
		imgPswd2.src = "../ui/theme/images/member/cross.png";
	} else if (pswd1Value === pswd2Value) {
		checkPswdResult2.style.css("color", "blue");
		checkPswdResult2.value = "비밀번호가 일치합니다.";
		imgPswd2.src = "../ui/theme/images/member/checked.png";
	}
}

/*
 * 인풋 박스에서 blur 이벤트 발생 시 호출.
 * 컨트롤이 포커스를 잃은 후 발생하는 이벤트.
 */
function onIpbNickBlur(e){
	var ipbNick = e.control;
	var dataMap = app.lookup("dm_check_nick");
	dataMap.setValue("member_nick", app.lookup("ipbNick").value);
	
	var subCheckNick = app.lookup("sub_check_nick");
	subCheckNick.send();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
//---[ 닉네임이 변경될 때마다 호출되어 닉네임 유효성을 확인 ]---//
function onSub_check_nickSubmitSuccess(e) {
	var sub_check_nick = e.control;
	var checkNickFlag = false; 		// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	
	var metadataOk = sub_check_nick.getMetadata("ok"); 			// Controller측에서 닉네임 중복 여부를 체크하여 ok(사용 가능)인 경우
	var metadataFail = sub_check_nick.getMetadata("fail"); 			// Controller측에서 닉네임 중복 여부를 체크하여 fail(중복되어 사용 불가)인 경우
	
	var ipbNick = app.lookup("ipbNick"); 											// 닉네임 입력 input-box
	var opbCheckNickResult = app.lookup("opbCheckNick"); 			// 닉네임 유효성 검사 결과가 출력되는 output-box
	var imgNick = app.lookup("imgNickChk"); 									// 사용가능한 Email인지 시각적으로 표현해주는 O/X 이미지가 출력되는 image-box
	
	var nick = ipbNick.displayText;
	var nickValue = String(nick); 		// input-box에서 보여지는 HTML Element의 value를 가져와서 String 타입으로 저장.	
	
	// 1. 닉네임 입력칸이 빈칸인 경우
	if (nickValue === "") { 															
		opbCheckNickResult.style.css("color", "pink");
		opbCheckNickResult.value = "닉네임을 입력해주세요.";
		imgNick.src = "";
		
	// 2. 닉네임으로 입력한 값이 1자 or 9자를 이상인 경우	
	} else if (nickValue.length < 2 || nickValue.length > 8) { 			
		opbCheckNickResult.style.css("color", "red");
		opbCheckNickResult.value = "닉네임은 2자이상 ~ 8자 이하이어야 합니다.";
		imgNick.src = "../ui/theme/images/member/cross.png";
		
	// 3. 입력한 닉네임이 중복되어 사용할 수 없는 경우	
	} else if (metadataFail) { 														
		opbCheckNickResult.style.css("color", "red");
		opbCheckNickResult.value = "닉네임이 중복됩니다.";
		imgNick.src = "../ui/theme/images/member/cross.png";
		
	// 4. 입력한 닉네임에 공백이 포함되어 사용할 수 없는 경우
	} else if (nickValue.search(" ") != -1) { 									
		opbCheckNickResult.style.css("color", "red");
		opbCheckNickResult.value = "닉네임은 공백을 포함할 수 없습니다.";
		imgNick.src = "../ui/theme/images/member/cross.png";
		
	// 5. 입력한 닉네임이 사용 가능한 경우
	} else { 																					
		checkNickFlag = true;
		opbCheckNickResult.style.css("color", "blue");
		opbCheckNickResult.value = "사용가능한 닉네임입니다.";
		imgNick.src = "../ui/theme/images/member/checked.png";
	}
}


/*
 * "수정" 버튼(btnMemUpdate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMemUpdateClick(e){
	var btnMemUpdate = e.control;
	
	var memberEmail = app.lookup("ipbEmail").value;
	var memberPassword = app.lookup("ipbPassword1").value;
	var memberPassword2 = app.lookup("ipbPassword2").value;
	var memberName = app.lookup("ipbName").value;
	var memberNick = app.lookup("ipbNick").value;
	var memberBirthday = app.lookup("ipbBirthday").value;
	var memberPhone = app.lookup("ipbPhone").value;
	var memberPostcode = app.lookup("postCode").value;
	var memberAddress = app.lookup("address").value;
	var memberAddressDetail = app.lookup("detailAddress").value;
	var memberImage = app.lookup("profileImg").src;
	
	var dataMap = app.lookup("dm_update");
	dataMap.setValue("memberEmail", memberEmail);
	dataMap.setValue("memberPassword", memberPassword);
	dataMap.setValue("memberName", memberName);
	dataMap.setValue("memberNick", memberNick);
	dataMap.setValue("memberBirthday", memberBirthday);
	dataMap.setValue("memberPhone", memberPhone);
	dataMap.setValue("memberPostcode", memberPostcode);
	dataMap.setValue("memberAddress", memberAddress);
	dataMap.setValue("memberAddressDetail", memberAddressDetail);
	dataMap.setValue("memberImage", memberImage);
	
	// 다이얼로그창에 표시할 메시지
	var initValue = null;		
	// 회원가입 양식에서 빈칸으로 남아 있는 input-box가 있는 체크
	if (memberPassword === "") {
		initValue = "비밀번호를 입력해주세요";
	} else if (memberPassword2 === "") {
		initValue = "비밀번호를 확인해주세요";
	} else if (memberName === "") {
		initValue = "성명을 확인해주세요";
	} else if (memberNick === "") {
		initValue = "닉네임을 확인해주세요";
	} else if (memberBirthday === "") {
		initValue = "생년월일을 확인해주세요";
	} else if (memberPhone === "") {
		initValue = "전화번호를 확인해주세요";
	} else if (memberPostcode === "") {
		initValue = "주소를 확인해주세요";
	}
	
	// 1. 프로필 조회/수정 양식에서 빈칸으로 남아 있는 input-box가 있는 경우
	if (initValue) {		
		app.openDialog("dialog/memberChkPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		});
		
	// 2. 프로필 조회/수정 양식이 전부 유효하게 작성되어 있는 경우, 프로필 수정 서브미션 전송	
	} else {		
		initValue = "회원정보를 수정하시겠습니까?";
		app.openDialog("dialog/memberPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var subUpdate = app.lookup("sub_update");
			
			var fileInput = app.lookup("fi1");
			var file = fileInput.file;
			
       		subUpdate.addFileParameter("memberImage", file);
			subUpdate.send();
		});
	}
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_updateSubmitSuccess(e) {
	var sub_update = e.control;
	var initValue = "회원 정보 수정이 완료되었습니다!";
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_updateSubmitError(e){
	var sub_update = e.control;
	var sessionExpired = sub_update.getMetadata("error");
	sessionStorage.clear();
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = sessionExpired;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}


/*
 * "탈퇴" 버튼(btnMemDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMemDeleteClick(e){
	var btnMemDelete = e.control;
	
	var initValue = "정말로 탈퇴하시겠습니까?";
	app.openDialog("dialog/memberPopup", {
		width: 400, height: 300, headerClose: true, resizable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		var dataMap = app.lookup("dm_delete");
		dataMap.setValue("memberEmail", app.lookup("ipbEmail").value);
		var submission = app.lookup("sub_delete");
		submission.send();
		sessionStorage.clear();
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_deleteSubmitSuccess(e) {
	var sub_delete = e.control;
	var initValue = "지금까지 RecipeKitHub을 이용해주셔서\n감사합니다!";
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}

/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_deleteSubmitError(e){
	var sub_delete = e.control;
	var sessionExpired = sub_delete.getMetadata("error");
	sessionStorage.clear();
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = sessionExpired;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}


/*
 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(e) {
	cpr.core.App.load("index", function(newapp){
		app.close();
		newapp.createNewInstance().run();
	});
}


/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e) {
	var fi1 = e.control;
	var image = app.lookup("profileImg");
	var fileInput = app.lookup("fi1");
	if (fileInput.files && fileInput.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(fileInput.files[0]);
	}
}


/*
 * "프로필 사진 삭제" 버튼(btnDeleteProfileImg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteProfileImgClick(e){
	var btnDeleteProfileImg = e.control;
	var submission = app.lookup("sub_delete_image");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_delete_imageSubmitSuccess(e){
	var sub_delete_image = e.control;
	var fileInput = app.lookup("fi1");
	var image = app.lookup("profileImg");
	var initValue = "현재 프로필 사진을 '삭제' 하시겠습니까?";
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		fileInput.clear();
		image.src = "../theme/images/icon/chefimg.png";
		image.redraw();
	});
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_delete_imageSubmitError(e){
	var sub_delete_image = e.control;
	var sessionExpired = sub_delete_image.getMetadata("error");
	sessionStorage.clear();
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = sessionExpired;
		});
	}).then(function(returnValue) {
		cpr.core.App.load("index", function(newapp){
			app.close();
			newapp.createNewInstance().run();
		});
	});
}


//=============================================[ 카카오 주소검색 API ]=============================================//

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
		// 다음에서 제공하는 통합로딩 url
	var voResourceLoader = new cpr.core.ResourceLoader();
	voResourceLoader.addScript("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").load().then(function(input) {
		//후처리
	});
}

/*
 * "주소 검색" 버튼(btnPostcode)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostcodeClick(e){
	postCode();
}

var appConf = cpr.core.AppConfig.INSTANCE;
appConf.getEnvConfig().setValue("appcache", true);

function postCode() {
	new daum.Postcode({
		/* 해당 정보를 받아 처리할 콜백 함수를 정의하는 부분 입니다. */
		oncomplete: function(data) {
			/* 팝업에서 검색결과 항목을 클릭했을떄 실행할 코드를 작성하는 부분 */
			var vcPostCode = app.lookup("postCode");
			var vcAddress = app.lookup("address");
			var vcDetailAddress = app.lookup("detailAddress");
			
			// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var roadAddr = data.roadAddress; // 도로명 주소 변수
			var extraRoadAddr = ""; // 참고 항목 변수
			
			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
			if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
				extraRoadAddr += data.bname;
			}
			// 건물명이 있고, 공동주택일 경우 추가한다.
			if (data.buildingName !== "" && data.apartment === "Y") {
				extraRoadAddr += (extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName);
			}
			
			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
			if (extraRoadAddr !== "") {
				extraRoadAddr = " (" + extraRoadAddr + ")";
			}
			
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			vcPostCode.value = data.zonecode;
			
			// 사용자가 도로명 주소를 선택한 경우
			if (data.userSelectedType === "R") {
				vcAddress.value = roadAddr + extraRoadAddr; // 참고항목이 있다면, 괄호와 함께 추가한다.
			}
			// 사용자가 지번 주소를 선택한 경우
			else if (data.userSelectedType === "J") {
				vcAddress.value = data.jibunAddress;
			}
			
			// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
			if (roadAddr !== "") {
				vcDetailAddress.value = extraRoadAddr;
			} else {
				vcDetailAddress.value = "";
			}
			
			/*커서를 상세주소 필드로 이동합니다. */
			vcDetailAddress.focus();
		}
	}).open();
}

/*
 * 루트 컨테이너에서 unload 이벤트 발생 시 호출.
 * 앱이 언로드된 후 발생하는 이벤트입니다.
 */
function onBodyUnload(e){
	var appConf = cpr.core.AppConfig.INSTANCE;
	appConf.getEnvConfig().setValue("appcache", false);
}

