/************************************************
 * imgButton.js
 * Created at 2022. 5. 30. 오후 5:02:20.
 *
 * @author techdom
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	//[삭제] 버튼 클릭시 이미지를 삭제하는 이벤트 출판
	var event = new cpr.events.CUIEvent("deleteImg");
	app.dispatchEvent(event);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	//출판한 [이미지 경로] 앱 속성을 이미지의 경로로 지정
	app.lookup("img1").src = app.getAppProperty("src");
}

