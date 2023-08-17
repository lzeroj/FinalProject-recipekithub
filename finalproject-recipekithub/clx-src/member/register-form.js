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
function onButtonClick(e) {
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
	dataMap1.setValue("member_postcode", app.lookup("postCode").value);
	dataMap1.setValue("member_address", app.lookup("address").value);
	dataMap1.setValue("member_address_detail", app.lookup("detailAddress").value);
	var subLogin = app.lookup("sub_register");
	subLogin.send();
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e) {
	window.location.href = "index.clx";
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_registerSubmitSuccess(e) {
	var sub_register = e.control;
	alert("RecipeKitHub에 오신 것을 환영합니다..!!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbEmailKeyup(e) {
	var ipbEmail = e.control;
	var subCheckEmail = app.lookup("sub_check_email");
	subCheckEmail.send();
	var checkEmailFlag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var metadata = subCheckEmail.getMetadata("message");
	
	var dataMap = app.lookup("dm_check_email");
	dataMap.setValue("member_email", app.lookup("ipbEmail").value);
	
	var memberEmail = app.lookup("ipbEmail");
	var opbCheckEmailResult = app.lookup("opbCheckEmail");
	memberEmail.addEventListener('keyup', onIpbEmailKeyup);
	
	
	if (memberEmail.length < 6 || memberEmail.length > 30) {
		opbCheckEmailResult.value = "email은 6자이상 ~ 30자 이하이어야 합니다.";
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				//if (xhr.responseText == "fail") {
				if (metadata == "fail") {
					opbCheckEmailResult.value = "이메일이 중복됩니다.";
				} else {
					checkEmailFlag = true;
					opbCheckEmailResult.value = "사용가능한 이메일입니다.";
				}
			}
		}
		//xhr.open("get", "../member/checkEmail", true);
		//xhr.open("get", "../member/checkEmail?memberEmail=" + memberEmail, true);
		//xhr.send();
		
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
function onIpbPassword1Keyup(e) {
	var ipbPassword1 = e.control;
	var checkPswd1Flag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var password1 = app.lookup("ipbPassword1");
	password1.addEventListener('keyup', onIpbPassword1Keyup);
	
	console.log(password1);
	var checkPswdResult1 = app.lookup("opbCheckPassword");
	if (password1.length < 2 || password1.length > 25) {
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.text = "비밀번호는 1자 이상 25자 이하이어야 합니다.";
	} else {
		checkPswdResult1.style.css("color", "blue");
		checkPswdResult1.text = "사용가능한 비밀번호입니다.";
	}
}

/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword2Keyup(e) {
	var ipbPassword2 = e.control;
	console.log(ipbPassword2.value);
	var checkPswd2Flag = false;
	var password2 = app.lookup("ipbPassword2");
	//password2.addEventListener('keyup', onIpbPassword2Keyup);
	
	var checkPswdResult2 = app.lookup("opbCheckPassword2");
	//var pswd2_img1 = document.getElementById("pswd2_img1");
	
	if (app.lookup("ipbPassword1").value != password2.value) {
		console.log(app.lookup("ipbPassword1").value);
		
		checkPswdResult2.style.css("color", "red");
		//app.lookup("opbCheckPassword2").style.css("color", "red");
		checkPswdResult2.value = "위의 비밀번호와 일치하지 않습니다.";
		//pswd2_img1.classList.remove("glow"); 
	} 
	
	if(app.lookup("ipbPassword1").value == password2.value) {
		checkPswdResult2.style.css("color", "blue");
		checkPswdResult2.value = "비밀번호가 일치합니다.";
		//pswd1_img1.classList.add("glow"); 
		//pswd2_img1.classList.add("glow"); 
	}
//	console.log(password2.value);
//	console.log(password2.text);
}


/*
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
*/

function checkNick() {
	var checkNickFlag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
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



/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e) {
	// 다음에서 제공하는 통합로딩 url
	var voResourceLoader = new cpr.core.ResourceLoader();
	voResourceLoader.addScript("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").load().then(function(input) {
		//후처리
	});
}

/*
 * "우편번호" 버튼(btnPostcode)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnPostcodeClick(e) {
	//var btnPostcode = e.control;
	//app.lookup("btnPostcode").click();
	
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
function onBodyUnload(e) {
	var appConf = cpr.core.AppConfig.INSTANCE;
	appConf.getEnvConfig().setValue("appcache", false);
}

/*
 * 인풋 박스에서 value-change 이벤트 발생 시 호출.
 * 변경된 value가 저장된 후에 발생하는 이벤트.
 */
function onIpbPassword2ValueChange(e){
	var ipbPassword2 = e.control;
	var inputBox = app.lookup("ipbPassword2");
//	console.log(inputBox.value);
}

/*
 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword2Keydown(e){
	var ipbPassword2 = e.control;
	var inputBox = app.lookup("ipbPassword2");
//	console.log(inputBox.value);
	
}

/*
 * 인풋 박스에서 input 이벤트 발생 시 호출.
 * 입력상자에 보여주는 텍스트가 키보드로부터 입력되어 변경되었을때 발생하는 이벤트.
 */
function onIpbPassword2Input(e){
	var ipbPassword2 = e.control;
	var inputBox = app.lookup("ipbPassword2");
//	console.log("text : "+inputBox.text);
//	console.log("value : "+inputBox.value);
	
}
