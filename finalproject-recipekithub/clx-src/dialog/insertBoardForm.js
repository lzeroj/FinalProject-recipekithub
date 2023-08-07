/************************************************
 * insertBoardForm.js
 * Created at 2023. 8. 6. 오전 1:17:59.
 *
 * @author shj22k
 ************************************************/

/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var submission = app.lookup("subBoardInfo");
	submission.send();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubBoardInfoSubmitDone(e){
	var subBoardInfo = e.control;
	var metadata = subBoardInfo.getMetadata("result");
	app.close(metadata);
}
