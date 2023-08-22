/*
 * App URI: embedded/mainRecipeAndMealkit
 * Source Location: embedded/mainRecipeAndMealkit.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/mainRecipeAndMealkit", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
							height: "300px",
							width: "280px",
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
				slide.showCount = 3;
				slide.showPaginition = true;
				slide.autoPlayDelay = 1;
				slide.initialPage = 0;
				slide.useInfiniteScroll = true;
				slide.autoPlay();
				slide.start();
			};
			// End - User Script
			
			// Header
			var submission_1 = new cpr.protocols.Submission("likeRecipeList");
			submission_1.action = "/likeRecipeList";
			if(typeof onLikeRecipeListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onLikeRecipeListSubmitSuccess);
			}
			if(typeof onLikeRecipeListReceive == "function") {
				submission_1.addEventListener("receive", onLikeRecipeListReceive);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1920px)", "FHD");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1919px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container("grp");
			var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
			group_1.setLayout(flowLayout_1);
			container.addChild(group_1, {
				"top": "120px",
				"width": "1120px",
				"height": "300px",
				"left": "calc(50% - 560px)"
			});
			
			var group_2 = new cpr.controls.Container();
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "추천";
				output_1.style.css({
					"font-weight" : "bold",
					"font-size" : "20px",
					"background-image" : "none"
				});
				container.addChild(output_1, {
					"top": "9px",
					"left": "0px",
					"width": "46px",
					"height": "38px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "레시피";
				output_2.style.css({
					"color" : "#0ca44e",
					"font-weight" : "bold",
					"font-size" : "20px"
				});
				container.addChild(output_2, {
					"top": "9px",
					"left": "45px",
					"width": "100px",
					"height": "38px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "53px",
				"width": "1120px",
				"height": "47px",
				"left": "calc(50% - 560px)"
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "mainRecipeAndMealkit";
	cpr.core.Platform.INSTANCE.register(app);
})();
