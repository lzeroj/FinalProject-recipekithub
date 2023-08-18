/************************************************
 * mypage.js
 * Created at 2023. 8. 10. 오후 3:52:23.
 *
 * @author kjoon
 ************************************************/

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
function onSub_profileSubmitSuccess(e) {
	var sub_profile = e.control;
	var dsProfile = app.lookup("ds_profile");
	//dataMap 형식으로 수정하기  -> 그룹 전체를 redraw하기
	app.lookup("ipbEmail").text = dsProfile.getValue(0, "memberEmail");
	app.lookup("ipbPassword1").text = dsProfile.getValue(0, "memberPassword");
	app.lookup("ipbName").text = dsProfile.getValue(0, "memberName");
	app.lookup("ipbNick").text = dsProfile.getValue(0, "memberNick");
	app.lookup("address").text = dsProfile.getValue(0, "memberAddress");
	app.lookup("postCode").text = dsProfile.getValue(0, "memberPostcode");
	app.lookup("detailAddress").text = dsProfile.getValue(0, "memberAddressDetail");
	app.lookup("ipbPhone").mask = dsProfile.getValue(0, "memberPhone");
	app.lookup("ipbBirthday").value = dsProfile.getValue(0, "memberBirthday");
}


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword1Keyup(e){
	var ipbPassword1 = e.control;
	var checkPswd1Flag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
	var password1 = app.lookup("ipbPassword1");
	
	var pswd1 = ipbPassword1.displayText;
	var pswd1Value = String(pswd1);
	
	var checkPswdResult1 = app.lookup("opbCheckPassword");
	
	if (pswd1Value === "") {
		checkPswdResult1.text = "";
		app.lookup("imgPswdChk1").src = "";
	} else if (pswd1Value.length < 2 || pswd1Value.length > 25) {
		checkPswdResult1.style.css("color", "red");
		checkPswdResult1.text = "비밀번호는 1자 이상 25자 이하이어야 합니다.";
		app.lookup("imgPswdChk2").src = "../ui/theme/images/member/cross.png";
	} else {
		checkPswdResult1.style.css("color", "blue");
		checkPswdResult1.text = "사용가능한 비밀번호입니다.";
		app.lookup("imgPswdChk1").src = "../ui/theme/images/member/checked.png";
	}
}


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbPassword2Keyup(e){
	var ipbPassword2 = e.control;
	var ipbPassword1 = app.lookup("ipbPassword1");
	
	var pswd1 = ipbPassword1.displayText;
	var pswd1Value = String(pswd1);
	
	var pswd2 = ipbPassword2.displayText;
	var pswd2Value = String(pswd2);
	
	var checkPswdResult2 = app.lookup("opbCheckPassword2");
	
	if (pswd2Value === "") {
		checkPswdResult2.text = "";
		app.lookup("imgPswdChk2").src = "";
	} else if (pswd1Value != pswd2Value) {
		checkPswdResult2.style.css("color", "red");
		checkPswdResult2.value = "위의 비밀번호와 일치하지 않습니다.";
		app.lookup("imgPswdChk2").src = "../ui/theme/images/member/cross.png";
	} else if (pswd1Value === pswd2Value) {
		checkPswdResult2.style.css("color", "blue");
		checkPswdResult2.value = "비밀번호가 일치합니다.";
		app.lookup("imgPswdChk2").src = "../ui/theme/images/member/checked.png";
	}
}


/*
 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
 */
function onIpbNickKeyup(e){
	var ipbNick = e.control;
	var checkNickFlag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화

	var subCheckNick = app.lookup("sub_check_nick");

    var dataMap = app.lookup("dm_check_nick");
    dataMap.setValue("member_nick", ipbNick.value);

    subCheckNick.send();

    subCheckNick.addEventListener('submit-success', function(response) {
        var metadataOk = subCheckNick.getMetadata("ok");
        var metadataFail = subCheckNick.getMetadata("fail");

        var checkNickResult = app.lookup("opbCheckNick");

		var nick = ipbNick.displayText;
		var nickValue = String(nick);

        if (nickValue.length < 2 || nickValue.length > 10) {
            checkNickResult.style.css("color", "red");
            checkNickResult.value = "닉네임은 1자이상 ~ 8자 이하이어야 합니다.";
        } else if (metadataFail) {
            checkNickResult.style.css("color", "red");
            checkNickResult.value = "닉네임이 중복됩니다.";
        } else if (metadataOk) {
        	checkNickFlag = true;
            checkNickResult.style.css("color", "blue");
            checkNickResult.value = "사용가능한 닉네임입니다.";
        }
    });
}


/*
 * "수정" 버튼(btnMemUpdate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMemUpdateClick(e){
	var btnMemUpdate = e.control;
	if(confirm("정말로 수정하시겠습니까?")) {
		var dataMap = app.lookup("dm_update");
		dataMap.setValue("memberEmail", app.lookup("ipbEmail").value);
		dataMap.setValue("memberPassword", app.lookup("ipbPassword1").value);
		dataMap.setValue("memberName", app.lookup("ipbName").value);
		dataMap.setValue("memberNick", app.lookup("ipbNick").value);
		dataMap.setValue("memberBirthday", app.lookup("ipbBirthday").value);
		dataMap.setValue("memberPhone", app.lookup("ipbPhone").value);
		dataMap.setValue("memberPostcode", app.lookup("postCode").value);
		dataMap.setValue("memberAddress", app.lookup("address").value);
		dataMap.setValue("memberAddressDetail", app.lookup("detailAddress").value);
		var submission = app.lookup("sub_update");
		submission.send();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_updateSubmitSuccess(e) {
	var sub_update = e.control;
	alert("회원 정보 수정이 완료되었습니다. 감사합니다!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}


/*
 * "탈퇴" 버튼(btnMemDelete)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMemDeleteClick(e){
	var btnMemDelete = e.control;
	if(confirm("정말로 탈퇴하시겠습니까?")) {
		var dataMap = app.lookup("dm_delete");
		dataMap.setValue("memberEmail", app.lookup("ipbEmail").value);
		var submission = app.lookup("sub_delete");
		submission.send();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_deleteSubmitSuccess(e) {
	var sub_delete = e.control;
	alert("지금까지 RecipeKitHub을 이용해주셔서 감사합니다!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}


/*
 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(e) {
	window.location.href = "index.clx";
}


/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e) {
	var button = e.control;
	var submission = app.lookup("sub_logout");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_logoutSubmitSuccess(e) {
	var sub_logout = e.control;
	alert("로그아웃이 완료되었습니다!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}



/*
 * "프로필 사진 등록" 버튼(btnProfileImg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnProfileImgClick(e){
	var btnProfileImg = e.control;
	
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
function onBodyUnload(e){
	var appConf = cpr.core.AppConfig.INSTANCE;
	appConf.getEnvConfig().setValue("appcache", false);
}
