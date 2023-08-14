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
