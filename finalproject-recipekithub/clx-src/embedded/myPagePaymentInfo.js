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
