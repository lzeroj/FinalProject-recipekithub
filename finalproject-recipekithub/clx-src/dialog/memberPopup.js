/************************************************
 * 2-Dialog.js
 * Created at 2019. 7. 16. 오후 4:23:26.
 *
 * @author ryu
 ************************************************/

/*
 * Body에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(/* cpr.events.CEvent */ e){
	var host = app.getHost(); // 해당 앱이 누군가로부터 불렸는지 (부모가 있는지) 확인
	if(host){
		// 부모화면에서 보낸값을 팝업창에서 확인
		var hostProperty = app.getHostProperty("initValue");
		app.lookup("opbMessage").value = hostProperty;
	}
}


/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubmitClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnSubmit = e.control;
	app.close(true); // 다이얼로그 닫기
}


/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(/* cpr.events.CMouseEvent */ e){
	/** 
	 * @type cpr.controls.Button
	 */
	var btnCancel = e.control;
	app.close(); // 다이얼로그 닫기
}