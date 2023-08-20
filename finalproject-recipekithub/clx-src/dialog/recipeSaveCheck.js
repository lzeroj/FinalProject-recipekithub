/************************************************
 * saveCheck.js
 * Created at 2023. 8. 20. 오후 5:18:57.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	/* 해당 앱이 누군가로부터 불렸는지 (부모가 있는지) 확인*/
	var vcDialog = app.getHost(); 
	if (vcDialog){
		/*다이얼로그의 initValue 가져오기*/
		var voInitValue = app.getHostProperty("initValue");
		/*해당 값이 Null인지 여부를 체크하여 반환한다. */
			/*initValue 내의 msg 값을 아웃풋에 표시*/
			app.lookup("optValue").value = voInitValue["msg"];
	}
}

/*
 * "확인" 버튼(btnSubmit)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnSubmitClick(e){
	var btnSubmit = e.control;
	app.close(true);
}

/*
 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnCancelClick(e){
	var btnCancel = e.control;
	app.close(false);
}
