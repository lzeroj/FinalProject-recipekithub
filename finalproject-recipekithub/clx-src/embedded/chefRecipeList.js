/************************************************
 * chefRecipeList.js
 * Created at 2023. 8. 22. 오전 9:39:45.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var host = app.getHost();
	var val = host.initValue;
	console.log(val.memberEmail);
	console.log(val.memberNick);
	console.log(val.memberImage);
	app.lookup("memberimg").src = val.memberImage;
	app.lookup("memberinfo").text = "  "+val.memberNick+"님의 레시피 목록 입니다";
	
	app.lookup("dmmemberEmail").setValue("memberEmail", val.memberEmail);
	app.lookup("subfindChefRecipeListByMemberEmail").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindChefRecipeListByMemberEmailSubmitSuccess(e){
	var subfindChefRecipeListByMemberEmail = e.control;
	
	var host = app.getHost();
	var val = host.initValue;
	
	var xhr = subfindChefRecipeListByMemberEmail.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var recipeList = jsonData.recipeList;
	
	var container = app.lookup("grp");
	container.removeAllChildren();
	
	for(var i=0;i<recipeList.length;i++){
		(function(index){
			var recipeListudc = new udc.chefRecipeListudc();
			recipeListudc.recipeBoardImage = recipeList[i].recipeBoardImage;
			recipeListudc.recipeBoardTitle = recipeList[i].recipeBoardTitle;
			recipeListudc.memberNick = "by"+val.memberNick;
			container.addChild(recipeListudc, {
				height: "260px",
				width: "200px",
				autoSize: "none"				
			});
			recipeListudc.addEventListener("memberImageClick", function(e) {
				window.location.href = "/detailRecipe?recipeBoardId=" + recipeList[index].recipeBoardId;
			});
		})(i);
	}
	
}
