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
		console.log(metadata);
		src = "dialog/successPayment";
		var initValue = metadata;
		app.openDialog(src, {width : 400,height : 300,headerClose: true, headerVisible: false, resizable: false}, function(dialog){
			dialog.ready(function(dialogApp){
				// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue){
			console.log(returnValue);
			console.log("페이지 이동하러감");
			cpr.core.App.load("index1", function(loadedApp) {
				app.close();
				var newInst = loadedApp.createNewInstance();
				newInst.run();
			});	
			console.log("페이지 이동성공");	
		});
	}
//	app.lookup("grd1").redraw();
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
//	var checkRowIndices = grid.getCheckRowIndices();
//	var value = grid.getDataRow(checkRowIndices[0]).getValue("mealkitName");
	for(var i=0;i<grid.getDataRowCount();i++){
		if(grid.isCheckedRow(i)){
			var cellValue = grid.getCellValue(i, "mealkitName");
			var data = {"mealkitName" : cellValue};
			app.lookup("selectList").addRowData(data);
		}
	}
	app.lookup("deleteMyCart").send();
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

