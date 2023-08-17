/************************************************
 * detailrecipe.js
 * Created at 2023. 8. 11. 오후 4:20:38.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	console.log(recipeBoardVO);
	app.lookup("recipeBoardImage").src = "/upload/recipe/"+recipeBoardVO.recipeBoardImage;
	app.lookup("recipeBoardTitle").value = recipeBoardVO.recipeBoardTitle;
	app.lookup("memberNick").value = recipeBoardVO.memberVO.memberNick;
	app.lookup("recipeRegDate").value = recipeBoardVO.recipeRegDate;
	app.lookup("recipeEditDate").value = recipeBoardVO.recipeEditDate;
	if(app.lookup("recipeEditDate").value==null){
		app.lookup("editDate").visible = false;
		app.lookup("recipeEditDate").visible = false;
	}
	var hTMLSnippet = app.lookup("recipeContent");
	hTMLSnippet.value = recipeBoardVO.recipeBoardContent;
	
	app.lookup("dmRecipeBoardId").setValue("recipeBoardId", recipeBoardVO.recipeBoardId);
	var recipeCommentsub = app.lookup("recipeCommentList");
	recipeCommentsub.send();
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
//function onDetailRecipeReceive(e){
//	var detailRecipe = e.control;
//	var xhr = detailRecipe.xhr;
//	var jsonData = JSON.parse(xhr.responseText);
//	console.log(jsonData);
//	detailRecipe = jsonData.recipe;
//	//app.lookup("recipeBoardImage").src = "theme/uploadrecipeimage/"+detailRecipe.recipeBoardImage;
//	//app.lookup("memberNick").value = detailRecipe.memberVO.memberNick;
//	//app.lookup("recipeBoardTitle").value = detailRecipe.recipeBoardTitle; 
//	//app.lookup("recipeBoardContent").value = detailRecipe.recipeBoardContent;
//}

/*
 * "레시피 수정하기" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	//	app.lookup("dmRecipeBoardId").setValue("dmRecipeBoardId", recipeBoardVO.recipeBoardId);
	//	var submission = app.lookup("updateRecipe");
	//	submission.send();
	//window.location.href = "/updateRecipe?recipeBoardId=" + recipeBoardVO.recipeBoardId;
	
	// 로그인 안한사람이 url 로 접속되는 것을 막기 위해 post 방식 사용
   var _httpPostMethod = new cpr.protocols.HttpPostMethod("/updateRecipe", "_self");
	_httpPostMethod.addParameter("recipeBoardId", recipeBoardVO.recipeBoardId);
	_httpPostMethod.submit(); 
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onRecipeCommentListReceive(e){
	var recipeCommentList = e.control;
	var xhr = recipeCommentList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var recipeCommentList = jsonData.recipeCommentList;
	var container = app.lookup("commentgrp");
		for (var i = 0; i < recipeCommentList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var recipeComment = new udc.recipeCommentudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			recipeComment.nick = recipeCommentList[i].memberVO.memberNick;
			recipeComment.regDate = recipeCommentList[i].recipeCommentDate;
			recipeComment.content = recipeCommentList[i].recipeCommentContent;
			container.addChild(recipeComment, {
				height: "120px",
				width: "100px",
				autoSize: "both"
			});
			recipeComment.addEventListener("deleteClick", function(e) {
			app.lookup("dmRecipeCommentId").setValue("recipeCommentId", recipeCommentList[index].recipeCommentId);
			var deleteCommentsub = app.lookup("deleteComment");
			deleteCommentsub.send();
			});
		})(i);
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onDeleteCommentSubmitSuccess(e){
	var deleteComment = e.control;
    app.lookup("commentgrp").redraw();

}
