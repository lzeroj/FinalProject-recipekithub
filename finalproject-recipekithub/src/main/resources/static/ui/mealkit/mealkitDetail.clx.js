/*
 * App URI: mealkit/mealkitDetail
 * Source Location: mealkit/mealkitDetail.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("mealkit/mealkitDetail", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
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
				
				
				var commentList = app.lookup("commentList");
				commentList.setValue("mealkitNo", (mealkitNo).toString());//string으로 변환
				app.lookup("commentListSub").send();
				

				console.log("mealkitMember, sessionMember = " + mealkitMember + ", " +sessionMember);

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
			function onSubcreatmycartSubmitSuccess(e){
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
				var dataMap = app.lookup("mealkit");
				var mealkitNo = dataMap.getValue("mealkitNo");
				var commentMap = app.lookup("commentMap");
				commentMap.setValue("comment", comment);
				commentMap.setValue("mealkitNo", mealkitNo);
				
				app.lookup("commentSub").send();
				
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
				//commentMap.
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
				//console.log("totalCommentCount = " + totalCommentCount);
				app.lookup("cnt").value = totalCommentCount;
				var container = app.lookup("commentgrp");
				
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
						//if(sessionval ==null || sessionval != recipeComment[i].memberVO.memberEmail){
						//	comment.deleteBtn = false;
						//}
						container.addChild(comment, {
							height: "100px",
							width: "150px",
							autoSize: "height"
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
			};
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("mealkit");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "mealkitNo",
						"dataType": "number"
					},
					{"name": "mealkitName"},
					{
						"name": "mealkitInfo",
						"dataType": "string"
					},
					{
						"name": "mealkitPrice",
						"dataType": "string"
					},
					{"name": "mealkitInventory"},
					{"name": "mealkitIngredients"},
					{
						"name": "cnt",
						"dataType": "number"
					},
					{
						"name": "total",
						"dataType": "expression",
						"displayOnly": true,
						"expression": "(mealkitPrice * cnt)"
					},
					{"name": "mealkitRegDate"},
					{
						"name": "mealkitHits",
						"dataType": "number"
					},
					{"name": "sessionMember"},
					{"name": "mealkitMember"}
				]
			});
			if(typeof onMealkitUpdate == "function") {
				dataMap_1.addEventListener("update", onMealkitUpdate);
			}
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("commentMap");
			dataMap_2.parseData({
				"columns" : [
					{"name": "comment"},
					{
						"name": "mealkitNo",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("commentReturn");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "commentId",
						"dataType": "number"
					},
					{"name": "commentContent"},
					{"name": "commentRegDate"},
					{"name": "commentEditDate"}
				]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("memberReturn");
			dataMap_4.parseData({
				"columns" : [{"name": "memberEmail"}]
			});
			app.register(dataMap_4);
			
			var dataMap_5 = new cpr.data.DataMap("mealkitReturn");
			dataMap_5.parseData({
				"columns" : [{
					"name": "mealkitNo",
					"dataType": "number"
				}]
			});
			app.register(dataMap_5);
			
			var dataMap_6 = new cpr.data.DataMap("commentList");
			dataMap_6.parseData({
				"columns" : [{
					"name": "mealkitNo",
					"dataType": "string"
				}]
			});
			app.register(dataMap_6);
			
			var dataMap_7 = new cpr.data.DataMap("commentId");
			dataMap_7.parseData({
				"columns" : [{
					"name": "mealkitCommentId",
					"dataType": "string"
				}]
			});
			app.register(dataMap_7);
			var submission_1 = new cpr.protocols.Submission("submealkitlike");
			submission_1.action = "/showLike";
			submission_1.mediaType = "application/x-www-form-urlencoded;simple";
			submission_1.addRequestData(dataMap_1);
			if(typeof onSubmealkitlikeSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubmealkitlikeSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("subclicklike");
			submission_2.action = "/clickLike";
			submission_2.mediaType = "application/x-www-form-urlencoded;simple";
			submission_2.addRequestData(dataMap_1);
			if(typeof onSubclicklikeSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSubclicklikeSubmitSuccess);
			}
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("commentSub");
			submission_3.action = "/insertComment";
			submission_3.addRequestData(dataMap_2);
			submission_3.addResponseData(dataMap_3, false);
			submission_3.addResponseData(dataMap_4, false);
			submission_3.addResponseData(dataMap_4, false);
			if(typeof onCommentSubSubmitSuccess == "function") {
				submission_3.addEventListener("submit-success", onCommentSubSubmitSuccess);
			}
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("commentListSub");
			submission_4.action = "/commentList";
			submission_4.addRequestData(dataMap_6);
			submission_4.addResponseData(dataMap_7, false);
			if(typeof onCommentListSubReceive == "function") {
				submission_4.addEventListener("receive", onCommentListSubReceive);
			}
			if(typeof onCommentListSubSubmitSuccess == "function") {
				submission_4.addEventListener("submit-success", onCommentListSubSubmitSuccess);
			}
			app.register(submission_4);
			
			var submission_5 = new cpr.protocols.Submission("deleteComment");
			submission_5.action = "/deleteComment";
			submission_5.addRequestData(dataMap_7);
			if(typeof onDeleteCommentSubmitSuccess == "function") {
				submission_5.addEventListener("submit-success", onDeleteCommentSubmitSuccess);
			}
			app.register(submission_5);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
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
				"color" : "black"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output("name");
					output_1.style.css({
						"font-weight" : "bolder",
						"font-size" : "18px"
					});
					output_1.bind("value").toDataMap(app.lookup("mealkit"), "mealkitName");
					container.addChild(output_1, {
						"top": "30px",
						"left": "9px",
						"width": "258px",
						"height": "30px"
					});
					var output_2 = new cpr.controls.Output("seller");
					output_2.style.css({
						"color" : "#a9a9a9",
						"font-size" : "16px"
					});
					output_2.bind("value").toDataMap(app.lookup("mealkit"), "mealkitMember");
					container.addChild(output_2, {
						"top": "0px",
						"left": "9px",
						"width": "156px",
						"height": "20px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "41px",
					"left": "513px",
					"width": "327px",
					"height": "75px"
				});
				var group_3 = new cpr.controls.Container();
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_3 = new cpr.controls.Output("price");
					output_3.style.css({
						"font-weight" : "bold",
						"font-size" : "18px",
						"text-align" : "center"
					});
					output_3.bind("value").toDataMap(app.lookup("mealkit"), "mealkitPrice");
					container.addChild(output_3, {
						"top": "10px",
						"left": "10px",
						"width": "58px",
						"height": "31px"
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "원";
					container.addChild(output_4, {
						"top": "10px",
						"left": "67px",
						"width": "25px",
						"height": "31px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "126px",
					"left": "513px",
					"width": "264px",
					"height": "41px"
				});
				var group_4 = new cpr.controls.Container();
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
					var output_5 = new cpr.controls.Output();
					output_5.value = "남은 수량";
					output_5.style.css({
						"font-weight" : "normal",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_5, {
						"top": "19px",
						"left": "-1px",
						"width": "72px",
						"height": "19px"
					});
					var output_6 = new cpr.controls.Output("inventory");
					output_6.style.css({
						"font-weight" : "normal",
						"font-size" : "16px"
					});
					output_6.bind("value").toDataMap(app.lookup("mealkit"), "mealkitInventory");
					container.addChild(output_6, {
						"top": "19px",
						"left": "81px",
						"width": "135px",
						"height": "20px"
					});
				})(group_4);
				container.addChild(group_4, {
					"top": "177px",
					"left": "513px",
					"width": "327px",
					"height": "59px"
				});
				var group_5 = new cpr.controls.Container();
				group_5.style.css({
					"background-color" : "#f9f9f9",
					"background-image" : "none"
				});
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
					var output_7 = new cpr.controls.Output();
					output_7.value = "택배배송안내";
					output_7.style.css({
						"font-weight" : "bold",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_7, {
						"top": "5px",
						"left": "85px",
						"width": "135px",
						"height": "20px"
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "주문과 동시에 생산하여";
					output_8.style.css({
						"color" : "#0CA44E",
						"font-size" : "13px",
						"font-style" : "normal",
						"text-align" : "center"
					});
					container.addChild(output_8, {
						"top": "38px",
						"left": "85px",
						"width": "146px",
						"height": "20px"
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = " 다음날 우리집 식탁까지 배송되어요.";
					output_9.style.css({
						"font-size" : "13px"
					});
					container.addChild(output_9, {
						"top": "38px",
						"left": "230px",
						"width": "217px",
						"height": "20px"
					});
					var image_1 = new cpr.controls.Image();
					image_1.src = "theme/images/mealkit/ship.png";
					container.addChild(image_1, {
						"top": "24px",
						"left": "25px",
						"width": "50px",
						"height": "46px"
					});
				})(group_5);
				container.addChild(group_5, {
					"top": "246px",
					"left": "515px",
					"width": "449px",
					"height": "74px"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "바로 구매";
				button_1.style.css({
					"background-color" : "#0ca44e",
					"color" : "white",
					"font-weight" : "bolder",
					"font-size" : "17px",
					"background-image" : "none"
				});
				container.addChild(button_1, {
					"top": "429px",
					"left": "515px",
					"width": "449px",
					"height": "52px"
				});
				var group_6 = new cpr.controls.Container();
				group_6.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_7 = new cpr.controls.layouts.XYLayout();
				group_6.setLayout(xYLayout_7);
				(function(container){
					var button_2 = new cpr.controls.Button();
					button_2.value = "+";
					button_2.style.css({
						"background-color" : "white",
						"color" : "black"
					});
					if(typeof onButtonClick == "function") {
						button_2.addEventListener("click", onButtonClick);
					}
					container.addChild(button_2, {
						"top": "38px",
						"left": "70px",
						"width": "25px",
						"height": "26px"
					});
					var button_3 = new cpr.controls.Button();
					button_3.value = "-";
					button_3.style.css({
						"background-color" : "white",
						"color" : "black"
					});
					if(typeof onButtonClick2 == "function") {
						button_3.addEventListener("click", onButtonClick2);
					}
					container.addChild(button_3, {
						"top": "38px",
						"left": "20px",
						"width": "25px",
						"height": "26px"
					});
					var output_10 = new cpr.controls.Output("mealcnt");
					output_10.value = "1";
					output_10.style.css({
						"text-align" : "center"
					});
					container.addChild(output_10, {
						"top": "40px",
						"left": "44px",
						"width": "27px",
						"height": "22px"
					});
					var output_11 = new cpr.controls.Output("name2");
					output_11.style.css({
						"font-weight" : "bold",
						"font-size" : "15px"
					});
					output_11.bind("value").toDataMap(app.lookup("mealkit"), "mealkitName");
					container.addChild(output_11, {
						"top": "8px",
						"left": "9px",
						"width": "195px",
						"height": "20px"
					});
					var output_12 = new cpr.controls.Output("total");
					output_12.style.css({
						"font-size" : "15px",
						"text-align" : "center"
					});
					output_12.bind("value").toDataMap(app.lookup("mealkit"), "total");
					container.addChild(output_12, {
						"top": "41px",
						"left": "266px",
						"width": "163px",
						"height": "20px"
					});
				})(group_6);
				container.addChild(group_6, {
					"top": "353px",
					"left": "515px",
					"width": "449px",
					"height": "66px"
				});
				var group_7 = new cpr.controls.Container();
				group_7.style.css({
					"background-color" : "#f9f9f9",
					"background-image" : "none"
				});
				var xYLayout_8 = new cpr.controls.layouts.XYLayout();
				group_7.setLayout(xYLayout_8);
				container.addChild(group_7, {
					"top": "330px",
					"left": "515px",
					"width": "449px",
					"height": "13px"
				});
				var group_8 = new cpr.controls.Container();
				group_8.style.css({
					"background-color" : "#f9f9f9",
					"background-image" : "none"
				});
				var xYLayout_9 = new cpr.controls.layouts.XYLayout();
				group_8.setLayout(xYLayout_9);
				container.addChild(group_8, {
					"top": "313px",
					"left": "20px",
					"width": "436px",
					"height": "18px"
				});
				var output_13 = new cpr.controls.Output("ingredients");
				output_13.bind("value").toDataMap(app.lookup("mealkit"), "mealkitIngredients");
				container.addChild(output_13, {
					"top": "353px",
					"left": "20px",
					"width": "436px",
					"height": "98px"
				});
				var group_9 = new cpr.controls.Container();
				group_9.style.css({
					"background-color" : "#f9f9f9",
					"background-image" : "none"
				});
				var xYLayout_10 = new cpr.controls.layouts.XYLayout();
				group_9.setLayout(xYLayout_10);
				container.addChild(group_9, {
					"top": "501px",
					"left": "23px",
					"width": "944px",
					"height": "19px"
				});
				var output_14 = new cpr.controls.Output("regDate");
				output_14.style.css({
					"font-weight" : "normal",
					"text-align" : "center"
				});
				output_14.bind("value").toDataMap(app.lookup("mealkit"), "mealkitRegDate");
				container.addChild(output_14, {
					"top": "11px",
					"left": "850px",
					"width": "130px",
					"height": "20px"
				});
				var output_15 = new cpr.controls.Output("hits");
				output_15.style.css({
					"font-weight" : "normal",
					"font-size" : "15px"
				});
				output_15.bind("value").toDataMap(app.lookup("mealkit"), "mealkitHits");
				container.addChild(output_15, {
					"top": "29px",
					"left": "887px",
					"width": "93px",
					"height": "21px"
				});
				var image_2 = new cpr.controls.Image();
				image_2.src = "theme/images/mealkit/free-icon-eye-118191.png";
				container.addChild(image_2, {
					"top": "31px",
					"left": "857px",
					"width": "26px",
					"height": "17px"
				});
				var hTMLSnippet_1 = new cpr.controls.HTMLSnippet("info");
				hTMLSnippet_1.bind("value").toDataMap(app.lookup("mealkit"), "mealkitInfo");
				container.addChild(hTMLSnippet_1, {
					"top": "530px",
					"left": "17px",
					"width": "956px",
					"height": "594px"
				});
				var button_4 = new cpr.controls.Button("updateBtn");
				button_4.visible = false;
				button_4.value = "수정";
				if(typeof onUpdateBtnClick == "function") {
					button_4.addEventListener("click", onUpdateBtnClick);
				}
				container.addChild(button_4, {
					"top": "12px",
					"left": "627px",
					"width": "100px",
					"height": "20px"
				});
				var button_5 = new cpr.controls.Button("deleBtn");
				button_5.visible = false;
				button_5.value = "삭제";
				if(typeof onButtonClick3 == "function") {
					button_5.addEventListener("click", onButtonClick3);
				}
				container.addChild(button_5, {
					"top": "11px",
					"left": "740px",
					"width": "100px",
					"height": "20px"
				});
				var image_3 = new cpr.controls.Image("mealkitImg");
				container.addChild(image_3, {
					"top": "41px",
					"left": "20px",
					"width": "436px",
					"height": "250px"
				});
				var image_4 = new cpr.controls.Image("likeimg");
				image_4.style.css({
					"cursor" : "pointer"
				});
				if(typeof onLikeimgClick == "function") {
					image_4.addEventListener("click", onLikeimgClick);
				}
				container.addChild(image_4, {
					"top": "49px",
					"left": "882px",
					"width": "90px",
					"height": "68px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"width": "988px",
				"height": "1252px",
				"left": "calc(50% - 494px)"
			});
			
			var group_10 = new cpr.controls.Container("commentgrp");
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.scrollable = false;
			group_10.setLayout(verticalLayout_1);
			container.addChild(group_10, {
				"top": "1434px",
				"width": "963px",
				"height": "303px",
				"left": "calc(50% - 481px)"
			});
			
			var group_11 = new cpr.controls.Container();
			group_11.style.css({
				"text-align" : "center"
			});
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "3px";
			formLayout_1.rightMargin = "3px";
			formLayout_1.bottomMargin = "3px";
			formLayout_1.leftMargin = "3px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.setColumns(["1fr", "100px", "100px"]);
			formLayout_1.setRows(["40px"]);
			group_11.setLayout(formLayout_1);
			(function(container){
				var button_6 = new cpr.controls.Button();
				button_6.value = "등록";
				button_6.style.css({
					"background-color" : "#0ca44e",
					"color" : "white",
					"font-size" : "16px",
					"background-image" : "none"
				});
				if(typeof onButtonClick5 == "function") {
					button_6.addEventListener("click", onButtonClick5);
				}
				container.addChild(button_6, {
					"colIndex": 2,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
				var inputBox_1 = new cpr.controls.InputBox("comment");
				inputBox_1.style.css({
					"text-align" : "left"
				});
				if(typeof onIpb1ValueChange == "function") {
					inputBox_1.addEventListener("value-change", onIpb1ValueChange);
				}
				container.addChild(inputBox_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
				var inputBox_2 = new cpr.controls.InputBox("star");
				inputBox_2.placeholder = "별점을 입력해주세요.";
				inputBox_2.style.css({
					"font-size" : "12px"
				});
				container.addChild(inputBox_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_11);
			container.addChild(group_11, {
				"top": "1281px",
				"width": "960px",
				"height": "43px",
				"left": "calc(50% - 480px)"
			});
			
			var group_12 = new cpr.controls.Container();
			var xYLayout_11 = new cpr.controls.layouts.XYLayout();
			group_12.setLayout(xYLayout_11);
			(function(container){
				var output_16 = new cpr.controls.Output();
				output_16.value = "댓글";
				container.addChild(output_16, {
					"top": "2px",
					"left": "2px",
					"width": "31px",
					"height": "17px"
				});
				var output_17 = new cpr.controls.Output("cnt");
				output_17.value = "개수";
				output_17.style.css({
					"color" : "#0ca44e",
					"font-weight" : "bold",
					"font-size" : "17px"
				});
				container.addChild(output_17, {
					"top": "-1px",
					"left": "32px",
					"width": "37px",
					"height": "23px"
				});
			})(group_12);
			container.addChild(group_12, {
				"top": "1411px",
				"width": "961px",
				"height": "24px",
				"left": "calc(50% - 480px)"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "mealkitDetail";
	cpr.core.Platform.INSTANCE.register(app);
})();
