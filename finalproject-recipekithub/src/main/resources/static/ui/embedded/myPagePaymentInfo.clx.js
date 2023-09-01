/*
 * App URI: embedded/myPagePaymentInfo
 * Source Location: embedded/myPagePaymentInfo.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/myPagePaymentInfo", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * myPagePaymentInfo.js
			 * Created at 2023. 8. 10. 오후 11:08:02.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				// 콤보박스 디폴트 설정
				app.lookup("cmb1").selectItemByValue("a"); 
				app.lookup("myPaymentListOnload").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onMyPaymentListOnloadSubmitSuccess(e){
				var myPaymentListOnload = e.control;
				var metadata = myPaymentListOnload.getMetadata("sendMealkitInfo");
				var mealkitInfo = myPaymentListOnload.getMetadata("mealkitinfoString");
				var dataSet = app.lookup("myPaymentList");
				
				for(var i=0;i<metadata.length;i++){
					dataSet.setValue(i, "mealkitNo", metadata[i].mealkitNo);
					dataSet.setValue(i, "mealkitName", metadata[i].mealkitName);
					dataSet.setValue(i, "mealkitinfo", mealkitInfo[i].mealkitdetail);
					dataSet.setValue(i, "mealkitdetailinfo", mealkitInfo[i].mealkitdetailinfo);
				}
				dataSet.refresh();
				app.lookup("grd1").redraw();
			}

			/*
			 * "검색" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				
				var combovalue = app.lookup("cmb1").value;
				var dataMap = app.lookup("searchparam");
				if(combovalue == "mealkitName"){
					dataMap.setValue("combovalue", "mealkitName");
				}else if(combovalue == "paymentDate"){
					dataMap.setValue("combovalue", "paymentDate");
				}else if(combovalue == null || combovalue == "" ){
					dataMap.setValue("combovalue", null);
				}
				app.lookup("sendsearchparam").send();
			//	console.log(dataMap.getValue("combovalue"));
			}

			/*
			 * 콤보 박스에서 selection-change 이벤트 발생 시 호출.
			 * ComboBox Item을 선택하여 선택된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onCmb1SelectionChange(e){
				var cmb1 = e.control;
				var combovalue = app.lookup("cmb1").value;
				if(combovalue == "paymentDate"){
					app.lookup("ipb1").placeholder = "년월일을 기입해 주세요 ex)20230813";
					app.lookup("ipb1").redraw();
				}	
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSendsearchparamSubmitSuccess(e){
				var sendsearchparam = e.control;
				var metadata = sendsearchparam.getMetadata("sendMealkitInfo");
				var mealkitInfo = sendsearchparam.getMetadata("mealkitinfoString");
				var dataSet = app.lookup("myPaymentList");
				
				for(var i=0;i<metadata.length;i++){
					dataSet.setValue(i, "mealkitNo", metadata[i].mealkitNo);
					dataSet.setValue(i, "mealkitName", metadata[i].mealkitName);
					dataSet.setValue(i, "mealkitinfo", mealkitInfo[i].mealkitdetail);
					dataSet.setValue(i, "mealkitdetailinfo", mealkitInfo[i].mealkitdetailinfo);
				}
				dataSet.refresh();
				app.lookup("grd1").redraw();
				
			}

			/*
			 * "주문 취소" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				console.log(1);
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("myPaymentList");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "paymentTotal",
						"dataType": "number"
					},
					{
						"name": "paymentDate",
						"dataType": "string"
					},
					{
						"name": "mealkitNo",
						"dataType": "number",
						"displayOnly": false
					},
					{"name": "mealkitName"},
					{
						"name": "paymentId",
						"dataType": "number",
						"displayOnly": false
					},
					{
						"name": "mealkitdetailinfo",
						"dataType": "string"
					},
					{
						"name": "mealkitinfo",
						"dataType": "string"
					}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("searchparam");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "inputvalue",
						"dataType": "string"
					},
					{"name": "combovalue"}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("myPaymentListOnload");
			submission_1.action = "/findMyPaymentList";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onMyPaymentListOnloadSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onMyPaymentListOnloadSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sendsearchparam");
			submission_2.action = "/searchMyPaymentList";
			submission_2.mediaType = "application/x-www-form-urlencoded;simple";
			submission_2.addRequestData(dataMap_1);
			submission_2.addResponseData(dataSet_1, false);
			if(typeof onSendsearchparamSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSendsearchparamSubmitSuccess);
			}
			app.register(submission_2);
			app.supportMedia("all", "myPageEm");
			
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
				"background-color" : "#ebeae8"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
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
				formLayout_1.setColumns(["130px", "1fr", "100px", "1fr"]);
				formLayout_1.setRows(["50px", "5px", "30px", "5px", "1fr"]);
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "구매 내역";
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
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 4,
						"rowSpan": 1
					});
					var group_3 = new cpr.controls.Container();
					group_3.style.setClasses(["cl-form-group"]);
					group_3.style.css({
						"border-right-style" : "solid",
						"border-bottom-color" : "#ffffff",
						"border-left-style" : "solid",
						"border-left-color" : "#ffffff",
						"border-top-color" : "#ffffff",
						"border-bottom-style" : "solid",
						"border-right-color" : "#ffffff",
						"border-top-style" : "solid"
					});
					var formLayout_2 = new cpr.controls.layouts.FormLayout();
					formLayout_2.scrollable = false;
					formLayout_2.topMargin = "0px";
					formLayout_2.rightMargin = "0px";
					formLayout_2.bottomMargin = "0px";
					formLayout_2.leftMargin = "0px";
					formLayout_2.horizontalSpacing = "0px";
					formLayout_2.verticalSpacing = "0px";
					formLayout_2.horizontalSeparatorWidth = 1;
					formLayout_2.verticalSeparatorWidth = 1;
					formLayout_2.setColumns(["130px", "10px", "1fr", "10px", "100px"]);
					formLayout_2.setRows(["1fr"]);
					group_3.setLayout(formLayout_2);
					(function(container){
						var comboBox_1 = new cpr.controls.ComboBox("cmb1");
						comboBox_1.showIcon = true;
						comboBox_1.preventInput = true;
						(function(comboBox_1){
							comboBox_1.addItem(new cpr.controls.Item("----------", "a"));
							comboBox_1.addItem(new cpr.controls.Item("결제일자", "paymentDate"));
							comboBox_1.addItem(new cpr.controls.Item("밀키트 이름", "mealkitName"));
						})(comboBox_1);
						if(typeof onCmb1SelectionChange == "function") {
							comboBox_1.addEventListener("selection-change", onCmb1SelectionChange);
						}
						container.addChild(comboBox_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var inputBox_1 = new cpr.controls.InputBox("ipb1");
						inputBox_1.bind("value").toDataMap(app.lookup("searchparam"), "inputvalue");
						container.addChild(inputBox_1, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var button_1 = new cpr.controls.Button();
						button_1.value = "검색";
						button_1.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"background-image" : "none"
						});
						if(typeof onButtonClick == "function") {
							button_1.addEventListener("click", onButtonClick);
						}
						container.addChild(button_1, {
							"colIndex": 4,
							"rowIndex": 0
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 0,
						"rowIndex": 2,
						"colSpan": 4,
						"rowSpan": 1
					});
					var grid_1 = linker.grid_1 = new cpr.controls.Grid("grd1");
					grid_1.readOnly = true;
					grid_1.init({
						"dataSet": app.lookup("myPaymentList"),
						"autoRowHeight": "all",
						"wheelRowCount": 3,
						"suppressedCellType": "merged",
						"columns": [
							{"width": "50px"},
							{"width": "100px"},
							{"width": "100px"},
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
											"background-image" : "none"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 1},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.text = "주문 목록";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"background-image" : "none"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "paymentDate";
										cell.text = "주문 날짜";
										cell.style.css({
											"background-color" : "#0ebc59",
											"color" : "#FFFFFF",
											"font-weight" : "bold",
											"background-image" : "none"
										});
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.filterable = false;
										cell.sortable = false;
										cell.targetColumnName = "paymentTotal";
										cell.text = "총 가격(원)";
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
										cell.columnName = "mealkitName";
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 2},
									"configurator": function(cell){
										cell.columnName = "paymentDate";
										cell.suppressRef = 3;
										cell.suppressible = true;
										cell.control = (function(){
											var dateInput_1 = new cpr.controls.DateInput("dti1");
											dateInput_1.style.css({
												"text-align" : "center"
											});
											dateInput_1.bind("value").toDataColumn("paymentDate");
											return dateInput_1;
										})();
										cell.controlConstraint = {};
									}
								},
								{
									"constraint": {"rowIndex": 0, "colIndex": 3},
									"configurator": function(cell){
										cell.columnName = "paymentTotal";
										cell.suppressRef = -1;
										cell.suppressible = true;
									}
								}
							]
						}
					});
					container.addChild(grid_1, {
						"colIndex": 0,
						"rowIndex": 4,
						"colSpan": 4,
						"rowSpan": 1
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "0px",
					"right": "0px",
					"left": "0px",
					"height": "630px"
				});
				var group_4 = new cpr.controls.Container();
				group_4.style.css({
					"background-color" : "#FFFFFF"
				});
				var formLayout_3 = new cpr.controls.layouts.FormLayout();
				formLayout_3.scrollable = false;
				formLayout_3.topMargin = "0px";
				formLayout_3.rightMargin = "0px";
				formLayout_3.bottomMargin = "0px";
				formLayout_3.leftMargin = "0px";
				formLayout_3.horizontalSpacing = "0px";
				formLayout_3.verticalSpacing = "0px";
				formLayout_3.setColumns(["1fr", "1fr", "1fr", "1fr"]);
				formLayout_3.setRows(["40px", "1fr", "1fr", "1fr"]);
				group_4.setLayout(formLayout_3);
				(function(container){
					var output_2 = new cpr.controls.Output();
					output_2.value = "상세 정보";
					output_2.style.css({
						"border-bottom-color" : "darkGrey",
						"color" : "#0fd465",
						"font-weight" : "bold",
						"border-bottom-width" : "1px",
						"font-size" : "18px",
						"border-bottom-style" : "solid",
						"font-family" : "푸른전남",
						"text-align" : "center"
					});
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 4,
						"rowSpan": 1
					});
					var group_5 = linker.group_5 = new cpr.controls.Container();
					group_5.style.setClasses(["cl-form-group"]);
					var formLayout_4 = new cpr.controls.layouts.FormLayout();
					formLayout_4.scrollable = false;
					formLayout_4.topMargin = "0px";
					formLayout_4.rightMargin = "0px";
					formLayout_4.bottomMargin = "0px";
					formLayout_4.leftMargin = "0px";
					formLayout_4.horizontalSpacing = "0px";
					formLayout_4.verticalSpacing = "0px";
					formLayout_4.horizontalSeparatorWidth = 1;
					formLayout_4.verticalSeparatorWidth = 1;
					formLayout_4.setColumns(["100px", "250px", "100px", "40px", "60px", "1fr"]);
					formLayout_4.setUseColumnShade(0, true);
					formLayout_4.setUseColumnShade(2, true);
					formLayout_4.setRows(["1fr", "1fr", "1fr"]);
					group_5.setLayout(formLayout_4);
					(function(container){
						var output_3 = new cpr.controls.Output();
						output_3.value = "결제 번호";
						output_3.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"font-weight" : "300",
							"background-image" : "none",
							"text-align" : "center"
						});
						container.addChild(output_3, {
							"colIndex": 0,
							"rowIndex": 0
						});
						var output_4 = new cpr.controls.Output();
						output_4.value = "총 가격";
						output_4.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"font-weight" : "300",
							"background-image" : "none",
							"text-align" : "center"
						});
						container.addChild(output_4, {
							"colIndex": 2,
							"rowIndex": 0
						});
						var output_5 = new cpr.controls.Output();
						output_5.style.css({
							"text-align" : "center"
						});
						output_5.bind("value").toDataColumn("paymentId");
						container.addChild(output_5, {
							"colIndex": 1,
							"rowIndex": 0
						});
						var output_6 = new cpr.controls.Output();
						output_6.style.css({
							"text-align" : "center"
						});
						output_6.bind("value").toDataColumn("mealkitName");
						container.addChild(output_6, {
							"colIndex": 1,
							"rowIndex": 1,
							"colSpan": 1,
							"rowSpan": 1
						});
						var output_7 = new cpr.controls.Output();
						output_7.style.css({
							"text-align" : "center"
						});
						output_7.bind("value").toDataColumn("paymentDate");
						container.addChild(output_7, {
							"colIndex": 1,
							"rowIndex": 2,
							"colSpan": 1,
							"rowSpan": 1
						});
						var output_8 = new cpr.controls.Output();
						output_8.value = "밀키트 명";
						output_8.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"font-weight" : "300",
							"background-image" : "none",
							"text-align" : "center"
						});
						container.addChild(output_8, {
							"colIndex": 0,
							"rowIndex": 1
						});
						var output_9 = new cpr.controls.Output();
						output_9.value = "결제 일자";
						output_9.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"font-weight" : "300",
							"background-image" : "none",
							"text-align" : "center"
						});
						container.addChild(output_9, {
							"colIndex": 0,
							"rowIndex": 2
						});
						var output_10 = new cpr.controls.Output();
						output_10.style.css({
							"text-align" : "center"
						});
						output_10.bind("value").toDataColumn("paymentTotal");
						container.addChild(output_10, {
							"colIndex": 3,
							"rowIndex": 0,
							"colSpan": 3,
							"rowSpan": 1
						});
						var output_11 = new cpr.controls.Output();
						output_11.value = "상세 구매정보";
						output_11.style.css({
							"background-color" : "#0ebc59",
							"color" : "#FFFFFF",
							"font-weight" : "300",
							"background-image" : "none",
							"text-align" : "center"
						});
						container.addChild(output_11, {
							"colIndex": 2,
							"rowIndex": 1,
							"colSpan": 1,
							"rowSpan": 2
						});
						var output_12 = new cpr.controls.Output();
						output_12.style.css({
							"text-align" : "center"
						});
						output_12.bind("value").toDataColumn("mealkitdetailinfo");
						container.addChild(output_12, {
							"colIndex": 3,
							"rowIndex": 1,
							"colSpan": 3,
							"rowSpan": 2
						});
					})(group_5);
					container.addChild(group_5, {
						"colIndex": 0,
						"rowIndex": 1,
						"colSpan": 4,
						"rowSpan": 3
					});
				})(group_4);
				container.addChild(group_4, {
					"right": "0px",
					"bottom": "0px",
					"left": "0px",
					"height": "150px"
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
			// Linking
			linker.group_5.setBindContext(new cpr.bind.GridSelectionContext(linker.grid_1));
		}
	});
	app.title = "myPagePaymentInfo";
	cpr.core.Platform.INSTANCE.register(app);
})();
