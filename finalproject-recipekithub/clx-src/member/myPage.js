/************************************************
 * myPage.js
 * Created at 2023. 8. 10. 오후 10:24:26.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	console.log(sessionStorage.getItem("memsession"));
	var vcEmb = app.lookup("ea1");
	cpr.core.App.load("embedded/myPagePaymentInfo", function(/*cpr.core.App*/ loadedApp){
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
		if(vcEmb.getEmbeddedAppInstance()){
			vcEmb.getEmbeddedAppInstance().dispose();
		}
		/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
		if(loadedApp){						
			/*초기값을 전달합니다.*/			
			vcEmb.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
//				embApp.initValue = voInitValue;
			})
			/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
			vcEmb.app = loadedApp;
		}
	}); 
	app.lookup("ea1").redraw();
	
	var submission = app.lookup("sub_profile");
	submission.send();
}

/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNav1ItemClick(e){
	var nav1 = e.control;
	var src = null;
	if(nav1.value == '4'){ // QnA 게시판
		src = "embedded/myPageQuestion";
	}else if(nav1.value == '2'){
		src = "embedded/myPagePaymentInfo";
	}else if(nav1.value == '3'){
		src = "embedded/myPageMealkitLike";
	}else if(nav1.value == '1'){
		src = "embedded/myPageRecipeLike";
	}
	var vcEmb = app.lookup("ea1");
	cpr.core.App.load(src, function(/*cpr.core.App*/ loadedApp){
		/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
		if(vcEmb.getEmbeddedAppInstance()){
			vcEmb.getEmbeddedAppInstance().dispose();
		}
		/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
		if(loadedApp){						
			/*초기값을 전달합니다.*/			
			vcEmb.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
//				embApp.initValue = voInitValue;
			})
			/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
			vcEmb.app = loadedApp;
		}
	}); 
	app.lookup("ea1").redraw();	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_profileSubmitSuccess(e){
	var sub_profile = e.control;
	var dsProfile = app.lookup("ds_profile");
	app.lookup("opbEmail").text = dsProfile.getValue(0, "memberEmail");
	app.lookup("opbNick").text = dsProfile.getValue(0, "memberNick");
	app.lookup("profileImg").src = "/upload/profile/" + dsProfile.getValue(0, "memberImage");
}
