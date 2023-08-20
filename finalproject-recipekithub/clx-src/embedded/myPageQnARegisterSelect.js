/************************************************
 * myPageQnARegisterSelect.js
 * Created at 2023. 8. 14. 오후 2:46:41.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var host = app.getHost(); // 부모 임베디드 앱
	var val = host.initValue;
	app.lookup("ipb1").text = val.boardTitle;
	app.lookup("txa1").text = val.boardContent;
	app.lookup("ipb1").redraw();
	app.lookup("txa1").redraw();
	
	// 답변이 있는지 확인
	var dataMap = app.lookup("dmboardinfo");
	dataMap.setValue("boardId", val.boardId);
	dataMap.setValue("boardTitle", val.boardTitle);
	app.lookup("subchkanswer").send();
}

/*
 * "수정하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	var val = host.initValue;
	var initValue = {"boardId": val.boardId,"boardTitle" : val.boardTitle, "boardContent":val.boardContent};
	
    if(confirm("수정화면으로 이동하시겠습니까?")){
		cpr.core.App.load("embedded/myPageQnAUpdateForm", function(loadedApp){
			if (loadedApp){
				host.initValue = initValue;
				host.app = loadedApp;
			}
		});
    }
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubchkanswerSubmitSuccess(e){
	var subchkanswer = e.control;
	var metadata = subchkanswer.getMetadata("chkmessage");
	var dataMap = app.lookup("dmanswerboardinfo");
	if(metadata == 1){ // 답변이 존재
		app.lookup("updatebtn").visible = false; //수정하기 버튼 숨김
		
		var vcIpb = new cpr.controls.InputBox();
		vcIpb.style.css({
			"borderRadius" : "10px" 
		});
		vcIpb.readOnly = true;
		vcIpb.value = dataMap.getValue("boardAnswerTitle");
		app.lookup("answergrp").addChild(vcIpb, {
			width : "669px",
			height : "40px",
			autoSize : "none"
		});
		
		// 텍스트 에어리어 추가
		var textArea = new cpr.controls.TextArea();
		textArea.style.css({
			"borderRadius" : "10px" 
		});
		textArea.readOnly = true;
		textArea.value = dataMap.getValue("boardAnswerContent");
		app.lookup("answergrp").addChild(textArea, {
			width : "669px",
			height : "200px",
			autoSize : "none"
		});		
//		moveControl();
		app.lookup("answergrp").redraw();
	}
}

function moveControl(){
	/* 폼 레이아웃 컨트롤 위치 변경 */
	app.lookup("rootgrp").updateConstraint(app.lookup("buttongrp"), {
		top : "",
		left : "",
		bottom : "0px",
		right : "0px",
		height : "50px",
		width : "669px"
	});
}

/*
 * "뒤로가기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	
	cpr.core.App.load("embedded/myPageQuestion", function(loadedApp){
		if (loadedApp){
//			host.initValue = initValue;
			host.app = loadedApp;
		}
	});
}
