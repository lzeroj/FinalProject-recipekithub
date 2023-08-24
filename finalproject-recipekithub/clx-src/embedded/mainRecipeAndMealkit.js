/************************************************
 * mainRecipeAndMealkit.js
 * Created at 2023. 8. 21. 오후 2:20:35.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("likeRecipeList").send();
	app.lookup("starMealkitList").send();
	app.lookup("likeChefList").send();
}

/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onLikeRecipeListReceive(e){
	var likeRecipeList = e.control;
	var xhr = likeRecipeList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var recipeList = jsonData.likeRecipeList;
	
	var container = app.lookup("grp");
	
		for (var i = 0; i < recipeList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var recipe = new udc.recipeLikeudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			recipe.img = "/upload/recipe/" + recipeList[i].recipeBoardImage;
			recipe.title = recipeList[i].recipeBoardTitle;
			container.addChild(recipe, {
				height: "200px",
				width: "180px",
				autoSize: "both"
			});
			recipe.addEventListener("imgClick", function(e) {
				window.location.href = "/detailRecipe?recipeBoardId=" + recipeList[index].recipeBoardId;
			});
		})(i);
	}
}
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onLikeRecipeListSubmitSuccess(e){
	var slidify = cpr.core.Module.require("Slidify").slidify;
	//슬라이드 기능을 사용할 컨트롤에 적용시킨후 start 시킵니다. (아래의 두 코드는 필수로 작성하셔야 합니다.)
	var slide = slidify(app.lookup("grp"));
	slide.showCount = 4;
	slide.showPaginition = true;
	slide.autoPlayDelay = 1;
	slide.initialPage = 0;
	slide.useInfiniteScroll = true;
	slide.autoPlay();
	slide.start();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onStarMealkitListSubmitSuccess(e){
	var starMealkitList = e.control;
	var slidify = cpr.core.Module.require("Slidify").slidify;
	//슬라이드 기능을 사용할 컨트롤에 적용시킨후 start 시킵니다. (아래의 두 코드는 필수로 작성하셔야 합니다.)
	var slide = slidify(app.lookup("mealkitgrp"));
	slide.showCount = 4;
	slide.showPaginition = true;
	slide.autoPlayDelay = 1;
	slide.initialPage = 0;
	slide.useInfiniteScroll = true;
	slide.autoPlay();
	slide.start();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onLikeChefListSubmitSuccess(e){
	var likeChefList = e.control;
	var slidify = cpr.core.Module.require("Slidify").slidify;
	//슬라이드 기능을 사용할 컨트롤에 적용시킨후 start 시킵니다. (아래의 두 코드는 필수로 작성하셔야 합니다.)
	var slide = slidify(app.lookup("mealkitgrp"));
	slide.showCount = 7;
	slide.showPaginition = true;
	slide.autoPlayDelay = 1;
	slide.initialPage = 0;
	slide.useInfiniteScroll = true;
//	slide.autoPlay();
	slide.start();
}


/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onStarMealkitListReceive(e){
	var starMealkitList = e.control;
	var xhr = starMealkitList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var starList = jsonData.findMealkitStarList;
	var container = app.lookup("mealkitgrp");
	
	for (var i = 0; i < starList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var mealkit = new udc.mealkitStarudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			mealkit.mealkitImg = "/upload/mealkit/" + starList[i].mealkitImage;
			mealkit.mealkitName = starList[i].mealkitName;
			mealkit.mealkitPrice = starList[i].mealkitPrice;
			container.addChild(mealkit, {
				height: "200px",
				width: "180px",
				autoSize: "both"
			});
			mealkit.addEventListener("imgClick", function(e) {
				window.location.href = "/mealkitDetail/" + starList[index].mealkitNo;
			});
		})(i);
	}
	
}


/*
 * 서브미션에서 receive 이벤트 발생 시 호출.
 * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
 */
function onLikeChefListReceive(e){
	var likeChefList = e.control;
	var xhr = likeChefList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var chefList = jsonData.chefList;
	
	var container = app.lookup("chefgrp");
	
	for (var i = 0; i < chefList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var chef = new udc.chefListIndexudc();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			chef.memberImage = "/upload/profile/" + chefList[i].mealkitImage;
			chef.memberEmail = chefList[i].memberEmail;
			chef.memberNick = chefList[i].memberNick;
			container.addChild(chef, {
				height: "210px",
				width: "160px",
				autoSize: "both"
			});
			chef.addEventListener("memberImageClick", function(e) {
				var host = app.getHost(); // 부모 임베디드 앱
				var initvalue = {
					"memberEmail":chefList[index].memberEmail,
					"memberNick":chefList[index].memberNick,
					"memberImage":"/upload/profile/"+chefList[index].mealkitImage
				};
				cpr.core.App.load("embedded/chefRecipeList", function(loadedApp){
					if (loadedApp){
						host.initValue = initvalue;
						host.app = loadedApp;
					}
				});
			});
		})(i);
	}
	
}
