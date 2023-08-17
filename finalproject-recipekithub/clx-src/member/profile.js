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
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index1.clx");
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
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index1.clx");
	httpPostMethod.submit();
}


/*
 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(e) {
	window.location.href = "index1.clx";
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
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index1.clx");
	httpPostMethod.submit();
}

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
