/// start - udc.header
/*
 * UDC Qualified Name: udc.header
 * App URI: udc/header
 * Source Location: udc/header.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function(){
	// App Declaration
		var internalApp = new cpr.core.App("udc/header", { 
			onPrepare: function(loader) {
			},
			onCreate: function(/* cpr.core.AppInstance */ app, exports) {
				var linker = {};
				// Start - User Script
				/************************************************
				 * header.js
				 * Created at 2023. 8. 8. 오후 3:17:56.
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
				 * 버튼에서 click 이벤트 발생 시 호출.
				 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
				 */
				function onButtonClick(e){
					var button = e.control;
					window.location.href="/findMyCartForm";
				}
	
				/*
				 * 버튼(mypage)에서 click 이벤트 발생 시 호출.
				 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
				 */
				function onMypageClick(e){
					var mypage = e.control;
					window.location.href="/findMyPageForm";
				}
	
				/*
				 * 이미지에서 click 이벤트 발생 시 호출.
				 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
				 */
				function onImageClick(e){
					var image = e.control;
					window.location.href="/";
				}
	
				/*
				 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
				 * 아이템 클릭시 발생하는 이벤트.
				 */
				function onNavigationBarItemClick(e){
					var navigationBar = e.control;
					if(navigationBar.value == 'question'){
						console.log(1);
					}
				};
				// End - User Script
				
				// Header
				app.declareAppProperty("cartbtn", null);
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
				var group_1 = new cpr.controls.Container();
				var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
				group_1.setLayout(responsiveXYLayout_1);
				(function(container){
					var group_2 = new cpr.controls.Container("grp1");
					group_2.overscrollBehavior = "none";
					var xYLayout_2 = new cpr.controls.layouts.XYLayout();
					xYLayout_2.scrollable = false;
					group_2.setLayout(xYLayout_2);
					(function(container){
						var image_1 = new cpr.controls.Image();
						image_1.src = "theme/images/icon/recipekithubLog.png";
						image_1.style.css({
							"cursor" : "pointer",
							"padding-top" : "0px"
						});
						if(typeof onImageClick == "function") {
							image_1.addEventListener("click", onImageClick);
						}
						container.addChild(image_1, {
							"top": "-20px",
							"left": "42px",
							"width": "140px",
							"height": "140px"
						});
						var button_1 = new cpr.controls.Button("mypage");
						button_1.value = "";
						button_1.style.setClasses(["login"]);
						button_1.style.css({
							"border-right-style" : "none",
							"background-color" : "#FFFFFF",
							"background-size" : "cover",
							"border-left-style" : "none",
							"border-bottom-style" : "none",
							"background-image" : "url('theme/images/icon/people.png')",
							"border-top-style" : "none"
						});
						if(typeof onMypageClick == "function") {
							button_1.addEventListener("click", onMypageClick);
						}
						container.addChild(button_1, {
							"top": "20px",
							"left": "694px",
							"width": "50px",
							"height": "50px"
						});
						var button_2 = new cpr.controls.Button("cartbtn");
						button_2.value = "";
						button_2.style.setClasses(["recipe"]);
						button_2.style.css({
							"border-right-style" : "none",
							"background-color" : "#FFFFFF",
							"background-size" : "cover",
							"border-left-style" : "none",
							"border-bottom-style" : "none",
							"background-image" : "url('theme/images/icon/shopping-basket.png')",
							"border-top-style" : "none"
						});
						if(typeof onButtonClick == "function") {
							button_2.addEventListener("click", onButtonClick);
						}
						container.addChild(button_2, {
							"top": "20px",
							"left": "771px",
							"width": "50px",
							"height": "50px"
						});
						var group_3 = new cpr.controls.Container();
						group_3.style.setClasses(["cl-form-group"]);
						group_3.style.css({
							"border-right-style" : "solid",
							"border-bottom-color" : "#b4b4b4",
							"border-top-width" : "2px",
							"border-right-width" : "2px",
							"border-left-color" : "#b4b4b4",
							"border-right-color" : "#b4b4b4",
							"border-left-width" : "2px",
							"border-top-style" : "solid",
							"border-radius" : "15px",
							"border-left-style" : "solid",
							"border-bottom-width" : "2px",
							"border-top-color" : "#b4b4b4",
							"border-bottom-style" : "solid"
						});
						var formLayout_1 = new cpr.controls.layouts.FormLayout();
						formLayout_1.scrollable = false;
						formLayout_1.topMargin = "0px";
						formLayout_1.rightMargin = "0px";
						formLayout_1.bottomMargin = "0px";
						formLayout_1.leftMargin = "0px";
						formLayout_1.horizontalSpacing = "0px";
						formLayout_1.verticalSpacing = "0px";
						formLayout_1.horizontalSeparatorWidth = 1;
						formLayout_1.verticalSeparatorWidth = 1;
						formLayout_1.setColumns(["1fr", "1fr", "1fr"]);
						formLayout_1.setRows(["1fr"]);
						group_3.setLayout(formLayout_1);
						(function(container){
							var searchInput_1 = new cpr.controls.SearchInput();
							searchInput_1.style.css({
								"border-right-style" : "solid",
								"border-bottom-color" : "#ffffff",
								"border-left-style" : "solid",
								"border-left-color" : "#ffffff",
								"border-top-color" : "#ffffff",
								"border-bottom-style" : "solid",
								"border-right-color" : "#ffffff",
								"border-top-style" : "solid"
							});
							container.addChild(searchInput_1, {
								"colIndex": 1,
								"rowIndex": 0,
								"colSpan": 2,
								"rowSpan": 1
							});
							var comboBox_1 = new cpr.controls.ComboBox("cmb1");
							comboBox_1.preventInput = true;
							comboBox_1.style.item.css({
								"border-right-style" : "solid",
								"border-bottom-color" : "#ffffff",
								"border-top-width" : "0px",
								"border-left-style" : "solid",
								"border-right-width" : "0px",
								"border-left-color" : "#ffffff",
								"border-bottom-width" : "0px",
								"border-top-color" : "#ffffff",
								"border-bottom-style" : "solid",
								"border-right-color" : "#ffffff",
								"border-left-width" : "0px",
								"border-top-style" : "solid"
							});
							(function(comboBox_1){
								comboBox_1.addItem(new cpr.controls.Item("레시피", "value1"));
								comboBox_1.addItem(new cpr.controls.Item("밀키트", "value2"));
							})(comboBox_1);
							container.addChild(comboBox_1, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_3);
						container.addChild(group_3, {
							"top": "23px",
							"left": "218px",
							"width": "431px",
							"height": "45px"
						});
					})(group_2);
					container.addChild(group_2, {
						positions: [
							{
								"media": "all and (min-width: 1024px)",
								"top": "10px",
								"width": "897px",
								"height": "89px",
								"left": "calc(50% - 448px)"
							}, 
							{
								"media": "all and (min-width: 500px) and (max-width: 1023px)",
								"top": "10px",
								"width": "438px",
								"height": "89px",
								"left": "calc(50% - 219px)"
							}, 
							{
								"media": "all and (max-width: 499px)",
								"top": "10px",
								"width": "307px",
								"height": "89px",
								"left": "calc(50% - 153px)"
							}
						]
					});
					var navigationBar_1 = new cpr.controls.NavigationBar();
					navigationBar_1.menuType = "fullmenu";
					navigationBar_1.expandTrigger = "click";
					navigationBar_1.style.setClasses(["indexnav"]);
					navigationBar_1.style.css({
						"background-color" : "#0ebc59",
						"border-right-style" : "solid",
						"color" : "#FFFFFF",
						"border-bottom-color" : "#0ebc59",
						"border-left-style" : "solid",
						"border-left-color" : "#0ebc59",
						"font-size" : "16px",
						"border-top-color" : "#0ebc59",
						"font-family" : "푸른잔디",
						"border-bottom-style" : "solid",
						"border-right-color" : "#0ebc59",
						"border-top-style" : "solid"
					});
					navigationBar_1.style.bar.css({
						"text-align" : "center"
					});
					navigationBar_1.style.item.css({
						"text-align" : "center"
					});
					(function(navigationBar_1){
						navigationBar_1.addItem(new cpr.controls.MenuItem("추천", "value1", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("레시피", "value2", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("밀키트", "value3", null));
						navigationBar_1.addItem(new cpr.controls.MenuItem("Q & A", "question", null));
					})(navigationBar_1);
					if(typeof onNavigationBarItemClick == "function") {
						navigationBar_1.addEventListener("item-click", onNavigationBarItemClick);
					}
					container.addChild(navigationBar_1, {
						positions: [
							{
								"media": "all and (min-width: 1024px)",
								"top": "98px",
								"right": "0px",
								"left": "0px",
								"height": "51px"
							}, 
							{
								"media": "all and (min-width: 500px) and (max-width: 1023px)",
								"top": "98px",
								"right": "0px",
								"left": "0px",
								"height": "51px"
							}, 
							{
								"media": "all and (max-width: 499px)",
								"top": "98px",
								"right": "0px",
								"left": "0px",
								"height": "51px"
							}
						]
					});
				})(group_1);
				container.addChild(group_1, {
					"top": "0px",
					"width": "1024px",
					"height": "160px",
					"left": "calc(50% - 512px)"
				});
			}
		});
	internalApp.title = "header";
	
	// Type declaration for header
	cpr.utils.Util.ensurePackage("udc").header = function(id){
		cpr.controls.UDCBase.call(this, "udc.header", internalApp, id);
	};
	
	udc.header.prototype = Object.create(cpr.controls.UDCBase.prototype);
	Object.defineProperty(udc.header.prototype, "type", {
		get : function(){
			return "udc.header";
		},
		
		configurable: true
	});
	
	// App Properties
	Object.defineProperty(udc.header.prototype, "cartbtn", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("cartbtn");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("cartbtn", newValue, true);
		}
	});
	
	// Register type into the Platform and package
	cpr.core.Platform.INSTANCE.register(internalApp);
})();
/// end - udc.header
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
/// start - udc.recipeListudc
/*
 * UDC Qualified Name: udc.recipeListudc
 * App URI: udc/recipeListudc
 * Source Location: udc/recipeListudc.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function(){
	// App Declaration
		var internalApp = new cpr.core.App("udc/recipeListudc", { 
			onPrepare: function(loader) {
			},
			onCreate: function(/* cpr.core.AppInstance */ app, exports) {
				var linker = {};
				// Start - User Script
				/************************************************
				 * recipeListudc.js
				 * Created at 2023. 8. 9. 오후 2:45:00.
				 *
				 * @author user
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
					app.lookup("img").src = app.getAppProperty("img");
					app.lookup("title").text = app.getAppProperty("title");
					app.lookup("nick").text = app.getAppProperty("nick");
					app.lookup("like").text = app.getAppProperty("like");
					app.lookup("hits").text = app.getAppProperty("hits");
				};
				// End - User Script
				
				// Header
				app.declareAppProperty("img", null);
				app.declareAppProperty("title", null);
				app.declareAppProperty("nick", null);
				app.declareAppProperty("like", null);
				app.declareAppProperty("hits", null);
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
				var image_1 = new cpr.controls.Image("img");
				container.addChild(image_1, {
					"top": "0px",
					"left": "0px",
					"width": "230px",
					"height": "150px"
				});
				
				var output_1 = new cpr.controls.Output("title");
				output_1.value = "Output";
				container.addChild(output_1, {
					"top": "150px",
					"left": "0px",
					"width": "230px",
					"height": "30px"
				});
				
				var output_2 = new cpr.controls.Output("nick");
				output_2.value = "Output";
				container.addChild(output_2, {
					"top": "179px",
					"left": "0px",
					"width": "116px",
					"height": "27px"
				});
				
				var output_3 = new cpr.controls.Output();
				output_3.value = "좋아요";
				container.addChild(output_3, {
					"top": "205px",
					"left": "0px",
					"width": "50px",
					"height": "27px"
				});
				
				var output_4 = new cpr.controls.Output("like");
				output_4.value = "Output";
				container.addChild(output_4, {
					"top": "205px",
					"left": "49px",
					"width": "50px",
					"height": "27px"
				});
				
				var output_5 = new cpr.controls.Output();
				output_5.value = "조회수";
				container.addChild(output_5, {
					"top": "205px",
					"left": "100px",
					"width": "50px",
					"height": "27px"
				});
				
				var output_6 = new cpr.controls.Output("hits");
				output_6.value = "Output";
				container.addChild(output_6, {
					"top": "205px",
					"left": "149px",
					"width": "50px",
					"height": "27px"
				});
				if(typeof onBodyLoad == "function"){
					app.addEventListener("load", onBodyLoad);
				}
			}
		});
	internalApp.title = "recipeListudc";
	
	// Type declaration for recipeListudc
	cpr.utils.Util.ensurePackage("udc").recipeListudc = function(id){
		cpr.controls.UDCBase.call(this, "udc.recipeListudc", internalApp, id);
	};
	
	udc.recipeListudc.prototype = Object.create(cpr.controls.UDCBase.prototype);
	Object.defineProperty(udc.recipeListudc.prototype, "type", {
		get : function(){
			return "udc.recipeListudc";
		},
		
		configurable: true
	});
	
	// App Properties
	Object.defineProperty(udc.recipeListudc.prototype, "img", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("img");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("img", newValue, true);
		}
	});
	Object.defineProperty(udc.recipeListudc.prototype, "title", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("title");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("title", newValue, true);
		}
	});
	Object.defineProperty(udc.recipeListudc.prototype, "nick", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("nick");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("nick", newValue, true);
		}
	});
	Object.defineProperty(udc.recipeListudc.prototype, "like", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("like");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("like", newValue, true);
		}
	});
	Object.defineProperty(udc.recipeListudc.prototype, "hits", {
		get: function(){
			return this.getEmbeddedAppInstance().getAppProperty("hits");
		},
		set: function(newValue){
			return this.getEmbeddedAppInstance().setAppProperty("hits", newValue, true);
		}
	});
	
	// Register type into the Platform and package
	cpr.core.Platform.INSTANCE.register(internalApp);
})();
/// end - udc.recipeListudc
