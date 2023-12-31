/************************************************
 * header.js
 * Created at 2023. 8. 8. 오후 3:17:56.
 *
 * @author shj22k
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

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

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onHeaderLogoClick(e){
	var headerLogo = e.control;
	if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
		if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
			window.location.href = "/";
		}
	} else {
		window.location.href = "/";
	}
}

/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var sessionstrg = getTimedSessionData("memsession");
	console.log("sessionstrg : "+sessionstrg);
	if(sessionstrg == null || sessionstrg == ''){
		app.getRootAppInstance().openDialog("dialog/needLogin", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				location.href="member/login-form.clx";
			}
		});
	}else{
		if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
			if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
				window.location.href = "/findMyCartForm";
			}
		} else {
			/** @type cpr.controls.EmbeddedApp */
			var embeapp = app.getAppProperty("embe");
			cpr.core.App.load("cart/cartForm", function( /*cpr.core.App*/ loadedApp) {
				/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
				if (embeapp.getEmbeddedAppInstance()) {
					embeapp.getEmbeddedAppInstance().dispose();
				}
				/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
				if (loadedApp) {
					/*초기값을 전달합니다.*/
					embeapp.ready(function( /*cpr.controls.EmbeddedApp*/ embApp) {
						//					embApp.initValue = voInitValue;
					})
					/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
					embeapp.app = loadedApp;
				}
			});
			embeapp.redraw();
		}
	}
}

/*
 * 버튼(mypage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onMypageClick(e){
	var mypage = e.control;
	var sessionval = getTimedSessionData("memsession");
	console.log("sessionval : "+sessionval);
	if(sessionval == null || sessionval == ''){
		app.getRootAppInstance().openDialog("dialog/needLogin", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				console.log(returnValue);
				location.href="member/login-form.clx";
			}
		});
	}else{
		if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
			if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
				location.href = "/findMyPageForm";
			}
		} else {
			location.href = "/findMyPageForm";
		}
	}
}

/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNavigationBarItemClick(e) {
	var navigationBar = e.control;
	if(navigationBar.value == null || navigationBar.value == ''){
		return;
	}
	if (navigationBar.value == 'mealkit') {
		if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
			if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
				window.location.href = "/mealkitList";
			}
		} else {
			window.location.href = "/mealkitList";
		}
	}
	
	if (navigationBar.value == 'questionAdmin') {
		/** @type cpr.controls.EmbeddedApp */
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findQnAAdminForm", function( /*cpr.core.App*/ loadedApp) {
			/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
			if (embeapp.getEmbeddedAppInstance()) {
				embeapp.getEmbeddedAppInstance().dispose();
			}
			/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
			if (loadedApp) {
				/*초기값을 전달합니다.*/
				embeapp.ready(function( /*cpr.controls.EmbeddedApp*/ embApp) {
					//					embApp.initValue = voInitValue;
				})
				/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
				embeapp.app = loadedApp;
			}
		});
		embeapp.redraw();
	}
	
	if (navigationBar.value == 'reportAdmin') {
		/** @type cpr.controls.EmbeddedApp */
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findReportAdminForm", function( /*cpr.core.App*/ loadedApp) {
			/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
			if (embeapp.getEmbeddedAppInstance()) {
				embeapp.getEmbeddedAppInstance().dispose();
			}
			/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
			if(loadedApp){						
				/*초기값을 전달합니다.*/			
				embeapp.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
//					embApp.initValue = voInitValue;
				})
				/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
				embeapp.app = loadedApp;
			}
		});
		embeapp.redraw();
	}
	
	//salesAdmin
	if(navigationBar.value == 'salesAdmin'){
		/** @type cpr.controls.EmbeddedApp */ 
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findSalesAdminForm", function(/*cpr.core.App*/ loadedApp){
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
			if(embeapp.getEmbeddedAppInstance()){
				embeapp.getEmbeddedAppInstance().dispose();
			}
			/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
			if(loadedApp){						
				/*초기값을 전달합니다.*/			
				embeapp.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
//					embApp.initValue = voInitValue;
				})
				/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
				embeapp.app = loadedApp;
			}
		}); 
		embeapp.redraw();
	}
	
	//---[ 관리자 - 회원조회 메뉴 ]---//
	if(navigationBar.value == 'memberAdmin'){
		/** @type cpr.controls.EmbeddedApp */ 
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findMemberDetail", function(/*cpr.core.App*/ loadedApp){
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
			if(embeapp.getEmbeddedAppInstance()){
				embeapp.getEmbeddedAppInstance().dispose();
			}
			/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
			if(loadedApp){						
				/*초기값을 전달합니다.*/			
				embeapp.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
				})
				/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
				embeapp.app = loadedApp;
			}
		}); 
		embeapp.redraw();
	}
	
	if (navigationBar.value == 'recommend') {
		if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
			if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
				window.location.href = "/";
			}
		} else {
			window.location.href = "/";
		}
	}
		if(navigationBar.value == 'chef'){
		/** @type cpr.controls.EmbeddedApp */ 
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/findChefList", function(/*cpr.core.App*/ loadedApp){
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
			if(embeapp.getEmbeddedAppInstance()){
				embeapp.getEmbeddedAppInstance().dispose();
			}
			/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
			if(loadedApp){						
				/*초기값을 전달합니다.*/			
				embeapp.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
//					embApp.initValue = voInitValue;
				})
				/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
				embeapp.app = loadedApp;
			}
		}); 
		embeapp.redraw();
	}
	if (navigationBar.value == 'recipe') {
		if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
			if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
				window.location.href = "/recipeBoardList";
			}
		} else {
			window.location.href = "/recipeBoardList";
		}
	}
}

/*
 * 버튼(btnWrite)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWriteClick(e) {
	var btnWrite = e.control;
	if (window.location.href === "http://localhost:7777/insertRecipeForm" || window.location.href === "http://localhost:7777/updateRecipe") {
		if (confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")) {
			var _httpPostMethod = new cpr.protocols.HttpPostMethod("/insertRecipeForm", "_self");
			_httpPostMethod.submit();
		}
	} else {
		var sessionval = getTimedSessionData("memsession");
		if (sessionval == null) {
			app.getRootAppInstance().openDialog("dialog/needLogin", {
				width: 400, height: 300, headerClose: true
			}, function(dialog) {
				dialog.ready(function(dialogApp) {
					
				});
			}).then(function(returnValue){
				if(returnValue == "ok"){
					console.log(returnValue);
					location.href="member/login-form.clx";
				}
			});
		} else {
			var _httpPostMethod = new cpr.protocols.HttpPostMethod("/insertRecipeForm", "_self");
			_httpPostMethod.submit();
		}
	}
}

/*
 * 버튼(btnLoginoff)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoginoffClick(e) {
	var btnLoginoff = e.control;
	window.location.href = "/memberUI/loginForm";
	var event = new cpr.events.CAppEvent("clickEvent");
	app.dispatchEvent(event);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	var sessionval = getTimedSessionData("memsession");
	console.log("세션에 담긴값 : " + sessionval);
	var navigationBar = app.lookup("nav1");
	if (navigationBar.isSelectedByValue("admin") ||
		navigationBar.isSelectedByValue("questionAdmin") ||
		navigationBar.isSelectedByValue("reportAdmin")) {
		return;
	}
	
	if (sessionval == "shj" || sessionval == "kjoonie@naver.com") {
		navigationBar.addItem(new cpr.controls.TreeItem("관리자", "admin", "root"));
		navigationBar.addItem(new cpr.controls.TreeItem("Q&A관리", "questionAdmin", "admin"));
		navigationBar.addItem(new cpr.controls.TreeItem("신고관리", "reportAdmin", "admin"));
		navigationBar.addItem(new cpr.controls.TreeItem("매출관리", "salesAdmin", "admin"));
		navigationBar.addItem(new cpr.controls.TreeItem("회원조회", "memberAdmin", "admin"));
	}
	app.lookup("category").value = app.getAppProperty("categoryValue");
	app.lookup("searchInput").value = app.getAppProperty("searchValue");
	var opbLoginStatus = app.lookup("opbLoginStatus");
	if (sessionval != null) {
		opbLoginStatus.text = "[ " + sessionval + " ] \n님이 로그인 상태입니다.";
	} else {
		opbLoginStatus.text = "현재 비로그인 상태입니다."
	}
}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */

function onSearchInputSearch(e) {
	var searchInput = e.control;
	var comboBox = app.lookup("category");
	if(comboBox.value =="" || comboBox.value ==null){
		alert("카테고리 선택하세요");
		return;
	}
	if(comboBox.value =="레시피"){
		if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
			if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
				window.location.href="/recipeBoardList?search="+ searchInput.value;
			}
		} else {
			window.location.href = "/recipeBoardList?search=" + searchInput.value;
		}
	}
	if(comboBox.value =="밀키트"){
		window.location.href="/mealkitList?search="+searchInput.value;
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
		app.getRootAppInstance().openDialog("dialog/memberPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			sessionStorage.clear();
			var submission = app.lookup("sub_logout");
			submission.send();
			window.location.href = "/memberUI/loginForm";
		});
		
	// 로그인 상태의 경우, 콤보박스에 "프로필" 메뉴 표시
	} else if (cmb1.value == "profile") {
		var httpPostMethod = new cpr.protocols.HttpPostMethod("member/myProfile.clx");
		httpPostMethod.submit();
    }
}
