/************************************************
 * mealkitComment.js
 * Created at 2023. 8. 18. 오후 2:40:09.
 *
 * @author KOSTA
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
	app.lookup("nick").text = app.getAppProperty("nick");
	app.lookup("regDate").text = app.getAppProperty("regDate");
	app.lookup("content").text = app.getAppProperty("content");
	app.lookup("star").text = app.getAppProperty("star");
	app.lookup("deleteBtn").visible = app.getAppProperty("deleteBtn");
}

/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var event = new cpr.events.CAppEvent("updateClick");
	app.dispatchEvent(event);
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
//function onButtonClick2(e){
//	var button = e.control;
//	var event = new cpr.events.CAppEvent("deleteClick");
//	app.dispatchEvent(event);
//}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	var event = new cpr.events.CAppEvent("deleteClick");
	app.dispatchEvent(event);
}
