/*
 * App URI: cart/cartForm
 * Source Location: cart/cartForm.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("cart/cartForm", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * cartForm.js
			 * Created at 2023. 8. 7. 오후 10:28:28.
			 *
			 * @author shj22k
			 ************************************************/


			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("selectMyCart").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSelectMyCartSubmitSuccess(e){
				var selectMyCart = e.control;
				
				var metadata = selectMyCart.getMetadata("cartInfoEtc");
				var cartDetailMeta = selectMyCart.getMetadata("cartDetail");
				var dscartlist = app.lookup("cartlist");
				
				for(var i=0;i<metadata.length;i++){
					dscartlist.setValue(i, "mealkitImage", '/upload/mealkit/'+metadata[i].mealkitImage);
					dscartlist.setValue(i, "mealkitName", metadata[i].mealkitName);
					dscartlist.setValue(i, "mealkitPrice", metadata[i].mealkitPrice);
					dscartlist.setValue(i, "cartDetailQuantity", cartDetailMeta[i].cartDetailQuantity);
					dscartlist.setValue(i, "isChecked", cartDetailMeta[i].isChecked);
					if(dscartlist.getValue(i, "isChecked") == "Y"){
						app.lookup("grd1").setCheckRowIndex(i, true); // 체크박스체크	
					}
				}
				
				dscartlist.refresh();
				console.log(dscartlist);
				var sum = 0;
				for(var j=0;j<metadata.length;j++){
					var value = dscartlist.getValue(j, "cartTotal");
					sum= value+sum;
				}
				app.lookup("totalval").value = sum;
				app.lookup("grd1").redraw();
			}

			function getSumPrice(){
				var dscartlist = app.lookup("cartlist");
				var grid = app.lookup("grd1");
				var sum = 0;
				for(var j=0;j<grid.getDataRowCount();j++){
					if(grid.isCheckedRow(j)){
						var value = dscartlist.getValue(j, "cartTotal");
						sum= value+sum;
					}
				}
				app.lookup("totalval").value = sum;
				grid.redraw();
			}

			/*
			 * "전체 상품 주문" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var grid = app.lookup("grd1");
				if(grid.getDataRowCount() > 0){
					for(var i=0;i<grid.getDataRowCount();i++){
						if(grid.isCheckedRow(i)){
							var cellValue = grid.getCellValue(i, "mealkitName");
							var data = {"mealkitName" : cellValue};
							console.log(cellValue);
							app.lookup("selectList").addRowData(data);
						}
					}
					app.lookup("paymentTotal").setValue("totalpay", app.lookup("totalval").value);
					app.lookup("payment").send();
				}else{
					console.log("장바구니없음");
					var src = "dialog/failPayment";
					var initValue = "장바구니에 물건이 없습니다";
					app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
						dialog.ready(function(dialogApp){
							// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
							dialogApp.initValue = initValue;
						});
					});
				}
			}

			/*
			 * 넘버 에디터에서 value-change 이벤트 발생 시 호출.
			 * NumberEditor의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onNbe2ValueChange(e){
				var nbe2 = e.control;
				var grid = app.lookup("grd1");
				var dataRowCount = grid.getDataRowCount(); //총 행의 갯수
				var dscartlist = app.lookup("cartlist");
				
				// 토탈 Output 적용
				var sum = 0;
				for(var j=0;j<dataRowCount;j++){
					var value = dscartlist.getValue(j, "cartTotal");
					sum+=value;
				}
				app.lookup("totalval").value = sum;
				app.lookup("totalval").redraw();
				
				// 수정 서브미션 DB적용
				var selectedRowIndex = grid.getSelectedRowIndex();
				var cellValue = grid.getCellValue(selectedRowIndex, "cartDetailQuantity");
				app.lookup("updateQuantity").setValue("cartDetailQuantity", cellValue);
				var cellValue = grid.getCellValue(selectedRowIndex, "mealkitName");
				app.lookup("updateQuantity").setValue("mealkitName", cellValue);
				app.lookup("updateMyCart").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onPaymentSubmitSuccess(e){
				var payment = e.control;
				var metadata = payment.getMetadata("errormsg");
				var src = null;
				if(metadata == '재고수량이 충분하지 않습니다'){
					src = "dialog/failPayment";
					var initValue = metadata;
					app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
						dialog.ready(function(dialogApp){
							// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
							dialogApp.initValue = initValue;
						});
					});
				}else if(metadata == '결제가 정상적으로 완료되었습니다'){
					src = "dialog/successPayment";
					var initValue = metadata;
					app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
						dialog.ready(function(dialogApp){
							// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
							dialogApp.initValue = initValue;
						});
					}).then(function(returnValue){
						location.href="index.clx";
					});
				}
			}

			/*
			 * 그리드에서 row-uncheck 이벤트 발생 시 호출.
			 * Grid의 행 선택 컬럼(columnType=checkbox)이 체크 해제되었을 때 발생하는 이벤트.
			 */
			function onGrd1RowUncheck(e){
				var grd1 = e.control;
				var grid = app.lookup("grd1");
				var selectedRowIndex = grid.getSelectedRowIndex();
				var cellValue = grid.getCellValue(selectedRowIndex, "mealkitName");
				console.log(cellValue);
				app.lookup("isCheckInfo").setValue("mealkitName", cellValue);
				app.lookup("isCheckInfo").setValue("isCheck", "N");
				app.lookup("isCheckedChange").send();
				getSumPrice();
			}

			/*
			 * 그리드에서 row-check 이벤트 발생 시 호출.
			 * Grid의 행 선택 컬럼(columnType=checkbox)이 체크 되었을 때 발생하는 이벤트.
			 */
			function onGrd1RowCheck(e){
				var grd1 = e.control;
				var grid = app.lookup("grd1");
				var selectedRowIndex = grid.getSelectedRowIndex();
				var cellValue = grid.getCellValue(selectedRowIndex, "mealkitName");
				app.lookup("isCheckInfo").setValue("mealkitName", cellValue);
				app.lookup("isCheckInfo").setValue("isCheck", "Y");
				app.lookup("isCheckedChange").send();
				getSumPrice(); // 총금액 재구성
			}

			/*
			 * "선택 상품 주문" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				var grid = app.lookup("grd1");
				if(grid.getCheckRowIndices().length > 0){
					for(var i=0;i<grid.getDataRowCount();i++){
						if(grid.isCheckedRow(i)){
							var cellValue = grid.getCellValue(i, "mealkitName");
							var data = {"mealkitName" : cellValue};
							console.log(cellValue);
							
							app.lookup("selectList").addRowData(data);
							console.log(app.lookup("selectList").getValue(i, "mealkitName"));
						}
					}
					app.lookup("paymentTotal").setValue("totalpay", app.lookup("totalval").value);
					app.lookup("payment").send();
				}else{
					if(grid.getDataRowCount() == 0)	{
						var src = "dialog/failPayment";
						var initValue = "장바구니에 물건이 없습니다";
						app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
							dialog.ready(function(dialogApp){
								// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
								dialogApp.initValue = initValue;
							});
						});
					}else{
						var src = "dialog/failPayment";
						var initValue = "체크된 물건이 없습니다";
						app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
							dialog.ready(function(dialogApp){
								// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
								dialogApp.initValue = initValue;
							});
						});
					}
				}
			}

			/*
			 * "선택 상품 삭제" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick3(e){
				var button = e.control;
				var grid = app.lookup("grd1");
				app.getRootAppInstance().openDialog("dialog/needConfirm", {
					width: 400, height: 300, headerClose: true
				}, function(dialog) {
					dialog.ready(function(dialogApp) {
						dialogApp.initValue = "선택 상품을 취소하시겠습니까?"
					});
				}).then(function(returnValue){
					if(returnValue == "ok"){
						for(var i=0;i<grid.getDataRowCount();i++){
							if(grid.isCheckedRow(i)){
								var cellValue = grid.getCellValue(i, "mealkitName");
								var data = {"mealkitName" : cellValue};
								app.lookup("selectList").addRowData(data);
							}
						}
						app.lookup("deleteMyCart").send();
					}else{
						return;
					}
				});
				
				
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onDeleteMyCartSubmitSuccess(e){
				var deleteMyCart = e.control;
				app.lookup("selectMyCart").send();
				app.lookup("grd1").redraw();
			}

			/*
			 * "    < 쇼핑 계속하기" 아웃풋에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onOutputClick(e){
				var output = e.control;
				window.location.href = "/mealkitList";
			}

			/*
			 * "    < 쇼핑 계속하기" 아웃풋에서 mousemove 이벤트 발생 시 호출.
			 * 사용자가 컨트롤 위에 포인터를 이동할 때 발생하는 이벤트.
			 */
			function onOutputMousemove(e){
				var output = e.control;
				var shopcon = app.lookup("shopcon");
				shopcon.style.css({
					"border-style":"solid",
					"border-width":"2px",
					"border-color":"azure"
			//		"box-shadow":"inset 0 0 2px 2px #EFA2A2"
				});
			}

			/*
			 * "    < 쇼핑 계속하기" 아웃풋(shopcon)에서 mouseleave 이벤트 발생 시 호출.
			 * 사용자가 컨트롤 및 컨트롤의 자식 영역 바깥으로 마우스 포인터를 이동할 때 발생하는 이벤트.
			 */
			function onShopconMouseleave(e){
				var shopcon = e.control;
				var shopcon = app.lookup("shopcon");
				shopcon.style.css({
					"border-style":"none",
					"border-width":"0px",
					"border-color":"white"
				});
			//	shopcon.style.css({
			//		"border-right":"solid",
			//		"border-width":"0px",
			//		"border-color":"white"
			//	});
				
			}

			/*
			 * 체크 박스에서 value-change 이벤트 발생 시 호출.
			 */
			function onCbx1ValueChange(e){
				var cbx1 = e.control;
				if(cbx1.checked){
					app.lookup("grd1").checkAllRow();
				}else{
					app.lookup("grd1").clearAllCheck();
				}
				getSumPrice();
			}

			/*
			 * 그리드에서 header-check 이벤트 발생 시 호출.
			 * Grid의 Header Checkbox가 체크 되었을 때 발생하는 이벤트. (columnType=checkbox)
			 */
			function onGrd1HeaderCheck(e){
				var grd1 = e.control;
				app.lookup("cbx1").checked = true;
				app.lookup("cbx1").redraw();
				getSumPrice();
			}

			/*
			 * 그리드에서 header-uncheck 이벤트 발생 시 호출.
			 * Grid의 Header Checkbox가 체크 해제되었을 때 발생하는 이벤트. (columnType=checkbox)
			 */
			function onGrd1HeaderUncheck(e){
				var grd1 = e.control;
				app.lookup("cbx1").checked = false;
				app.lookup("cbx1").redraw();
				getSumPrice();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("cartlist");
			dataSet_1.parseData({
				"columns" : [
					{"name": "mealkitImage"},
					{"name": "mealkitName"},
					{
						"name": "mealkitPrice",
						"dataType": "number"
					},
					{
						"name": "cartDetailQuantity",
						"dataType": "number"
					},
					{
						"name": "cartTotal",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "cartDetailQuantity * mealkitPrice"
					},
					{"name": "isChecked"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("selectList");
			dataSet_2.parseData({
				"columns" : [{
					"name": "mealkitName",
					"dataType": "string"
				}]
			});
			app.register(dataSet_2);
			var dataMap_1 = new cpr.data.DataMap("paymentTotal");
			dataMap_1.parseData({
				"columns" : [{
					"name": "totalpay",
					"dataType": "number"
				}]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("updateQuantity");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "cartDetailQuantity",
						"dataType": "number"
					},
					{"name": "mealkitName"}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("isCheckInfo");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "isCheck",
						"dataType": "string"
					},
					{"name": "mealkitName"}
				]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("selectMyCart");
			submission_1.action = "/selectMyCart";
			submission_1.addResponseData(dataSet_1, false);
			if(typeof onSelectMyCartSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSelectMyCartSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("payment");
			submission_2.action = "/paymentInsert";
			submission_2.addRequestData(dataMap_1);
			submission_2.addRequestData(dataSet_2, cpr.protocols.PayloadType.modified);
			if(typeof onPaymentSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onPaymentSubmitSuccess);
			}
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("updateMyCart");
			submission_3.action = "/updateMyCart";
			submission_3.mediaType = "application/x-www-form-urlencoded;simple";
			submission_3.addRequestData(dataMap_2);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("isCheckedChange");
			submission_4.action = "/isCheckedChange";
			submission_4.mediaType = "application/x-www-form-urlencoded;simple";
			submission_4.addRequestData(dataMap_3);
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("deleteMyCart");
			submission_5.action = "/deleteMyCart";
			submission_5.addRequestData(dataSet_2);
			if(typeof onDeleteMyCartSubmitSuccess == "function") {
				submission_5.addEventListener("submit-success", onDeleteMyCartSubmitSuccess);
			}
			app.register(submission_5);
			app.supportMedia("all and (min-width: 1860px)", "new-screen");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1859px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"font-family" : "푸른전남 Medium",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.distribution = "center";
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.setClasses(["cl-form-group"]);
				group_2.style.css({
					"border-radius" : "30px",
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
				formLayout_1.horizontalSeparatorWidth = 1;
				formLayout_1.verticalSeparatorWidth = 1;
				formLayout_1.setColumns(["100px", "30px", "1fr", "100px", "120px", "100px", "150px"]);
				formLayout_1.setCustomColumnShade(0, "#FFFFFF");
				formLayout_1.setCustomColumnShade(1, "#FFFFFF");
				formLayout_1.setCustomColumnShade(3, "#FFFFFF");
				formLayout_1.setCustomColumnShade(5, "#FFFFFF");
				formLayout_1.setRows(["80px", "70px", "30px", "25px", "1fr", "25px"]);
				formLayout_1.setCustomRowShade(3, "#F9F9F9");
				group_2.setLayout(formLayout_1);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "  장바구니";
					output_1.style.css({
						"background-color" : "#FFFFFF",
						"color" : "#0ebc59",
						"font-weight" : "bold",
						"font-size" : "25px",
						"font-family" : "'Noto Sans KR' , 'Malgun Gothic' , sans-serif"
					});
					container.addChild(output_1, {
						"colIndex": 1,
						"rowIndex": 0,
						"colSpan": 6,
						"rowSpan": 1
					});
					var checkBox_1 = new cpr.controls.CheckBox("cbx1");
					checkBox_1.value = "true";
					checkBox_1.text = "전체상품";
					checkBox_1.style.css({
						"background-color" : "#e5e5e5",
						"color" : "#0ebc59",
						"font-weight" : "700"
					});
					if(typeof onCbx1ValueChange == "function") {
						checkBox_1.addEventListener("value-change", onCbx1ValueChange);
					}
					container.addChild(checkBox_1, {
						"colIndex": 0,
						"rowIndex": 1,
						"colSpan": 6,
						"rowSpan": 1
					});
					var output_2 = new cpr.controls.Output();
					output_2.value = "";
					container.addChild(output_2, {
						"colIndex": 0,
						"rowIndex": 2,
						"colSpan": 7,
						"rowSpan": 1
					});
					var output_3 = new cpr.controls.Output("shopcon");
					output_3.value = "    < 쇼핑 계속하기";
					output_3.style.css({
						"border-right-style" : "solid",
						"cursor" : "pointer",
						"border-right-color" : "white"
					});
					if(typeof onOutputClick == "function") {
						output_3.addEventListener("click", onOutputClick);
					}
					if(typeof onOutputMousemove == "function") {
						output_3.addEventListener("mousemove", onOutputMousemove);
					}
					if(typeof onShopconMouseleave == "function") {
						output_3.addEventListener("mouseleave", onShopconMouseleave);
					}
					container.addChild(output_3, {
						"colIndex": 0,
						"rowIndex": 5,
						"colSpan": 2,
						"rowSpan": 1
					});
					var image_1 = new cpr.controls.Image();
					image_1.src = "theme/images/cart/trolley.png";
					image_1.style.css({
						"padding-top" : "10px",
						"padding-left" : "10px",
						"padding-bottom" : "10px",
						"padding-right" : "10px"
					});
					container.addChild(image_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
					var button_1 = new cpr.controls.Button();
					button_1.value = "선택 삭제 X";
					button_1.style.css({
						"background-color" : "#0ebc59",
						"color" : "#FFFFFF",
						"border-bottom-color" : "#0ebc59",
						"font-weight" : "bold",
						"border-left-color" : "#0ebc59",
						"border-top-color" : "#0ebc59",
						"border-right-color" : "#0ebc59",
						"background-image" : "none"
					});
					if(typeof onButtonClick3 == "function") {
						button_1.addEventListener("click", onButtonClick3);
					}
					container.addChild(button_1, {
						"colIndex": 6,
						"rowIndex": 1
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "";
					output_4.style.css({
						"background-color" : "#FFFFFF",
						"border-left-style" : "solid",
						"border-left-color" : "white"
					});
					container.addChild(output_4, {
						"colIndex": 2,
						"rowIndex": 5,
						"colSpan": 5,
						"rowSpan": 1
					});
					var group_3 = new cpr.controls.Container();
					var xYLayout_1 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_1);
					(function(container){
						var grid_1 = new cpr.controls.Grid("grd1");
						grid_1.init({
							"dataSet": app.lookup("cartlist"),
							"autoRowHeight": "all",
							"wheelRowCount": 1,
							"autoFit": "all",
							"resizableColumns": "all",
							"noDataMessage": "장바구니에 목록이없습니다 ",
							"columns": [
								{"width": "22px"},
								{"width": "143px"},
								{"width": "345px"},
								{"width": "143px"},
								{"width": "143px"},
								{"width": "143px"}
							],
							"header": {
								"rows": [{"height": "24px"}],
								"cells": [
									{
										"constraint": {"rowIndex": 0, "colIndex": 0},
										"configurator": function(cell){
											cell.columnType = "checkbox";
											cell.filterable = false;
											cell.sortable = false;
											cell.style.css({
												"background-color" : "#e5e5e5"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1, "colSpan": 2},
										"configurator": function(cell){
											cell.filterable = false;
											cell.sortable = false;
											cell.targetColumnName = "mealkitName";
											cell.text = "상품 정보";
											cell.style.css({
												"background-color" : "#e5e5e5",
												"font-weight" : "400"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.filterable = false;
											cell.sortable = false;
											cell.targetColumnName = "mealkitPrice";
											cell.text = "가격";
											cell.style.css({
												"background-color" : "#e5e5e5",
												"font-weight" : "400"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4, "rowSpan": 1, "colSpan": 1},
										"configurator": function(cell){
											cell.filterable = false;
											cell.sortable = false;
											cell.targetColumnName = "cartDetailQuantity";
											cell.text = "상품 수량";
											cell.style.css({
												"background-color" : "#e5e5e5",
												"font-weight" : "400"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5, "rowSpan": 1, "colSpan": 1},
										"configurator": function(cell){
											cell.text = "총 가격";
											cell.style.css({
												"background-color" : "#e5e5e5",
												"font-weight" : "400"
											});
										}
									}
								]
							},
							"detail": {
								"rows": [{"height": "158px"}],
								"cells": [
									{
										"constraint": {"rowIndex": 0, "colIndex": 0},
										"configurator": function(cell){
											cell.columnName = "isChecked";
											cell.columnType = "checkbox";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 1},
										"configurator": function(cell){
											cell.columnName = "mealkitImage";
											cell.control = (function(){
												var image_2 = new cpr.controls.Image("imggrd");
												image_2.fallbackSrc = "theme/images/icon/chefimg.png";
												image_2.bind("value").toDataColumn("mealkitImage");
												return image_2;
											})();
											cell.controlConstraint = {};
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 2},
										"configurator": function(cell){
											cell.columnName = "mealkitName";
											cell.style.css({
												"font-size" : "20px"
											});
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 3},
										"configurator": function(cell){
											cell.columnName = "mealkitPrice";
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 4},
										"configurator": function(cell){
											cell.columnName = "cartDetailQuantity";
											cell.control = (function(){
												var numberEditor_1 = new cpr.controls.NumberEditor("nbe2");
												numberEditor_1.min = new cpr.foundation.DecimalType("1");
												if(typeof onNbe2ValueChange == "function") {
													numberEditor_1.addEventListener("value-change", onNbe2ValueChange);
												}
												numberEditor_1.bind("value").toDataColumn("cartDetailQuantity");
												return numberEditor_1;
											})();
											cell.controlConstraint = {
												"horizontalAlign": "center",
												"verticalAlign": "center"
											};
										}
									},
									{
										"constraint": {"rowIndex": 0, "colIndex": 5},
										"configurator": function(cell){
											cell.control = (function(){
												var output_5 = new cpr.controls.Output("sumex");
												output_5.style.css({
													"text-align" : "center"
												});
												output_5.bind("value").toExpression("mealkitPrice * cartDetailQuantity");
												return output_5;
											})();
											cell.controlConstraint = {};
										}
									}
								]
							}
						});
						grid_1.style.css({
							"background-color" : "#FFFFFF",
							"background-image" : "none"
						});
						if(typeof onGrd1RowUncheck == "function") {
							grid_1.addEventListener("row-uncheck", onGrd1RowUncheck);
						}
						if(typeof onGrd1RowCheck == "function") {
							grid_1.addEventListener("row-check", onGrd1RowCheck);
						}
						if(typeof onGrd1HeaderCheck == "function") {
							grid_1.addEventListener("header-check", onGrd1HeaderCheck);
						}
						if(typeof onGrd1HeaderUncheck == "function") {
							grid_1.addEventListener("header-uncheck", onGrd1HeaderUncheck);
						}
						container.addChild(grid_1, {
							"top": "0px",
							"left": "0px",
							"width": "1038px",
							"height": "343px"
						});
					})(group_3);
					container.addChild(group_3, {
						"colIndex": 0,
						"rowIndex": 3,
						"colSpan": 7,
						"rowSpan": 2
					});
				})(group_2);
				container.addChild(group_2, {
					"autoSize": "none",
					"width": "1040px",
					"height": "550px"
				});
				var group_4 = new cpr.controls.Container();
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.scrollable = false;
				formLayout_2.topMargin = "0px";
				formLayout_2.rightMargin = "0px";
				formLayout_2.bottomMargin = "0px";
				formLayout_2.leftMargin = "0px";
				formLayout_2.horizontalSpacing = "0px";
				formLayout_2.verticalSpacing = "0px";
				formLayout_2.setColumns(["1fr", "70px", "80px"]);
				formLayout_2.setRows(["50px"]);
				group_4.setLayout(formLayout_2);
				(function(container){
					var output_6 = new cpr.controls.Output("totalval");
					output_6.dataType = "number";
					output_6.style.css({
						"background-color" : "#FFFFFF",
						"border-radius" : "0px",
						"border-top-width" : "3px",
						"border-bottom-color" : "#e5e5e5",
						"border-bottom-width" : "3px",
						"border-top-color" : "#e5e5e5",
						"border-bottom-style" : "solid",
						"background-image" : "none",
						"border-top-style" : "solid",
						"text-align" : "right"
					});
					container.addChild(output_6, {
						"colIndex": 1,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
					var output_7 = new cpr.controls.Output();
					output_7.value = "총 결제할 금액은 ";
					output_7.style.css({
						"background-color" : "#FFFFFF",
						"border-top-width" : "3px",
						"border-bottom-color" : "#e5e5e5",
						"border-left-style" : "solid",
						"border-left-color" : "#e5e5e5",
						"border-bottom-width" : "3px",
						"border-top-color" : "#e5e5e5",
						"border-bottom-style" : "solid",
						"background-image" : "none",
						"border-left-width" : "3px",
						"border-top-style" : "solid",
						"text-align" : "right"
					});
					container.addChild(output_7, {
						"colIndex": 0,
						"rowIndex": 0
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "원 입니다";
					output_8.style.css({
						"border-right-style" : "solid",
						"background-color" : "#FFFFFF",
						"border-top-width" : "3px",
						"border-bottom-color" : "#e5e5e5",
						"border-right-width" : "3px",
						"border-bottom-width" : "3px",
						"border-top-color" : "#e5e5e5",
						"border-right-color" : "#e5e5e5",
						"border-bottom-style" : "solid",
						"background-image" : "none",
						"border-top-style" : "solid"
					});
					container.addChild(output_8, {
						"colIndex": 2,
						"rowIndex": 0
					});
				})(group_4);
				container.addChild(group_4, {
					"width": "1040px",
					"height": "52px"
				});
				var group_5 = new cpr.controls.Container();
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_2);
				(function(container){
					var button_2 = new cpr.controls.Button();
					button_2.value = "선택 상품 주문";
					button_2.style.css({
						"background-color" : "#0ebc59",
						"border-right-style" : "solid",
						"color" : "#FFFFFF",
						"border-bottom-color" : "#ffffff",
						"border-left-style" : "solid",
						"font-weight" : "bold",
						"border-left-color" : "#ffffff",
						"border-top-color" : "#ffffff",
						"border-bottom-style" : "solid",
						"border-right-color" : "#ffffff",
						"background-image" : "none",
						"border-top-style" : "solid"
					});
					if(typeof onButtonClick2 == "function") {
						button_2.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_2, {
						"right": "220px",
						"bottom": "10px",
						"width": "200px",
						"height": "50px"
					});
					var button_3 = new cpr.controls.Button();
					button_3.value = "전체 상품 주문";
					button_3.style.css({
						"background-color" : "#0ebc59",
						"color" : "#FFFFFF",
						"white-space" : "normal",
						"font-weight" : "bold",
						"background-image" : "none"
					});
					if(typeof onButtonClick == "function") {
						button_3.addEventListener("click", onButtonClick);
					}
					container.addChild(button_3, {
						"right": "10px",
						"bottom": "10px",
						"width": "200px",
						"height": "50px"
					});
				})(group_5);
				container.addChild(group_5, {
					"width": "1040px",
					"height": "79px"
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "1040px",
				"height": "700px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "cartForm";
	cpr.core.Platform.INSTANCE.register(app);
})();
