/************************************************
 * recipe.js
 * Created at 2023. 8. 5. 오후 4:53:30.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
//	var container = app.getContainer();
//	var dataSet = app.lookup("recipe_board");
//	var rowCount = dataSet.getRowCount();
//	var columnData = dataSet.getColumnData("RECIPE_BOARD_THUMBNAIL");
//	var columnData2 = dataSet.getColumnData("RECIPE_BOARD_TITLE");
//	var columnData3 = dataSet.getColumnData("MEMBER_EMAIL");
//	for(var i=0; i<rowCount; i++){
//		var imgButton =new cpr.controls.Image("img");
//		imgButton.src = columnData[i]
//		var title = new cpr.controls.Output("title");
//		title.value = columnData2[i];
//		var email =new cpr.controls.Output("email");
//		email.value = columnData3[i];
//		 container.addChild(imgButton, {
//		 	top : "100px",
//		 	left : "100px",
//			height: "100px",
//			width: "100px",
//			autoSize: "both"
//		});
//		container.addChild(title, {
//			height: "100px",
//			width: "100px",
//			autoSize: "both"
//		});
//		container.addChild(email, {
//			height: "100px",
//			width: "100px",
//			autoSize: "both"
//		});
//	}
	var submission = app.lookup("recipeboard");
	submission.send();
}

