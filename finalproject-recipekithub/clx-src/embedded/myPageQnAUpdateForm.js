/************************************************
 * myPageQnAUpdateForm.js
 * Created at 2023. 8. 14. 오후 4:46:00.
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
	app.lookup("ipb1").focus();
	
	app.lookup("updateqna").setValue("boardTitle", app.lookup("ipb1").text);
	app.lookup("updateqna").setValue("boardContent", app.lookup("txa1").text);
	app.lookup("updateqna").setValue("boardId", val.boardId);
}

/*
 * "수정" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	if(confirm("수정하시겠습니까?")){
		app.lookup("updateqna").setValue("boardTitle", app.lookup("ipb1").value);
		app.lookup("updateqna").setValue("boardContent", app.lookup("txa1").text);
		app.lookup("subupdateqna").send();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubupdateqnaSubmitSuccess(e){
	var subupdateqna = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	if(subupdateqna.getMetadata("insertResult")==1){
		alert("수정되었습니다");
		cpr.core.App.load("embedded/myPageQuestion", function(loadedApp){
			if (loadedApp){
				host.app = loadedApp;
			}
		});
	}
	
}

/*
 * "뒤로가기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var host = app.getHost(); // 부모 임베디드 앱
	var dataMap = app.lookup("updateqna");
	var boardId = dataMap.getValue("boardId");
	var boardTitle = dataMap.getValue("boardTitle");
	var boardContent = dataMap.getValue("boardContent");
	
	var initValue = {"boardId": boardId , "boardTitle" : boardTitle, "boardContent":boardContent};
	cpr.core.App.load("embedded/myPageQnARegisterSelect", function(loadedApp){
		if (loadedApp){
			host.initValue = initValue;
			host.app = loadedApp;
		}
	});
	
}
