/************************************************
 * register-form.js
 * Created at 2023. 8. 10. 오후 3:52:01.
 *
 * @author kjoon
 ************************************************/

/*
 * "가입" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var dataMap = app.lookup("dm_register_member");
	dataMap.setValue("member_email", app.lookup("ipbEmail").value);
	dataMap.setValue("member_password", app.lookup("ipbPassword").value);
	dataMap.setValue("member_name", app.lookup("ipbName").value);
	dataMap.setValue("member_nick", app.lookup("ipbNick").value);
	dataMap.setValue("member_birthday", app.lookup("ipbBirthday").value);
	dataMap.setValue("member_phone", app.lookup("ipbPhone").value);
	dataMap.setValue("member_address", app.lookup("ipbAddress").value);
	var subLogin = app.lookup("sub_register");
	subLogin.send();
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	window.location.href = "index.clx";
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_registerSubmitSuccess(e){
	var sub_register = e.control;
	alert("RecipeKitHub에 오신 것을 환영합니다..!!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}

/*
 * "중복확인" 버튼(btnCheckDuplicateId)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCheckDuplicateIdClick(e){
	var btnCheckDuplicateId = e.control;
	
}

/*
 * "중복확인" 버튼(btnCheckDuplicateNick)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCheckDuplicateNickClick(e){
	var btnCheckDuplicateNick = e.control;
	
}
