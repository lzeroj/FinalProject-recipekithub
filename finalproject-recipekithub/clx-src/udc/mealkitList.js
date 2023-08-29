/************************************************
 * mealkitList.js
 * Created at 2023. 8. 20. 오후 9:38:25.
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
	app.lookup("img").src = app.getAppProperty("img");
	app.lookup("title").text = app.getAppProperty("title");
	app.lookup("nick").text = app.getAppProperty("nick");
	app.lookup("star").text = app.getAppProperty("star");
	app.lookup("price").text = app.getAppProperty("price");
	app.lookup("count").text = app.getAppProperty("count");
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImgClick(e){
	var img = e.control;
	var event = new cpr.events.CAppEvent("imgClick");
	app.dispatchEvent(event);
}
