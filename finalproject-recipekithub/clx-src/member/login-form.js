/************************************************
 * login-form.js
 * Created at 2023. 8. 10. 오후 3:51:42.
 *
 * @author kjoon
 ************************************************/

/*
 * "로그인" 버튼(loginBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLoginBtnClick(e) {
	//var loginBtn = e.control;
	var dataMap = app.lookup("dm_login");
	dataMap.setValue("member_email", app.lookup("emailInput").value);
	dataMap.setValue("member_password", app.lookup("pswdInput").value);
	var subLogin = app.lookup("sub_login");
	subLogin.send();
}

/*
 * "회원가입" 버튼(registerBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onRegisterBtnClick(e) {
	var registerBtn = e.control;
	window.location.href = "member/register-form.clx";
}

/*
 * "이메일 / 비밀번호 찾기" 버튼(findBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onFindBtnClick(e) {
	var findBtn = e.control;
	window.location.href = "member/find-email-pswd.clx";
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_loginSubmitSuccess(e) {
	// 현준
	var sub_login = e.control;
	var checkBox = app.lookup("cbx1");
	var memberEmail = app.lookup("dm_login").getValue("member_email");
	if(checkBox.checked){
		localStorage.setItem("memberEmail", memberEmail);
	}
	setTimedSessionData("memsession", memberEmail,30);
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}

// 데이터 저장과 만료 시간 설정
function setTimedSessionData(key, value, expirationMinutes) {
    var currentTime = new Date().getTime();
    var expirationTime = currentTime + (expirationMinutes * 60 * 1000); // milliseconds

    var data = {
        value: value,
        expirationTime: expirationTime
    };

    sessionStorage.setItem(key, JSON.stringify(data));
}
/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
function onSub_loginSubmitError(e) {
	var sub_login = e.control;
	alert("회원 정보를 다시 확인해주시기 바랍니다.");
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onPswdInputKeydown(e) {
	var pswdInput = e.control;
	if (e.keyCode == cpr.events.KeyCode.ENTER) {
		app.lookup("btnLogin").click();
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("emailInput").focus();
	
	// 현준
	var item = localStorage.getItem("memberEmail");
	if(item == null || item == ''){
		return;
	}
	app.lookup("cbx1").checked = true;
	app.lookup("emailInput").text = item;
	app.lookup("pswdInput").focus();
}