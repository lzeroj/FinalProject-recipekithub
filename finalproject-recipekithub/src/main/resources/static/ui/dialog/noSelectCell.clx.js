/*
 * App URI: dialog/noSelectCell
 * Source Location: dialog/noSelectCell.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("dialog/noSelectCell", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * noSelectCell.js
			 * Created at 2023. 8. 25. 오전 12:01:25.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				
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
			var output_1 = new cpr.controls.Output("message");
			output_1.value = "Output";
			output_1.style.css({
				"background-color" : "#FFFFFF",
				"font-weight" : "bold",
				"font-size" : "16px",
				"font-family" : "푸른전남 Medium",
				"text-align" : "center"
			});
			container.addChild(output_1, {
				"top": "0px",
				"right": "0px",
				"left": "0px",
				"height": "200px"
			});
			
			var button_1 = new cpr.controls.Button();
			button_1.value = "확인";
			button_1.style.css({
				"background-color" : "#0ebc59",
				"color" : "#FFFFFF",
				"font-weight" : "bold",
				"font-family" : "푸른전남 Medium",
				"background-image" : "none"
			});
			container.addChild(button_1, {
				"right": "0px",
				"bottom": "0px",
				"left": "0px",
				"height": "50px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "noSelectCell";
	cpr.core.Platform.INSTANCE.register(app);
})();
