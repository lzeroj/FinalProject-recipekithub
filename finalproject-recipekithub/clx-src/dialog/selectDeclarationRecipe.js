/************************************************
 * selectDeclarationRecipe.js
 * Created at 2023. 8. 21. 오전 11:51:18.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var host = app.getHost();
	if(host){
		// 부모화면에서 보낸값을 팝업창에서 확인
		var hostProperty = app.getHostProperty("initValue");
		app.lookup("ipb1").text = hostProperty.reportTitle;
		app.lookup("txa1").text = hostProperty.reportContent;
		var radioButton = app.lookup("rdb1");
		radioButton.selectItemByValue(hostProperty.declarationType); 
		app.lookup("ipb1").redraw();
		app.lookup("txa1").redraw();
		radioButton.redraw();
	}
}

/*
 * "확인" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	app.close();
}
