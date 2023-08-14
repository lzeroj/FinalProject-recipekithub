/************************************************
 * myPageQnARegisterForm.js
 * Created at 2023. 8. 13. 오후 11:20:05.
 *
 * @author shj22k
 ************************************************/

/*
 * "등록하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var dataMap = app.lookup("qnaparam");
	dataMap.setValue("boardTitle", app.lookup("ipb1").text);
	dataMap.setValue("boardContent", app.lookup("txa1").text);
	app.lookup("subqna").send();
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	if(confirm("정말 취소하시겠습니까?")){
		cpr.core.App.load("embedded/myPageQuestion", function(loadedApp){
			if (loadedApp){
				host.app = loadedApp;
			}
		});
    }
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubqnaSubmitSuccess(e){
	var subqna = e.control;
	var insertResult = subqna.getMetadata("insertResult");
	var host = app.getHost(); // 부모 임베디드 앱
	if(insertResult==1){
		alert("등록되었습니다");
		cpr.core.App.load("embedded/myPageQuestion", function(loadedApp){
			if (loadedApp){
				host.app = loadedApp;
			}
		});
	}
}
