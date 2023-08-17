/************************************************
 * declarationRecipe.js
 * Created at 2023. 8. 16. 오후 11:12:28.
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
		console.log(hostProperty);
	}
}

/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var inputtext = app.lookup("ipb1").text;
	var textbox = app.lookup("txa1").text;
	var radioButton = app.lookup("rdb1");
	var value = radioButton.value;
	
	var resultvalue = {
		"inputtext":inputtext, //제목
		"textbox":textbox, //내용
		"declarationType":value
	};
	if(confirm("신고하시겠습니까?")){
		app.close(resultvalue);
	}
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var resultvalue = 0;
	app.close(resultvalue);
}
