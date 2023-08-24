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
	app.lookup("mealkitType").value = "전체";
	app.lookup("sort").value = "최신순";
	app.lookup("mealkitBoardList").send();
	


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
	app.lookup("mealkitBoardList").send();
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onSortSelectionChange(e){
	var sort = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("mealkitBoardList").send();
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onIngreSelectionChange(e){
	var ingre = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("mealkitBoardList").send();
	
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onWaySelectionChange(e){
	var way = e.control;
	app.lookup("sort").value = "최신순";
	app.lookup("page").currentPageIndex = 1;
	app.lookup("mealkitBoardList").send();
	
}

/*
 * 내비게이션 바에서 selection-change 이벤트 발생 시 호출.
 * 선택된 Item 값이 저장된 후에 발생하는 이벤트.
 */
function onCategorySelectionChange(e){
	var category = e.control;
	app.lookup("page").currentPageIndex = 1;
	app.lookup("mealkitBoardList").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onMealkitBoardListSubmitSuccess(e){
	var mealkitBoardList = e.control;
    var xhr = mealkitBoardList.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var mealkitAllList = jsonData.mealkitAllList;
	var totalMealkitCnt = jsonData.totalMealkitCnt;
	var findMealkitByName= jsonData.findMealkitByName;
	var findStarAvgByNo= jsonData.findStarAvgByNo;
	var mealkitList = cpr.core.Platform.INSTANCE.getParameter("mealkitList");
	var mealkitStarList = cpr.core.Platform.INSTANCE.getParameter("mealkitStarList");
	var commentCount = cpr.core.Platform.INSTANCE.getParameter("commentCount");
	//alert("mealkitList = " + mealkitList);
	//alert("mealkitAllList = " + mealkitAllList);
	//console.log("ㅌㅌㅌ" + mealkitAllList.length);
	console.log("findStarAvgByNo =" + findStarAvgByNo);
	
	//app.lookup(id)	
	var email = cpr.core.Platform.INSTANCE.getParameter("member");
	console.log("email = " + email);
	if(email != "guest"){
		var button = app.lookup("insertBtn");
		button.visible = true;
		button.redraw();
	}
	
	//app.lookup("page").totalRowCount = ;
	app.lookup("grp").removeAllChildren();
	
	app.lookup("mealkitCnt").value = totalMealkitCnt;
	app.lookup("page").totalRowCount = totalMealkitCnt;
	//console.log("mealkitList = " + mealkitList);
	var container = app.lookup("grp");
	for (var i = 0; i < mealkitAllList.length; i++) {
		(function(index) {
			var mealkit = new udc.mealkitList();
			mealkit.img = "/upload/mealkit/" + mealkitAllList[i].mealkitImage;
			var mealkitNo = mealkitAllList[i].mealkitNo
			mealkit.hits = mealkitAllList[i].mealkitBoardHits;
			mealkit.nick = mealkitAllList[i].memberVO.memberNick;
			mealkit.title = mealkitAllList[i].mealkitName;
			mealkit.star = findStarAvgByNo[i];
			mealkit.count = "("+commentCount[i]+")";
			container.addChild(mealkit, {
				height: "250px",
				width: "230px",
				autoSize: "both"
			});
			mealkit.addEventListener("imgClick", function(e) {
				window.location.href = "/mealkitDetail/" + mealkitAllList[index].mealkitNo;
			});
		})(i);
	}
/* 초기
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
			mealkit.star = mealkitStarList[i];
			mealkit.count = "("+commentCount[i]+")";
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
*/	
}	
	
//function filterMealkit(e){
//	var filter = e.control;
//	var cnt = app.lookup("mealkitCnt");
//	cnt.value = filter.length;
//	console.log("filter = " + filter);
//	var container = app.lookup("grp");
//	for (var i = 0; i < filter.length; i++) {
//		(function(index) {
//			var mealkit = new udc.mealkitList();
//			mealkit.img = "/upload/mealkit/" + mealkitList[i].mealkitImage;
//			console.log(filter.img);
//			mealkit.hits = filter[i].mealkitBoardHits;
//			mealkit.nick = filter[i].memberVO.memberNick;
//			mealkit.title = filter[i].mealkitName;
//			mealkit.star = filter[i];
//			mealkit.count = "("+commentCount[i]+")";
//			container.addChild(mealkit, {
//				height: "250px",
//				width: "230px",
//				autoSize: "both"
//			});
//			mealkit.addEventListener("imgClick", function(e) {
//				window.location.href = "/mealkitDetail/" + filter[index].mealkitNo;
//			});
//		})(i);
//	}
//}

