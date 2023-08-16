/*
 * App URI: embedded/myPageMealkitLike
 * Source Location: embedded/myPageMealkitLike.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/myPageMealkitLike", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * myPageMealkitLike.js
			 * Created at 2023. 8. 15. 오후 5:20:32.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubmealkitlikelistSubmitSuccess(e){
				var submealkitlikelist = e.control;
				var metadata = submealkitlikelist.getMetadata("mealLikeList");
				var likeYNmetadata = submealkitlikelist.getMetadata("likeYN");
				var mealkitLikeList = app.lookup("mealkitLikeList");
				var value = null;
				for(var i=0;i<metadata.length;i++){
					mealkitLikeList.setValue(i, "memberEmail", metadata[i].memberEmail);
					if(likeYNmetadata[i] == 1){
						value = "theme/images/mealkit/heart_fill.png";
					}else{
						value = "theme/images/mealkit/heart.png";
					}
					mealkitLikeList.setValue(i, "likeYN", value);
				}
				app.lookup("grd1").redraw();
			}

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("submealkitlikelist").send();
			}

			/*
			 * 그리드에서 cell-click 이벤트 발생 시 호출.
			 * Grid의 Cell 클릭시 발생하는 이벤트.
			 */
			function onGrd1CellClick(e){
				var grd1 = e.control;
				var grid = app.lookup("grd1");
				var value = "theme/images/mealkit/heart_fill.png";
				var image = app.lookup("likeimg");
				if(e.cellIndex != 5){
					return ;
				}else{
					if(confirm("찜을 취소하시겠습니까? 취소하시면 목록에서 해당 밀키트가 삭제 됩니다")){
						app.lookup("subdeletemelkiktlike").send();
					}
				}
				
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubdeletemelkiktlikeSubmitSuccess(e){
				var subdeletemelkiktlike = e.control;
				app.lookup("grd1").redraw();
			}

			/*
			 * 서브미션에서 submit-done 이벤트 발생 시 호출.
			 * 응답처리가 모두 종료되면 발생합니다.
			 */
			function onSubdeletemelkiktlikeSubmitDone(e){
				var subdeletemelkiktlike = e.control;
				app.lookup("grd1").redraw();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("mealkitLikeList");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "mealkitNo",
						"dataType": "number"
					},
					{"name": "mealkitName"},
					{"name": "mealkitIngredients"},
					{"name": "mealkitCategory"},
					{"name": "memberEmail"},
					{"name": "likeYN"}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("submealkitlikelist");
			submission_1.action = "/findMealkitLikeList";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubmealkitlikelistSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubmealkitlikelistSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subdeletemelkiktlike");
			submission_2.action = "/clickLike";
			submission_2.mediaType = "application/x-www-form-urlencoded;simple";
			submission_2.addRequestData(dataSet_1);
			if(typeof onSubdeletemelkiktlikeSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubdeletemelkiktlikeSubmitSuccess);
			}
			if(typeof onSubdeletemelkiktlikeSubmitDone == "function") {
				submission_2.addEventListener("submit-done", onSubdeletemelkiktlikeSubmitDone);
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
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "밀키트찜 목록";
				output_1.style.css({
					"padding-top" : "5px",
					"border-bottom-color" : "darkGrey",
					"color" : "#0fd465",
					"font-weight" : "bold",
					"border-bottom-width" : "1px",
					"font-size" : "18px",
					"border-bottom-style" : "solid",
					"font-family" : "푸른전남",
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
					"background-color" : "#F6F6F6"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var grid_1 = new cpr.controls.Grid("grd1");
					grid_1.readOnly = true;
					grid_1.init({
						"dataSet": app.lookup("mealkitLikeList"),
						"selectionUnit": "cell",
						"columns": [
							{"width": "20px"},
							{"width": "125px"},
							{"width": "115px"},
							{"width": "115px"},
							{"width": "100px"},
							{"width": "42px"}
						],
						"header": {
							"rows": [{"height": "24px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "mealkitName";
										cell.text = "밀키트명";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "mealkitIngredients";
										cell.text = "성분";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "mealkitCategory";
										cell.text = "카테고리";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "memberEmail";
										cell.text = "등록자명";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
									}
								}
							]
						},
						"detail": {
							"rows": [{"height": "42px"}],
							"cells": [
								{
									"constraint": {"rowIndex": 0, "colIndex": 0},
									"configurator": function(cell){
										cell.columnType = "rowindex";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.columnName = "mealkitName";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.columnName = "mealkitIngredients";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.columnName = "mealkitCategory";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 4},
									"configurator": function(cell){
										cell.columnName = "memberEmail";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 5},
									"configurator": function(cell){
										cell.control = (function(){
											var image_1 = new cpr.controls.Image("likeimg");
											image_1.style.css({
												"cursor" : "pointer"
											});
											image_1.bind("src").toDataColumn("likeYN");
											return image_1;
										})();
										cell.controlConstraint = {
											"horizontalAlign": "center",
											"verticalAlign": "center",
											"width": 40,
											"height": 40
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
						"bottom": "15px",
						"left": "15px"
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
	app.title = "myPageMealkitLike";
	cpr.core.Platform.INSTANCE.register(app);
})();
