/************************************************
 * mealkitList.js
 * Created at 2023. 8. 16. 오후 3:05:31.
 *
 * @author KOSTA
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e){
	var param = cpr.core.Platform.INSTANCE.getParameter("searchMealkit");
	console.log("param = " + param);
	var dataMap = app.lookup("meSearch");
	if(param != null && param != ""){
		app.lookup("headerUdc").searchValue = param;
		app.lookup("headerUdc").categoryValue = "밀키트";
		dataMap.setValue("searchMealkit", param);
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("sort").value = "전체";
	app.lookup("ingre").value = "전체";
	app.lookup("way").value = "전체";
	app.lookup("category").value = "최신순";
	
	
	
	var mealkitList = cpr.core.Platform.INSTANCE.getParameter("mealkitList");
	//var mealkitMap = cpr.core.Platform.INSTANCE.getParameter("mealkitMap");
	//console.log("mealkitMap =" + mealkitMap);
	var email = cpr.core.Platform.INSTANCE.getParameter("member");
	console.log("email = " + email);
	if(email != "guest"){
		var button = app.lookup("insertBtn");
		button.visible = true;
		button.redraw();
	}

	var cnt = app.lookup("mealkitCnt");
	cnt.value = mealkitList.length;
	console.log("mealkitList = " + mealkitList);
	var container = app.lookup("grp");
	for (var i = 0; i < mealkitList.length; i++) {
		(function(index) {
			var mealkit = new udc.mealkitList();
			mealkit.img = "/upload/mealkit/" + mealkitList[i].mealkitImage;
			console.log(mealkitList.img);
			mealkit.hits = mealkitList[i].mealkitBoardHits;
			mealkit.nick = mealkitList[i].memberVO.memberNick;
			mealkit.title = mealkitList[i].mealkitName;
			//mealkit.img = mealkitList[i].mealkitImage;
			//mealkit.star = mealkitMap.get[mealkitList[i].mealkitNo];
			container.addChild(mealkit, {
				height: "250px",
				width: "230px",
				autoSize: "both"
			});
			mealkit.addEventListener("imgClick", function(e) {
				window.location.href = "/mealkitDetail/" + mealkitList[index].mealkitNo;
			});
		})(i);
	}


}

/*
 * "밀키트 등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	window.location.href='/insertMealkitForm';
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexerSelectionChange(e){
	var pageIndexer = e.control;
	
}

