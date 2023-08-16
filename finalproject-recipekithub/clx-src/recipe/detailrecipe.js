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
	app.lookup("recipeBoardImage").src = "/upload/"+recipeBoardVO.recipeBoardImage;
	app.lookup("recipeBoardTitle").value = recipeBoardVO.recipeBoardTitle;
	app.lookup("memberNick").value = recipeBoardVO.memberVO.memberNick;
	var hTMLSnippet = app.lookup("recipeContent");
	hTMLSnippet.value = recipeBoardVO.recipeBoardContent;
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
