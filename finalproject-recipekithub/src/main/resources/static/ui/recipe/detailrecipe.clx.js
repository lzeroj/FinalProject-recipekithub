/*
 * App URI: recipe/detailrecipe
 * Source Location: recipe/detailrecipe.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("recipe/detailrecipe", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("recipeBoard");
			dataSet_1.parseData({
				"columns": [
					{
						"name": "recipeBoardTitle",
						"dataType": "string"
					},
					{
						"name": "recipeBoardContent",
						"dataType": "string"
					},
					{
						"name": "recipeBoardHits",
						"dataType": "decimal"
					},
					{
						"name": "recipeBoardImage",
						"dataType": "string"
					}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm1");
			dataMap_1.parseData({
				"columns" : [{
					"name": "recipeBoardId",
					"dataType": "number"
				}]
			});
			app.register(dataMap_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
			container.setLayout(responsiveXYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_1);
			(function(container){
				var image_1 = new cpr.controls.Image("recipeBoardImage");
				container.addChild(image_1, {
					"top": "20px",
					"width": "536px",
					"height": "224px",
					"left": "calc(50% - 268px)"
				});
				var output_1 = new cpr.controls.Output("memberNick");
				output_1.value = "닉네임";
				container.addChild(output_1, {
					"top": "243px",
					"width": "128px",
					"height": "34px",
					"left": "calc(50% - 64px)"
				});
				var output_2 = new cpr.controls.Output("recipeBoardTitle");
				output_2.value = "타이틀";
				container.addChild(output_2, {
					"top": "287px",
					"left": "94px",
					"width": "220px",
					"height": "55px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "좋아요 갯수";
				container.addChild(output_3, {
					"top": "305px",
					"left": "622px",
					"width": "82px",
					"height": "20px"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "";
				button_1.style.css({
					"background-color" : "#FFFFFF",
					"border-right-style" : "none",
					"background-size" : "cover",
					"border-left-style" : "none",
					"border-bottom-style" : "none",
					"background-image" : "url('theme/images/recipe/heartnocolor.png')",
					"background-position" : "center",
					"border-top-style" : "none"
				});
				container.addChild(button_1, {
					"top": "287px",
					"left": "551px",
					"width": "61px",
					"height": "46px"
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "레시피 수정";
				if(typeof onButtonClick == "function") {
					button_2.addEventListener("click", onButtonClick);
				}
				container.addChild(button_2, {
					"top": "0px",
					"right": "629px",
					"left": "0px",
					"height": "45px"
				});
			})(group_1);
			container.addChild(group_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "20px",
						"width": "724px",
						"height": "353px",
						"left": "calc(50% - 362px)"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "20px",
						"width": "354px",
						"height": "353px",
						"left": "calc(50% - 177px)"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "20px",
						"width": "247px",
						"height": "353px",
						"left": "calc(50% - 123px)"
					}
				]
			});
			
			var group_2 = new cpr.controls.Container();
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_2);
			container.addChild(group_2, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "694px",
						"width": "724px",
						"height": "154px",
						"left": "calc(50% - 362px)"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "694px",
						"width": "354px",
						"height": "154px",
						"left": "calc(50% - 177px)"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "694px",
						"width": "247px",
						"height": "154px",
						"left": "calc(50% - 123px)"
					}
				]
			});
			
			var output_4 = new cpr.controls.Output();
			output_4.value = "댓글";
			container.addChild(output_4, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "668px",
						"right": "1270px",
						"left": "598px",
						"height": "27px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "668px",
						"right": "620px",
						"left": "292px",
						"height": "27px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "668px",
						"right": "434px",
						"left": "204px",
						"height": "27px"
					}
				]
			});
			
			var output_5 = new cpr.controls.Output();
			output_5.value = "댓글개수";
			container.addChild(output_5, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "668px",
						"right": "1192px",
						"left": "649px",
						"height": "27px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "668px",
						"right": "582px",
						"left": "317px",
						"height": "27px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "668px",
						"right": "407px",
						"left": "222px",
						"height": "27px"
					}
				]
			});
			
			var pageIndexer_1 = new cpr.controls.PageIndexer();
			pageIndexer_1.init(1, 1, 1);
			container.addChild(pageIndexer_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "966px",
						"width": "200px",
						"height": "40px",
						"left": "calc(50% - 100px)"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "966px",
						"width": "98px",
						"height": "40px",
						"left": "calc(50% - 49px)"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "966px",
						"width": "68px",
						"height": "40px",
						"left": "calc(50% - 34px)"
					}
				]
			});
			
			var hTMLSnippet_1 = new cpr.controls.HTMLSnippet("recipeContent");
			hTMLSnippet_1.value = "<p>HTML Snippet<\/p>";
			container.addChild(hTMLSnippet_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "383px",
						"width": "723px",
						"height": "275px",
						"left": "calc(50% - 361px)"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "383px",
						"width": "353px",
						"height": "275px",
						"left": "calc(50% - 176px)"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "383px",
						"width": "247px",
						"height": "275px",
						"left": "calc(50% - 123px)"
					}
				]
			});
			
			var group_3 = new cpr.controls.Container();
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.setColumns(["1fr", "100px"]);
			formLayout_1.setRows(["1fr"]);
			group_3.setLayout(formLayout_1);
			(function(container){
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				container.addChild(inputBox_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "등록";
				container.addChild(button_3, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_3);
			container.addChild(group_3, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
						"top": "858px",
						"width": "724px",
						"height": "87px",
						"left": "calc(50% - 362px)"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "858px",
						"width": "354px",
						"height": "87px",
						"left": "calc(50% - 177px)"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "858px",
						"width": "247px",
						"height": "87px",
						"left": "calc(50% - 123px)"
					}
				]
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "detailrecipe";
	cpr.core.Platform.INSTANCE.register(app);
})();
