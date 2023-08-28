/*
 * App URI: member/myPage
 * Source Location: member/myPage.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/myPage", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/controls/htmlobject.css");
			loader.addCSS("theme/custom-theme.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * myPage.js
			 * Created at 2023. 8. 10. 오후 10:24:26.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				var vcEmb = app.lookup("ea1");
				cpr.core.App.load("embedded/myPageRecipeLike", function(/*cpr.core.App*/ loadedApp){
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
				
				var submission = app.lookup("sub_profile");
				submission.send();
				
				app.lookup("nav1").selectItemByValue(1);
			}

			/*
			 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
			 * 아이템 클릭시 발생하는 이벤트.
			 */
			function onNav1ItemClick(e){
				var nav1 = e.control;
				var src = null;
				if(nav1.value == '4'){ // QnA 게시판
					src = "embedded/myPageQuestion";
				}else if(nav1.value == '2'){
					src = "embedded/myPagePaymentInfo";
				}else if(nav1.value == '3'){
					src = "embedded/myPageMealkitLike";
				}else if(nav1.value == '1'){
					src = "embedded/myPageRecipeLike";
				}
				var vcEmb = app.lookup("ea1");
				cpr.core.App.load(src, function(/*cpr.core.App*/ loadedApp){
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
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_profileSubmitSuccess(e){
				var sub_profile = e.control;
				var dsProfile = app.lookup("ds_profile");
				app.lookup("opbEmail").text = dsProfile.getValue(0, "memberEmail");
				app.lookup("opbNick").text = dsProfile.getValue(0, "memberNick");
				app.lookup("profileImg").src = "/upload/profile/" + dsProfile.getValue(0, "memberImage");
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("navval");
			dataSet_1.parseData({
				"columns": [
					{"name": "label"},
					{"name": "value"}
				],
				"rows": [
					{"label": "레시피", "value": "1"},
					{"label": "구매내역", "value": "2"},
					{"label": "좋아요", "value": "3"}
				]
			});
			app.register(dataSet_1);
			
			var dataSet_2 = new cpr.data.DataSet("ds_profile");
			dataSet_2.parseData({
				"columns" : [
					{
						"name": "memberEmail",
						"dataType": "string"
					},
					{
						"name": "memberNick",
						"dataType": "string"
					},
					{
						"name": "memberImage",
						"dataType": "string"
					}
				]
			});
			app.register(dataSet_2);
			var submission_1 = new cpr.protocols.Submission("sub_profile");
			submission_1.action = "/member/profileInfo";
			submission_1.addResponseData(dataSet_2, false);
			if(typeof onSub_profileSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSub_profileSubmitSuccess);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1920px)", "new-screen");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1919px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			verticalLayout_1.distribution = "center";
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#f4faec"
				});
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_2);
				(function(container){
					var group_3 = new cpr.controls.Container();
					group_3.style.css({
						"background-size" : "cover",
						"background-image" : "url('theme/images/common/bgimgfinal.png')",
						"background-position" : "center"
					});
					var xYLayout_3 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_3);
					container.addChild(group_3, {
						"top": "199px",
						"left": "0px",
						"width": "1920px",
						"height": "775px"
					});
					var group_4 = new cpr.controls.Container();
					group_4.style.css({
						"text-align" : "center"
					});
					var xYLayout_4 = new cpr.controls.layouts.XYLayout();
					group_4.setLayout(xYLayout_4);
					(function(container){
						var group_5 = new cpr.controls.Container();
						var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
						group_5.setLayout(verticalLayout_2);
						(function(container){
							var embeddedApp_1 = new cpr.controls.EmbeddedApp("ea1");
							embeddedApp_1.style.css({
								"border-right-style" : "solid",
								"border-bottom-color" : "#dddddd",
								"border-top-width" : "1px",
								"border-right-width" : "1px",
								"border-left-color" : "#dddddd",
								"border-right-color" : "#dddddd",
								"border-left-width" : "1px",
								"border-top-style" : "solid",
								"border-radius" : "0px 0px 20px 20px",
								"border-left-style" : "solid",
								"border-bottom-width" : "1px",
								"border-top-color" : "#dddddd",
								"border-bottom-style" : "solid"
							});
							cpr.core.App.load("embedded/myPageRecipeLike", function(app) {
								if(app){
									embeddedApp_1.app = app;
								}
							});
							container.addChild(embeddedApp_1, {
								"autoSize": "height",
								"width": "714px",
								"height": "701px"
							});
						})(group_5);
						container.addChild(group_5, {
							"top": "39px",
							"right": "516px",
							"bottom": "0px",
							"left": "0px"
						});
						var navigationBar_1 = new cpr.controls.NavigationBar("nav1");
						navigationBar_1.menuType = "fullmenu";
						navigationBar_1.expandTrigger = "click";
						navigationBar_1.barItemWidths = "equal";
						navigationBar_1.style.setClasses(["cl-navigationbar", "my-navi"]);
						navigationBar_1.style.css({
							"border-radius" : "20px 20px 0px 0px",
							"border-right-style" : "solid",
							"border-bottom-color" : "#FFFFFF",
							"color" : "#0ebc59",
							"font-weight" : "bold",
							"border-left-style" : "solid",
							"border-left-color" : "#dddddd",
							"border-bottom-width" : "0px",
							"border-top-color" : "#dddddd",
							"border-right-color" : "#dddddd",
							"border-top-style" : "solid"
						});
						(function(navigationBar_1){
							navigationBar_1.addItem(new cpr.controls.MenuItem("레시피", "1", null));
							navigationBar_1.addItem(new cpr.controls.MenuItem("구매내역", "2", null));
							navigationBar_1.addItem(new cpr.controls.MenuItem("밀키트찜", "3", null));
							navigationBar_1.addItem(new cpr.controls.MenuItem("문의하기", "4", null));
						})(navigationBar_1);
						if(typeof onNav1ItemClick == "function") {
							navigationBar_1.addEventListener("item-click", onNav1ItemClick);
						}
						container.addChild(navigationBar_1, {
							"top": "0px",
							"right": "830px",
							"left": "0px",
							"height": "40px"
						});
						var group_6 = new cpr.controls.Container();
						group_6.style.css({
							"border-radius" : "50px",
							"background-color" : "#14974C"
						});
						var xYLayout_5 = new cpr.controls.layouts.XYLayout();
						group_6.setLayout(xYLayout_5);
						(function(container){
							var group_7 = new cpr.controls.Container();
							group_7.style.css({
								"background-color" : "#FFFFFF",
								"border-radius" : "40px"
							});
							var xYLayout_6 = new cpr.controls.layouts.XYLayout();
							group_7.setLayout(xYLayout_6);
							(function(container){
								var group_8 = new cpr.controls.Container();
								group_8.style.css({
									"border-radius" : "40px 40px 0px 0px",
									"background-size" : "cover",
									"background-image" : "url('theme/images/member/2.png')",
									"background-position" : "center"
								});
								var xYLayout_7 = new cpr.controls.layouts.XYLayout();
								group_8.setLayout(xYLayout_7);
								container.addChild(group_8, {
									"top": "0px",
									"right": "0px",
									"left": "0px",
									"height": "150px"
								});
								var group_9 = new cpr.controls.Container();
								var xYLayout_8 = new cpr.controls.layouts.XYLayout();
								group_9.setLayout(xYLayout_8);
								container.addChild(group_9, {
									"right": "0px",
									"bottom": "0px",
									"left": "0px",
									"height": "200px"
								});
							})(group_7);
							container.addChild(group_7, {
								"top": "10px",
								"right": "10px",
								"width": "380px",
								"height": "330px"
							});
						})(group_6);
						container.addChild(group_6, {
							"top": "41px",
							"right": "36px",
							"width": "400px",
							"height": "350px"
						});
						var group_10 = new cpr.controls.Container();
						var formLayout_1 = new cpr.controls.layouts.FormLayout();
						formLayout_1.scrollable = false;
						formLayout_1.topMargin = "0px";
						formLayout_1.rightMargin = "0px";
						formLayout_1.bottomMargin = "0px";
						formLayout_1.leftMargin = "0px";
						formLayout_1.horizontalSpacing = "0px";
						formLayout_1.verticalSpacing = "0px";
						formLayout_1.setColumns(["1fr", "150px", "1fr"]);
						formLayout_1.setRows(["50px", "150px", "1fr"]);
						group_10.setLayout(formLayout_1);
						(function(container){
							var group_11 = new cpr.controls.Container();
							var xYLayout_9 = new cpr.controls.layouts.XYLayout();
							group_11.setLayout(xYLayout_9);
							(function(container){
								var image_1 = new cpr.controls.Image("profileImg");
								image_1.fallbackSrc = "theme/images/icon/chefimg.png";
								image_1.style.css({
									"border-radius" : "100px"
								});
								image_1.bind("src").toDataSet(app.lookup("ds_profile"), "memberImage", 0);
								container.addChild(image_1, {
									"top": "0px",
									"right": "0px",
									"bottom": "0px",
									"left": "0px"
								});
							})(group_11);
							container.addChild(group_11, {
								"colIndex": 1,
								"rowIndex": 1
							});
							var group_12 = new cpr.controls.Container();
							var formLayout_2 = new cpr.controls.layouts.FormLayout();
							formLayout_2.scrollable = false;
							formLayout_2.topMargin = "10px";
							formLayout_2.rightMargin = "10px";
							formLayout_2.bottomMargin = "10px";
							formLayout_2.leftMargin = "10px";
							formLayout_2.horizontalSpacing = "20px";
							formLayout_2.verticalSpacing = "10px";
							formLayout_2.setColumns(["1fr", "1fr"]);
							formLayout_2.setRows(["50px", "50px"]);
							group_12.setLayout(formLayout_2);
							(function(container){
								var output_1 = new cpr.controls.Output("opbNick");
								output_1.style.css({
									"color" : "#EC631D",
									"font-weight" : "bolder",
									"font-size" : "30px",
									"text-align" : "center"
								});
								output_1.bind("value").toDataSet(app.lookup("ds_profile"), "memberNick", 0);
								container.addChild(output_1, {
									"colIndex": 0,
									"rowIndex": 0,
									"colSpan": 2,
									"rowSpan": 1
								});
								var output_2 = new cpr.controls.Output("opbEmail");
								output_2.style.css({
									"font-weight" : "bolder",
									"font-size" : "24px",
									"text-align" : "center"
								});
								output_2.bind("value").toDataSet(app.lookup("ds_profile"), "memberEmail", 0);
								container.addChild(output_2, {
									"colIndex": 0,
									"rowIndex": 1,
									"colSpan": 2,
									"rowSpan": 1
								});
							})(group_12);
							container.addChild(group_12, {
								"colIndex": 0,
								"rowIndex": 2,
								"colSpan": 3,
								"rowSpan": 1
							});
						})(group_10);
						container.addChild(group_10, {
							"top": "50px",
							"right": "45px",
							"width": "380px",
							"height": "330px"
						});
					})(group_4);
					container.addChild(group_4, {
						"top": "210px",
						"bottom": "100px",
						"width": "1230px",
						"left": "calc(50% - 615px)"
					});
					var userDefinedControl_1 = new udc.footer();
					container.addChild(userDefinedControl_1, {
						"top": "973px",
						"bottom": "0px",
						"width": "1920px",
						"left": "calc(50% - 960px)"
					});
					var userDefinedControl_2 = new udc.myPageHeader();
					container.addChild(userDefinedControl_2, {
						"top": "0px",
						"left": "0px",
						"width": "1920px",
						"height": "200px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "0px",
					"right": "0px",
					"bottom": "0px",
					"left": "0px"
				});
			})(group_1);
			container.addChild(group_1, {
				"width": "1920px",
				"height": "1080px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "myPage";
	cpr.core.Platform.INSTANCE.register(app);
})();
