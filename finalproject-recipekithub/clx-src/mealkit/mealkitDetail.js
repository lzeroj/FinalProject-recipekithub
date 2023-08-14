/************************************************
 * mealkitDetail.js
 * Created at 2023. 8. 11. 오전 12:57:28.
 *
 * @author dyrlq
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	
	var mealkitNo = cpr.core.Platform.INSTANCE.getParameter("mealkitNo");
	var mealkitName = cpr.core.Platform.INSTANCE.getParameter("mealkitName");
	var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");
	var mealkitPrice = cpr.core.Platform.INSTANCE.getParameter("mealkitPrice");
	var mealkitInventory = cpr.core.Platform.INSTANCE.getParameter("mealkitInventory");
	var mealkitIngredients = cpr.core.Platform.INSTANCE.getParameter("mealkitIngredients");
	var mealkitRegDate = cpr.core.Platform.INSTANCE.getParameter("mealkitRegDate");
	var mealkitMember = cpr.core.Platform.INSTANCE.getParameter("mealkitMember");
	var mealkitHits = cpr.core.Platform.INSTANCE.getParameter("mealkitHits");
	var sessionMember = cpr.core.Platform.INSTANCE.getParameter("sessionMember");
	
	
//	if(mealkitMember === sessionMember){
//		var deletebtn = app.lookup("deleBtn");
//		var updatebtn = app.lookup("updateBtn");
//		deletebtn.visible = true;
//		updatebtn.visible = true;
//		deletebtn.redraw();
//		updatebtn.redraw();
//	}
	
	/* 세션이 들어오면 Open
	var mealkitMember = cpr.core.Platform.INSTANCE.getParameter("mealkitMember");//게시물 작성자이메일
	var member = cpr.core.Platform.INSTANCE.getParameter("member"); //로그인한 계정
	
	if(mealkitIngredients !== mealkitMember){
		var button = app.lookup("updateBtn");
		button.visible = false;
	}
	*/
	
	var cnt = app.lookup("mealcnt").value;
	var dataMap = app.lookup("mealkit");
	dataMap.setValue("mealkitNo", mealkitNo);
	dataMap.setValue("mealkitName", mealkitName);
	dataMap.setValue("mealkitInfo", mealkitInfo);
	dataMap.setValue("mealkitPrice", mealkitPrice);
	dataMap.setValue("mealkitInventory", mealkitInventory);
	dataMap.setValue("mealkitIngredients", mealkitIngredients);
	dataMap.setValue("mealkitRegDate", mealkitRegDate);
	dataMap.setValue("mealkitMember", mealkitMember);
	dataMap.setValue("mealkitHits", mealkitHits);
	dataMap.setValue("sessionMember", sessionMember);
	dataMap.setValue("cnt", cnt);
	
	
	var name = app.lookup("name");
	var name2 = app.lookup("name2");
	var price = app.lookup("price");
	var inventory = app.lookup("inventory");
	var total = app.lookup("total");
	var info = app.lookup("info");
	var ingredients = app.lookup("ingredients");
	var reg = app.lookup("regDate");
	var hits = app.lookup("hits");
	var seller = app.lookup("seller");
	
	reg.redraw();
	hits.redraw();
	seller.redraw();
	name.redraw();
	name2.redraw();
	price.redraw();
	inventory.redraw();
	total.redraw();
	info.redraw();
	ingredients.redraw();
	mealkitRegDate.re
	
	
	
	
	//var submission = app.lookup("mealkitSub");
	//submission.send();
	
	
}

/*
 * "+" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var countup = app.lookup("mealcnt");
	var total = app.lookup("total");
	var num = countup.value;
	countup.value = Number(num) + 1;
	var dataMap = app.lookup("mealkit");
	dataMap.setValue("cnt", countup.value);
	countup.redraw();
	total.redraw();
}

/*
 * "-" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var countup = app.lookup("mealcnt");
	var num = countup.value;
	countup.value = Number(num) -1;
	var total = app.lookup("total");
	var dataMap = app.lookup("mealkit");
	dataMap.setValue("cnt", countup.value);
	countup.redraw();
	total.redraw();
	if(countup.value <= 0){
		countup.value = 1;
		dataMap.setValue("cnt", countup.value);
		countup.redraw();
		total.redraw();
	}
	
	
}

/*
 * "수정" 버튼(updateBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onUpdateBtnClick(e){
	var updateBtn = e.control;
	var mealkit = app.lookup("mealkit");
	var value = mealkit.getValue("mealkitNo");
	window.location.href="/updateMealkitForm/"+value;
}

/*
 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	var mealkit = app.lookup("mealkit");
	var mealkitNo = mealkit.getValue("mealkitNo");
	
	var sessionMember = mealkit.getValue("sessionMember");
	var mealkitMember = mealkit.getValue("mealkitMember");
	
	if(sessionMember === mealkitMember){
		var HttpPostMethod = new cpr.protocols.HttpPostMethod("/deleteMealkit/"+mealkitNo);
		HttpPostMethod.submit();
	}
		
	
}
