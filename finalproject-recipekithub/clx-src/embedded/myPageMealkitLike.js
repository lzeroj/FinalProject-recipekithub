/************************************************
 * myPageMealkitLike.js
 * Created at 2023. 8. 15. 오후 5:20:32.
 *
 * @author shj22k
 ************************************************/

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubmealkitlikelistSubmitSuccess(e){
	var submealkitlikelist = e.control;
	var metadata = submealkitlikelist.getMetadata("mealLikeList");
	var likeYNmetadata = submealkitlikelist.getMetadata("likeYN");
	var mealkitLikeList = app.lookup("mealkitLikeList");
	var value = null;
	for(var i=0;i<metadata.length;i++){
		mealkitLikeList.setValue(i, "memberEmail", metadata[i].memberEmail);
		if(likeYNmetadata[i] == 1){
			value = "theme/images/mealkit/heart_fill.png";
		}else{
			value = "theme/images/mealkit/heart.png";
		}
		mealkitLikeList.setValue(i, "likeYN", value);
	}
	app.lookup("grd1").redraw();
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("submealkitlikelist").send();
}

/*
 * 그리드에서 cell-click 이벤트 발생 시 호출.
 * Grid의 Cell 클릭시 발생하는 이벤트.
 */
function onGrd1CellClick(e){
	var grd1 = e.control;
	var grid = app.lookup("grd1");
	var value = "theme/images/mealkit/heart_fill.png";
	var image = app.lookup("likeimg");
	if(e.cellIndex != 5){
		return ;
	}else{
		if(confirm("찜을 취소하시겠습니까? 취소하시면 목록에서 해당 밀키트가 삭제 됩니다")){
			app.lookup("subdeletemelkiktlike").send();
		}
	}
	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubdeletemelkiktlikeSubmitSuccess(e){
	var subdeletemelkiktlike = e.control;
	app.lookup("grd1").redraw();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubdeletemelkiktlikeSubmitDone(e){
	var subdeletemelkiktlike = e.control;
	app.lookup("grd1").redraw();
}
