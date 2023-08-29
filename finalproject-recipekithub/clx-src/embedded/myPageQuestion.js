/************************************************
 * myPageQuestion.js
 * Created at 2023. 8. 13. 오후 10:44:15.
 *
 * @author shj22k
 ************************************************/

/*
 * "새 글 등록하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	app.getRootAppInstance().openDialog("dialog/needConfirm", {
		width: 400, height: 300, headerVisible: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = "등록화면으로 이동하시겠습니까?";
		});
	}).then(function(returnValue){
		if(returnValue == "ok"){
			cpr.core.App.load("embedded/myPageQnARegisterForm", function(loadedApp){
				if (loadedApp){
					host.app = loadedApp;
				}
			});
		}
	});
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("subqnalist").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubqnalistSubmitSuccess(e){
	var subqnalist = e.control;
	app.lookup("qnadslist").refresh();
	var dataSet = app.lookup("qnadslist");
	
	var grid = app.lookup("grd1");
	for(var i=0;i<dataSet.getRowCount();i++){
		var boardResponseStatus = dataSet.getValue(i, "boardResponseStatus");
		var value = "theme/images/mypage/"+boardResponseStatus+".png";
		dataSet.setValue(i, "boardResponseStatus", value);
	}
	grid.redraw();
}


/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubqnaselectSubmitSuccess(e){
	var subqnaselect = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	var boardId = app.lookup("responseqnaselect").getValue(0, "boardId");
	var boardTitle = app.lookup("responseqnaselect").getValue(0, "boardTitle");
	var boardContent = app.lookup("responseqnaselect").getValue(0, "boardContent");
	
	var initValue = {"boardId": boardId , "boardTitle" : boardTitle, "boardContent":boardContent};
	cpr.core.App.load("embedded/myPageQnARegisterSelect", function(loadedApp){
		if (loadedApp){
			host.initValue = initValue;
			host.app = loadedApp;
		}
	});
}

/*
 * "상세보기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	var grid = app.lookup("grd1");
    var selectedRowIndex = grid.getSelectedRowIndex();
//    console.log(selectedRowIndex);
    if(selectedRowIndex == -1 || selectedRowIndex == null){
    	alert("확인할 부분을 선택한 뒤, 상세보기를 클릭해주세요");
    	return;
    }
	app.lookup("requestqnaselect").setValue("boardId", grid.getCellValue(grid.getSelectedRowIndex(), "boardId"));
	app.lookup("subqnaselect").send();
}
