/*
 * App URI: mealkit/updateMealkit
 * Source Location: mealkit/updateMealkit.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("mealkit/updateMealkit", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/custom-theme.css");
			loader.addCSS("theme/custom/member.part.css");
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
			//세션
			function getTimedSessionData(key) {
				var storedData = sessionStorage.getItem(key);
				
				if (storedData) {
					var data = JSON.parse(storedData);
					var currentTime = new Date().getTime();
					
					if (currentTime < data.expirationTime) {
						return data.value;
					} else {
						sessionStorage.removeItem(key);
					}
				}
				return null;
			}

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
				var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");

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
			        $("#summernote").summernote('code', mealkitInfo);
			    }
			}


			/*
			 * "등록" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				var vsOpt = app.lookup("sampleThr");
				var dataMap = app.lookup("updateMealkit");	
			  	vsOpt.value = $('#summernote').summernote('code');
			   	var message = vsOpt.value;
			   	var submission = app.lookup("updateMealkitSub");
			   	
			   	var name = app.lookup("ipb1");
			   	var ingredients = app.lookup("ipb2");
			   	var price = app.lookup("ipb3");
			   	var inven = app.lookup("ipb4");
			   	var updatedIngredients= ingredients.value;
			   	var updatedName = name.value;
			   	var updatedPrice = price.value;
			   	var updatedInven = inven.value;
			   	console.log("updatedPrice, updatedInven = " + updatedPrice + ", "+ updatedInven);
			   	console.log("price = "+ price.value +", " + typeof Number(price.value));
			   	
			   	var fileInput = app.lookup("file2");
				var file = fileInput.file;
				var img = app.lookup("updateImg");
				//alert("이미지 file = " + file);
			   	
			   	var combo1 = app.lookup("cmb1").text;
			   	var combo2 = app.lookup("cmb2").text;
			   	var combo3 = app.lookup("cmb3").text;
			   	var type = app.lookup("type").text;
			   	var category = combo1+"/"+combo2+"/"+combo3;
			   	
				dataMap.setValue("mealkitName", updatedName);
				dataMap.setValue("mealkitInfo", message);
				dataMap.setValue("mealkitIngredients", updatedIngredients);
				dataMap.setValue("mealkitPrice", updatedPrice);
				dataMap.setValue("mealkitInventory", updatedInven);
				dataMap.setValue("mealkitCategory", category);
				dataMap.setValue("mealkitType", type);
				var fileInput = app.lookup("file2");
				var file = fileInput.file;
				var image = app.lookup("updateImg");
				
				if (name.value == null || name.value.trim().length == 0) {
					alert("밀키트 이름을 입력해주세요.");
					name.focus();
					return;
				} else if (combo1.length == 0 || combo2.length == 0 || combo3.length == 0) {
					alert("카테고리를 반드시 선택해주세요.");
					return;
				} else if (ingredients.value == null || ingredients.value.trim().length == 0) {
					alert("밀키트 성분을 입력해주세요.");
					ingredients.focus();
					return;
				} else if (message == null || message.trim().length == 0) {
					alert("밀키트 정보를 입력해주세요.");
					console.log("왜 안 먹지?");
					//e.preventDefault();
					return;
				} else if (price.value == null || price.value == "") {
					alert("밀키트 가격을 입력해주세요.");
					price.focus();
					return;
					
				} else if (inven.value == null || inven.value == "") {
					alert("밀키트 수량을 입력해주세요.");
					inven.focus();
					return;
				} else if (type == null || type == "") {
					alert("타입을 반드시 선택해주세요.");
					return;
				}else{
			 		var initValue = {
						"msg": "밀키트를 수정하시겠습니까?"
					}
					app.openDialog("dialog/recipeCheck", {
						width: 300, height: 200, headerClose: true
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
							dialogApp.initValue = initValue;
						});
					}).then(function(returnValue) {
						if (returnValue == true) {
							submission.addFileParameter("image", file);
							app.lookup("updateMealkitSub").send();
						}
					});
			 	}			
			}

			/*
			 * "취소" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				var mealkitNo = cpr.core.Platform.INSTANCE.getParameter("mealkitNo");
				var initValue = {
					"msg": "변경된 사항은 변경되지 않습니다.\n취소하시겠습니까?"
				}
				app.openDialog("dialog/recipeCheck", {
					width: 400, height: 300, headerClose: true
				}, function(dialog) {
					dialog.ready(function(dialogApp) {
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
						dialogApp.initValue = initValue;
					});
				}).then(function(returnValue) {
					if (returnValue == true) {
						window.location.href= "/mealkitDetail/"+mealkitNo;
					}
				});
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onUpdateMealkitSubSubmitSuccess(e){
				var updateMealkitSub = e.control;
				var mealkitNo = updateMealkitSub.getMetadata("result");
				alert("밀키트가 수정되었습니다.");
				var url = '/mealkitDetail/'+mealkitNo; //상세 페이지 url
				window.location.href= url;
			}

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				var mealkitNo = cpr.core.Platform.INSTANCE.getParameter("mealkitNo");
				var mealkitName = cpr.core.Platform.INSTANCE.getParameter("mealkitName");	
				var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");	
				var mealkitIngredients = cpr.core.Platform.INSTANCE.getParameter("mealkitIngredients");	
				var mealkitPrice = cpr.core.Platform.INSTANCE.getParameter("mealkitPrice");	
				var mealkitInventory = cpr.core.Platform.INSTANCE.getParameter("mealkitInventory");	
				var mealkitCategory = cpr.core.Platform.INSTANCE.getParameter("mealkitCategory");
				var mealkitMember = cpr.core.Platform.INSTANCE.getParameter("mealkitMember");
				var mealkitImg = cpr.core.Platform.INSTANCE.getParameter("mealkitImg");
				console.log("mealkitImg = " + mealkitImg);
				
				var vsOpt = app.lookup("sampleThr");
				vsOpt.value = $('#summernote').summernote('code');
				//var message = vsOpt.value;
				var dataMap = app.lookup("updateMealkit");	
				dataMap.setValue("mealkitNo", mealkitNo);
				dataMap.setValue("mealkitName", mealkitName);
				dataMap.setValue("mealkitInfo", mealkitInfo);
				dataMap.setValue("mealkitIngredients", mealkitIngredients);
				dataMap.setValue("mealkitPrice", mealkitPrice);
				dataMap.setValue("mealkitInventory", mealkitInventory);
				dataMap.setValue("mealkitCategory", mealkitCategory);
				dataMap.setValue("mealkitMember", mealkitMember);
				dataMap.setValue("mealkitImg", mealkitImg);
				
				var  uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\_/i;
				app.lookup("updateImg").src = "/upload/mealkit/"+mealkitImg;
				
				var fileInput = app.lookup("file2");
				var name = app.lookup("ipb1");
				var textArea = app.lookup("ipb2");
				var price = app.lookup("ipb3");
				var inven = app.lookup("ipb4");
				
				// 파일인풋에 이름만 넣기 
				var  orgFileName = mealkitImg.replace(uuid, "");
				fileInput.value=orgFileName;
				
				name.redraw();
				vsOpt.redraw();
				textArea.redraw();
				price.redraw();
				inven.redraw();
			}

			/*
			 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
			 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
			 */
			function onFile2ValueChange(e){
				var file2 = e.control;
				var image = app.lookup("updateImg");
				var fileInput = app.lookup("file2");
				//이미지 파일 아닌 걸 넣었을 때 
				if (fileInput.files && fileInput.files[0]) {
					var reader = new FileReader();
					reader.onload = function(e) {
						image.src = e.target.result;
					};
					reader.readAsDataURL(fileInput.files[0]);
				}
			}

			/*
			 * "X" 버튼(deleteImgBtn)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onDeleteImgBtnClick(e){
				var deleteImgBtn = e.control;
				var fileInput = app.lookup("file2");
				var image = app.lookup("updateImg");
				if(confirm("사진을 삭제하시겠습니까?")){
					fileInput.clear();
					image.src = "";
				}
			}

			/*
			 * 이미지에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onImageClick(e){
				var image = e.control;
				var dataMap = app.lookup("updateMealkit");
				var mealkitNo = dataMap.getValue("mealkitNo");
				var mealkitMember = dataMap.getValue("mealkitMember");
				var sessionId = getTimedSessionData("memsession");
				var initValue = "해당 게시물을 삭제하시겠습니까?";
					
				app.openDialog("dialog/memberPopup", {
					width: 400, height: 300, headerClose: true
				}, function(dialog) {
					dialog.ready(function(dialogApp) {
						// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
						dialogApp.initValue = initValue;
					});
				}).then(function(returnValue) {
					if (returnValue == true) {
						var HttpPostMethod = new cpr.protocols.HttpPostMethod("/deleteMealkit/"+mealkitNo);
						HttpPostMethod.submit();
					}
				});
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds1");
			dataSet_1.parseData({});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("updateMealkit");
			dataMap_1.parseData({
				"columns" : [
					{"name": "mealkitNo"},
					{"name": "mealkitName"},
					{"name": "mealkitInfo"},
					{"name": "mealkitIngredients"},
					{"name": "mealkitPrice"},
					{"name": "mealkitInventory"},
					{"name": "mealkitCategory"},
					{"name": "mealkitMember"},
					{"name": "mealkitImg"},
					{"name": "mealkitType"}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("sendUpdatedMealkit");
			dataMap_2.parseData({
				"columns" : [
					{"name": "mealkitNo"},
					{"name": "mealkitName"},
					{"name": "mealkitInfo"},
					{"name": "mealkitPrice"},
					{"name": "mealkitInventory"},
					{"name": "mealkitCategory"},
					{"name": "mealkitIngredients"}
				]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("returnMealkitNo");
			dataMap_3.parseData({
				"columns" : [{
					"name": "mealkitNo",
					"dataType": "number"
				}]
			});
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("updateMealkitSub");
			submission_1.action = "/updateMealkit";
			submission_1.addRequestData(dataMap_1);
			submission_1.addResponseData(dataMap_3, false);
			if(typeof onUpdateMealkitSubSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onUpdateMealkitSubSubmitSuccess);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#F4FAEC",
				"color" : "white",
				"font-family" : "푸른전남 Medium",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-size" : "cover",
				"background-image" : "url('theme/images/common/bgimg1880_720.png')",
				"background-position" : "center"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			container.addChild(group_1, {
				"top": "205px",
				"right": "0px",
				"left": "0px",
				"height": "980px"
			});
			
			var userDefinedControl_1 = new udc.header3();
			container.addChild(userDefinedControl_1, {
				"top": "0px",
				"right": "0px",
				"left": "0px",
				"height": "205px"
			});
			
			var userDefinedControl_2 = new udc.footer();
			container.addChild(userDefinedControl_2, {
				"top": "1178px",
				"left": "0px",
				"width": "1920px",
				"height": "100px"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.css({
				"background-color" : "#FFFFFF",
				"border-radius" : "20px"
			});
			var xYLayout_3 = new cpr.controls.layouts.XYLayout();
			group_2.setLayout(xYLayout_3);
			(function(container){
				var group_3 = new cpr.controls.Container();
				group_3.style.css({
					"background-color" : "#F9F9F9"
				});
				var xYLayout_4 = new cpr.controls.layouts.XYLayout();
				group_3.setLayout(xYLayout_4);
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
				})(group_3);
				container.addChild(group_3, {
					"top": "39px",
					"width": "864px",
					"height": "81px",
					"left": "calc(50% - 432px)"
				});
				var group_4 = new cpr.controls.Container();
				var xYLayout_5 = new cpr.controls.layouts.XYLayout();
				group_4.setLayout(xYLayout_5);
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
				})(group_4);
				container.addChild(group_4, {
					"top": "130px",
					"left": "60px",
					"width": "864px",
					"height": "71px"
				});
				var group_5 = new cpr.controls.Container();
				var xYLayout_6 = new cpr.controls.layouts.XYLayout();
				group_5.setLayout(xYLayout_6);
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
				})(group_5);
				container.addChild(group_5, {
					"top": "234px",
					"left": "60px",
					"width": "864px",
					"height": "71px"
				});
				var group_6 = new cpr.controls.Container();
				var xYLayout_7 = new cpr.controls.layouts.XYLayout();
				group_6.setLayout(xYLayout_7);
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
					comboBox_1.placeholder = "-종류-";
					comboBox_1.style.css({
						"background-color" : "#F9F9F9",
						"text-align" : "center"
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
					comboBox_2.placeholder = "-재료-";
					comboBox_2.style.css({
						"background-color" : "#F9F9F9",
						"text-align" : "center"
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
					comboBox_3.placeholder = "-방법-";
					comboBox_3.style.css({
						"background-color" : "#F9F9F9",
						"text-align" : "center"
					});
					(function(comboBox_3){
						comboBox_3.addItem(new cpr.controls.Item("볶음", "볶음"));
						comboBox_3.addItem(new cpr.controls.Item("끓이기", "끓이기"));
						comboBox_3.addItem(new cpr.controls.Item("부침", "부침"));
						comboBox_3.addItem(new cpr.controls.Item("조림", "조림"));
						comboBox_3.addItem(new cpr.controls.Item("무침", "무침"));
						comboBox_3.addItem(new cpr.controls.Item("비빔", "비빔"));
						comboBox_3.addItem(new cpr.controls.Item("찜", "찜"));
						comboBox_3.addItem(new cpr.controls.Item("절임", "절임"));
						comboBox_3.addItem(new cpr.controls.Item("튀김", "튀김"));
						comboBox_3.addItem(new cpr.controls.Item("삶기", "삶기"));
						comboBox_3.addItem(new cpr.controls.Item("굽기", "굽기"));
						comboBox_3.addItem(new cpr.controls.Item("데치기", "데치기"));
						comboBox_3.addItem(new cpr.controls.Item("회", "회"));
						comboBox_3.addItem(new cpr.controls.Item("기타", "기타"));
					})(comboBox_3);
					container.addChild(comboBox_3, {
						"top": "8px",
						"left": "394px",
						"width": "100px",
						"height": "20px"
					});
					var comboBox_4 = new cpr.controls.ComboBox("type");
					comboBox_4.placeholder = "-선택-";
					comboBox_4.style.css({
						"text-align" : "center"
					});
					(function(comboBox_4){
						comboBox_4.addItem(new cpr.controls.Item("한식", "한식"));
						comboBox_4.addItem(new cpr.controls.Item("양식", "양식"));
						comboBox_4.addItem(new cpr.controls.Item("중식/일식", "중식/일식"));
						comboBox_4.addItem(new cpr.controls.Item("동남아", "동남아"));
						comboBox_4.addItem(new cpr.controls.Item("에어프라이어", "에어프라이어"));
					})(comboBox_4);
					container.addChild(comboBox_4, {
						"top": "8px",
						"left": "504px",
						"width": "100px",
						"height": "20px"
					});
				})(group_6);
				container.addChild(group_6, {
					"top": "200px",
					"left": "60px",
					"width": "864px",
					"height": "35px"
				});
				var group_7 = new cpr.controls.Container();
				var xYLayout_8 = new cpr.controls.layouts.XYLayout();
				group_7.setLayout(xYLayout_8);
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
				})(group_7);
				container.addChild(group_7, {
					"top": "749px",
					"left": "60px",
					"width": "864px",
					"height": "50px"
				});
				var group_8 = new cpr.controls.Container();
				var xYLayout_9 = new cpr.controls.layouts.XYLayout();
				group_8.setLayout(xYLayout_9);
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
				})(group_8);
				container.addChild(group_8, {
					"top": "454px",
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
					"top": "882px",
					"left": "368px",
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
				if(typeof onButtonClick == "function") {
					button_2.addEventListener("click", onButtonClick);
				}
				container.addChild(button_2, {
					"top": "882px",
					"left": "482px",
					"width": "114px",
					"height": "34px"
				});
				var group_9 = new cpr.controls.Container();
				var xYLayout_10 = new cpr.controls.layouts.XYLayout();
				group_9.setLayout(xYLayout_10);
				(function(container){
					var fileInput_1 = new cpr.controls.FileInput("file2");
					fileInput_1.placeholder = "클릭후 파일 업로드해주세요.";
					if(typeof onFile2ValueChange == "function") {
						fileInput_1.addEventListener("value-change", onFile2ValueChange);
					}
					container.addChild(fileInput_1, {
						"top": "2px",
						"left": "173px",
						"width": "351px",
						"height": "126px"
					});
					var image_1 = new cpr.controls.Image("updateImg");
					if(typeof onUpdateImgValueChange == "function") {
						image_1.addEventListener("value-change", onUpdateImgValueChange);
					}
					container.addChild(image_1, {
						"top": "2px",
						"left": "534px",
						"width": "290px",
						"height": "126px"
					});
					var output_8 = new cpr.controls.Output();
					output_8.value = "파일";
					output_8.style.css({
						"color" : "#0CA44E",
						"text-align" : "center"
					});
					container.addChild(output_8, {
						"top": "46px",
						"left": "52px",
						"width": "100px",
						"height": "20px"
					});
					var button_3 = new cpr.controls.Button("deleteImgBtn");
					button_3.value = "X";
					button_3.style.css({
						"color" : "black"
					});
					if(typeof onDeleteImgBtnClick == "function") {
						button_3.addEventListener("click", onDeleteImgBtnClick);
					}
					container.addChild(button_3, {
						"top": "2px",
						"left": "801px",
						"width": "23px",
						"height": "20px"
					});
				})(group_9);
				container.addChild(group_9, {
					"top": "315px",
					"left": "60px",
					"width": "864px",
					"height": "129px"
				});
				var image_2 = new cpr.controls.Image();
				image_2.src = "theme/images/mealkit/trashbin.png";
				if(typeof onImageClick == "function") {
					image_2.addEventListener("click", onImageClick);
				}
				container.addChild(image_2, {
					"top": "874px",
					"left": "884px",
					"width": "40px",
					"height": "40px"
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "209px",
				"width": "984px",
				"height": "959px",
				"left": "calc(50% - 492px)"
			});
			if(typeof onBodyInit2 == "function"){
				app.addEventListener("init", onBodyInit2);
			}
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "updateMealkit";
	cpr.core.Platform.INSTANCE.register(app);
})();
