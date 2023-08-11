/*
 * App URI: recipe/recipe
 * Source Location: recipe/recipe.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("recipe/recipe", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
					recipeList.img = "theme/uploadrecipeimage/" + recipe[i].recipeBoardImage;
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("recipe_board");
			dataSet_1.parseData({
				"columns": [],
				"rows": []
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("recipeBoardList");
			submission_1.action = "/findRecipeBoardList";
			if(typeof onRecipeBoardListReceive == "function") {
				submission_1.addEventListener("receive", onRecipeBoardListReceive);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#E8E8E8",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#FFFFFF"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "종류별";
				output_1.style.css({
					"color" : "#000000",
					"font-weight" : "bold",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "10px",
					"left": "10px",
					"width": "90px",
					"height": "60px"
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "재료별";
				output_2.style.css({
					"color" : "#000000",
					"font-weight" : "bold",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"top": "80px",
					"left": "10px",
					"width": "90px",
					"height": "60px"
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "방법별";
				output_3.style.css({
					"color" : "#000000",
					"font-weight" : "bold",
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"top": "150px",
					"left": "10px",
					"width": "90px",
					"height": "60px"
				});
				var navigationBar_1 = new cpr.controls.NavigationBar();
				(function(navigationBar_1){
					navigationBar_1.addItem(new cpr.controls.MenuItem("전체", "value1", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("밑반찬", "value2", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("메인반찬", "value3", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("국/탕", "value4", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("디저트", "value5", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("면", "value6", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("샐러드", "value8", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("음료", "value9", null));
					navigationBar_1.addItem(new cpr.controls.MenuItem("기타", "value10", null));
				})(navigationBar_1);
				container.addChild(navigationBar_1, {
					"top": "10px",
					"left": "110px",
					"width": "854px",
					"height": "60px"
				});
				var navigationBar_2 = new cpr.controls.NavigationBar();
				(function(navigationBar_2){
					navigationBar_2.addItem(new cpr.controls.MenuItem("전체", "value1", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("육류", "value2", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("채소류", "value3", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("해물류", "value4", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("달걀/유제품", "value5", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("가공식품류", "value6", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("과일류", "value7", null));
					navigationBar_2.addItem(new cpr.controls.MenuItem("기타", "value8", null));
				})(navigationBar_2);
				container.addChild(navigationBar_2, {
					"top": "80px",
					"left": "110px",
					"width": "854px",
					"height": "60px"
				});
				var navigationBar_3 = new cpr.controls.NavigationBar();
				(function(navigationBar_3){
					navigationBar_3.addItem(new cpr.controls.MenuItem("전체", "value1", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("볶음", "value2", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("끓이기", "value3", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("조림", "value4", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("튀김", "value5", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("삶기", "value6", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("굽기", "value7", null));
					navigationBar_3.addItem(new cpr.controls.MenuItem("기타", "value8", null));
				})(navigationBar_3);
				container.addChild(navigationBar_3, {
					"top": "150px",
					"left": "110px",
					"width": "854px",
					"height": "60px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"width": "984px",
				"height": "220px",
				"left": "calc(50% - 492px)"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.css({
				"background-color" : "#FFFFFF"
			});
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var output_4 = new cpr.controls.Output();
				output_4.value = "총";
				container.addChild(output_4, {
					"top": "50px",
					"left": "20px",
					"width": "18px",
					"height": "20px"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "최신순";
				container.addChild(button_1, {
					"top": "50px",
					"left": "652px",
					"width": "100px",
					"height": "20px"
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "좋아요순";
				container.addChild(button_2, {
					"top": "50px",
					"left": "762px",
					"width": "100px",
					"height": "20px"
				});
				var button_3 = new cpr.controls.Button();
				button_3.value = "조회수순";
				container.addChild(button_3, {
					"top": "50px",
					"left": "872px",
					"width": "100px",
					"height": "20px"
				});
				var output_5 = new cpr.controls.Output();
				output_5.value = "output";
				container.addChild(output_5, {
					"top": "43px",
					"left": "37px",
					"width": "56px",
					"height": "38px"
				});
				var output_6 = new cpr.controls.Output();
				output_6.value = "개의 맛있는 레시피가 있습니다.";
				container.addChild(output_6, {
					"top": "50px",
					"left": "92px",
					"width": "247px",
					"height": "20px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "250px",
				"width": "984px",
				"height": "90px",
				"left": "calc(50% - 492px)"
			});
			
			var group_3 = new cpr.controls.Container("grp");
			group_3.style.css({
				"background-color" : "#FFFFFF"
			});
			var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
			group_3.setLayout(flowLayout_1);
			container.addChild(group_3, {
				"top": "350px",
				"width": "984px",
				"height": "800px",
				"left": "calc(50% - 492px)"
			});
			
			var pageIndexer_1 = new cpr.controls.PageIndexer();
			pageIndexer_1.init(1, 1, 1);
			container.addChild(pageIndexer_1, {
				"top": "1170px",
				"width": "200px",
				"height": "40px",
				"left": "calc(50% - 100px)"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "recipe";
	cpr.core.Platform.INSTANCE.register(app);
})();
