/************************************************
 * findQnAAdminForm.js
 * Created at 2023. 8. 17. 오후 4:59:21.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("subfindqnalistadmin").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindqnalistadminSubmitSuccess(e){
	var subfindqnalistadmin = e.control;
	var dataSet = app.lookup("qnalistadmin");
	var metadata = subfindqnalistadmin.getMetadata("memberEmail");
	var grid = app.lookup("grd1");
	for(var i=0;i<dataSet.getRowCount();i++){
		var boardResponseStatus = dataSet.getValue(i, "boardResponseStatus");
		var value = "theme/images/mypage/"+boardResponseStatus+".png";
		dataSet.setValue(i, "memberEmail", metadata[i].memberEmail);
		dataSet.setValue(i, "boardResponseStatus", value);
	}
	grid.redraw();
}

/*
 * "선택 열기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var grid = app.lookup("grd1");
	var selectedRowIndex = grid.getSelectedRowIndex();	
	var row = grid.dataSet.getRow(selectedRowIndex);
	app.lookup("boardIddm").setValue("boardId", row.getValue("boardId"));
	app.lookup("subfindqnadetailadmin").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindqnadetailadminSubmitSuccess(e){
	var subfindqnadetailadmin = e.control;
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
