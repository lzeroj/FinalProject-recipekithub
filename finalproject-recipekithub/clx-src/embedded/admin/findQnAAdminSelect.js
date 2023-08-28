/************************************************
 * findQnAAdminSelect.js
 * Created at 2023. 8. 20. 오후 12:58:06.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var host = app.getHost();
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
 * "답변 달기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	/* 버티컬 레이아웃 마지막 인덱스에 컨트롤 추가 */
	var vcIpb = new cpr.controls.InputBox();
	vcIpb.style.css({
		"borderRadius" : "10px" 
	});
	vcIpb.value = "RE : 안녕하세요 Recipe-Kit-Hub 입니다";
	app.lookup("grp2").addChild(vcIpb, {
		width : "300px",
		height : "40px",
		autoSize : "none"
	});
	
	// 텍스트 에어리어 추가
	var textArea = new cpr.controls.TextArea();
	textArea.style.css({
		"borderRadius" : "10px" 
	});
	textArea.value = "안녕하세요 Recipe-Kit-Hub 관리자 SHJ 입니다";
	app.lookup("grp2").addChild(textArea, {
		width : "300px",
		height : "200px",
		autoSize : "none"
	});
	
	// 버튼 추가
	var vcBtn = new cpr.controls.Button();
	vcBtn.style.css({
		"backgroundImage" : "none",
		"backgroundColor" : "#0ebc59",
		"color" : "#FFFFFF"
	});
	vcBtn.id = "btn3";
	vcBtn.value = "등록하기";
	vcBtn.addEventListener("click", function(e){
		var dataMap = app.lookup("dmqnaselect");
		var host = app.getHost();
		var val = host.initValue;
		dataMap.setValue("boardId", val.boardId);
		dataMap.setValue("boardAnswerTitle", vcIpb.text);
		dataMap.setValue("boardAnswerContent", textArea.text);
		app.getRootAppInstance().openDialog("dialog/needConfirm", {
			width: 400, height: 300, headerVisible: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = "등록하시겠습니까?";
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				app.lookup("subinsertqnaanswer").send();
			}
		});
	});
	app.lookup("grp2").addChild( vcBtn, {
		width : "100px",
		height : "30px",
		autoSize : "width"
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubinsertqnaanswerSubmitSuccess(e){
	var subinsertqnaanswer = e.control;
	var metadata = subinsertqnaanswer.getMetadata("insertResult");
	console.log(metadata);
	if(metadata == 1){
		app.openDialog("dialog/successQnARegister", {
			width: 400, height: 300, headerVisible: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				var host = app.getHost(); // 부모 임베디드 앱
				cpr.core.App.load("embedded/admin/findQnAAdminForm", function(loadedApp){
					if (loadedApp){
						host.app = loadedApp;
					}
				});
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
//		app.lookup("btn1").visible = false; //수정하기 버튼 숨김
		var btngrp = app.lookup("btngrp");
		app.lookup("grp1").removeChild(btngrp,true);
		
		var vcIpb = new cpr.controls.InputBox();
		vcIpb.style.css({
			"borderRadius" : "10px",
			"background-color":"#FAFAFA"
		});
		vcIpb.readOnly = true;
		vcIpb.value = dataMap.getValue("boardAnswerTitle");
		app.lookup("grp2").addChild(vcIpb, {
			width : "669px",
			height : "40px",
			autoSize : "none"
		});
		
		// 텍스트 에어리어 추가
		var textArea = new cpr.controls.TextArea();
		textArea.style.css({
			"borderRadius" : "10px",
			"background-color":"#FAFAFA"
		});
		textArea.readOnly = true;
		textArea.value = dataMap.getValue("boardAnswerContent");
		app.lookup("grp2").addChild(textArea, {
			width : "669px",
			height : "200px",
			autoSize : "none"
		});		
		
		// 버튼 추가
		var button = new cpr.controls.Button();
		button.style.css({
			"background":"#0ebc59 none",
			"color":"#FFFFFF",
			"margin-bottom":"20px"
		});
		button.addEventListener("click", function(e){
			var host = app.getHost(); // 부모 임베디드 앱
			cpr.core.App.load("embedded/admin/findQnAAdminForm", function(loadedApp){
				if (loadedApp){
		//			host.initValue = initValue;
					host.app = loadedApp;
				}
			});
		});
		button.text = "뒤로가기";
		app.lookup("reversebtn").addChild(button, {
			width : "140px",
			height : "30px",
			right: "0px",
		});	
		app.lookup("grp2").redraw();
		app.lookup("reversebtn").redraw();
	}	
}
