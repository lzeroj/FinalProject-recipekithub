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
	var hTMLSnippet = app.lookup("recipeContent");
	hTMLSnippet.value = recipeBoardVO.recipeBoardContent;
	
	// 현준
	app.lookup("dm1").setValue("recipeBoardId", recipeBoardVO.recipeBoardId);
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
function onButtonClick(e){
	var button = e.control;
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	window.location.href = "/updateRecipe?recipeBoardId=" + recipeBoardVO.recipeBoardId;
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubrecipelikecountSubmitSuccess(e){
	var subrecipelikecount = e.control;
	var countRecipeLike = subrecipelikecount.getMetadata("countRecipeLike");
	var showlikestatus = subrecipelikecount.getMetadata("showlikestatus");
	var likeimg = app.lookup("likeimg");
	if(showlikestatus == 0){
		likeimg.src = "theme/images/mealkit/heart.png";
	}else{
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
function onSubinsertrecipelikeSubmitSuccess(e){
	var subinsertrecipelike = e.control;
	var likeresult = subinsertrecipelike.getMetadata("likeresult");
	var likeimg = app.lookup("likeimg");
	var counttext = app.lookup("opt1").text;
	if(likeresult == 0){
		likeimg.src = "theme/images/mealkit/heart.png";
		app.lookup("opt1").text = counttext - 1;
	}else{
		likeimg.src = "theme/images/mealkit/heart_fill.png";
		app.lookup("opt1").text = parseInt(counttext) + 1;
	}
	likeimg.redraw();
	
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLikeimgClick(e){
	var likeimg = e.control;
	app.lookup("subinsertrecipelike").send();
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onImageClick(e){
	var image = e.control;
	console.log(app.lookup("dm1").getValue("recipeBoardId"));
	var initvalue = {"recipeBoardId" : app.lookup("dm1").getValue("recipeBoardId")};
	app.openDialog("dialog/declarationRecipe", {
		width : 400
		,height : 600
		,headerVisible: false
	}, function(dialog){
		dialog.ready(function(dialogApp){
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialog.initValue = initvalue;
		});
	}).then(function(returnValue){
		if(returnValue == 0){
			return;
		}
		if(returnValue == null || returnValue == ''){
			return;
		}
		var recipeBoardId = app.lookup("dm1").getValue("recipeBoardId");
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
function onSubinsertDeclarationSubmitSuccess(e){
	var subinsertDeclaration = e.control;
	var metadata = subinsertDeclaration.getMetadata("insertresult");
	if(metadata == 1){
		alert("신고가 완료되었습니다");
	}else if(metadata == 0){
		alert("이미 신고를 완료한 게시물입니다");
	}
}
