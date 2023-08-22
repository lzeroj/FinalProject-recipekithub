/************************************************
 * find-email-pswd.js
 * Created at 2023. 8. 11. 오후 2:30:25.
 *
 * @author kjoon
 ************************************************/

//(start)-----[ 이메일 찾기 함수 ]-----//
/*
 * "조회" 버튼(btnFindEmail)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindEmailClick(e){
	var btnFindEmail = e.control;
	var memberName = app.lookup("ipbName1").value;
	var memberPhone = app.lookup("ipbPhone1").value;
	var memberBirthday = app.lookup("ipbBirthday").value;
	
	var dataMap = app.lookup("dm_find_email");
	dataMap.setValue("member_name", memberName);
	dataMap.setValue("member_phone", memberPhone);
	dataMap.setValue("member_birthday", memberBirthday);
	
	// 다이얼로그창에 표시할 메시지
	var initValue = null;		
	// Email 양식에서 빈칸으로 남아 있는 input-box가 있는 체크
	if (memberName === "") {
		initValue = "성명은 필수 입력 항목입니다.";
	} else if (memberPhone === "") {
		initValue = "전화번호는 필수 입력 항목입니다";
	} else if (memberBirthday === "") {
		initValue = "생년월일은 필수 입력 항목입니다";
	}
	
	// 1. Email 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 경우
	if (initValue) {		
		app.openDialog("dialog/registerChkPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		});
	// 2. Email 찾기 양식이 전부 유효하게 작성되어 있는 경우, Email 찾기 서브미션 전송	
	} else {		
		initValue = "Email을 조회 하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var submission = app.lookup("sub_findEmail");
			submission.send();
		});
	}	
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbBirthdayKeydown(e){
	var ipbBirthday = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnFindEmail").click();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_findEmailSubmitSuccess2(e){
	var sub_findEmail = e.control;
	var opbFindEmailNotice = app.lookup("opbFindEmailNotice");
	var dataSet = app.lookup("ds_member");
	
	var metadataOk = sub_findEmail.getMetadata("ok"); 	// Controller측에서 입력한 정보에 따른 이메일을 조회하여 ok(조회 성공)인 경우
	var metadataFail = sub_findEmail.getMetadata("fail"); 	// Controller측에서 입력한 정보에 따른 이메일을 조회하여 fail(조회 불가)인 경우

	if (metadataFail) {		//---> 1. 입력한 정보에 따른 이메일을 조회할 수 없는 경우
		opbFindEmailNotice.style.css("color", "red");
		opbFindEmailNotice.text = "등록된 정보가 없습니다. 입력하신 정보를 다시 확인해주세요.";
	} else {						//---> 2. 입력한 정보에 따른 이메일을 조회하는데 성공한 경우
		opbFindEmailNotice.style.css("color", "black");
		opbFindEmailNotice.text = "입력하신 회원정보에 해당하는 Email 정보는 다음과 같습니다."
		app.lookup("opbFindEmailResult").text = metadataOk;
	}
}
//(end)-----[ 이메일 찾기 함수 ]-----//


//(start)-----[ 비밀번호 찾기 함수 ]-----//
/*
 * "조회" 버튼(btnFindPswd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindPswdClick(e){
	var btnFindPswd = e.control;
	var memberEmail = app.lookup("ipbEmail").value;
	var memberName = app.lookup("ipbName2").value;
	var memberPhone = app.lookup("ipbPhone2").value;
	
	var dataMap = app.lookup("dm_find_pswd");
	dataMap.setValue("member_email", memberEmail);
	dataMap.setValue("member_name", memberName);
	dataMap.setValue("member_phone", memberPhone);
	
	// 다이얼로그창에 표시할 메시지
	var initValue = null;		
	// 비밀번호 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 체크
	if (memberEmail === "") {
		initValue = "Email은 필수 입력 항목입니다.";
	} else if (memberName === "") {
		initValue = "성명은 필수 입력 항목입니다.";
	} else if (memberPhone === "") {
		initValue = "핸드폰 번호는 필수 입력 항목입니다.";
	}
	
	// 1. 비밀번호 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 경우
	if (initValue) {		
		app.openDialog("dialog/registerChkPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		});
	// 2. 비밀번호 찾기 양식이 전부 유효하게 작성되어 있는 경우, 비밀번호 찾기 서브미션 전송	
	} else {		
		initValue = "비밀번호를 조회 하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var submission = app.lookup("sub_findPswd");
			submission.send();
		});
	}	
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPhone2Keydown(e){
	var ipbPhone2 = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnFindPswd").click();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_findPswdSubmitSuccess(e){
	var sub_findPswd = e.control;
	var opbFindPswdNotice = app.lookup("opbFindPswdNotice");
	var dataSet = app.lookup("ds_member");
	
	var metadataOk = sub_findPswd.getMetadata("ok"); 	// Controller측에서 입력한 정보에 따른 비밀번호를 조회하여 ok(조회 성공)인 경우
	var metadataFail = sub_findPswd.getMetadata("fail"); 	// Controller측에서 입력한 정보에 따른 비밀번호를 조회하여 fail(조회 불가)인 경우

	if (metadataFail) {		//---> 1. 입력한 정보에 따른 비밀번호를 조회할 수 없는 경우
		opbFindPswdNotice.style.css("color", "red");
		opbFindPswdNotice.text = "등록된 정보가 없습니다. 입력하신 정보를 다시 확인해주세요.";
	} else {						//---> 2. 입력한 정보에 따른 비밀번호를 조회하는데 성공한 경우
		opbFindPswdNotice.style.css("color", "black");
		opbFindPswdNotice.text = "입력하신 회원정보에 해당하는 비밀번호 정보는 다음과 같습니다.\n보안을 위해 비밀번호를 수정해주시길 바랍니다."
		app.lookup("opbFindPswdResult").text = metadataOk;
	}
}
//(end)-----[ 비밀번호 찾기 함수 ]-----//

