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
		dscartlist.setValue(i, "mealkitImage", 'theme/images/mealkit/'+metadata[i].mealkitImage);
		dscartlist.setValue(i, "mealkitName", metadata[i].mealkitName);
		dscartlist.setValue(i, "mealkitPrice", metadata[i].mealkitPrice);
		dscartlist.setValue(i, "cartDetailQuantity", cartDetailMeta[i]);
	}
	
	dscartlist.refresh();
	var sum = 0;
	for(var j=0;j<metadata.length;j++){
		var value = dscartlist.getValue(j, "cartTotal");
		sum= value+sum;
	}
	app.lookup("totalval").value = sum;
	app.lookup("grd1").redraw();
}

/*
 * "전체 상품 주문" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	
}




