/*
 * App URI: recipe/recipe
 * Source Location: recipe/recipe.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("recipe/recipe", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/controls/htmlobject.part.css");
			loader.addCSS("theme/custom-theme.css");
			loader.addCSS("theme/controls/page-indexer.part.css");
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
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("recipe_board");
			dataSet_1.parseData({
				"columns": [
					{"name": "recipeBoardImage"},
					{"name": "recipeBoardHits"},
					{"name": "memberNick"},
					{"name": "recipeBoardTitle"},
					{"name": "likeCounts"}
				],
				"rows": []
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmPage");
			dataMap_1.parseData({
				"columns" : [{
					"name": "pageNo",
					"defaultValue": "1"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dmCategory");
			dataMap_2.parseData({
				"columns" : [
					{"name": "type"},
					{"name": "ingredients"},
					{"name": "method"}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dmSort");
			dataMap_3.parseData({
				"columns" : [{"name": "sort"}]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dmSearch");
			dataMap_4.parseData({
				"columns" : [{"name": "searchValue"}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("recipeBoardList");
			submission_1.action = "/findRecipeBoardList";
			submission_1.addRequestData(dataMap_1);
			submission_1.addRequestData(dataMap_2);
			submission_1.addRequestData(dataMap_3);
			submission_1.addRequestData(dataMap_4);
			if(typeof onRecipeBoardListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onRecipeBoardListSubmitSuccess);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1920px)", "FHD");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1919px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#F4FAEC",
				"font-family" : "푸른전남 Medium",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.distribution = "center";
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var userDefinedControl_1 = new udc.header3("headerUdc");
			container.addChild(userDefinedControl_1, {
				"autoSize": "none",
				"width": "1920px",
				"height": "205px"
			});
			
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-size" : "cover",
				"background-image" : "url('theme/images/common/bgimgfinal.png')",
				"background-position" : "center"
			});
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_2.distribution = "center";
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#FFFFFF"
				});
				var xYLayout_1 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_1);
				(function(container){
					var navigationBar_1 = new cpr.controls.NavigationBar("type");
					navigationBar_1.style.css({
						"border-right-style" : "none",
						"border-left-style" : "none",
						"border-bottom-style" : "none",
						"font-family" : "'푸른 전남' , 'Malgun Gothic' , sans-serif",
						"border-top-style" : "none"
					});
					navigationBar_1.style.bar.css({
						"font-family" : "푸른전남 Medium"
					});
					navigationBar_1.bind("value").toDataMap(app.lookup("dmCategory"), "type");
					(function(navigationBar_1){
						navigationBar_1.addItem(new cpr.controls.MenuItem("전체", "전체", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("밑반찬", "밑반찬", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("메인반찬", "메인반찬", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("국/탕", "국/탕", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("디저트", "디저트", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("면", "면", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("샐러드", "샐러드", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("음료", "음료", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("기타", "기타", null));
					})(navigationBar_1);
					if(typeof onTypeSelectionChange == "function") {
						navigationBar_1.addEventListener("selection-change", onTypeSelectionChange);
					}
					container.addChild(navigationBar_1, {
						"top": "10px",
						"left": "110px",
						"width": "854px",
						"height": "60px"
					});
					var navigationBar_2 = new cpr.controls.NavigationBar("ingredients");
					navigationBar_2.style.css({
						"border-right-style" : "none",
						"border-left-style" : "none",
						"border-bottom-style" : "none",
						"font-family" : "푸른전남 Medium",
						"border-top-style" : "none"
					});
					navigationBar_2.bind("value").toDataMap(app.lookup("dmCategory"), "ingredients");
					(function(navigationBar_2){
						navigationBar_2.addItem(new cpr.controls.MenuItem("전체", "전체", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("육류", "육류", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("채소류", "채소류", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("해물류", "해물류", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("달걀/유제품", "달걀/유제품", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("가공식품류", "가공식품류", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("과일류", "과일류", null));
						navigationBar_2.addItem(new cpr.controls.MenuItem("기타", "기타", null));
					})(navigationBar_2);
					if(typeof onIngredientsSelectionChange == "function") {
						navigationBar_2.addEventListener("selection-change", onIngredientsSelectionChange);
					}
					container.addChild(navigationBar_2, {
						"top": "80px",
						"left": "110px",
						"width": "854px",
						"height": "60px"
					});
					var navigationBar_3 = new cpr.controls.NavigationBar("method");
					navigationBar_3.style.css({
						"border-right-style" : "none",
						"border-left-style" : "none",
						"border-bottom-style" : "none",
						"font-family" : "푸른전남 Medium",
						"border-top-style" : "none"
					});
					navigationBar_3.bind("value").toDataMap(app.lookup("dmCategory"), "method");
					(function(navigationBar_3){
						navigationBar_3.addItem(new cpr.controls.MenuItem("전체", "전체", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("볶음", "볶음", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("끓이기", "끓이기", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("조림", "조림", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("튀김", "튀김", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("삶기", "삶기", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("굽기", "굽기", null));
						navigationBar_3.addItem(new cpr.controls.MenuItem("기타", "기타", null));
					})(navigationBar_3);
					if(typeof onMethodSelectionChange == "function") {
						navigationBar_3.addEventListener("selection-change", onMethodSelectionChange);
					}
					container.addChild(navigationBar_3, {
						"top": "150px",
						"left": "110px",
						"width": "854px",
						"height": "60px"
					});
					var group_3 = new cpr.controls.Container();
					group_3.style.css({
						"border-right-style" : "solid",
						"border-right-color" : "#F9F9F9"
					});
					var xYLayout_2 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_2);
					(function(container){
						var output_1 = new cpr.controls.Output();
						output_1.value = "종류별";
						output_1.style.css({
							"color" : "#90be70",
							"font-weight" : "bold",
							"font-family" : "푸른전남 Medium",
							"text-align" : "center"
						});
						container.addChild(output_1, {
							"top": "9px",
							"left": "0px",
							"width": "92px",
							"height": "60px"
						});
						var output_2 = new cpr.controls.Output();
						output_2.value = "재료별";
						output_2.style.css({
							"color" : "#90be70",
							"font-weight" : "bold",
							"font-family" : "푸른전남 Medium",
							"text-align" : "center"
						});
						container.addChild(output_2, {
							"top": "80px",
							"left": "0px",
							"width": "92px",
							"height": "60px"
						});
						var output_3 = new cpr.controls.Output();
						output_3.value = "방법별";
						output_3.style.css({
							"color" : "#90be70",
							"font-weight" : "bold",
							"font-family" : "푸른전남 Medium",
							"text-align" : "center"
						});
						container.addChild(output_3, {
							"top": "150px",
							"left": "0px",
							"width": "92px",
							"height": "59px"
						});
					})(group_3);
					container.addChild(group_3, {
						"top": "0px",
						"left": "10px",
						"width": "95px",
						"height": "219px"
					});
				})(group_2);
				container.addChild(group_2, {
					"width": "1262px",
					"height": "220px"
				});
				var group_4 = new cpr.controls.Container();
				group_4.style.css({
					"background-color" : "#FFFFFF"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_3);
				(function(container){
					var output_4 = new cpr.controls.Output();
					output_4.value = "총";
					output_4.style.css({
						"font-weight" : "bold",
						"font-family" : "푸른전남 Medium"
					});
					container.addChild(output_4, {
						"top": "50px",
						"left": "45px",
						"width": "18px",
						"height": "20px"
					});
					var output_5 = new cpr.controls.Output("recipeCount");
					output_5.value = "";
					output_5.style.css({
						"color" : "#0CA44E",
						"font-size" : "30px",
						"font-family" : "푸른전남 Medium"
					});
					container.addChild(output_5, {
						"top": "32px",
						"left": "62px",
						"width": "49px",
						"height": "38px"
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "개의 맛있는 레시피가 있습니다.";
					output_6.style.css({
						"font-weight" : "bold",
						"font-family" : "푸른전남 Medium"
					});
					container.addChild(output_6, {
						"top": "50px",
						"left": "110px",
						"width": "247px",
						"height": "20px"
					});
					var navigationBar_4 = new cpr.controls.NavigationBar("sort");
					navigationBar_4.style.css({
						"border-right-style" : "none",
						"border-left-style" : "none",
						"border-bottom-style" : "none",
						"font-family" : "푸른전남 Medium",
						"border-top-style" : "none"
					});
					navigationBar_4.bind("value").toDataMap(app.lookup("dmSort"), "sort");
					(function(navigationBar_4){
						navigationBar_4.addItem(new cpr.controls.MenuItem("최신순", "최신순", null));
						navigationBar_4.addItem(new cpr.controls.MenuItem("좋아요순", "좋아요순", null));
						navigationBar_4.addItem(new cpr.controls.MenuItem("조회순", "조회순", null));
					})(navigationBar_4);
					if(typeof onSortSelectionChange == "function") {
						navigationBar_4.addEventListener("selection-change", onSortSelectionChange);
					}
					container.addChild(navigationBar_4, {
						"top": "40px",
						"left": "1038px",
						"width": "204px",
						"height": "39px"
					});
				})(group_4);
				container.addChild(group_4, {
					"width": "1262px",
					"height": "90px"
				});
				var group_5 = new cpr.controls.Container("grp");
				group_5.style.css({
					"background-color" : "transparent"
				});
				var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
				group_5.setLayout(flowLayout_1);
				container.addChild(group_5, {
					"autoSize": "height",
					"width": "1220px",
					"height": "400px",
					"minHeight": 400
				});
				var pageIndexer_1 = new cpr.controls.PageIndexer("page");
				pageIndexer_1.pageRowCount = 12;
				pageIndexer_1.viewPageCount = 5;
				pageIndexer_1.bind("currentPageIndex").toDataMap(app.lookup("dmPage"), "pageNo");
				pageIndexer_1.init(1, 1, 1);
				if(typeof onPageSelectionChange == "function") {
					pageIndexer_1.addEventListener("selection-change", onPageSelectionChange);
				}
				container.addChild(pageIndexer_1, {
					"autoSize": "none",
					"width": "320px",
					"height": "40px"
				});
			})(group_1);
			container.addChild(group_1, {
				"width": "1920px",
				"height": "765px"
			});
			
			var userDefinedControl_2 = new udc.footer();
			container.addChild(userDefinedControl_2, {
				"autoSize": "none",
				"width": "1920px",
				"height": "100px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "recipe";
	cpr.core.Platform.INSTANCE.register(app);
})();
