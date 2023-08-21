/************************************************
 * findReportAdminDetail.js
 * Created at 2023. 8. 21. 오전 11:07:31.
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
	app.lookup("dmselectreportlist").setValue("recipeBoardId", val.recipeBoardId);
	app.lookup("subselectreportlist").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubselectreportlistSubmitSuccess(e){
	var subselectreportlist = e.control;
	var metadata = subselectreportlist.getMetadata("selectReportListResult");
	if(metadata == 1){
		app.lookup("grd1").redraw();
	}
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var grid = app.lookup("grd1");
	var selectedRowIndex = grid.getSelectedRowIndex();	
	var dataRow = grid.getDataRow(selectedRowIndex);
	var recipeBoardId = dataRow.getValue("recipeBoardId");
	var memberEmail = dataRow.getValue("memberEmail");
	var reportContent = dataRow.getValue("reportContent");
	var reportTitle = dataRow.getValue("reportTitle");
	var declarationType = dataRow.getValue("declarationType");
	
	var initvalue = {
		"recipeBoardId":recipeBoardId,
		"memberEmail":memberEmail,
		"reportContent":reportContent,
		"reportTitle":reportTitle,
		"declarationType":declarationType
	};
	
	app.openDialog("dialog/selectDeclarationRecipe", {
		width: 400,
		height: 600,
		headerVisible: false
	}, function(dialog){
		dialog.ready(function(dialogApp) {
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.initValue = initvalue;
		});
	}).then(function(returnValue){
		
	});
	
}

/*
 * "뒤로가기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	cpr.core.App.load("embedded/admin/findReportAdminForm", function(loadedApp){
		if (loadedApp){
//			host.initValue = initValue;
			host.app = loadedApp;
		}
	});
	
}
