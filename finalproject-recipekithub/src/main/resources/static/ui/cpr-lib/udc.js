/// start - udc.imgButton
/*
 * UDC Qualified Name: udc.imgButton
 * App URI: udc/imgButton
 * Source Location: udc/imgButton.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function(){
	// App Declaration
		var internalApp = new cpr.core.App("udc/imgButton", { 
			onPrepare: function(loader) {
			},
			onCreate: function(/* cpr.core.AppInstance */ app, exports) {
				var linker = {};
				// Start - User Script
				/************************************************
				 * imgButton.js
				 * Created at 2022. 5. 30. 오후 5:02:20.
				 *
				 * @author techdom
				 ************************************************/
	
				/**
				 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
				 */
				exports.getText = function(){
					// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
					return "";
				};
	
				/*
				 * "삭제" 버튼에서 click 이벤트 발생 시 호출.
				 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
				 */
				function onButtonClick(e){
					var button = e.control;
					
					//[삭제] 버튼 클릭시 이미지를 삭제하는 이벤트 출판
					var event = new cpr.events.CUIEvent("deleteImg");
					app.dispatchEvent(event);
				}
	
				/*
				 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
				 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
				 */
				function onBodyLoad(e){
					//출판한 [이미지 경로] 앱 속성을 이미지의 경로로 지정
					app.lookup("img1").src = app.getAppProperty("src");
				};
				// End - User Script
				
				// Header
				app.declareAppProperty("src", null);
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
				var xYLayout_1 = new cpr.controls.layouts.XYLayout();
				container.setLayout(xYLayout_1);
				
				// UI Configuration
				var image_1 = new cpr.controls.Image("img1");
				container.addChild(image_1, {
					"top": "0px",
					"left": "0px",
					"width": "300px",
					"height": "300px"
				});
				
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "삭제";
				if(typeof onButtonClick == "function") {
					button_1.addEventListener("click", onButtonClick);
				}
				container.addChild(button_1, {
					"top": "10px",
					"left": "250px",
					"width": "40px",
					"height": "40px"
				});
				if(typeof onBodyLoad == "function"){
					app.addEventListener("load", onBodyLoad);
				}
			}
		});
	internalApp.title = "imgButton";
	
	// Type declaration for imgButton
	cpr.utils.Util.ensurePackage("udc").imgButton = function(id){
		cpr.controls.UDCBase.call(this, "udc.imgButton", internalApp, id);
	};
	
	udc.imgButton.prototype = Object.create(cpr.controls.UDCBase.prototype);
	Object.defineProperty(udc.imgButton.prototype, "type", {
		get : function(){
			return "udc.imgButton";
		},
		
		configurable: true
	});
	
	// App Properties
	Object.defineProperty(udc.imgButton.prototype, "src", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("src");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("src", newValue, true);
		}
	});
	
	// Register type into the Platform and package
	cpr.core.Platform.INSTANCE.register(internalApp);
})();
/// end - udc.imgButton
/// start - udc.imgButton2
/*
 * UDC Qualified Name: udc.imgButton2
 * App URI: udc/imgButton2
 * Source Location: udc/imgButton2.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function(){
	// App Declaration
		var internalApp = new cpr.core.App("udc/imgButton2", { 
			onPrepare: function(loader) {
			},
			onCreate: function(/* cpr.core.AppInstance */ app, exports) {
				var linker = {};
				// Start - User Script
				/************************************************
				 * imgButton.js
				 * Created at 2023. 8. 7. 오후 6:26:50.
				 *
				 * @author shj22k
				 ************************************************/
	
				/**
				 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
				 */
				exports.getText = function(){
					// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
					return "";
				};
	
				/*
				 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
				 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
				 */
				function onBodyLoad(e){
					app.lookup("img1").src = app.getAppProperty("src");
				}
	
				/*
				 * "Button" 버튼(btn1)에서 click 이벤트 발생 시 호출.
				 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
				 */
				function onBtn1Click(e){
					var btn1 = e.control;
					
					//[삭제] 버튼 클릭시 이미지를 삭제하는 이벤트 출판
					var event = new cpr.events.CUIEvent("deleteImg");
					app.dispatchEvent(event);
					
				};
				// End - User Script
				
				// Header
				app.declareAppProperty("src", null);
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
				var xYLayout_1 = new cpr.controls.layouts.XYLayout();
				container.setLayout(xYLayout_1);
				
				// UI Configuration
				var image_1 = new cpr.controls.Image("img1");
				container.addChild(image_1, {
					"top": "0px",
					"left": "0px",
					"width": "300px",
					"height": "300px"
				});
				
				var button_1 = new cpr.controls.Button("btn1");
				button_1.value = "Button";
				if(typeof onBtn1Click == "function") {
					button_1.addEventListener("click", onBtn1Click);
				}
				container.addChild(button_1, {
					"top": "7px",
					"left": "180px",
					"width": "100px",
					"height": "20px"
				});
				if(typeof onBodyLoad == "function"){
					app.addEventListener("load", onBodyLoad);
				}
			}
		});
	internalApp.title = "imgButton2";
	
	// Type declaration for imgButton2
	cpr.utils.Util.ensurePackage("udc").imgButton2 = function(id){
		cpr.controls.UDCBase.call(this, "udc.imgButton2", internalApp, id);
	};
	
	udc.imgButton2.prototype = Object.create(cpr.controls.UDCBase.prototype);
	Object.defineProperty(udc.imgButton2.prototype, "type", {
		get : function(){
			return "udc.imgButton2";
		},
		
		configurable: true
	});
	
	// App Properties
	Object.defineProperty(udc.imgButton2.prototype, "src", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("src");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("src", newValue, true);
		}
	});
	
	// Register type into the Platform and package
	cpr.core.Platform.INSTANCE.register(internalApp);
})();
/// end - udc.imgButton2
