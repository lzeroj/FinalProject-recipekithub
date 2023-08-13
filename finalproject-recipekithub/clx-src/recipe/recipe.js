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
function onBodyLoad(e){
	var submission = app.lookup("recipeBoardList");
	submission.send();
	
	
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onRecipeBoardListReceive(e){
	var recipeBoardList = e.control;
	var xhr = recipeBoardList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	//console.log(jsonData);
	var recipe = jsonData.recipe_board;
	console.log(recipe);
	var container = app.lookup("grp");
	for (var i = 0; i < recipe.length; i++) {
		
		//udc 동적 생성
		var recipeList = new udc.recipeListudc();
		//udc에서 출판한 이미지 경로 앱 속성 지정
		//"theme/uploadrecipeimage/" + 
		//"recipe/recipeUpload/"+recipe[i].recipeBoardImage;
		recipeList.img = "theme/uploadrecipeimage/"+recipe[i].recipeBoardImage;
		console.log(recipeList.img);
		recipeList.hits = recipe[i].recipeBoardHits;
		recipeList.nick = recipe[i].memberVO.memberNick;
		recipeList.title = recipe[i].recipeBoardTitle;
		container.addChild(recipeList, {
			height: "250px",
			width: "230px",
			autoSize: "both"
		});
	}
}
