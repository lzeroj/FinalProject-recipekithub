/*
 * App URI: recipe/insertrecipe
 * Source Location: recipe/insertrecipe.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("recipe/insertrecipe", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * recipeinsert.js
			 * Created at 2023. 8. 8. 오전 9:52:52.
			 *
			 * @author user
			 ************************************************/
			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(e) {
				var shl1 = e.control;
				var voResourceLoader = new cpr.core.ResourceLoader();
				voResourceLoader.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js").load().then(function(input) {
					voResourceLoader.addScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js").load().then(function(input) {
						loaded = true;
						app.lookup("smnote").redraw();
					});
				});
			}
			/*
			 * 쉘에서 load 이벤트 발생 시 호출.
			 * 쉘이 그려진 후 내용을 작성하는 이벤트.
			 */
			function onShl1Load(e) {
				var shl1 = e.control;
				var content = e.content;
				
				if (loaded) {
					shl1.registerComponent("Editor", content);
					
					//에디터를 넣어줄 div 생성
					var editorDiv = document.createElement("div")
					editorDiv.id = "summernote";
					editorDiv.style.height = "100%";
					editorDiv.style.width = "100%";
					
					//생성한 에디터를 쉘 영역안에 넣어준다.
					content.appendChild(editorDiv);
					
					$('#summernote').summernote({
						placeholder: 'Hello stand alone ui',
						tabsize: 2,
						height: 300,
						toolbar: [
							['style', ['style']],
							['font', ['bold', 'underline', 'clear']],
							['color', ['color']],
							['para', ['ul', 'ol', 'paragraph']],
							['table', ['table']],
							//['insert', ['link', 'picture', 'video']],
							['view', ['fullscreen', 'codeview', 'help']]
						]
					});
				}
			}

			/*
			 * "Button" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e) {
				var button = e.control;
				var vsOpt = app.lookup("smnote");
				var dataMap = app.lookup("recipe");
				vsOpt.value = $('#summernote').summernote('code');
				dataMap.setValue("RECIPE_BOARD_CONTENT", vsOpt.value);
				var submission = app.lookup("insertRecipe");
				
				var fileInput = app.lookup("fi1");
				var file = fileInput.file;
				var value = dataMap.getValue("RECIPE_BOARD_TITLE");
				var value2 = dataMap.getValue("CATEGORY_TYPE");
				var value3 = dataMap.getValue("CATEGORY_INGREDIENTS");
				var value4 = dataMap.getValue("CATEGORY_METHOD");
				if (confirm("등록 하시겠습니까?")) {
					if (value == "" || value2 == "" || value3 == "" || value4 == "") {
						alert("내용을 입력하세요");
					} else {
						submission.addFileParameter("image", file);
						submission.send();
					}
				}
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onInsertRecipeSubmitSuccess(e){
				var insertRecipe = e.control;
				var recipeBoardId = insertRecipe.getMetadata("recipeBoardId");
				if (recipeBoardId != null) {
						window.location.href="/moveDetailRecipe?recipeBoardId="+recipeBoardId;
					}
				};
			// End - User Script
			
			// Header
			var dataMap_1 = new cpr.data.DataMap("recipe");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "RECIPE_BOARD_TITLE",
						"dataType": "string"
					},
					{
						"name": "RECIPE_BOARD_CONTENT",
						"dataType": "string"
					},
					{
						"name": "CATEGORY_TYPE",
						"dataType": "string"
					},
					{
						"name": "CATEGORY_INGREDIENTS",
						"dataType": "string"
					},
					{
						"name": "CATEGORY_METHOD",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("insertRecipe");
			submission_1.action = "/insertRecipe";
			submission_1.mediaType = "multipart/form-data";
			submission_1.fallbackContentType = "none";
			submission_1.addRequestData(dataMap_1);
			if(typeof onInsertRecipeSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onInsertRecipeSubmitSuccess);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#F0F0F0",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var uIControlShell_1 = new cpr.controls.UIControlShell("smnote");
			if(typeof onShl1Load == "function") {
				uIControlShell_1.addEventListener("load", onShl1Load);
			}
			container.addChild(uIControlShell_1, {
				"top": "273px",
				"width": "724px",
				"height": "277px",
				"left": "calc(50% - 362px)"
			});
			
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#E7E7E7",
				"background-image" : "none"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var output_1 = new cpr.controls.Output();
				output_1.value = "레시피 등록";
				output_1.style.css({
					"font-weight" : "bold",
					"font-size" : "20px",
					"font-family" : "@HY엽서L"
				});
				container.addChild(output_1, {
					"top": "0px",
					"left": "0px",
					"width": "127px",
					"height": "52px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "20px",
				"width": "724px",
				"height": "52px",
				"left": "calc(50% - 362px)"
			});
			
			var group_2 = new cpr.controls.Container();
			group_2.style.css({
				"background-color" : "#FFFFFF"
			});
			var formLayout_1 = new cpr.controls.layouts.FormLayout();
			formLayout_1.scrollable = false;
			formLayout_1.topMargin = "5px";
			formLayout_1.rightMargin = "5px";
			formLayout_1.bottomMargin = "5px";
			formLayout_1.leftMargin = "5px";
			formLayout_1.horizontalSpacing = "10px";
			formLayout_1.verticalSpacing = "10px";
			formLayout_1.setColumns(["100px", "388px"]);
			formLayout_1.setRows(["1fr", "1fr", "1fr"]);
			group_2.setLayout(formLayout_1);
			(function(container){
				var output_2 = new cpr.controls.Output();
				output_2.value = "레시피 제목";
				output_2.style.css({
					"font-weight" : "bolder",
					"text-align" : "center"
				});
				container.addChild(output_2, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var output_3 = new cpr.controls.Output();
				output_3.value = "대표 사진";
				output_3.style.css({
					"font-weight" : "bolder",
					"text-align" : "center"
				});
				container.addChild(output_3, {
					"colIndex": 0,
					"rowIndex": 1
				});
				var output_4 = new cpr.controls.Output();
				output_4.value = "카테고리";
				output_4.style.css({
					"font-weight" : "bolder",
					"text-align" : "center"
				});
				container.addChild(output_4, {
					"colIndex": 0,
					"rowIndex": 2
				});
				var inputBox_1 = new cpr.controls.InputBox("ipb1");
				inputBox_1.style.css({
					"font-size" : "18px"
				});
				inputBox_1.bind("value").toDataMap(app.lookup("recipe"), "RECIPE_BOARD_TITLE");
				container.addChild(inputBox_1, {
					"colIndex": 1,
					"rowIndex": 0
				});
				var group_3 = new cpr.controls.Container();
				var formLayout_2 = new cpr.controls.layouts.FormLayout();
				formLayout_2.scrollable = false;
				formLayout_2.topMargin = "5px";
				formLayout_2.rightMargin = "5px";
				formLayout_2.bottomMargin = "5px";
				formLayout_2.leftMargin = "5px";
				formLayout_2.horizontalSpacing = "10px";
				formLayout_2.verticalSpacing = "10px";
				formLayout_2.setColumns(["80px", "80px", "80px"]);
				formLayout_2.setRows(["1fr"]);
				group_3.setLayout(formLayout_2);
				(function(container){
					var linkedComboBox_1 = new cpr.controls.LinkedComboBox("lcb1");
					linkedComboBox_1.placeholders = ["종류별"];
					linkedComboBox_1.bind("value").toDataMap(app.lookup("recipe"), "CATEGORY_TYPE");
					(function(linkedComboBox_1){
						linkedComboBox_1.addItem((function(){
							var treeItem_1 = new cpr.controls.TreeItem("밑반찬", "밑반찬", null);
							treeItem_1.checked = false;
							return treeItem_1;
						})());
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("메인반찬", "메인반찬", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("국/탕", "국/탕", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("디저트", "디저트", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("면", "면", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("샐러드", "샐러드", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("음료", "음료", null));
						linkedComboBox_1.addItem(new cpr.controls.TreeItem("기타", "기타", null));
					})(linkedComboBox_1);
					container.addChild(linkedComboBox_1, {
						"colIndex": 0,
						"rowIndex": 0,
						"colSpan": 1,
						"rowSpan": 1
					});
					var linkedComboBox_2 = new cpr.controls.LinkedComboBox("lcb2");
					linkedComboBox_2.placeholders = ["방법별"];
					linkedComboBox_2.bind("value").toDataMap(app.lookup("recipe"), "CATEGORY_INGREDIENTS");
					(function(linkedComboBox_2){
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("육류", "육류", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("채소류", "채소류", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("해물류", "해물류", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("달걀/유제품", "달걀/유제품", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("가공식품류", "가공식품류", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("과일류", "과일류", null));
						linkedComboBox_2.addItem(new cpr.controls.TreeItem("기타", "기타", null));
					})(linkedComboBox_2);
					container.addChild(linkedComboBox_2, {
						"colIndex": 1,
						"rowIndex": 0
					});
					var linkedComboBox_3 = new cpr.controls.LinkedComboBox("lcb3");
					linkedComboBox_3.placeholders = ["재료별"];
					linkedComboBox_3.bind("value").toDataMap(app.lookup("recipe"), "CATEGORY_METHOD");
					(function(linkedComboBox_3){
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("볶음", "볶음", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("끓이기", "끓이기", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("조림", "조림", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("튀김", "튀김", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("삶기", "삶기", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("굽기", "굽기", null));
						linkedComboBox_3.addItem(new cpr.controls.TreeItem("기타", "기타", null));
					})(linkedComboBox_3);
					container.addChild(linkedComboBox_3, {
						"colIndex": 2,
						"rowIndex": 0
					});
				})(group_3);
				container.addChild(group_3, {
					"colIndex": 1,
					"rowIndex": 2,
					"colSpan": 1,
					"rowSpan": 1
				});
				var fileInput_1 = new cpr.controls.FileInput("fi1");
				if(typeof onFi1ValueChange == "function") {
					fileInput_1.addEventListener("value-change", onFi1ValueChange);
				}
				container.addChild(fileInput_1, {
					"colIndex": 1,
					"rowIndex": 1
				});
			})(group_2);
			container.addChild(group_2, {
				"top": "82px",
				"width": "724px",
				"height": "192px",
				"left": "calc(50% - 362px)"
			});
			
			var group_4 = new cpr.controls.Container();
			var formLayout_3 = new cpr.controls.layouts.FormLayout();
			formLayout_3.scrollable = false;
			formLayout_3.topMargin = "5px";
			formLayout_3.rightMargin = "5px";
			formLayout_3.bottomMargin = "5px";
			formLayout_3.leftMargin = "5px";
			formLayout_3.horizontalSpacing = "10px";
			formLayout_3.verticalSpacing = "10px";
			formLayout_3.setColumns(["1fr", "1fr"]);
			formLayout_3.setRows(["1fr"]);
			group_4.setLayout(formLayout_3);
			(function(container){
				var button_1 = new cpr.controls.Button();
				button_1.value = "저장";
				button_1.style.css({
					"font-weight" : "bold",
					"background-image" : "linear-gradient(#52b135,#58fd45)"
				});
				if(typeof onButtonClick == "function") {
					button_1.addEventListener("click", onButtonClick);
				}
				container.addChild(button_1, {
					"colIndex": 0,
					"rowIndex": 0
				});
				var button_2 = new cpr.controls.Button();
				button_2.value = "취소";
				button_2.style.css({
					"font-weight" : "bold",
					"background-image" : "linear-gradient(#ffffff, #5690cb)"
				});
				container.addChild(button_2, {
					"colIndex": 1,
					"rowIndex": 0
				});
			})(group_4);
			container.addChild(group_4, {
				"top": "700px",
				"width": "400px",
				"height": "48px",
				"left": "calc(50% - 200px)"
			});
			if(typeof onBodyLoad2 == "function"){
				app.addEventListener("load", onBodyLoad2);
			}
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
		}
	});
	app.title = "insertrecipe";
	cpr.core.Platform.INSTANCE.register(app);
})();