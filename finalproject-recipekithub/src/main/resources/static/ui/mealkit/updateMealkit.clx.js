/*
 * App URI: mealkit/updateMealkit
 * Source Location: mealkit/updateMealkit.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("mealkit/updateMealkit", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * insertMealkit.js
			 * Created at 2023. 8. 10. 오후 3:23:42.
			 *
			 * @author KOSTA
			 ************************************************/

			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit2(e){
				var sampleThr = e.control;
				var voResourceLoader = new cpr.core.ResourceLoader();
			    voResourceLoader.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js").load().then(function(input) {
			    voResourceLoader.addScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js").load().then(function(input) {
			            loaded = true;
			            app.lookup("sampleThr").redraw();
			        }); 
			    });

				var mealkitName = cpr.core.Platform.INSTANCE.getParameter("mealkitName");	
				var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");	
				var mealkitIngredients = cpr.core.Platform.INSTANCE.getParameter("mealkitIngredients");	
				var mealkitPrice = cpr.core.Platform.INSTANCE.getParameter("mealkitPrice");	
				var mealkitInventory = cpr.core.Platform.INSTANCE.getParameter("mealkitInventory");	
				var mealkitCategory = cpr.core.Platform.INSTANCE.getParameter("mealkitCategory");
				var vsOpt = app.lookup("sampleThr");
				vsOpt.value = $('#summernote').summernote('code');
				//var message = vsOpt.value;
				var dataMap = app.lookup("updateMealkit");	
				dataMap.setValue("mealkitName", mealkitName);
				dataMap.setValue("mealkitInfo", mealkitInfo);
				dataMap.setValue("mealkitIngredients", mealkitIngredients);
				dataMap.setValue("mealkitPrice", mealkitPrice);
				dataMap.setValue("mealkitInventory", mealkitInventory);
				dataMap.setValue("mealkitCategory", mealkitCategory);
				vsOpt.value = dataMap.getValue("mealkitInfo");
				var info = $('#summernote').summernote('code', mealkitInfo); //이거 안 나옴 씨발
				var mealkitInfoInfo = $('#summernote').summernote('insertText', mealkitInfo); // 이것도 안 나옴.
				//console.log("info = " + info);
				//console.log("mealkitInfoInfo = " + mealkitInfoInfo);
				
				var name = app.lookup("ipb1");
				var textArea = app.lookup("ipb2");
				var price = app.lookup("ipb3");
				var inven = app.lookup("ipb4");
				
				name.redraw();
				vsOpt.redraw();
				textArea.redraw();
				price.redraw();
				inven.redraw();

			}



			/*
			 * 쉘에서 load 이벤트 발생 시 호출.
			 * 쉘이 그려진 후 내용을 작성하는 이벤트.
			 */
			function onSampleThrLoad(e){
				/** 
			     * @type cpr.controls.UIControlShell
			     */
			    var sampleThr = e.control;
			    var content = e.content;

			    if (loaded) {
			        sampleThr.registerComponent("Editor", content);

			        //에디터를 넣어줄 div 생성
			        var editorDiv = document.createElement("div")
			        editorDiv.id = "summernote";
			        editorDiv.style.height = "60%";
			        editorDiv.style.width = "80%";

			        //생성한 에디터를 쉘 영역안에 넣어준다.
			        content.appendChild(editorDiv);

			        $('#summernote').summernote({
			            placeholder: '내용을 입력해주세요.',
			            tabsize: 1,
			            height: 200,
			            toolbar: [
			                ['style', ['style']],
			                ['font', ['bold', 'underline', 'clear']],
			                ['color', ['color']],
			                ['para', ['ul', 'ol', 'paragraph']],
			                ['table', ['table']],
			                ['insert', ['link', 'picture', 'video']],
			       
			            ]
			        });
			    }
				
			}


			/*
			 * "등록" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
			//	var vsOpt = app.lookup("sampleThr");
			//  	vsOpt.value = $('#summernote').summernote('code');
			//   	var message = vsOpt.value;
			//   	
			//   	var combo1 = app.lookup("cmb1").text;
			//   	var combo2 = app.lookup("cmb2").text;
			//   	var combo3 = app.lookup("cmb3").text;
			//   	var category = combo1+"/"+combo2+"/"+combo3;
			//   	
			//   	var dataMap = app.lookup("mealkitMap");
			//   	dataMap.setValue("mealkitInfo", message);
			//   	dataMap.setValue("mealkitCategory", category);
			//
			//	console.log("mealkitName = "+ dataMap.getValue("mealkitName"));
			//	console.log("mealkitInfo = "+ dataMap.getValue("mealkitInfo"));
			//	console.log("mealkitIngredients = "+ dataMap.getValue("mealkitIngredients"));
			//	console.log("mealkitPrice = "+ dataMap.getValue("mealkitPrice"));
			//	console.log("mealkitInventory = "+ dataMap.getValue("mealkitInventory"));
			//	console.log("mealkitCategory = "+ dataMap.getValue("mealkitCategory"));
			//	console.log("category = " + category);
			//	var submission = app.lookup("mealkitSub");
			//	submission.send();
			   	
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출. done..
			 * 통신이 성공하면 발생합니다.
			 */
			function onMealkitSubSubmitSuccess(e){
				var mealkitSub = e.control;
				var mealkitNo = mealkitSub.getMetadata("result");
				//var dataMap = app.lookup("mealkitNo");
				//dataMap.setValue("mealkitNo", metadata);
				var url = '/mealkitDetail/'+mealkitNo; //상세 페이지 url
				window.location.href= url;
					
				};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("updateMealkit");
			dataMap_1.parseData({
				"columns" : [
					{"name": "mealkitName"},
					{"name": "mealkitInfo"},
					{"name": "mealkitIngredients"},
					{"name": "mealkitPrice"},
					{"name": "mealkitInventory"},
					{"name": "mealkitCategory"}
				]
			});
			app.register(dataMap_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"color" : "white",
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
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var output_1 = new cpr.controls.Output();
					output_1.value = "밀키트 수정";
					output_1.style.css({
						"color" : "#0CA44E",
						"font-weight" : "bolder",
						"font-size" : "20px",
						"font-style" : "normal"
					});
					container.addChild(output_1, {
						"top": "30px",
						"left": "20px",
						"width": "122px",
						"height": "31px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "39px",
					"width": "864px",
					"height": "81px",
					"left": "calc(50% - 432px)"
				});
				var group_3 = new cpr.controls.Container();
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
				(function(container){
					var output_2 = new cpr.controls.Output();
					output_2.value = "밀키트 이름";
					output_2.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_2, {
						"top": "31px",
						"left": "53px",
						"width": "100px",
						"height": "20px"
					});
					var inputBox_1 = new cpr.controls.InputBox("ipb1");
					inputBox_1.style.css({
						"background-color" : "#F9F9F9"
					});
					inputBox_1.bind("value").toDataMap(app.lookup("updateMealkit"), "mealkitName");
					container.addChild(inputBox_1, {
						"top": "20px",
						"left": "175px",
						"width": "463px",
						"height": "41px"
					});
				})(group_3);
				container.addChild(group_3, {
					"top": "130px",
					"left": "60px",
					"width": "864px",
					"height": "71px"
				});
				var group_4 = new cpr.controls.Container();
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
				(function(container){
					var output_3 = new cpr.controls.Output();
					output_3.value = "밀키트 성분";
					output_3.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_3, {
						"top": "27px",
						"left": "51px",
						"width": "100px",
						"height": "20px"
					});
					var textArea_1 = new cpr.controls.TextArea("ipb2");
					textArea_1.bind("value").toDataMap(app.lookup("updateMealkit"), "mealkitIngredients");
					container.addChild(textArea_1, {
						"top": "9px",
						"left": "173px",
						"width": "654px",
						"height": "55px"
					});
				})(group_4);
				container.addChild(group_4, {
					"top": "234px",
					"left": "60px",
					"width": "864px",
					"height": "71px"
				});
				var group_5 = new cpr.controls.Container();
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
				(function(container){
					var output_4 = new cpr.controls.Output();
					output_4.value = "카테고리";
					output_4.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_4, {
						"top": "8px",
						"left": "48px",
						"width": "100px",
						"height": "20px"
					});
					var comboBox_1 = new cpr.controls.ComboBox("cmb1");
					comboBox_1.style.css({
						"background-color" : "#F9F9F9"
					});
					(function(comboBox_1){
						comboBox_1.addItem(new cpr.controls.Item("밑반찬", "밑반찬"));
						comboBox_1.addItem(new cpr.controls.Item("메인반찬", "메인반찬"));
						comboBox_1.addItem(new cpr.controls.Item("국/탕", "국/탕"));
						comboBox_1.addItem(new cpr.controls.Item("찌개", "찌개"));
						comboBox_1.addItem(new cpr.controls.Item("디저트", "디저트"));
						comboBox_1.addItem(new cpr.controls.Item("면/만두", "면/만두"));
						comboBox_1.addItem(new cpr.controls.Item("밥/죽/떡", "밥/죽/떡"));
						comboBox_1.addItem(new cpr.controls.Item("퓨전", "퓨전"));
						comboBox_1.addItem(new cpr.controls.Item("김차/장류", "김차/장류"));
						comboBox_1.addItem(new cpr.controls.Item("양념/소스/잼", "양념/소스/잼"));
						comboBox_1.addItem(new cpr.controls.Item("양식", "양식"));
						comboBox_1.addItem(new cpr.controls.Item("샐러드", "샐러드"));
						comboBox_1.addItem(new cpr.controls.Item("스프", "스프"));
						comboBox_1.addItem(new cpr.controls.Item("빵", "빵"));
						comboBox_1.addItem(new cpr.controls.Item("차/음료/술", "차/음료/술"));
						comboBox_1.addItem(new cpr.controls.Item("기타", "기타"));
					})(comboBox_1);
					if(typeof onCmb1SelectionChange == "function") {
						comboBox_1.addEventListener("selection-change", onCmb1SelectionChange);
					}
					container.addChild(comboBox_1, {
						"top": "8px",
						"left": "174px",
						"width": "100px",
						"height": "20px"
					});
					var comboBox_2 = new cpr.controls.ComboBox("cmb2");
					comboBox_2.style.css({
						"background-color" : "#F9F9F9"
					});
					(function(comboBox_2){
						comboBox_2.addItem(new cpr.controls.Item("소고기", "소고기"));
						comboBox_2.addItem(new cpr.controls.Item("돼지고기", "돼지고기"));
						comboBox_2.addItem(new cpr.controls.Item("닭고기", "닭고기"));
						comboBox_2.addItem(new cpr.controls.Item("육류", "육류"));
						comboBox_2.addItem(new cpr.controls.Item("채소류", "채소류"));
						comboBox_2.addItem(new cpr.controls.Item("해물류", "해물류"));
						comboBox_2.addItem(new cpr.controls.Item("달걀/유제품", "달걀/유제품"));
						comboBox_2.addItem(new cpr.controls.Item("가공식품류", "가공식품류"));
						comboBox_2.addItem(new cpr.controls.Item("밀가루", "밀가루"));
						comboBox_2.addItem(new cpr.controls.Item("건어물류", "건어물류"));
						comboBox_2.addItem(new cpr.controls.Item("쌀", "쌀"));
						comboBox_2.addItem(new cpr.controls.Item("버섯류", "버섯류"));
						comboBox_2.addItem(new cpr.controls.Item("과일류", "과일류"));
						comboBox_2.addItem(new cpr.controls.Item("콩/견과류", "콩/견과류"));
						comboBox_2.addItem(new cpr.controls.Item("곡류", "곡류"));
						comboBox_2.addItem(new cpr.controls.Item("기타", "기타"));
					})(comboBox_2);
					container.addChild(comboBox_2, {
						"top": "8px",
						"left": "284px",
						"width": "100px",
						"height": "20px"
					});
					var comboBox_3 = new cpr.controls.ComboBox("cmb3");
					comboBox_3.style.css({
						"background-color" : "#F9F9F9"
					});
					(function(comboBox_3){
						comboBox_3.addItem(new cpr.controls.Item("볶음", "value1"));
						comboBox_3.addItem(new cpr.controls.Item("끓이기", "value2"));
						comboBox_3.addItem(new cpr.controls.Item("부침", "value3"));
						comboBox_3.addItem(new cpr.controls.Item("조림", "value4"));
						comboBox_3.addItem(new cpr.controls.Item("무침", "value5"));
						comboBox_3.addItem(new cpr.controls.Item("label2", "value6"));
						comboBox_3.addItem(new cpr.controls.Item("label3", "value7"));
						comboBox_3.addItem(new cpr.controls.Item("label4", "value8"));
						comboBox_3.addItem(new cpr.controls.Item("label5", "value9"));
					})(comboBox_3);
					container.addChild(comboBox_3, {
						"top": "8px",
						"left": "394px",
						"width": "100px",
						"height": "20px"
					});
				})(group_5);
				container.addChild(group_5, {
					"top": "200px",
					"left": "60px",
					"width": "864px",
					"height": "35px"
				});
				var group_6 = new cpr.controls.Container();
				var xYLayout_7 = new cpr.controls.layouts.XYLayout();
				group_6.setLayout(xYLayout_7);
				(function(container){
					var output_5 = new cpr.controls.Output();
					output_5.value = "가격";
					output_5.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_5, {
						"top": "20px",
						"left": "46px",
						"width": "100px",
						"height": "20px"
					});
					var output_6 = new cpr.controls.Output();
					output_6.value = "남은 수량";
					output_6.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_6, {
						"top": "20px",
						"left": "392px",
						"width": "100px",
						"height": "20px"
					});
					var inputBox_2 = new cpr.controls.InputBox("ipb3");
					inputBox_2.style.css({
						"background-color" : "#F9F9F9"
					});
					inputBox_2.bind("value").toDataMap(app.lookup("updateMealkit"), "mealkitPrice");
					container.addChild(inputBox_2, {
						"top": "20px",
						"left": "176px",
						"width": "165px",
						"height": "20px"
					});
					var inputBox_3 = new cpr.controls.InputBox("ipb4");
					inputBox_3.style.css({
						"background-color" : "#F9F9F9"
					});
					inputBox_3.bind("value").toDataMap(app.lookup("updateMealkit"), "mealkitInventory");
					container.addChild(inputBox_3, {
						"top": "20px",
						"left": "512px",
						"width": "165px",
						"height": "20px"
					});
				})(group_6);
				container.addChild(group_6, {
					"top": "599px",
					"left": "60px",
					"width": "864px",
					"height": "50px"
				});
				var group_7 = new cpr.controls.Container();
				var xYLayout_8 = new cpr.controls.layouts.XYLayout();
				group_7.setLayout(xYLayout_8);
				(function(container){
					var output_7 = new cpr.controls.Output();
					output_7.value = "밀키트 소개";
					output_7.style.css({
						"color" : "#0CA44E",
						"font-size" : "15px",
						"text-align" : "center"
					});
					container.addChild(output_7, {
						"top": "46px",
						"left": "54px",
						"width": "100px",
						"height": "20px"
					});
					var uIControlShell_1 = new cpr.controls.UIControlShell("sampleThr");
					if(typeof onSampleThrLoad == "function") {
						uIControlShell_1.addEventListener("load", onSampleThrLoad);
					}
					container.addChild(uIControlShell_1, {
						"top": "8px",
						"left": "174px",
						"width": "647px",
						"height": "267px"
					});
				})(group_7);
				container.addChild(group_7, {
					"top": "315px",
					"left": "60px",
					"width": "864px",
					"height": "285px"
				});
				var button_1 = new cpr.controls.Button();
				button_1.value = "등록";
				button_1.style.setClasses([".cl-button", "mealkitbtn"]);
				button_1.style.css({
					"background-color" : "#0ca44e",
					"color" : "white",
					"font-size" : "17px",
					"background-image" : "none"
				});
				if(typeof onButtonClick2 == "function") {
					button_1.addEventListener("click", onButtonClick2);
				}
				container.addChild(button_1, {
					"top": "670px",
					"left": "357px",
					"width": "104px",
					"height": "34px"
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "취소";
				button_2.style.setClasses([".cl-button", "mealkitbtn"]);
				button_2.style.css({
					"background-color" : "#0ca44e",
					"color" : "white",
					"font-size" : "17px",
					"background-image" : "none"
				});
				container.addChild(button_2, {
					"top": "670px",
					"left": "471px",
					"width": "111px",
					"height": "34px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"bottom": "20px",
				"width": "984px",
				"left": "calc(50% - 492px)"
			});
			if(typeof onBodyInit2 == "function"){
				app.addEventListener("init", onBodyInit2);
			}
		}
	});
	app.title = "updateMealkit";
	cpr.core.Platform.INSTANCE.register(app);
})();
