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

/*
 * "답변 달기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var container1 = app.lookup("grp1");
	var container = app.getContainer();
	
//	container.updateConstraint(container1, {
//		
//	});
//	
	container1.style.css({
		"height": "1200px",
		"bottom": "100px",
		"background-color": "black"
	});
	container1.redraw();
	
	var group_3 = new cpr.controls.Container("grp3");
	var xYLayout_3 = new cpr.controls.layouts.XYLayout();
	group_3.setLayout(xYLayout_3);
	var button_3 = new cpr.controls.Button();
	container.addChild(button_3, {
		"top":"800px"
	});
	container.addChild(group_3, {
		"top":"600px",
		"height": "308px"
	});
	
	app.lookup("grp1").redraw();
}

/*
 * 루트 컨테이너에서 before-draw 이벤트 발생 시 호출.
 * 그룹 컨텐츠가 그려지기 직전에 호출되는 이벤트 입니다. 내부 컨텐츠를 동적으로 구성하기위한 용도로만 사용됩니다.
 */
function onBodyBeforeDraw(e){
	var group = e.control;

}
