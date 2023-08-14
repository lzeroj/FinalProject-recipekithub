/*
 * App URI: embedded/myPageQnAUpdateForm
 * Source Location: embedded/myPageQnAUpdateForm.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/myPageQnAUpdateForm", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * myPageQnAUpdateForm.js
			 * Created at 2023. 8. 14. 오후 4:46:00.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				var host = app.getHost(); // 부모 임베디드 앱
				var val = host.initValue;
				app.lookup("ipb1").text = val.boardTitle;
				app.lookup("txa1").text = val.boardContent;
				app.lookup("ipb1").redraw();
				app.lookup("txa1").redraw();
				app.lookup("ipb1").focus();
				
				app.lookup("updateqna").setValue("boardId", val.boardId);
			}

			/*
			 * "수정" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				if(confirm("수정하시겠습니까?")){
					app.lookup("updateqna").setValue("boardTitle", app.lookup("ipb1").text);
					app.lookup("updateqna").setValue("boardContent", app.lookup("txa1").text);
					app.lookup("subupdateqna").send();
				}
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubupdateqnaSubmitSuccess(e){
				var subupdateqna = e.control;
				var host = app.getHost(); // 부모 임베디드 앱
				if(subupdateqna.getMetadata("insertResult")==1){
					alert("수정되었습니다");
					cpr.core.App.load("embedded/myPageQuestion", function(loadedApp){
						if (loadedApp){
							host.app = loadedApp;
						}
					});
				}
				
			};
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("updateqna");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "boardId",
						"dataType": "number"
					},
					{"name": "boardTitle"},
					{"name": "boardContent"}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("subupdateqna");
			submission_1.action = "/updateQnA";
			submission_1.addRequestData(dataMap_1);
			if(typeof onSubupdateqnaSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubupdateqnaSubmitSuccess);
			}
			app.register(submission_1);
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
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "Q & A";
				output_1.style.css({
					"padding-top" : "5px",
					"border-bottom-color" : "darkGrey",
					"color" : "#0fd465",
					"font-weight" : "bold",
					"border-bottom-width" : "1px",
					"font-size" : "18px",
					"border-bottom-style" : "solid",
					"font-family" : "푸른전남",
					"text-align" : "center"
				});
				container.addChild(output_1, {
					"top": "0px",
					"right": "0px",
					"left": "0px",
					"height": "50px"
				});
				var group_2 = new cpr.controls.Container();
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var inputBox_1 = new cpr.controls.InputBox("ipb1");
					inputBox_1.readOnly = false;
					inputBox_1.placeholder = "제목";
					inputBox_1.style.css({
						"border-radius" : "10px"
					});
					container.addChild(inputBox_1, {
						"top": "20px",
						"right": "20px",
						"left": "20px",
						"height": "40px"
					});
					var textArea_1 = new cpr.controls.TextArea("txa1");
					textArea_1.readOnly = false;
					textArea_1.value = "이메일 :\r\n전화번호 :\r\n---------------------------------------------------------------------------------------\r\n문의내용 :";
					textArea_1.style.css({
						"border-radius" : "10px"
					});
					container.addChild(textArea_1, {
						"top": "80px",
						"right": "20px",
						"bottom": "60px",
						"left": "20px"
					});
					var button_1 = new cpr.controls.Button();
					button_1.value = "수정";
					button_1.style.css({
						"background-color" : "#0ebc59",
						"color" : "#FFFFFF",
						"background-image" : "none"
					});
					if(typeof onButtonClick == "function") {
						button_1.addEventListener("click", onButtonClick);
					}
					container.addChild(button_1, {
						"right": "170px",
						"bottom": "20px",
						"width": "140px",
						"height": "30px"
					});
					var button_2 = new cpr.controls.Button();
					button_2.value = "뒤로가기";
					button_2.style.css({
						"background-color" : "#0ebc59",
						"color" : "#FFFFFF",
						"background-image" : "none"
					});
					container.addChild(button_2, {
						"right": "20px",
						"bottom": "20px",
						"width": "140px",
						"height": "30px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "50px",
					"right": "0px",
					"bottom": "0px",
					"left": "0px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "myPageQnAUpdateForm";
	cpr.core.Platform.INSTANCE.register(app);
})();
