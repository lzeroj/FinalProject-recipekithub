/************************************************
 * detailrecipe.js
 * Created at 2023. 8. 11. 오후 4:20:38.
 *
 * @author user
 ************************************************/
function getTimedSessionData(key) {
	var storedData = sessionStorage.getItem(key);
	
	if (storedData) {
		var data = JSON.parse(storedData);
		var currentTime = new Date().getTime();
		
		if (currentTime < data.expirationTime) {
			return data.value;
		} else {
			sessionStorage.removeItem(key);
		}
	}
	return null;
}
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	var sessionval = getTimedSessionData("memsession");
	console.log(sessionval);
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	console.log(recipeBoardVO);
	if (sessionval == null || sessionval != recipeBoardVO.memberVO.memberEmail) {
		app.lookup("updateBtn").visible = false;
	}
	app.lookup("recipeBoardImage").src = "/upload/recipe/" + recipeBoardVO.recipeBoardImage;
	app.lookup("recipeBoardTitle").value = recipeBoardVO.recipeBoardTitle;
	app.lookup("memberNick").value = recipeBoardVO.memberVO.memberNick;
	app.lookup("memberProfile").src = "/upload/profile/" + recipeBoardVO.memberVO.memberImage;

	var hTMLSnippet = app.lookup("recipeContent");
	hTMLSnippet.value = recipeBoardVO.recipeBoardContent;
	
	app.lookup("regDate").value = recipeBoardVO.recipeRegDate;
	if (recipeBoardVO.recipeEditDate == null) {
		app.lookup("edit").visible = false;
		app.lookup("editDate").visible = false;
	} else {
		app.lookup("editDate").value = recipeBoardVO.recipeEditDate;
	}
	app.lookup("dmRecipeBoardId").setValue("recipeBoardId", recipeBoardVO.recipeBoardId);
	var recipeCommentsub = app.lookup("recipeCommentList");
	recipeCommentsub.send();
	
	// 현준
	app.lookup("dmRecipeBoardId").setValue("recipeBoardId", recipeBoardVO.recipeBoardId);
	app.lookup("subrecipelikecount").send();
	
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
function onButtonClick(e) {
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
//function onRecipeCommentListReceive(e){
//	var recipeCommentList = e.control;
//	var xhr = recipeCommentList.xhr;
//	var jsonData = JSON.parse(xhr.responseText);
//	var recipeComment = jsonData.recipeCommentList;
//	var totalCommentCount = jsonData.totalCommentCount;
//	app.lookup("commentCount").value = totalCommentCount;
//	var container = app.lookup("commentgrp");
//		for (var i = 0; i < recipeComment.length; i++) {
//		(function(index) {
//			//udc 동적 생성
//			var comment = new udc.recipeCommentudc();
//			//udc에서 출판한 이미지 경로 앱 속성 지정
//			comment.nick = recipeComment[i].memberVO.memberNick;
//			comment.regDate = recipeComment[i].recipeCommentDate;
//			comment.content = recipeComment[i].recipeCommentContent;
//			container.addChild(comment, {
//				height: "120px",
//				width: "100px",
//				autoSize: "both"
//			});
//			comment.addEventListener("deleteClick", function(e) {
//			app.lookup("dmRecipeCommentId").setValue("recipeCommentId", recipeComment[index].recipeCommentId);
//			var deleteCommentsub = app.lookup("deleteComment");
//			deleteCommentsub.send();
//			});
//		})(i);
//	}
//}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onRecipeCommentListSubmitSuccess(e) {
	var recipeCommentList = e.control;
	var xhr = recipeCommentList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var sessionval = getTimedSessionData("memsession");
	var recipeComment = jsonData.recipeCommentList;
	var totalCommentCount = jsonData.totalCommentCount;
	app.lookup("commentCount").value = totalCommentCount;
	var container = app.lookup("commentgrp");
	
	app.lookup("page").totalRowCount = totalCommentCount;
	
	// 댓글 등록,삭제 시 재조회 할 수 있게 기존 목록 삭제
	container.removeAllChildren();
	
	for (var i = 0; i < recipeComment.length; i++) {
		(function(index) {
			//udc 동적 생성
			var comment = new udc.recipeCommentudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			comment.nick = recipeComment[i].memberVO.memberNick;
			comment.regDate = recipeComment[i].recipeCommentDate;
			comment.content = recipeComment[i].recipeCommentContent;
			comment.profile = "/upload/profile/" + recipeComment[i].memberVO.memberImage;

		console.log(comment.profile);
			if (sessionval == null || sessionval != recipeComment[i].memberVO.memberEmail) {
				comment.deleteBtn = false;
			}
			container.addChild(comment, {
				height: "75px",
				width: "100px",
				autoSize: "height"
			});
			comment.addEventListener("deleteClick", function(e) {
				app.lookup("dmRecipeCommentId").setValue("recipeCommentId", recipeComment[index].recipeCommentId);
				if (confirm("삭제하시겠습니까?")) {
					var deleteCommentsub = app.lookup("deleteComment");
					deleteCommentsub.send();
				}
			});
		})(i);
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onDeleteCommentSubmitSuccess(e) {
	var deleteComment = e.control;
	app.lookup("recipeCommentList").send();
}

/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e) {
	var button = e.control;
	var sessionval = getTimedSessionData("memsession");
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	if (sessionval == null) {
		alert("로그인이 필요합니다");
		app.lookup("commentInput").focus();
	} else{
		app.lookup("dmInsertValue").setValue("recipeBoardId", recipeBoardVO.recipeBoardId);
		var insertComment = app.lookup("insertComment");
		insertComment.send();
		}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onInsertCommentSubmitSuccess(e) {
	var insertComment = e.control;
	app.lookup("recipeCommentList").send();
	app.lookup("commentInput").text = "";
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubrecipelikecountSubmitSuccess(e) {
	var subrecipelikecount = e.control;
	var countRecipeLike = subrecipelikecount.getMetadata("countRecipeLike");
	var showlikestatus = subrecipelikecount.getMetadata("showlikestatus");
	var likeimg = app.lookup("likeimg");
	if (showlikestatus == 0) {
		likeimg.src = "theme/images/mealkit/heart.png";
	} else {
		likeimg.src = "theme/images/mealkit/heart_fill.png";
	}
	likeimg.redraw();
	
	app.lookup("opt1").text = countRecipeLike;
	app.lookup("opt1").redraw();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubinsertrecipelikeSubmitSuccess(e) {
	var subinsertrecipelike = e.control;
	var likeresult = subinsertrecipelike.getMetadata("likeresult");
	var likeimg = app.lookup("likeimg");
	var counttext = app.lookup("opt1").text;
	if (likeresult == 0) {
		likeimg.src = "theme/images/mealkit/heart.png";
		app.lookup("opt1").text = counttext - 1;
	} else {
		likeimg.src = "theme/images/mealkit/heart_fill.png";
		app.lookup("opt1").text = parseInt(counttext) + 1;
	}
	likeimg.redraw();
	
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLikeimgClick(e) {
	var likeimg = e.control;
	var sessionval = getTimedSessionData("memsession");
	if (sessionval == null) {
		alert("로그인이 필요합니다");
		app.lookup("commentInput").focus();
	} else{
	app.lookup("subinsertrecipelike").send();
	}
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImageClick(e) {
	var image = e.control;
	console.log(app.lookup("dmRecipeBoardId").getValue("recipeBoardId"));
	var initvalue = {
		"recipeBoardId": app.lookup("dmRecipeBoardId").getValue("recipeBoardId")
	};
	app.openDialog("dialog/declarationRecipe", {
		width: 400,
		height: 600,
		headerVisible: false
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.initValue = initvalue;
		});
	}).then(function(returnValue) {
		if (returnValue == 0) {
			return;
		}
		if (returnValue == null || returnValue == '') {
			return;
		}
		var recipeBoardId = app.lookup("dmRecipeBoardId").getValue("recipeBoardId");
		app.lookup("dmdeclaration").setValue("recipeBoardId", recipeBoardId);
		app.lookup("dmdeclaration").setValue("inputtext", returnValue.inputtext);
		app.lookup("dmdeclaration").setValue("textbox", returnValue.textbox);
		app.lookup("dmdeclaration").setValue("declarationType", returnValue.declarationType);
		app.lookup("subinsertDeclaration").send();
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubinsertDeclarationSubmitSuccess(e) {
	var subinsertDeclaration = e.control;
	var metadata = subinsertDeclaration.getMetadata("insertresult");
	if (metadata == 1) {
		alert("신고가 완료되었습니다");
	} else if (metadata == 0) {
		alert("이미 신고를 완료한 게시물입니다");
	}
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageSelectionChange(e) {
	var page = e.control;
	app.lookup("recipeCommentList").send();
}

