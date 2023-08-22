/*
 * App URI: embedded/admin/findReportAdminForm
 * Source Location: embedded/admin/findReportAdminForm.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/admin/findReportAdminForm", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * findReportAdminForm.js
			 * Created at 2023. 8. 20. 오후 10:42:35.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("subreportlist").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubreportlistSubmitSuccess(e){
				var subreportlist = e.control;
				app.lookup("grd1").redraw();
			}

			/*
			 * "신고 내용 확인" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				
				var RPgrid = app.lookup("grd1");
				var index = RPgrid.getSelectedIndices()[0].rowIndex;
				var index1 = RPgrid.getSelectedIndices();
				var cellValue = RPgrid.getCellValue(index, 1);
			//	var value = RPgrid.getSelectedRow().getValue("recipeBoardId");
				var host = app.getHost(); // 부모 임베디드 앱
				var initvalue = {"recipeBoardId":cellValue};
				cpr.core.App.load("embedded/admin/findReportAdminDetail", function(loadedApp){
					if (loadedApp){
						host.initValue = initvalue;
						host.app = loadedApp;
					}
				});
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubdeleterecipeSubmitSuccess(e){
				var subdeleterecipe = e.control;
				if(subdeleterecipe.getMetadata("deleteRecipeByIdResult") == 1){
					alert("삭제되었습니다");
					app.lookup("subreportlist").send();
					app.lookup("grd1").redraw();
				}
			}

			/*
			 * 그리드에서 cell-click 이벤트 발생 시 호출.
			 * Grid의 Cell 클릭시 발생하는 이벤트.
			 */
			function onGrd1CellClick(e){
				var grd1 = e.control;
				var RPgrid = app.lookup("grd1");
				var image = app.lookup("ximg");
				var cellIndex = RPgrid.getCellIndex("recipeBoardId");
				var index = grd1.getSelectedIndices()[0].rowIndex;
				var cellValue = grd1.getCellValue(index, 1);
			//	var selectedIndices = RPgrid.getSelectedIndices()[cellIndex];
			//	console.log(selectedIndices);
			//	RPgrid.getCellValue(rowIndex,)
			//	RPgrid.getCellValue(RPgrid.getSelectedCellIndices());
				if(e.cellIndex != 6){
					return ;
				}
				if(confirm("해당 레시피를 지우시겠습니까?")){
					app.lookup("dmdeleterecipe").setValue("recipeBoardId", cellValue);
					app.lookup("subdeleterecipe").send();
				}

			}

			/*
			 * 서브미션에서 submit-done 이벤트 발생 시 호출.
			 * 응답처리가 모두 종료되면 발생합니다.
			 */
			function onSubdeleterecipeSubmitDone(e){
				var subdeleterecipe = e.control;
				app.lookup("grd1").redraw();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsreportlist");
			dataSet_1.parseData({
				"columns" : [
					{"name": "memberEmail"},
					{"name": "recipeBoardTitle"},
					{
						"name": "recipeBoardId",
						"dataType": "number"
					},
					{
						"name": "categoryIngredients",
						"dataType": "string"
					},
					{"name": "categoryMethod"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmdeleterecipe");
			dataMap_1.parseData({
				"columns" : [{"name": "recipeBoardId"}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subreportlist");
			submission_1.action = "/selectAllReportList";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubreportlistSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubreportlistSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subdeleterecipe");
			submission_2.action = "/deleteRecipeById";
			submission_2.mediaType = "application/x-www-form-urlencoded;simple";
			submission_2.addRequestData(dataMap_1);
			if(typeof onSubdeleterecipeSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubdeleterecipeSubmitSuccess);
			}
			if(typeof onSubdeleterecipeSubmitDone == "function") {
				submission_2.addEventListener("submit-done", onSubdeleterecipeSubmitDone);
			}
			app.register(submission_2);
			app.supportMedia("all and (min-width: 1860px)", "new-screen");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1859px)", "default");
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
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["300px", "1fr", "160px", "10px"]);
			formLayout_1.setRows(["50px", "20px", "1fr", "20px", "40px", "10px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var grid_1 = new cpr.controls.Grid("grd1");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("dsreportlist"),
					"selectionUnit": "cell",
					"columns": [
						{"width": "30px"},
						{"width": "68px"},
						{"width": "167px"},
						{"width": "134px"},
						{"width": "86px"},
						{"width": "110px"},
						{"width": "100px"}
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
										"font-weight" : "bold"
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
										"font-weight" : "bold"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.targetColumnName = "recipeBoardTitle";
									cell.text = "레시피 제목";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.targetColumnName = "memberEmail";
									cell.text = "레시피 작성자";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.targetColumnName = "categoryIngredients";
									cell.text = "분류 방법";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.filterable = false;
									cell.sortable = false;
									cell.targetColumnName = "categoryMethod";
									cell.text = "분류 재료";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold"
									});
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.text = "레시피 삭제";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold",
										"background-image" : "none"
									});
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "39px"}],
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
									cell.columnName = "recipeBoardId";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 2},
								"configurator": function(cell){
									cell.columnName = "recipeBoardTitle";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 3},
								"configurator": function(cell){
									cell.columnName = "memberEmail";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 4},
								"configurator": function(cell){
									cell.columnName = "categoryIngredients";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "categoryMethod";
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 6},
								"configurator": function(cell){
									cell.control = (function(){
										var image_1 = new cpr.controls.Image("ximg");
										image_1.src = "theme/images/icon/x.png";
										return image_1;
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
				grid_1.style.css({
					"border-right-style" : "solid",
					"border-bottom-color" : "#ffffff",
					"border-left-style" : "solid",
					"border-left-color" : "#ffffff",
					"border-top-color" : "#ffffff",
					"border-bottom-style" : "solid",
					"border-right-color" : "#ffffff",
					"border-top-style" : "solid"
				});
				if(typeof onGrd1CellClick == "function") {
					grid_1.addEventListener("cell-click", onGrd1CellClick);
				}
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 2,
					"colSpan": 4,
					"rowSpan": 1
				});
				var output_1 = new cpr.controls.Output();
				output_1.value = "신고 리스트";
				output_1.style.css({
					"border-bottom-color" : "#0ebc59",
					"color" : "#0fd465",
					"font-weight" : "bold",
					"border-bottom-width" : "1px",
					"font-size" : "18px",
					"border-bottom-style" : "solid",
					"font-family" : "푸른전남",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 4,
					"rowSpan": 1
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "   * 3건 이상 신고된 목록이 출력됩니다";
				output_2.style.css({
					"color" : "#737373"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 4
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "신고 내용 확인";
				button_1.style.css({
					"background-color" : "#0ebc59",
					"color" : "#FFFFFF",
					"font-size" : "16px",
					"background-image" : "none"
				});
				if(typeof onButtonClick == "function") {
					button_1.addEventListener("click", onButtonClick);
				}
				container.addChild(button_1, {
					"colIndex": 2,
					"rowIndex": 4
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "30px",
				"bottom": "30px",
				"width": "860px",
				"left": "calc(50% - 430px)"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "findReportAdminForm";
	cpr.core.Platform.INSTANCE.register(app);
})();
