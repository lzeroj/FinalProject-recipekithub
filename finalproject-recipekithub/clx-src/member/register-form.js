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
	var dataMap1 = app.lookup("dm_register_member");
	var dataMap2 = app.lookup("dm_check_email");
	var dataMap3 = app.lookup("dm_check_pswd");
	var dataMap4 = app.lookup("dm_check_nick");
	dataMap2.setValue("member_email", app.lookup("ipbEmail").value);
	dataMap3.setValue("member_password", app.lookup("ipbPassword1").value);
	dataMap1.setValue("member_name", app.lookup("ipbName").value);
	dataMap4.setValue("member_nick", app.lookup("ipbNick").value);
	dataMap1.setValue("member_birthday", app.lookup("ipbBirthday").value);
	dataMap1.setValue("member_phone", app.lookup("ipbPhone").value);
	dataMap1.setValue("member_address", app.lookup("ipbAddress").value);
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
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbEmailKeyup(e){
	var ipbEmail = e.control;
	var checkEmailFlag = false;	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	
	var dataMap = app.lookup("dm_check_email");	
	dataMap.setValue("member_email", app.lookup("ipbEmail").value);
	
	var memberEmail = app.lookup("ipbEmail").value;
	var opbCheckEmailResult = app.lookup("opbCheckEmail");
	
	if (memberEmail.length < 6 || memberEmail.length > 25) {
		opbCheckEmailResult.value = "email은 6자이상 ~ 30자 이하이어야 합니다.";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText == "fail") {
					opbCheckEmailResult.value = "이메일이 중복됩니다.";
				} else {
					checkEmailFlag = true;
					opbCheckEmailResult.value = "사용가능한 이메일입니다.";
				}
			}
		}
		//xhr.open("get", "/member/CheckEmail", true);
		//xhr.send();
		var subCheckEmail = app.lookup("sub_check_email");
		subCheckEmail.send();
	}
}

/*
function checkMemberEmail() {
	var checkEmailFlag = false;	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var memberEmail = app.lookup("ipbEmail").value;
	var opbCheckEmailResult = app.lookup("opbCheckEmail");
	if (memberEmail.length < 6 || memberEmail.length > 25) {
		opbCheckEmailResult = "<font color=pink>email은 6자이상 ~ 30자 이하이어야 합니다.</font>";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText == "fail") {
					opbCheckEmailResult = "<font color=red>이메일이 중복됩니다.</font>";
				} else {
					checkEmailFlag = true;
					opbCheckEmailResult = "<font color=blue>사용가능한 이메일입니다.</font>";
				}
			}
		}
		xhr.open("get", "../member/CheckEmail");
		xhr.send();
	}
}
*/


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword1Keyup(e){
	var ipbPassword1 = e.control;
	var checkPswd1Flag = false;	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var password1 = app.lookup("ipbPassword1").value;
	var checkPswdResult1 = app.lookup("opbCheckPassword1");
	if (password1.length < 2 || password1.length > 25) {
		checkPswdResult1 = "비밀번호는 1자 이상 25자 이하이어야 합니다.";
	} else {
		checkPswdResult1 = "사용가능한 비밀번호입니다.";
	}
}

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword2Keyup(e){
	var ipbPassword2 = e.control;
	
}

function comparePassword() {
	var checkPswd2Flag = false;	
	var password2 = app.lookup("ipbPassword2").value;
	var checkPswdResult2 = app.lookup("opbCheckPassword2");
	//var pswd2_img1 = document.getElementById("pswd2_img1");

	if (app.lookup("ipbPassword1").value != password2) {
		checkPswdResult2 = "<font color=red>위의 비밀번호와 일치하지 않습니다. 다시 한번 확인해주세요.</font>";
		//pswd2_img1.classList.remove("glow"); 

	} else {
		checkPswdResult2 = "<font color=blue>비밀번호가 일치합니다.</font>";
		//pswd1_img1.classList.add("glow"); 
		//pswd2_img1.classList.add("glow"); 
	}
}


function checkNick() {
	var checkNickFlag = false;	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var memberNick = app.lookup("ipbNick").value;
	var checkNickResult = document.getElementById("checkNickResult");
	if (memberNick.length < 2 || memberNick.length > 10) {
		checkNickResult = "닉네임은 1자 이상 ~ 8자 이하이어야 합니다.";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				if (xhr.responseText == "fail") {
					checkNickResult = "닉네임이 중복됩니다.";
				} else {
					checkNickFlag = true;
					checkNickResult = "사용가능한 닉네임입니다.";
				}
			}
		}
		xhr.open("get", "../CheckNick");
		xhr.send();
	}
}


