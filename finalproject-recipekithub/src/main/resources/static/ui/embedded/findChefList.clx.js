/*
 * App URI: embedded/findChefList
 * Source Location: embedded/findChefList.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("embedded/findChefList", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/custom/member.part.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * findChefList.js
			 * Created at 2023. 8. 21. 오후 10:52:06.
			 *
			 * @author shj22k
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("subcheflist").send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSubcheflistSubmitSuccess(e){
				var subcheflist = e.control;
				var xhr = subcheflist.xhr;
				var jsonData = JSON.parse(xhr.responseText);
				var chefList = jsonData.chefList;
				
				var container = app.lookup("grp");
				container.removeAllChildren();
				
				for (var i = 0; i < chefList.length; i++) {
					(function(index) {
						//udc 동적 생성
						var chef = new udc.chefListudc();
						chef.style.css({
							"paddingLeft":"30px",
							"padding-right":"30px",
							"padding-bottom":"30px",
							"padding-top":"30px"
						});
						//udc에서 출판한 이미지 경로 앱 속성 지정
						if(chefList[i].memberImage == null || chefList[i].memberImage == ''){
							chef.memberImage = "theme/images/icon/chefimg.png";
						}else{
							chef.memberImage = "/upload/profile/" + chefList[i].memberImage;
						}
						chef.memberNick = chefList[i].memberNick;
						chef.memberEmail = chefList[i].memberEmail;
						chef.rank = i+1;
						container.addChild(chef, {
							height: "215px",
							width: "180px",
							autoSize: "none"
						});
						chef.addEventListener("memberImageClick", function(e) {
							var host = app.getHost(); // 부모 임베디드 앱
							var initvalue = {
								"memberEmail":chefList[index].memberEmail,
								"memberNick":chefList[index].memberNick,
								"memberImage":"/upload/profile/"+chefList[index].mealkitImage
							};
							cpr.core.App.load("embedded/chefRecipeList", function(loadedApp){
								if (loadedApp){
									host.initValue = initvalue;
									host.app = loadedApp;
								}
							});
						});
					})(i);
				}
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("chefList");
			dataSet_1.parseData({
				"columns" : [
					{"name": "memberEmail"},
					{"name": "memberName"},
					{"name": "memberNick"},
					{"name": "memberImage"},
					{
						"name": "recipeCount",
						"dataType": "number"
					}
				]
			});
			app.register(dataSet_1);
			var submission_1 = new cpr.protocols.Submission("subcheflist");
			submission_1.action = "/findChefListByRecipe";
			if(typeof onSubcheflistSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSubcheflistSubmitSuccess);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1880px)", "new-screen");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1879px)", "default");
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
			group_1.style.css({
				"border-right-style" : "solid",
				"border-bottom-color" : "#e4e4e4",
				"border-top-width" : "1px",
				"border-right-width" : "1px",
				"border-left-color" : "#e4e4e4",
				"border-right-color" : "#e4e4e4",
				"border-left-width" : "1px",
				"border-top-style" : "solid",
				"background-color" : "#FFFFFF",
				"border-left-style" : "solid",
				"border-bottom-width" : "1px",
				"border-top-color" : "#e4e4e4",
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
			formLayout_1.setColumns(["60px", "280px", "150px", "120px", "1fr"]);
			formLayout_1.setRows(["20px", "80px", "50px", "1fr"]);
			group_1.setLayout(formLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container("grp");
				var flowLayout_1 = new cpr.controls.layouts.FlowLayout();
				group_2.setLayout(flowLayout_1);
				container.addChild(group_2, {
					"colIndex": 1,
					"rowIndex": 3,
					"colSpan": 4,
					"rowSpan": 1
				});
				var image_1 = new cpr.controls.Image();
				image_1.src = "theme/images/icon/ranking.png";
				container.addChild(image_1, {
					"colIndex": 2,
					"rowIndex": 1,
					"horizontalAlign": "center",
					"verticalAlign": "center",
					"width": 80,
					"height": 80
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
				formLayout_2.setColumns(["110px"]);
				formLayout_2.setRows(["20px", "1fr", "20px"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "쉐프 랭킹";
					output_1.style.setClasses(["emphasis"]);
					output_1.style.css({
						"background-color" : "#FFFFFF",
						"color" : "#0a8c43",
						"font-weight" : "bold",
						"font-size" : "25px"
					});
					container.addChild(output_1, {
						"colIndex": 0,
						"rowIndex": 1
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 3,
					"rowIndex": 1
				});
			})(group_1);
			container.addChild(group_1, {
				"autoSize": "height",
				"width": "880px",
				"height": "680px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "findChefList";
	cpr.core.Platform.INSTANCE.register(app);
})();
