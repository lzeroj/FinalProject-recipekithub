/*
 * App URI: dialog/successPayment
 * Source Location: dialog/successPayment.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4640), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("dialog/successPayment", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * successPayment.js
			 * Created at 2023. 8. 9. 오후 4:20:55.
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
					app.lookup("opb1").value = hostProperty;
				}
			}

			/*
			 * "홈으로" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				app.close("1");
			};
			// End - User Script
			
			// Header
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
			var output_1 = new cpr.controls.Output();
			output_1.value = "감사합니다";
			output_1.style.css({
				"background-color" : "#FFFFFF",
				"font-size" : "18px",
				"text-align" : "center"
			});
			container.addChild(output_1, {
				"top": "51px",
				"right": "20px",
				"left": "20px",
				"height": "100px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "홈으로";
			if(typeof onButtonClick == "function") {
				button_1.addEventListener("click", onButtonClick);
			}
			container.addChild(button_1, {
				"right": "20px",
				"bottom": "20px",
				"left": "20px",
				"height": "40px"
			});
			
			var output_2 = new cpr.controls.Output("opb1");
			output_2.value = "";
			output_2.style.css({
				"background-color" : "#FFFFFF",
				"color" : "#727C89",
				"font-size" : "15px",
				"font-style" : "normal",
				"text-align" : "center"
			});
			container.addChild(output_2, {
				"top": "150px",
				"right": "20px",
				"left": "20px",
				"height": "80px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "successPayment";
	cpr.core.Platform.INSTANCE.register(app);
})();
