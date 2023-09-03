/*
 * App URI: embedded/myPageRecipeLike
 * Source Location: embedded/myPageRecipeLike.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/myPageRecipeLike", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * myPageRecipeLike.js
			 * Created at 2023. 8. 22. 오후 12:11:17.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("subfindRecipeLikeList").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubfindRecipeLikeListSubmitSuccess(e){
				var subfindRecipeLikeList = e.control;
				var dataSet = app.lookup("dsrecipelikelist");
				for(var i=0;i<dataSet.getRowCount();i++){
					var recipeimage = dataSet.getValue(i, "recipeBoardImage");
					var imgpath = "/upload/recipe/"+recipeimage;
					dataSet.setValue(i, "recipeBoardImage", imgpath);
				}
			}

			/*
			 * 그리드에서 cell-click 이벤트 발생 시 호출.
			 * Grid의 Cell 클릭시 발생하는 이벤트.
			 */
			function onGrd1CellClick(e){
				var grd1 = e.control;
				var image = app.lookup("likeimg");
				var index = grd1.getSelectedIndices()[0].rowIndex;
				var recipeBoardId = grd1.getCellValue(index, 1);
				
				if(e.cellIndex != 7){
					return ;
				}else{
					app.getRootAppInstance().openDialog("dialog/needConfirm", {
						width: 400, height: 300, headerClose: true
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = "해당 상품을 찜목록에서 삭제하시겠습니까?"
						});
					}).then(function(returnValue){
						if(returnValue == "ok"){
							app.lookup("dmdeleteRecipeLike").setValue("recipeBoardId", recipeBoardId);
							app.lookup("subdeleteRecipeLike").send();
						}else{
							return;
						}
					});
				}
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubdeleteRecipeLikeSubmitSuccess(e){
				var subdeleteRecipeLike = e.control;
				app.lookup("subfindRecipeLikeList").send();
				app.lookup("grd1").redraw();
			}

			/*
			 * "레시피로 가기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var grd1 = app.lookup("grd1");
				var index = grd1.getSelectedIndices()[0].rowIndex;
				var recipeBoardId = grd1.getCellValue(index, 1);
				if(recipeBoardId == null || recipeBoardId == '' || index == null){
					app.openDialog("dialog/noSelectCell", {width: 400, height: 300, headerClose: true
					}, function(dialog){
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = "원하는 행을 선택해주세요";
						});
					});
				}else{
					window.location.href = "/detailRecipe?recipeBoardId=" + recipeBoardId;
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsrecipelikelist");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "recipeBoardId",
						"dataType": "number"
					},
					{"name": "memberEmail"},
					{"name": "recipeBoardTitle"},
					{"name": "categoryType"},
					{"name": "categoryIngredients"},
					{"name": "categoryMethod"},
					{"name": "recipeBoardImage"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmdeleteRecipeLike");
			dataMap_1.parseData({
				"columns" : [{
					"name": "recipeBoardId",
					"dataType": "number"
				}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subfindRecipeLikeList");
			submission_1.action = "/findRecipeLikeList";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubfindRecipeLikeListSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubfindRecipeLikeListSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subdeleteRecipeLike");
			submission_2.action = "/clickRecipeLike";
			submission_2.mediaType = "application/x-www-form-urlencoded;simple";
			submission_2.addRequestData(dataMap_1);
			if(typeof onSubdeleteRecipeLikeSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubdeleteRecipeLikeSubmitSuccess);
			}
			app.register(submission_2);
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
				output_1.value = "레시피 좋아요 목록";
				output_1.style.css({
					"padding-top" : "5px",
					"border-bottom-color" : "darkGrey",
					"color" : "#0fd465",
					"font-weight" : "bold",
					"border-bottom-width" : "1px",
					"font-size" : "18px",
					"border-bottom-style" : "solid",
					"font-family" : "푸른전남 Medium",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "0px",
					"right": "0px",
					"left": "0px",
					"height": "50px"
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"border-radius" : "20px",
					"background-color" : "#F7F7F7"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var grid_1 = new cpr.controls.Grid("grd1");
					grid_1.readOnly = true;
					grid_1.init({
						"dataSet": app.lookup("dsrecipelikelist"),
						"selectionUnit": "cell",
						"columns": [
							{"width": "30px"},
							{"width": "57px"},
							{"width": "60px"},
							{"width": "94px"},
							{"width": "55px"},
							{"width": "55px"},
							{"width": "61px"},
							{"width": "53px"}
						],
						"header": {
							"rows": [{"height": "24px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "recipeBoardId";
										cell.text = "레시피 번호";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "recipeBoardImage";
										cell.text = "이미지";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "recipeBoardTitle";
										cell.text = "제목";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4, "rowSpan": 1, "colSpan": 3},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "categoryType";
										cell.text = "카테고리";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 7},
									"configurator": function(cell){
										cell.text = "좋아요";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"font-family" : "푸른전남 Medium"
										});
									}
								}
							]
						},
						"detail": {
							"rows": [{"height": "61px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.columnType = "rowindex";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.columnName = "recipeBoardId";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.columnName = "recipeBoardImage";
										cell.style.css({
											"font-family" : "푸른전남"
										});
										cell.control = (function(){
											var image_1 = new cpr.controls.Image();
											image_1.bind("value").toDataColumn("recipeBoardImage");
											return image_1;
										})();
										cell.controlConstraint = {
											"horizontalAlign": "center",
											"verticalAlign": "center",
											"width": 60,
											"height": 50
										};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.columnName = "recipeBoardTitle";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.columnName = "categoryType";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.columnName = "categoryIngredients";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 6},
									"configurator": function(cell){
										cell.columnName = "categoryMethod";
										cell.style.css({
											"font-family" : "푸른전남"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 7},
									"configurator": function(cell){
										cell.control = (function(){
											var image_2 = new cpr.controls.Image("likeimg");
											image_2.src = "theme/images/mealkit/heart_fill.png";
											image_2.style.css({
												"cursor" : "pointer"
											});
											return image_2;
										})();
										cell.controlConstraint = {
											"horizontalAlign": "center",
											"verticalAlign": "center",
											"width": 30,
											"height": 30
										};
									}
								}
							]
						}
					});
					if(typeof onGrd1CellClick == "function") {
						grid_1.addEventListener("cell-click", onGrd1CellClick);
					}
					container.addChild(grid_1, {
						"top": "15px",
						"right": "15px",
						"bottom": "50px",
						"left": "15px"
					});
					var button_1 = new cpr.controls.Button();
					button_1.value = "레시피로 가기";
					button_1.style.css({
						"background-color" : "#0ebc59",
						"color" : "#FFFFFF",
						"font-family" : "푸른전남 Medium",
						"background-image" : "none"
					});
					if(typeof onButtonClick == "function") {
						button_1.addEventListener("click", onButtonClick);
					}
					container.addChild(button_1, {
						"right": "15px",
						"bottom": "10px",
						"width": "120px",
						"height": "30px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "60px",
					"right": "10px",
					"bottom": "10px",
					"left": "10px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "myPageRecipeLike";
	cpr.core.Platform.INSTANCE.register(app);
})();
