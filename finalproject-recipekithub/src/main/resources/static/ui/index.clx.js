/*
 * App URI: index
 * Source Location: index.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("index", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/controls/htmlobject.css");
			loader.addCSS("theme/custom-theme.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * index.js
			 * Created at 2023. 8. 7. 오후 1:57:31.
			 *
			 * @author user
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
			//	console.log(getSessionStorage("memsession"));
				var vcEmb = app.lookup("ea1");
				cpr.core.App.load("embedded/dynamic-img", function(/*cpr.core.App*/ loadedApp){
					/*임베디드앱에 안에 앱이 있는 경우에는 앱을 삭제해줍니다.(다시 앱을 열고싶을때 스크립트 작성)*/
					if(vcEmb.getEmbeddedAppInstance()){
						vcEmb.getEmbeddedAppInstance().dispose();
					}
					/*로드된 앱이 있는 경우에는 임베디드앱 안에 불러온 앱을 넣습니다.*/
					if(loadedApp){						
						/*초기값을 전달합니다.*/			
						vcEmb.ready(function(/*cpr.controls.EmbeddedApp*/embApp){
			//				embApp.initValue = voInitValue;
						})
						/*임베디드 앱에 내장할 앱을 로드하여 설정합니다*/
						vcEmb.app = loadedApp;
					}
				}); 
				app.lookup("ea1").redraw();
			}
			
			/*
			 * 이미지에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onImageClick(e){
				var image = e.control;
				window.scrollTo(0,0);
			};
			// End - User Script
			
			// Header
			var submission_1 = new cpr.protocols.Submission("find");
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1920px)", "FHD");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1919px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#F4FAEC",
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
				var userDefinedControl_1 = linker.userDefinedControl_1 = new udc.header3();
				container.addChild(userDefinedControl_1, {
					"top": "0px",
					"left": "0px",
					"width": "1920px",
					"height": "200px"
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#F4FAEC",
					"background-size" : "cover",
					"background-image" : "url('theme/images/common/bgimg10.png')",
					"background-position" : "center"
				});
				var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
				group_2.setLayout(responsiveXYLayout_1);
				(function(container){
					var embeddedApp_1 = linker.embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
					container.addChild(embeddedApp_1, {
						positions: [
							{
								"media": "all and (min-width: 1920px)",
								"right": "20px",
								"left": "20px",
								"height": "720px",
								"top": "calc(50% - 360px)"
							}, 
							{
								"media": "all and (min-width: 1024px) and (max-width: 1919px)",
								"right": "20px",
								"left": "20px",
								"height": "720px",
								"top": "calc(50% - 360px)"
							}, 
							{
								"media": "all and (min-width: 500px) and (max-width: 1023px)",
								"right": "10px",
								"left": "10px",
								"height": "720px",
								"top": "calc(50% - 360px)"
							}, 
							{
								"media": "all and (max-width: 499px)",
								"right": "7px",
								"left": "7px",
								"height": "720px",
								"top": "calc(50% - 360px)"
							}
						]
					});
					var group_3 = new cpr.controls.Container();
					var formLayout_1 = new cpr.controls.layouts.FormLayout();
					formLayout_1.scrollable = false;
					formLayout_1.topMargin = "0px";
					formLayout_1.rightMargin = "0px";
					formLayout_1.bottomMargin = "0px";
					formLayout_1.leftMargin = "0px";
					formLayout_1.horizontalSpacing = "0px";
					formLayout_1.verticalSpacing = "0px";
					formLayout_1.setColumns(["1fr"]);
					formLayout_1.setRows(["1fr"]);
					group_3.setLayout(formLayout_1);
					(function(container){
						var image_1 = new cpr.controls.Image();
						image_1.src = "theme/images/pivot/field/arrow-up-circle.svg";
						if(typeof onImageClick == "function") {
							image_1.addEventListener("click", onImageClick);
						}
						container.addChild(image_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_3);
					container.addChild(group_3, {
						positions: [
							{
								"media": "all and (min-width: 1920px)",
								"right": "20px",
								"bottom": "0px",
								"width": "30px",
								"height": "30px"
							}, 
							{
								"media": "all and (min-width: 1024px) and (max-width: 1919px)",
								"right": "20px",
								"bottom": "0px",
								"width": "30px",
								"height": "30px"
							}, 
							{
								"media": "all and (min-width: 500px) and (max-width: 1023px)",
								"right": "10px",
								"bottom": "0px",
								"width": "15px",
								"height": "30px"
							}, 
							{
								"media": "all and (max-width: 499px)",
								"right": "7px",
								"bottom": "0px",
								"width": "10px",
								"height": "30px"
							}
						]
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "205px",
					"left": "0px",
					"width": "1920px",
					"height": "780px"
				});
				var userDefinedControl_2 = new udc.footer();
				container.addChild(userDefinedControl_2, {
					"top": "990px",
					"left": "0px",
					"width": "1920px",
					"height": "100px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "1920px",
				"height": "1090px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
			// Linking
			linker.userDefinedControl_1.embe = linker.embeddedApp_1;
		}
	});
	app.title = "index";
	cpr.core.Platform.INSTANCE.register(app);
})();
