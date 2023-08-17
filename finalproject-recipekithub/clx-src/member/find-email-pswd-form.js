/************************************************
 * find-info-form.js
 * Created at 2023. 8. 11. 오후 2:30:25.
 *
 * @author kjoon
 ************************************************/

/*
 * "조회" 버튼(btnFindEmail)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindEmailClick(e){
	var btnFindEmail = e.control;
	var dataMap = app.lookup("dm_find_email");
	dataMap.setValue("member_name", app.lookup("ipbName1").value);
	dataMap.setValue("member_phone", app.lookup("ipbPhone1").value);
	dataMap.setValue("member_birthday", app.lookup("ipbBirthday").value);
	var submission = app.lookup("sub_findEmail");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_findEmailSubmitSuccess2(e){
	var sub_findEmail = e.control;
	var dataSet = app.lookup("ds_member");
	//var dataMap = app.lookup("dm_find_email_result");
	app.lookup("opbFindEmailNotice").text = "입력하신 회원정보에 해당하는 Email 정보는 다음과 같습니다."
	app.lookup("opbFindEmailResult").text = dataSet.getValue(0, "memberEmail"); 
}

/*
 * "조회" 버튼(btnFindPswd)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFindPswdClick(e){
	var btnFindPswd = e.control;
	var dataMap = app.lookup("dm_find_pswd");
	dataMap.setValue("member_email", app.lookup("ipbEmail").value);
	dataMap.setValue("member_name", app.lookup("ipbName2").value);
	dataMap.setValue("member_phone", app.lookup("ipbPhone2").value);
	var submission = app.lookup("sub_findPswd");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_findPswdSubmitSuccess(e){
	var sub_findPswd = e.control;
	var dataSet = app.lookup("ds_member");
	app.lookup("opbFindPswdNotice").text = "입력하신 회원정보에 해당하는 비밀번호 정보는 다음과 같습니다."
	app.lookup("opbFindPswdResult").text = dataSet.getValue(0, "memberPassword"); 
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
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPhone2Keydown(e){
	var ipbPhone2 = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnFindPswd").click();
	}
}
