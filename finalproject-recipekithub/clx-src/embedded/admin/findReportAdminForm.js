/************************************************
 * findReportAdminForm.js
 * Created at 2023. 8. 20. 오후 10:42:35.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("subreportlist").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubreportlistSubmitSuccess(e){
	var subreportlist = e.control;
	app.lookup("grd1").redraw();
}

/*
 * "신고 내용 확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
	var RPgrid = app.lookup("grd1");
	var index = RPgrid.getSelectedIndices()[0].rowIndex;
	var index1 = RPgrid.getSelectedIndices();
	var cellValue = RPgrid.getCellValue(index, 1);
//	var value = RPgrid.getSelectedRow().getValue("recipeBoardId");
	var host = app.getHost(); // 부모 임베디드 앱
	var initvalue = {"recipeBoardId":cellValue};
	cpr.core.App.load("embedded/admin/findReportAdminDetail", function(loadedApp){
		if (loadedApp){
			host.initValue = initvalue;
			host.app = loadedApp;
		}
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubdeleterecipeSubmitSuccess(e){
	var subdeleterecipe = e.control;
	if(subdeleterecipe.getMetadata("deleteRecipeByIdResult") == 1){
		app.getRootAppInstance().openDialog("dialog/noneedConfirm", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = "해당 레시피를 삭제하였습니다"
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				app.lookup("subreportlist").send();
				app.lookup("grd1").redraw();
			}else{
				return;
			}
		});
	}
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = e.control;
	var RPgrid = app.lookup("grd1");
	var image = app.lookup("ximg");
	var cellIndex = RPgrid.getCellIndex("recipeBoardId");
	var index = grd1.getSelectedIndices()[0].rowIndex;
	var cellValue = grd1.getCellValue(index, 1);
	if(e.cellIndex != 6){
		return ;
	}else{
		app.getRootAppInstance().openDialog("dialog/needConfirm", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				dialogApp.initValue = "해당 레시피를 삭제하시겠습니까 ?"
			});
		}).then(function(returnValue){
			if(returnValue == "ok"){
				app.lookup("dmdeleterecipe").setValue("recipeBoardId", cellValue);
				app.lookup("subdeleterecipe").send();
			}else{
				return;
			}
		});
	}
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubdeleterecipeSubmitDone(e){
	var subdeleterecipe = e.control;
	app.lookup("grd1").redraw();
}
