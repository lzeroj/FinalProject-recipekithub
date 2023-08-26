/************************************************
 * findMemberDetail.js
 * Created at 2023. 8. 23. 오전 10:40:39.
 *
 * @author kjoon
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("sub_findMemberList").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_findMemberListSubmitSuccess(e){
	var sub_findMemberList = e.control;
	var grid = app.lookup("grd_member");
	grid.redraw();
}

/*
 * 그리드에서 selection-change 이벤트 발생 시 호출.
 * detail의 cell 클릭하여 설정된 selectionunit에 해당되는 단위가 선택될 때 발생하는 이벤트.
 */
function onGrd_memberSelectionChange(e){
	var grd_member = e.control;
	
}

/*
 * "삭제" 버튼(btnDeleteRow)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnDeleteRowClick(e){
	var btnDeleteRow = e.control;
	var grdMem = app.lookup("grd_member"); 	
	// 사용자가 선택한 행을 찾는다 
	var selectedRowIndex = grdMem.getSelectedRowIndex();
	// 사용자가 체크한 행을 찾는다
	var checkRowIndices = grdMem.getCheckRowIndices();
	
	//var memberEmail = null;
	var memberEmails = [];
	
	if (selectedRowIndex != -1) {
        //memberEmail = grdMem.getCellValue(selectedRowIndex, "memberEmail");
        var memberEmail = grdMem.getCellValue(selectedRowIndex, "memberEmail");
        memberEmails.push(memberEmail);
        
		grdMem.deleteRow(selectedRowIndex);
	}
	
	if (checkRowIndices.length > 0) { 
		//grdMem.deleteRow(checkRowIndices);
		
		checkRowIndices.sort(function(a, b) { return b - a; });

        // Loop through the sorted array and delete rows
        for (var i = 0; i < checkRowIndices.length; i++) {
            var rowIndex = checkRowIndices[i];
            var memberEmail = grdMem.getCellValue(rowIndex, "memberEmail");
            memberEmails.push(memberEmail);
            grdMem.deleteRow(rowIndex);
        }
	}
	
	//var cellIndex = grdMem.getCellIndex("memberEmail");
	//grdMem.getSelectedIndices()[0].rowIndex;
	//grdMem.get
	
	if (selectedRowIndex == null || checkRowIndices == null) {
		var initValue = "선택한 회원이 없습니다.\n다시 한번 확인해주세요.";
		app.openDialog("dialog/memberChkPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		});
	} else {
		var initValue = "선택하신 회원의 정보를 삭제하시겠습니까?";
		app.openDialog("dialog/memberChkPopup", {
			width: 400, height: 300, resizable: false, headerMovable: false
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			 var dataSet = app.lookup("ds_member");
			
			/*
			dataMap.setValue("memberEmail", app.lookup("opbEmail").value);
			
			if (memberEmail !== null) {
                dataMap.setValue("memberEmail", memberEmail);
            }
            */
			
            dataSet.setValue("memberEmail", memberEmail);
			
			var submission = app.lookup("sub_delete");
			submission.send();
		});
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_deleteMemberSubmitSuccess(e){
	var sub_delete = e.control;
	var initValue = "선택하신 회원 정보의\n 삭제가 완료되었습니다.";
	app.openDialog("dialog/memberChkPopup", {
		width: 400, height: 300, resizable: false, headerMovable: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		var grid = app.lookup("grd_member");
		grid.clearSelection();
		grid.redraw();
	});
}

/*
 * 서치 인풋에서 value-change 이벤트 발생 시 호출.
 * SearchInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onSearchMemberValueChange(e){
	var searchMember = e.control;
	var submission = app.lookup("sub_findMemberList");
	submission.send();
	
}


