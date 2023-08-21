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
	if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
		if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
			window.location.href="/";
		}
	}else{
	window.location.href="/";
	}
}

/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
		if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
			window.location.href="/findMyCartForm";
		}
	}else{
//	window.location.href="/findMyCartForm";
	
	/** @type cpr.controls.EmbeddedApp */ 
	var embeapp = app.getAppProperty("embe");
	cpr.core.App.load("cart/cartForm", function(/*cpr.core.App*/ loadedApp){
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
}

/*
 * 버튼(mypage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onMypageClick(e){
	var mypage = e.control;
	if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
		if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
			window.location.href="/findMyPageForm";
		}
	}else{
	window.location.href="/findMyPageForm";
	}
}

/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNavigationBarItemClick(e){
	var navigationBar = e.control;
	if(navigationBar.value == 'question'){
		console.log(1);
	}
	
	if(navigationBar.value == 'mealkit'){
		if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
			if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
				window.location.href="/insertMealkitForm";
			}
		}else{
		window.location.href="/insertMealkitForm";
		}
	}
		
	if(navigationBar.value == 'questionAdmin'){
		/** @type cpr.controls.EmbeddedApp */ 
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findQnAAdminForm", function(/*cpr.core.App*/ loadedApp){
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
	
	if(navigationBar.value == 'reportAdmin'){
		/** @type cpr.controls.EmbeddedApp */ 
		var embeapp = app.getAppProperty("embe");
		cpr.core.App.load("embedded/admin/findReportAdminForm", function(/*cpr.core.App*/ loadedApp){
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
	
	
	if(navigationBar.value == 'recipe'){
		if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
			if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
				window.location.href="/recipeBoardList";
			}
		}else{
		window.location.href="/recipeBoardList";
		}		
	}
}

/*
 * 버튼(btnWrite)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWriteClick(e){
	var btnWrite = e.control;
		if(window.location.href=== "http://localhost:7777/insertRecipeForm" || window.location.href==="http://localhost:7777/updateRecipe"){
			if(confirm("변경된 사항이 저장되지 않습니다. 이동하시겠습니까?")){
				var _httpPostMethod = new cpr.protocols.HttpPostMethod("/insertRecipeForm", "_self");
				_httpPostMethod.submit();
			}
		}else{
				var _httpPostMethod = new cpr.protocols.HttpPostMethod("/insertRecipeForm", "_self");
				_httpPostMethod.submit();
		}	
}

/*
 * 버튼(btnLoginoff)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoginoffClick(e){
	var btnLoginoff = e.control;
	window.location.href="/memberUI/loginForm";
	var event = new cpr.events.CAppEvent("clickEvent");
	app.dispatchEvent(event);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var sessionval = getTimedSessionData("memsession");
	console.log("세션에 담긴값 : "+sessionval);
	var navigationBar = app.lookup("nav1");
	if(navigationBar.isSelectedByValue("admin") 
	|| navigationBar.isSelectedByValue("questionAdmin") 
	|| navigationBar.isSelectedByValue("reportAdmin")){
		return;
	}
	
	if(sessionval == "shj"){
		navigationBar.addItem(new cpr.controls.TreeItem("관리자", "admin", "root"));
		navigationBar.addItem(new cpr.controls.TreeItem("Q&A관리", "questionAdmin", "admin"));
		navigationBar.addItem(new cpr.controls.TreeItem("신고관리", "reportAdmin", "admin"));
	}

}

/*
 * 서치 인풋에서 search 이벤트 발생 시 호출.
 * Searchinput의 enter키 또는 검색버튼을 클릭하여 인풋의 값이 Search될때 발생하는 이벤트
 */

function onSearchInputSearch(e){
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
		}else{
		window.location.href="/recipeBoardList?search="+ searchInput.value;
		}	
	}
}

/*
 * 콤보 박스에서 open 이벤트 발생 시 호출.
 * 리스트박스를 열때 발생하는 이벤트.
 */
function onCmb1Open(e){
	var cmb1 = e.control;
	var sessionval = getTimedSessionData("memsession");

	cmb1.clearFilter();

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
    
    if (cmb1.value == "login") { 
        //window.location.href = "member/login-form.clx";
        cpr.core.App.load("member/login-form", function(loadedApp){
        	var newInstance = loadedApp.createNewInstance();
        	newInstance.run();
        });
        
    } else if (cmb1.value == "logout") {
		var event = new cpr.events.CAppEvent("logout");
		app.dispatchEvent(event);
    	/*
    	var initValue = "로그아웃 하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true, resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var submission = app.lookup("sub_logout");
			submission.send();
		});
        //window.location.href = "/member/logout";
        */
    } else if (cmb1.value == "profile") {
    	cpr.core.App.load("member/myProfile", function(loadedApp){
        	var newInstance = loadedApp.createNewInstance();
        	newInstance.run();
        });
    }
}
