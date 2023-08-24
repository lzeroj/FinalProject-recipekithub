/************************************************
 * chefListIndexudc.js
 * Created at 2023. 8. 24. 오후 2:19:43.
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

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("chefemail").text = app.getAppProperty("memberEmail");
	app.lookup("chefimg").src = app.getAppProperty("memberImage");
	app.lookup("chefnick").text = app.getAppProperty("memberNick");
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onChefimgClick(e){
	var chefimg = e.control;
	var event = new cpr.events.CAppEvent("memberImageClick");
	app.dispatchEvent(event);
}
