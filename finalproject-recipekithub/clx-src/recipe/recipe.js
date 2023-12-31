/************************************************
 * recipe.js
 * Created at 2023. 8. 9. 오전 10:50:44.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var searchParam = cpr.core.Platform.INSTANCE.getParameter("searchValue");
	console.log(searchParam);
	var dataMap = app.lookup("dmSearch");
	if(searchParam !="" && searchParam !=null){
		app.lookup("headerUdc").searchValue = searchParam;
		app.lookup("headerUdc").categoryValue = "레시피";
		dataMap.setValue("searchValue", searchParam);
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	app.lookup("type").value = "전체";
	app.lookup("ingredients").value = "전체";
	app.lookup("method").value = "전체";
	app.lookup("sort").value = "최신순";
	var submission = app.lookup("recipeBoardList");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onRecipeBoardListSubmitSuccess(e){
	var recipeBoardList = e.control;
	var xhr = recipeBoardList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var recipeList = jsonData.recipe_board;
	var totalRecipeCount = jsonData.totalRecipeCount;
	var likeCounts = jsonData.likeCounts;
	var container = app.lookup("grp");
	
	app.lookup("page").totalRowCount = totalRecipeCount;
	app.lookup("recipeCount").value = totalRecipeCount;
	
	container.removeAllChildren();
	
	for (var i = 0; i < recipeList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var recipe = new udc.recipeListudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			recipe.img = "/upload/recipe/" + recipeList[i].recipeBoardImage;
			recipe.hits = recipeList[i].recipeBoardHits;
			recipe.nick = recipeList[i].memberVO.memberNick;
			recipe.title = recipeList[i].recipeBoardTitle;
			recipe.profile = "/upload/profile/" + recipeList[i].memberVO.memberImage;
			recipe.like = likeCounts[i];
			container.addChild(recipe, {
				height: "250px",
				width: "300px",
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
function onPageSelectionChange(e){
	var page = e.control;
	app.lookup("recipeBoardList").send();
}


/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onTypeSelectionChange(e){
	var type = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("recipeBoardList").send();
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onIngredientsSelectionChange(e){
	var ingredients = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("recipeBoardList").send();
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onMethodSelectionChange(e){
	var method = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("recipeBoardList").send();
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onSortSelectionChange(e){
	var sort = e.control;
	app.lookup("page").currentPageIndex = 1;
	app.lookup("recipeBoardList").send();
}


