/*
 * App URI: embedded/admin/findReportAdminDetail
 * Source Location: embedded/admin/findReportAdminDetail.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/admin/findReportAdminDetail", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * findReportAdminDetail.js
			 * Created at 2023. 8. 21. 오전 11:07:31.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				var host = app.getHost(); // 부모 임베디드 앱
				var val = host.initValue;
				app.lookup("dmselectreportlist").setValue("recipeBoardId", val.recipeBoardId);
				app.lookup("subselectreportlist").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubselectreportlistSubmitSuccess(e){
				var subselectreportlist = e.control;
				var metadata = subselectreportlist.getMetadata("selectReportListResult");
				if(metadata == 1){
					app.lookup("grd1").redraw();
				}
			}

			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var grid = app.lookup("grd1");
				var selectedRowIndex = grid.getSelectedRowIndex();	
				var dataRow = grid.getDataRow(selectedRowIndex);
				var recipeBoardId = dataRow.getValue("recipeBoardId");
				var memberEmail = dataRow.getValue("memberEmail");
				var reportContent = dataRow.getValue("reportContent");
				var reportTitle = dataRow.getValue("reportTitle");
				var declarationType = dataRow.getValue("declarationType");
				
				var initvalue = {
					"recipeBoardId":recipeBoardId,
					"memberEmail":memberEmail,
					"reportContent":reportContent,
					"reportTitle":reportTitle,
					"declarationType":declarationType
				};
				
				app.openDialog("dialog/selectDeclarationRecipe", {
					width: 400,
					height: 600,
					headerVisible: false
				}, function(dialog){
					dialog.ready(function(dialogApp) {
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
						dialog.initValue = initvalue;
					});
				}).then(function(returnValue){
					
				});
				
			}

			/*
			 * "뒤로가기" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				var host = app.getHost(); // 부모 임베디드 앱
				cpr.core.App.load("embedded/admin/findReportAdminForm", function(loadedApp){
					if (loadedApp){
			//			host.initValue = initValue;
						host.app = loadedApp;
					}
				});
				
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("dsselectreportlist");
			dataSet_1.parseData({
				"columns" : [
					{"name": "memberEmail"},
					{
						"name": "recipeBoardId",
						"dataType": "number"
					},
					{"name": "reportDate"},
					{"name": "reportTitle"},
					{"name": "reportContent"},
					{"name": "declarationType"}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dmselectreportlist");
			dataMap_1.parseData({
				"columns" : [{"name": "recipeBoardId"}]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subselectreportlist");
			submission_1.action = "/selectReportListByRecipeBoardId";
			submission_1.mediaType = "application/x-www-form-urlencoded;simple";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSubselectreportlistSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubselectreportlistSubmitSuccess);
			}
			app.register(submission_1);
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
			formLayout_1.setColumns(["100px", "1fr", "160px", "20px", "160px", "10px"]);
			formLayout_1.setRows(["50px", "20px", "1fr", "20px", "40px", "10px"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var button_1 = new cpr.controls.Button();
				button_1.value = "자세히 보기";
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
				var output_1 = new cpr.controls.Output();
				output_1.value = "해당 레시피 신고 리스트";
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
					"colSpan": 6,
					"rowSpan": 1
				});
				var grid_1 = new cpr.controls.Grid("grd1");
				grid_1.readOnly = true;
				grid_1.init({
					"dataSet": app.lookup("dsselectreportlist"),
					"columns": [
						{"width": "30px"},
						{"width": "77px"},
						{"width": "153px"},
						{"width": "121px"},
						{"width": "130px"},
						{"width": "111px"}
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
									cell.targetColumnName = "reportTitle";
									cell.text = "신고 제목";
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
									cell.text = "작성자 이름";
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
									cell.targetColumnName = "reportDate";
									cell.text = "신고 일자";
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
									cell.targetColumnName = "declarationType";
									cell.text = "신고 타입";
									cell.style.css({
										"background-color" : "#0ebc59",
										"color" : "#FFFFFF",
										"font-weight" : "bold"
									});
								}
							}
						]
					},
					"detail": {
						"rows": [{"height": "24px"}],
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
									cell.columnName = "reportTitle";
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
									cell.columnName = "reportDate";
									cell.control = (function(){
										var dateInput_1 = new cpr.controls.DateInput("dti1");
										dateInput_1.mask = "YYYY-MM-DD HH:mm:ss";
										dateInput_1.format = "YYYYMMDDHHmmss";
										dateInput_1.enabledInputMask = false;
										dateInput_1.bind("value").toDataColumn("reportDate");
										return dateInput_1;
									})();
									cell.controlConstraint = {};
								}
							},
							{
								"constraint": {"rowIndex": 0, "colIndex": 5},
								"configurator": function(cell){
									cell.columnName = "declarationType";
								}
							}
						]
					}
				});
				container.addChild(grid_1, {
					"colIndex": 0,
					"rowIndex": 2,
					"colSpan": 6,
					"rowSpan": 1
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "뒤로가기";
				button_2.style.css({
					"background-color" : "#0ebc59",
					"color" : "#FFFFFF",
					"font-size" : "16px",
					"background-image" : "none"
				});
				if(typeof onButtonClick2 == "function") {
					button_2.addEventListener("click", onButtonClick2);
				}
				container.addChild(button_2, {
					"colIndex": 4,
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
	app.title = "findReportAdminDetail";
	cpr.core.Platform.INSTANCE.register(app);
})();
