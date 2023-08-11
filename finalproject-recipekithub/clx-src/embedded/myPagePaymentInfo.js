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
	app.lookup("myPaymentListOnload").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onMyPaymentListOnloadSubmitSuccess(e){
	var myPaymentListOnload = e.control;
	var metadata = myPaymentListOnload.getMetadata("sendMealkitInfo");
	var dataSet = app.lookup("myPaymentList");
	var myMlkitlist = app.lookup("myPaymentMealkitList");
	
	for(var i=0;i<metadata.length;i++){
		dataSet.setValue(i, "mealkitNo", metadata[i].mealkitNo);
		dataSet.setValue(i, "mealkitName", metadata[i].mealkitName);
//		myMlkitlist.setValue(i, "cartDetailQuantity", dataSet.getValue(i, "mealkitName"));
	}
	
	
	dataSet.refresh();
	app.lookup("grd1").redraw();
}
