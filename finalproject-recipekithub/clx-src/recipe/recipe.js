/************************************************
 * recipe.js
 * Created at 2023. 8. 9. 오전 10:50:44.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	var submission = app.lookup("recipeBoardList");
	submission.send();
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onRecipeBoardListReceive(e) {
	var recipeBoardList = e.control;
	var xhr = recipeBoardList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var recipeList = jsonData.recipe_board;
	var recipeCount = jsonData.recipeCount;
	var container = app.lookup("grp");
	app.lookup("recipeCount").value = recipeCount;
	for (var i = 0; i < recipeList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var recipe = new udc.recipeListudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			recipe.img = "/upload/recipe/" + recipeList[i].recipeBoardImage;
			recipe.hits = recipeList[i].recipeBoardHits;
			recipe.nick = recipeList[i].memberVO.memberNick;
			recipe.title = recipeList[i].recipeBoardTitle;
			container.addChild(recipe, {
				height: "250px",
				width: "230px",
				autoSize: "both"
			});
			recipe.addEventListener("imgClick", function(e) {
				window.location.href = "/detailRecipe?recipeBoardId=" + recipeList[index].recipeBoardId;
			});
		})(i);
	}
}	

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
//function onPageIndexerSelectionChange(e){
//	var recipeList = cpr.core.Platform.INSTANCE.getParameter("recipe_board");
//	var pageIndexer = e.control;
//	var dmPage = app.lookup("dmPage");
//	dmPage.setValue("pageNo", e.newSelection);
//	app.lookup("recipeBoardList").send();
//	}
	
	
	
	
	//	var recipeList = cpr.core.Platform.INSTANCE.getParameter("recipe_board");
//	var pagination = cpr.core.Platform.INSTANCE.getParameter("pagination");
//	console.log(pagination);
//	var container = app.lookup("grp");
//	app.lookup("recipeCount").value = recipeList.length;
//	for (var i = 0; i < recipeList.length; i++) {
//		(function(index) {
//			var recipe = new udc.recipeListudc();
//			recipe.img = "/upload/recipe/" + recipeList[i].recipeBoardImage;
//			console.log(recipeList.img);
//			recipe.hits = recipeList[i].recipeBoardHits;
//			recipe.nick = recipeList[i].memberVO.memberNick;
//			recipe.title = recipeList[i].recipeBoardTitle;
//			container.addChild(recipe, {
//				height: "250px",
//				width: "230px",
//				autoSize: "both"
//			});
//			recipe.addEventListener("imgClick", function(e) {
//				window.location.href = "/detailRecipe?recipeBoardId=" + recipeList[index].recipeBoardId;
//			});
//		})(i);
//	}

