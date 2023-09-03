/*
 * App URI: dialog/declarationRecipe
 * Source Location: dialog/declarationRecipe.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("dialog/declarationRecipe", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * declarationRecipe.js
			 * Created at 2023. 8. 16. 오후 11:12:28.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				var host = app.getHost();
				if(host){
					// 부모화면에서 보낸값을 팝업창에서 확인
					var hostProperty = app.getHostProperty("initValue");
					console.log(hostProperty);
				}
			}

			/*
			 * "등록" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var inputtext = app.lookup("ipb1").text;
				var textbox = app.lookup("txa1").text;
				var radioButton = app.lookup("rdb1");
				var value = radioButton.value;
				
				var resultvalue = {
					"inputtext":inputtext, //제목
					"textbox":textbox, //내용
					"declarationType":value
				};
				if(confirm("신고하시겠습니까?")){
					app.close(resultvalue);
				}
			}

			/*
			 * "취소" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				var resultvalue = 0;
				app.close(resultvalue);
			};
			// End - User Script
			
			// Header
			var submission_1 = new cpr.protocols.Submission("insert");
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
			group_1.style.css({
				"background-color" : "#F6F6F6",
				"border-radius" : "10px"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			container.addChild(group_1, {
				"top": "70px",
				"right": "10px",
				"bottom": "30px",
				"left": "10px"
			});
			
			var group_2 = new cpr.controls.Container();
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "0px";
			formLayout_1.rightMargin = "0px";
			formLayout_1.bottomMargin = "0px";
			formLayout_1.leftMargin = "0px";
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["40px", "1fr", "80px"]);
			formLayout_1.setRows(["30px", "10px", "28px", "28px", "28px", "28px", "10px", "300px"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.style.css({
					"border-radius" : "10px",
					"font-family" : "푸른전남"
				});
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0,
					"colSpan": 2,
					"rowSpan": 1
				});
				var textArea_1 = new cpr.controls.TextArea("txa1");
				textArea_1.style.css({
					"border-radius" : "10px",
					"font-family" : "푸른전남"
				});
				container.addChild(textArea_1, {
					"colIndex": 1,
					"rowIndex": 7,
					"colSpan": 2,
					"rowSpan": 1
				});
				var output_1 = new cpr.controls.Output();
				output_1.value = "제목";
				output_1.style.css({
					"font-weight" : "bold",
					"font-family" : "푸른전남"
				});
				container.addChild(output_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_2 = new cpr.controls.Output();
				output_2.value = "내용";
				output_2.style.css({
					"font-weight" : "bold",
					"font-family" : "푸른전남"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 7
				});
				var radioButton_1 = new cpr.controls.RadioButton("rdb1");
				radioButton_1.colCount = 1;
				radioButton_1.style.css({
					"font-family" : "푸른전남"
				});
				(function(radioButton_1){
					radioButton_1.addItem(new cpr.controls.Item("적절하지 않은 내용", "적절하지 않은 내용"));
					radioButton_1.addItem(new cpr.controls.Item("광고 목적의 컨텐츠", "광고 목적의 컨텐츠"));
					radioButton_1.addItem(new cpr.controls.Item("선정적인 컨텐츠", "선정적인 컨텐츠"));
					radioButton_1.addItem(new cpr.controls.Item("기타", "기타"));
				})(radioButton_1);
				container.addChild(radioButton_1, {
					"colIndex": 1,
					"rowIndex": 2,
					"colSpan": 1,
					"rowSpan": 4
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "신고 유형";
				output_3.style.css({
					"font-weight" : "bold",
					"font-family" : "푸른전남"
				});
				container.addChild(output_3, {
					"colIndex": 0,
					"rowIndex": 2,
					"colSpan": 1,
					"rowSpan": 4
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "80px",
				"right": "20px",
				"bottom": "40px",
				"left": "20px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "등록";
			button_1.style.css({
				"border-right-style" : "solid",
				"color" : "#FFFFFF",
				"border-bottom-color" : "#0ca44e",
				"border-left-color" : "#0ca44e",
				"font-size" : "14px",
				"border-right-color" : "#0ca44e",
				"border-top-style" : "solid",
				"background-color" : "#0ca44e",
				"border-left-style" : "solid",
				"border-top-color" : "#0ca44e",
				"font-family" : "푸른전남",
				"border-bottom-style" : "solid",
				"background-image" : "none"
			});
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"right": "100px",
				"bottom": "5px",
				"width": "70px",
				"height": "20px"
			});
			
			var button_2 = new cpr.controls.Button();
			button_2.value = "취소";
			button_2.style.css({
				"border-right-style" : "solid",
				"color" : "#FFFFFF",
				"border-bottom-color" : "#0ca44e",
				"border-left-color" : "#0ca44e",
				"font-size" : "14px",
				"border-right-color" : "#0ca44e",
				"border-top-style" : "solid",
				"background-color" : "#0ca44e",
				"border-left-style" : "solid",
				"border-top-color" : "#0ca44e",
				"font-family" : "푸른전남",
				"border-bottom-style" : "solid",
				"background-image" : "none"
			});
			if(typeof onButtonClick2 == "function") {
				button_2.addEventListener("click", onButtonClick2);
			}
			container.addChild(button_2, {
				"right": "20px",
				"bottom": "5px",
				"width": "70px",
				"height": "20px"
			});
			
			var group_3 = new cpr.controls.Container();
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.scrollable = false;
			formLayout_2.topMargin = "0px";
			formLayout_2.rightMargin = "0px";
			formLayout_2.bottomMargin = "0px";
			formLayout_2.leftMargin = "0px";
			formLayout_2.horizontalSpacing = "0px";
			formLayout_2.verticalSpacing = "0px";
			formLayout_2.setColumns(["100px", "1fr"]);
			formLayout_2.setRows(["1fr"]);
			group_3.setLayout(formLayout_2);
			(function(container){
				var image_1 = new cpr.controls.Image();
				image_1.src = "theme/images/mealkit/alarm.png";
				container.addChild(image_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"horizontalAlign": "center",
					"verticalAlign": "center",
					"width": 40,
					"height": 40
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "신고하기";
				output_4.style.css({
					"font-weight" : "bold",
					"font-size" : "20px",
					"font-family" : "푸른전남 Medium",
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"colIndex": 1,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
			})(group_3);
			container.addChild(group_3, {
				"top": "15px",
				"right": "100px",
				"left": "100px",
				"height": "40px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "declarationRecipe";
	cpr.core.Platform.INSTANCE.register(app);
})();
