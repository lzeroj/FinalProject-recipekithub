/************************************************
 * myPageRecipeLike.js
 * Created at 2023. 8. 22. 오후 12:11:17.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("subfindRecipeLikeList").send();
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = e.control;
	var image = app.lookup("likeimg");
	var index = grd1.getSelectedIndices()[0].rowIndex;
	var recipeBoardId = grd1.getCellValue(index, 1);
	
	if(e.cellIndex != 7){
		return ;
	}else{
		if(confirm("좋아요를 취소하시겠습니까?")){
			app.lookup("dmdeleteRecipeLike").setValue("recipeBoardId", recipeBoardId);
			app.lookup("subdeleteRecipeLike").send();
		}
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubdeleteRecipeLikeSubmitSuccess(e){
	var subdeleteRecipeLike = e.control;
	app.lookup("grd1").redraw();
//	var metadata = subdeleteRecipeLike.getMetadata("likeresult");
//	if(metadata == 1){ //insert 
//		app.lookup("likeimg").src = "theme/images/mealkit/heart_fill.png";
//	}else{ //delete
//		app.lookup("likeimg").src = "theme/images/mealkit/heart.png";
//	}
//	app.lookup("likeimg").redraw();
//	app.lookup("grd1").redraw();
}

