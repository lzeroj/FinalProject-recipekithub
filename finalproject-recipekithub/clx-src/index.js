/************************************************
 * index.js
 * Created at 2023. 8. 7. 오후 1:57:31.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	//	console.log(getSessionStorage("memsession"));
	var vcEmb = app.lookup("ea1");
	cpr.core.App.load("embedded/mainRecipeAndMealkit", function( /*cpr.core.App*/ loadedApp) {
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
		if (vcEmb.getEmbeddedAppInstance()) {
			vcEmb.getEmbeddedAppInstance().dispose();
		}
		/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
		if (loadedApp) {
			/*초기값을 전달합니다.*/
			vcEmb.ready(function( /*cpr.controls.EmbeddedApp*/ embApp) {
				//				embApp.initValue = voInitValue;
			})
			/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
			vcEmb.app = loadedApp;
		}
	});
	app.lookup("ea1").redraw();;
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImageClick(e) {
	var image = e.control;
	window.scrollTo(0, 0);
}

/*
 * 사용자 정의 컨트롤에서 event 이벤트 발생 시 호출.
 */
function onHeader3Event(e) {
	var header3 = e.control;
	//var comboBox = app.getAppProperty("cmb1");
	
	//var comboBox = header3.cmb1;
	
	//alert("logout1");
	
	//comboBox.addEventListener("logout", function(e) {
	
	//alert("logout2");
	
	/*
	//if (comboBox.value == "logout") {
	if (comboBox.hasOwnProperty("logout")) {
		var initValue = "로그아웃 하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400,
			height: 300,
			headerClose: true,
			resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var submission = app.lookup("sub_logout");
			submission.send();
		});
	*/
	
	/*
	app.openDialog("dialog/registerPopup", {
			width: 400,
			height: 300,
			headerClose: true,
			resizable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				//dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			var submission = app.lookup("sub_logout");
			submission.send();
		});
	*/
	
	//}
	
	//});
}