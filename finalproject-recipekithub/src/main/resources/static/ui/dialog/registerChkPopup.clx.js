/*
 * App URI: dialog/registerChkPopup
 * Source Location: dialog/registerChkPopup.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("dialog/registerChkPopup", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/controls/dialog.part.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * 2-Dialog.js
			 * Created at 2019. 7. 16. 오후 4:23:26.
			 *
			 * @author ryu
			 ************************************************/

			/*
			 * Body에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(/* cpr.events.CEvent */ e){
				var host = app.getHost(); // 해당 앱이 누군가로부터 불렸는지 (부모가 있는지) 확인

				if(host){
					// 부모화면에서 보낸값을 팝업창에서 확인
					var hostProperty = app.getHostProperty("initValue");
					console.log(hostProperty);
					app.lookup("opbMessage").value = hostProperty;
				}
				
			}


			/*
			 * "확인" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnSubmitClick(/* cpr.events.CMouseEvent */ e){
				/** 
				 * @type cpr.controls.Button
				 */
				var btnSubmit = e.control;
				app.close(true); // returnValue를 설정하며 다이얼로그 닫기
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
				"top" : "0px",
				"height" : "100%",
				"left" : "0px"
			});
			
			// Layout
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.horizontalSpacing = "0px";
			formLayout_1.verticalSpacing = "0px";
			formLayout_1.setColumns(["1fr"]);
			formLayout_1.setRows(["1fr", "50px"]);
			container.setLayout(formLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			var formLayout_2 = new cpr.controls.layouts.FormLayout();
			formLayout_2.horizontalSpacing = "0px";
			formLayout_2.verticalSpacing = "0px";
			formLayout_2.setColumns(["1fr"]);
			formLayout_2.setRows(["1fr"]);
			group_1.setLayout(formLayout_2);
			(function(container){
				var button_1 = new cpr.controls.Button("btnSubmit");
				button_1.value = "확인";
				button_1.style.css({
					"border-right-style" : "none",
					"border-radius" : "0px",
					"background-color" : "#0ca44e",
					"text-shadow" : "none",
					"color" : "#FFFFFF",
					"border-left-style" : "none",
					"font-weight" : "bolder",
					"font-size" : "20px",
					"border-bottom-style" : "none",
					"background-image" : "none",
					"border-top-style" : "none"
				});
				if(typeof onBtnSubmitClick == "function") {
					button_1.addEventListener("click", onBtnSubmitClick);
				}
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0,
					"colSpan": 1,
					"rowSpan": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"colIndex": 0,
				"rowIndex": 1
			});
			
			var output_1 = new cpr.controls.Output("opbMessage");
			output_1.value = "";
			output_1.style.css({
				"font-size" : "20px",
				"text-align" : "center"
			});
			container.addChild(output_1, {
				"colIndex": 0,
				"rowIndex": 0
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "회원가입";
	cpr.core.Platform.INSTANCE.register(app);
})();
