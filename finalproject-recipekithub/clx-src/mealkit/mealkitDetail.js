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
	var mealkitImg = cpr.core.Platform.INSTANCE.getParameter("mealkitImg");
	var mealkitCategory = cpr.core.Platform.INSTANCE.getParameter("mealkitCategory");
	var avg = cpr.core.Platform.INSTANCE.getParameter("avg");
	console.log("mealkitHits = " + mealkitHits);
	var starAvg = app.lookup("starScore");
	starAvg.value = avg;
	
	var commentList = app.lookup("commentList");
	commentList.setValue("mealkitNo", (mealkitNo).toString());//string으로 변환
	app.lookup("commentListSub").send();
	
	var hitsBox = app.lookup("hits");
	hitsBox.value = mealkitHits;

	console.log("mealkitMember, sessionMember = " + mealkitMember + ", " +sessionMember);
	
	if(sessionMember != "guest"){
		var commentBox = app.lookup("writeComment");
		commentBox.visible = true;
	}


	if(mealkitMember === sessionMember){
		var deletebtn = app.lookup("deleBtn");
		var updatebtn = app.lookup("updateBtn");
		deletebtn.visible = true;
		updatebtn.visible = true;
	}
	
	
	
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
	dataMap.setValue("mealkitCategory", mealkitCategory);
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
	
	app.lookup("impInfo").redraw();
	
	app.lookup("mealkitImg").src = "/upload/mealkit/"+mealkitImg;
	var hTMLSnippet = app.lookup("info");
	hTMLSnippet.value = mealkitInfo;	
	
	
	hTMLSnippet.redraw();
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
	
	// 현준
	app.lookup("submealkitlike").send();
	
	
	
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
	
	if(confirm("수정하시겠습니까?")){
		var httpPostMethod = new cpr.protocols.HttpPostMethod("/updateMealkitForm/"+value);
		httpPostMethod.submit();	
	}

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
	
	if(confirm("삭제하시겠습니까?")){
		if(sessionMember === mealkitMember){
			var HttpPostMethod = new cpr.protocols.HttpPostMethod("/deleteMealkit/"+mealkitNo);
			HttpPostMethod.submit();
		}
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubmealkitlikeSubmitSuccess(e){
	var submealkitlike = e.control;
	var likeresult = submealkitlike.getMetadata("likeresult");
	var likeimg = app.lookup("likeimg");
	if(likeresult == 0){
		likeimg.src = "theme/images/mealkit/heart.png";
	}else{
		likeimg.src = "theme/images/mealkit/heart_fill.png";
	}
}

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onLikeimgClick(e){
	var likeimg = e.control;
	app.lookup("subclicklike").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubclicklikeSubmitSuccess(e){
	var subclicklike = e.control;
	var likeresult = subclicklike.getMetadata("likeresult");
	var likeimg = app.lookup("likeimg");
	if(likeresult == 0){
		likeimg.src = "theme/images/mealkit/heart.png";
	}else{
		likeimg.src = "theme/images/mealkit/heart_fill.png";
	}
	likeimg.redraw();
}

/*
 * "바로 구매" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick4(e){
	var button = e.control;
	var dsmealkit = app.lookup("mealkit");
	dsmealkit.setValue("cartDetailQuantity", app.lookup("mealcnt").text);
	app.lookup("subcreatmycart").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubcreatmycartSubmitSuccess2(e){
	var subcreatmycart = e.control;
	var resultDetail = subcreatmycart.getMetadata("resultDetail");
	if(!confirm("장바구니에 상품을 추가하시겠습니까?")){
		return;
	}
	if(resultDetail!=1){
		alert("상품 등록을 실패하였습니다");
		return;
	}
	alert("상품이 추가되었습니다");
}

/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick5(e){
	var button = e.control;
	var comment = app.lookup("comment").value;
	var star = app.lookup("starpoint").value;
	
	if(star == "" || star == null){
		alert("반드시 별점을 선택해주세요.");
		app.lookup("comment").value = "";
		app.lookup("starpoint").value = "";
		app.lookup("comment").redraw();
		app.lookup("starpoint").redraw();
	}else{
		var commentList = app.lookup("commentList");
		var mealkitNo = commentList.getValue("mealkitNo");
		var commentMap = app.lookup("commentMap");
		commentMap.setValue("comment", comment);
		commentMap.setValue("mealkitNo", mealkitNo);//string
		commentMap.setValue("star", star);//string
		app.lookup("writeComment").redraw();
		app.lookup("commentSub").send();
		app.lookup("commentListSub").send();
		app.lookup("comment").value = "";
		app.lookup("starpoint").value = "";
		app.lookup("comment").redraw();
		app.lookup("starpoint").redraw();
	}
	//var dataMap = app.lookup("mealkit");
	//var mealkitNo = dataMap.getValue("mealkitNo");
	
	//typeof parseFloat(star) === "number" && star >=0 && star <= 5

	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onCommentSubSubmitSuccess(e){
	var commentSub = e.control;
	var commentMap = app.lookup("commentReturn");
	var memberMap = app.lookup("memberReturn");
	var mealkitMap = app.lookup("mealkitReturn");
	
	
	app.lookup("commentListSub").send();
}

///*
// * 서브미션에서 receive 이벤트 발생 시 호출.
// * 서버로 부터 데이터를 모두 전송받았을 때 발생합니다.
// */
//function onCommentListSubReceive(e){
//	var commentListSub = e.control;
//	var xhr = commentListSub.xhr;
//	var jsonData = JSON.parse(xhr.responseText);
//	//console.log("jsonData = " + jsonData);
//	var mealkitCommentList = jsonData.commentListSub;
//	//console.log("mealkitCommentList = " + mealkitCommentList);
//	var container = app.lookup("commentgrp");
//	for(var i =0; i<commentListSub.length; i++){
//		(function(index){
//			//udc 동적 생성
//			var mealkitComment = new udc.mealkitComment();
//			//udc에서 출판한 이미지 경로 앱 속성 지정
//			mealkitComment.nick = commentListSub[i].memberVO.memberNick;
//			mealkitComment.regDate = commentListSub[i].mealkitCommentDate;
//			mealkitComment.content = commentListSub[i].commentContent;
//			//mealkitComment.star = 별점 추가 예정
//			
//			container.addChild(mealkitComment, {
//				height: "120px",
//				width: "100px",
//				autoSize: "both"
//				
//			});
//			mealkitComment.addEventListener("deleteClick", function(e){
//				app.lookup("commentId").setValue("mealkitCommentId", commentListSub[index].mealkitCommentId);
//				app.lookup("deleteComment").send();
//			});
//		});
//	}
//}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onCommentListSubSubmitSuccess(e){
	var commentListSub = e.control;
	var xhr = commentListSub.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	//var sessionval = getSessionStorage("memsession");
	var mealkitComment = jsonData.mealkitCommentList;
	var totalCommentCount = jsonData.mealkitCommentNum;
	var commentStar = jsonData.mealkitStarList;
	app.lookup("cnt").value = totalCommentCount;
	var container = app.lookup("commentgrp");
	
	app.lookup("page").totalRowCount = totalCommentCount;
	
	// 댓글 등록,삭제 시 재조회 할 수 있게 기존 목록 삭제
	container.removeAllChildren();
	
	for (var i = 0; i < mealkitComment.length; i++) {
		(function(index) {
			//udc 동적 생성
			var comment = new udc.mealkitComment();
			//udc에서 출판한 이미지 경로 앱 속성 지정
			comment.nick = mealkitComment[i].memberVO.memberNick;
			comment.regDate = mealkitComment[i].mealkitCommentDate;
			comment.content = mealkitComment[i].mealkitCommentContent;
			comment.star = commentStar[i].mealkitStarScore;
			//if(sessionval ==null || sessionval != mealkitComment[i].memberVO.memberEmail){
			//	comment.deleteBtn = false;
			//}
			container.addChild(comment, {
				height: "100px",
				width: "150px",
				autoSize: "both"
			});
			comment.addEventListener("deleteClick", function(e) {
				app.lookup("commentId").setValue("mealkitCommentId", mealkitComment[index].mealkitCommentId);
				if (confirm("삭제하시겠습니까?")) {
					var deleteCommentsub = app.lookup("deleteComment");
					deleteCommentsub.send();
					
				}
			});
		})(i);
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onDeleteCommentSubmitSuccess(e){
	var deleteComment = e.control;
	app.lookup("commentListSub").send();
}

/*
 * 페이지 인덱서에서 selection-change 이벤트 발생 시 호출.
 * Page index를 선택하여 선택된 페이지가 변경된 후에 발생하는 이벤트.
 */
function onPageIndexerSelectionChange(e){
	var pageIndexer = e.control;
	app.lookup("commentListSub").send();
}
