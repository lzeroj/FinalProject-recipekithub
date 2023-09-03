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
	var loginBtn = e.control;
	var subLogin = app.lookup("sub_login");
	subLogin.send();
}


/*
 * "회원가입" 버튼(registerBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
// "회원가입" 버튼 클릭시 회원가입 화면으로 이동 
function onRegisterBtnClick(e) {
	var registerBtn = e.control;
	cpr.core.App.load("member/register-form", function(newapp){
		app.close();
		newapp.createNewInstance().run();
	});
}


/*
 * "이메일 / 비밀번호 찾기" 버튼(findBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
// "이메일 / 비밀번호 찾기"  버튼 클릭시 "이메일 / 비밀번호 찾기" 화면으로 이동 
function onFindBtnClick(e) {
	var findBtn = e.control;
	cpr.core.App.load("member/find-email-pswd", function(newapp){
		app.close();
		newapp.createNewInstance().run();
	});
}


// 로그인 데이터 저장과 만료 시간 설정	
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
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
// 로그인이 성공적으로 이루어진 경우
function onSub_loginSubmitSuccess(e) {
	var sub_login = e.control;
	var checkBox = app.lookup("cbx1");
	var memberEmail = app.lookup("dm_login").getValue("member_email");
	
	// "Email 저장" 체크박스가 체크된 경우, 브라우저의 로컬 스토리지에 "memberEmail" 키로 현재 로그인한 회원의 이메일 정보를 저장.
	if(checkBox.checked){
		localStorage.setItem("memberEmail", memberEmail);
	}
	// 세션 데이터를 30분 동안 유지
	setTimedSessionData("memsession", memberEmail, 30);

	// 서브미션(sub_login)과 MemberController의 통신이 성공적인 경우의 메타데이터를 전달 받음
	var loginSuccess = sub_login.getMetadata("path");
	
	location.href="index.clx";
}


/*
 * 서브미션에서 submit-error 이벤트 발생 시 호출.
 * 통신 중 문제가 생기면 발생합니다.
 */
// 로그인 정보가 부적합하여 로그인에 실패한 경우, 다이얼로그 호출
function onSub_loginSubmitError(e) {
	var sub_login = e.control;
	var loginFail = sub_login.getMetadata("loginFailMessage");
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, headerClose: true
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = loginFail;
		});
	});
}


/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onPswdInputKeydown(e) {
	var pswdInput = e.control;
	// 비밀번호를 입력한 후 "enter"키를 눌렀을 때 로그인 버튼이 실행되도록
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
	
	// local storage에 이전에 접속한 회원의 email 정보가 남아 있는 경우, 변수 item에 저장
	var item = localStorage.getItem("memberEmail");
	if(item == null || item == ''){
		return;
	}
	
	// "Email 저장" 체크박스가 체크되어 있고 item에 저장된 email 정보가 있는 경우, "emailInput"에 정보 출력
	app.lookup("cbx1").checked = true;
	app.lookup("emailInput").text = item;
	app.lookup("pswdInput").focus();
}

/*
 * 버튼(btnHome)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
// 인덱스 페이지로 복귀하는 버튼
function onButtonClick(e){
	var button = e.control;
	cpr.core.App.load("index", function(newapp){
		app.close();
		newapp.createNewInstance().run();
	});
}
