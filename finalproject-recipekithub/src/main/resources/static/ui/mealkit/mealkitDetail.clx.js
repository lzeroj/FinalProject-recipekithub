/*
 * App URI: mealkit/mealkitDetail
 * Source Location: mealkit/mealkitDetail.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4640), Don't edit manually.
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
					{
						"name": "sessionMember",
						"dataType": "string"
					},
					{"name": "mealkitMember"}
				]
			});
			if(typeof onMealkitUpdate == "function") {
				dataMap_1.addEventListener("update", onMealkitUpdate);
			}
			app.register(dataMap_1);
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
				var image_1 = new cpr.controls.Image();
				image_1.src = "mealkit/theme/images/mealkit/rose.jpg";
				container.addChild(image_1, {
					"top": "31px",
					"left": "20px",
					"width": "436px",
					"height": "250px"
				});
				var group_2 = new cpr.controls.Container();
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output("name");
					output_1.style.css({
						"font-weight" : "bolder",
						"font-size" : "17px"
					});
					output_1.bind("value").toDataMap(app.lookup("mealkit"), "mealkitName");
					container.addChild(output_1, {
						"top": "20px",
						"left": "9px",
						"width": "284px",
						"height": "29px"
					});
					var output_2 = new cpr.controls.Output("seller");
					output_2.style.css({
						"color" : "#a9a9a9",
						"font-size" : "15px"
					});
					output_2.bind("value").toDataMap(app.lookup("mealkit"), "mealkitMember");
					container.addChild(output_2, {
						"top": "1px",
						"left": "9px",
						"width": "156px",
						"height": "20px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "31px",
					"left": "513px",
					"width": "327px",
					"height": "57px"
				});
				var group_3 = new cpr.controls.Container();
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_3 = new cpr.controls.Output("price");
					output_3.style.css({
						"font-size" : "16px",
						"text-align" : "center"
					});
					output_3.bind("value").toDataMap(app.lookup("mealkit"), "mealkitPrice");
					container.addChild(output_3, {
						"top": "2px",
						"left": "9px",
						"width": "90px",
						"height": "31px"
					});
					var output_4 = new cpr.controls.Output();
					output_4.value = "원";
					container.addChild(output_4, {
						"top": "2px",
						"left": "98px",
						"width": "25px",
						"height": "31px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "98px",
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
						"font-weight" : "bold",
						"font-size" : "12px",
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
						"font-size" : "15px"
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
					"top": "138px",
					"left": "513px",
					"width": "327px",
					"height": "59px"
				});
				var group_5 = new cpr.controls.Container();
				group_5.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
					var output_7 = new cpr.controls.Output();
					output_7.value = "택배배송안내";
					output_7.style.css({
						"font-weight" : "bold",
						"font-size" : "16px",
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
						"font-size" : "12px",
						"font-style" : "normal",
						"text-align" : "center"
					});
					container.addChild(output_8, {
						"top": "38px",
						"left": "85px",
						"width": "129px",
						"height": "20px"
					});
					var output_9 = new cpr.controls.Output();
					output_9.value = " 다음날 우리집 식탁까지 배송되어요.";
					output_9.style.css({
						"font-size" : "12px"
					});
					container.addChild(output_9, {
						"top": "38px",
						"left": "213px",
						"width": "201px",
						"height": "20px"
					});
					var image_2 = new cpr.controls.Image();
					image_2.src = "theme/images/mealkit/ship.png";
					container.addChild(image_2, {
						"top": "24px",
						"left": "25px",
						"width": "50px",
						"height": "46px"
					});
				})(group_5);
				container.addChild(group_5, {
					"top": "207px",
					"left": "515px",
					"width": "465px",
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
					"top": "378px",
					"left": "515px",
					"width": "414px",
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
						"font-weight" : "bold"
					});
					output_11.bind("value").toDataMap(app.lookup("mealkit"), "mealkitName");
					container.addChild(output_11, {
						"top": "8px",
						"left": "20px",
						"width": "195px",
						"height": "20px"
					});
					var output_12 = new cpr.controls.Output("total");
					output_12.style.css({
						"font-weight" : "bold",
						"text-align" : "center"
					});
					output_12.bind("value").toDataMap(app.lookup("mealkit"), "total");
					container.addChild(output_12, {
						"top": "41px",
						"left": "316px",
						"width": "141px",
						"height": "20px"
					});
				})(group_6);
				container.addChild(group_6, {
					"top": "302px",
					"left": "515px",
					"width": "465px",
					"height": "66px"
				});
				var group_7 = new cpr.controls.Container();
				var xYLayout_8 = new cpr.controls.layouts.XYLayout();
				group_7.setLayout(xYLayout_8);
				container.addChild(group_7, {
					"top": "290px",
					"left": "515px",
					"width": "465px",
					"height": "13px"
				});
				var group_8 = new cpr.controls.Container();
				var xYLayout_9 = new cpr.controls.layouts.XYLayout();
				group_8.setLayout(xYLayout_9);
				(function(container){
					var hTMLSnippet_1 = new cpr.controls.HTMLSnippet("info");
					hTMLSnippet_1.bind("value").toDataMap(app.lookup("mealkit"), "mealkitInfo");
					container.addChild(hTMLSnippet_1, {
						"top": "3px",
						"left": "2px",
						"width": "961px",
						"height": "171px"
					});
				})(group_8);
				container.addChild(group_8, {
					"top": "450px",
					"left": "20px",
					"width": "960px",
					"height": "170px"
				});
				var group_9 = new cpr.controls.Container();
				group_9.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_10 = new cpr.controls.layouts.XYLayout();
				group_9.setLayout(xYLayout_10);
				container.addChild(group_9, {
					"top": "313px",
					"left": "20px",
					"width": "436px",
					"height": "18px"
				});
				var output_13 = new cpr.controls.Output("ingredients");
				output_13.bind("value").toDataMap(app.lookup("mealkit"), "mealkitIngredients");
				container.addChild(output_13, {
					"top": "342px",
					"left": "20px",
					"width": "436px",
					"height": "98px"
				});
				var group_10 = new cpr.controls.Container();
				group_10.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_11 = new cpr.controls.layouts.XYLayout();
				group_10.setLayout(xYLayout_11);
				container.addChild(group_10, {
					"top": "429px",
					"left": "20px",
					"width": "436px",
					"height": "22px"
				});
				var button_4 = new cpr.controls.Button("updateBtn");
				button_4.value = "수정";
				if(typeof onUpdateBtnClick == "function") {
					button_4.addEventListener("click", onUpdateBtnClick);
				}
				container.addChild(button_4, {
					"top": "430px",
					"left": "513px",
					"width": "100px",
					"height": "20px"
				});
				var output_14 = new cpr.controls.Output("regDate");
				output_14.bind("value").toDataMap(app.lookup("mealkit"), "mealkitRegDate");
				container.addChild(output_14, {
					"top": "12px",
					"left": "20px",
					"width": "123px",
					"height": "20px"
				});
				var button_5 = new cpr.controls.Button("deleBtn");
				button_5.visible = false;
				button_5.value = "삭제";
				if(typeof onButtonClick3 == "function") {
					button_5.addEventListener("click", onButtonClick3);
				}
				container.addChild(button_5, {
					"top": "429px",
					"left": "623px",
					"width": "100px",
					"height": "20px"
				});
				var output_15 = new cpr.controls.Output("hits");
				output_15.bind("value").toDataMap(app.lookup("mealkit"), "mealkitHits");
				container.addChild(output_15, {
					"top": "1px",
					"left": "794px",
					"width": "135px",
					"height": "21px"
				});
				var image_3 = new cpr.controls.Image();
				image_3.src = "theme/images/mealkit/free-icon-eye-118191.png";
				container.addChild(image_3, {
					"top": "3px",
					"left": "762px",
					"width": "26px",
					"height": "17px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "108px",
				"bottom": "20px",
				"width": "984px",
				"left": "calc(50% - 492px)"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "mealkitDetail";
	cpr.core.Platform.INSTANCE.register(app);
})();
