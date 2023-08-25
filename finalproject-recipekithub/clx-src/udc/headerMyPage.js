/************************************************
 * headerMyPage.js
 * Created at 2023. 8. 21. 오후 4:32:15.
 *
 * @author shj22k
 ************************************************/
function getTimedSessionData(key) {
    var storedData = sessionStorage.getItem(key);

    if (storedData) {
        var data = JSON.parse(storedData);
        var currentTime = new Date().getTime();

        if (currentTime < data.expirationTime) {
            return data.value;
        } else {
            sessionStorage.removeItem(key);
        }
    }
    return null;
}

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onHeaderLogoClick(e){
	var headerLogo = e.control;
	window.location.href="/";
}

/*
 * 버튼(mypage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onMypageClick(e){
	var mypage = e.control;
	window.location.href="/findMyPageForm";	
}

/*
 * 버튼(cartbtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onCartbtnClick(e){
	var cartbtn = e.control;
	window.location.href = "/mealkitList";
}

/*
 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
 */
function onCmb1SelectionChange(e){
	var cmb1 = e.control;
	
    // 비로그인 상태의 경우, 콤보박스에 "로그인" 메뉴 표시
    if (cmb1.value == "login") { 
        window.location.href = "/memberUI/loginForm";
		
	// 로그인 상태의 경우, 콤보박스에 "로그아웃" 메뉴 표시
    } else if (cmb1.value == "logout") {
    	var initValue = "로그아웃 하시겠습니까?";
		app.getRootAppInstance().openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			sessionStorage.clear();
			var submission = app.lookup("sub_logout");
			submission.send();
			var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
			httpPostMethod.submit();
		});
		
	// 로그인 상태의 경우, 콤보박스에 "프로필" 메뉴 표시
	} else if (cmb1.value == "profile") {
		var httpPostMethod = new cpr.protocols.HttpPostMethod("member/myProfile.clx");
		httpPostMethod.submit();
    }
	
}

/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(e){
	var cmb1 = e.control;
	var sessionval = getTimedSessionData("memsession");

	cmb1.deleteAllItems();

    if (sessionval) { 
        cmb1.addItem(new cpr.controls.Item("로그아웃", "logout"));
        cmb1.addItem(new cpr.controls.Item("프로필", "profile"));
    } else {
        cmb1.addItem(new cpr.controls.Item("로그인", "login"));
    }
	
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var opbLoginStatus = app.lookup("opbLoginStatus");
	var sessionval = getTimedSessionData("memsession");
	console.log("세션에 담긴값 : " + sessionval);
	if (sessionval != null) {
		opbLoginStatus.text = "[ " + sessionval + " ] \n님이 로그인 상태입니다.";
	} else {
		opbLoginStatus.text = "현재 비로그인 상태입니다."
	}
	
}
