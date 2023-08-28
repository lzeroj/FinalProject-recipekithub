/*
 * App URI: member/find-email-pswd
 * Source Location: member/find-email-pswd.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/find-email-pswd", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/controls/htmlobject.css");
			loader.addCSS("theme/controls/tabfolder.part.css");
			loader.addCSS("theme/custom-theme.css");
			loader.addCSS("theme/custom/member.part.css");
			loader.addCSS("theme/settings.part.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * find-email-pswd.js
			 * Created at 2023. 8. 11. 오후 2:30:25.
			 *
			 * @author kjoon
			 ************************************************/

			//(start)-----[ 이메일 찾기 함수 ]-----//
			/*
			 * "조회" 버튼(btnFindEmail)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnFindEmailClick(e){
				var btnFindEmail = e.control;
				var memberName = app.lookup("ipbName1").value;
				var memberPhone = app.lookup("ipbPhone1").value;
				var memberBirthday = app.lookup("ipbBirthday").value;
				
				var dataMap = app.lookup("dm_find_email");
				dataMap.setValue("member_name", memberName);
				dataMap.setValue("member_phone", memberPhone);
				dataMap.setValue("member_birthday", memberBirthday);
				
				// 다이얼로그창에 표시할 메시지
				var initValue = null;		
				// Email 양식에서 빈칸으로 남아 있는 input-box가 있는 체크
				if (memberName === "") {
					initValue = "성명은 필수 입력 항목입니다.";
				} else if (memberPhone === "") {
					initValue = "전화번호는 필수 입력 항목입니다";
				} else if (memberBirthday === "") {
					initValue = "생년월일은 필수 입력 항목입니다";
				}
				
				// 1. Email 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 경우
				if (initValue) {		
					app.openDialog("dialog/memberChkPopup", {
						width: 400, height: 300, headerClose: true
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = initValue;
						});
					});
				// 2. Email 찾기 양식이 전부 유효하게 작성되어 있는 경우, Email 찾기 서브미션 전송	
				} else {		
					initValue = "Email을 조회 하시겠습니까?";
					app.openDialog("dialog/memberPopup", {
						width: 400, height: 300, headerClose: true, resizable: false
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = initValue;
						});
					}).then(function(returnValue) {
						var submission = app.lookup("sub_findEmail");
						submission.send();
					});
				}	
			}

			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onIpbBirthdayKeydown(e){
				var ipbBirthday = e.control;
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					app.lookup("btnFindEmail").click();
				}
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_findEmailSubmitSuccess(e){
				var sub_findEmail = e.control;
				var opbFindEmailNotice = app.lookup("opbFindEmailNotice");
				
				var metadataOk = sub_findEmail.getMetadata("ok"); 	// Controller측에서 입력한 정보에 따른 이메일을 조회하여 ok(조회 성공)인 경우
				var metadataFail = sub_findEmail.getMetadata("fail"); 	// Controller측에서 입력한 정보에 따른 이메일을 조회하여 fail(조회 불가)인 경우

				if (metadataFail) {		//---> 1. 입력한 정보에 따른 이메일을 조회할 수 없는 경우
					opbFindEmailNotice.style.css("color", "red");
					opbFindEmailNotice.text = "등록된 정보가 없습니다. 입력하신 정보를 다시 확인해주세요.";
				} else {						//---> 2. 입력한 정보에 따른 이메일을 조회하는데 성공한 경우
					opbFindEmailNotice.style.css("color", "black");
					opbFindEmailNotice.text = "입력하신 회원정보에 해당하는 Email 정보는 다음과 같습니다."
					app.lookup("opbFindEmailResult").text = metadataOk;
				}
			}
			//(end)-----[ 이메일 찾기 함수 ]-----//


			//(start)-----[ 비밀번호 찾기 함수 ]-----//
			/*
			 * "조회" 버튼(btnFindPswd)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnFindPswdClick(e){
				var btnFindPswd = e.control;
				var memberEmail = app.lookup("ipbEmail").value;
				var memberName = app.lookup("ipbName2").value;
				var memberPhone = app.lookup("ipbPhone2").value;
				
				var dataMap = app.lookup("dm_find_pswd");
				dataMap.setValue("member_email", memberEmail);
				dataMap.setValue("member_name", memberName);
				dataMap.setValue("member_phone", memberPhone);
				
				// 다이얼로그창에 표시할 메시지
				var initValue = null;		
				// 비밀번호 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 체크
				if (memberEmail === "") {
					initValue = "Email은 필수 입력 항목입니다.";
				} else if (memberName === "") {
					initValue = "성명은 필수 입력 항목입니다.";
				} else if (memberPhone === "") {
					initValue = "핸드폰 번호는 필수 입력 항목입니다.";
				}
				
				// 1. 비밀번호 찾기 양식에서 빈칸으로 남아 있는 input-box가 있는 경우
				if (initValue) {		
					app.openDialog("dialog/memberChkPopup", {
						width: 400, height: 300, headerClose: true
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = initValue;
						});
					});
				// 2. 비밀번호 찾기 양식이 전부 유효하게 작성되어 있는 경우, 비밀번호 찾기 서브미션 전송	
				} else {		
					initValue = "비밀번호를 조회 하시겠습니까?";
					app.openDialog("dialog/memberPopup", {
						width: 400, height: 300, headerClose: true, resizable: false
					}, function(dialog) {
						dialog.ready(function(dialogApp) {
							dialogApp.initValue = initValue;
						});
					}).then(function(returnValue) {
						var submission = app.lookup("sub_findPswd");
						submission.send();
					});
				}	
			}

			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onIpbPhone2Keydown(e){
				var ipbPhone2 = e.control;
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					app.lookup("btnFindPswd").click();
				}
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_findPswdSubmitSuccess(e){
				var sub_findPswd = e.control;
				var opbFindPswdNotice = app.lookup("opbFindPswdNotice");
				
				var metadataOk = sub_findPswd.getMetadata("ok"); 	// Controller측에서 입력한 정보에 따른 비밀번호를 조회하여 ok(조회 성공)인 경우
				var metadataFail = sub_findPswd.getMetadata("fail"); 	// Controller측에서 입력한 정보에 따른 비밀번호를 조회하여 fail(조회 불가)인 경우

				if (metadataFail) {		//---> 1. 입력한 정보에 따른 비밀번호를 조회할 수 없는 경우
					opbFindPswdNotice.style.css("color", "red");
					opbFindPswdNotice.text = "등록된 정보가 없습니다. 입력하신 정보를 다시 확인해주세요.";
				} else {						//---> 2. 입력한 정보에 따른 비밀번호를 조회하는데 성공한 경우
					opbFindPswdNotice.style.css("color", "black");
					opbFindPswdNotice.text = "입력하신 회원정보에 해당하는 비밀번호 정보는 다음과 같습니다.\n보안을 위해 비밀번호를 수정해주시길 바랍니다."
					app.lookup("opbFindPswdResult").text = metadataOk;
				}
			}
			//(end)-----[ 비밀번호 찾기 함수 ]-----//;
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_member");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "memberEmail",
						"dataType": "string"
					},
					{
						"name": "memberPassword",
						"dataType": "string"
					}
				]
			});
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm_find_email");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "member_name",
						"dataType": "string"
					},
					{
						"name": "member_phone",
						"dataType": "string"
					},
					{
						"name": "member_birthday",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dm_find_pswd");
			dataMap_2.parseData({
				"columns" : [
					{
						"name": "member_email",
						"dataType": "string"
					},
					{
						"name": "member_name",
						"dataType": "string"
					},
					{
						"name": "member_phone",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_2);
			var submission_1 = new cpr.protocols.Submission("sub_findEmail");
			submission_1.action = "/member/findEmail";
			submission_1.addRequestData(dataMap_1);
			if(typeof onSub_findEmailSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSub_findEmailSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sub_findPswd");
			submission_2.action = "/member/findPassword";
			submission_2.addRequestData(dataMap_2);
			if(typeof onSub_findPswdSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSub_findPswdSubmitSuccess);
			}
			app.register(submission_2);
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
			var verticalLayout_1 = new cpr.controls.layouts.VerticalLayout();
			container.setLayout(verticalLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			var verticalLayout_2 = new cpr.controls.layouts.VerticalLayout();
			group_1.setLayout(verticalLayout_2);
			(function(container){
				var userDefinedControl_1 = new udc.header3();
				container.addChild(userDefinedControl_1, {
					"width": "1920px",
					"height": "205px"
				});
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#F4FAEC",
					"background-size" : "cover",
					"background-image" : "url('theme/images/common/bgimgfinal.png')",
					"background-position" : "center"
				});
				var verticalLayout_3 = new cpr.controls.layouts.VerticalLayout();
				group_2.setLayout(verticalLayout_3);
				(function(container){
					var group_3 = new cpr.controls.Container();
					var verticalLayout_4 = new cpr.controls.layouts.VerticalLayout();
					verticalLayout_4.distribution = "center";
					verticalLayout_4.topMargin = 50;
					group_3.setLayout(verticalLayout_4);
					(function(container){
						var tabFolder_1 = new cpr.controls.TabFolder();
						tabFolder_1.style.header.css({
							"border-radius" : "0px",
							"color" : "white",
							"font-family" : "푸른전남 Medium"
						});
						tabFolder_1.style.item.css({
							"background-color" : "#0CA44E",
							"border-radius" : "20px 20px 0px 0px",
							"padding-top" : "10px",
							"padding-left" : "50px",
							"font-size" : "24px",
							"padding-bottom" : "10px",
							"font-family" : "푸른전남 Medium",
							"text-align" : "center",
							"padding-right" : "50px"
						});
						tabFolder_1.style.body.css({
							"border-radius" : "0px 10px 20px 20px",
							"font-family" : "푸른전남 Medium"
						});
						
						var tabItem_1 = (function(tabFolder){
							var tabItem_1 = new cpr.controls.TabItem();
							tabItem_1.text = "Email 찾기";
							tabItem_1.name = "tabFindEmail";
							var group_4 = new cpr.controls.Container();
							var xYLayout_1 = new cpr.controls.layouts.XYLayout();
							group_4.setLayout(xYLayout_1);
							(function(container){
								var group_5 = new cpr.controls.Container();
								var formLayout_1 = new cpr.controls.layouts.FormLayout();
								formLayout_1.scrollable = false;
								formLayout_1.topMargin = "10px";
								formLayout_1.rightMargin = "10px";
								formLayout_1.bottomMargin = "10px";
								formLayout_1.leftMargin = "10px";
								formLayout_1.horizontalSpacing = "20px";
								formLayout_1.verticalSpacing = "20px";
								formLayout_1.setColumns(["200px", "300px", "1fr"]);
								formLayout_1.setRows(["50px", "50px", "50px", "50px", "50px", "50px", "1fr"]);
								group_5.setLayout(formLayout_1);
								(function(container){
									var output_1 = new cpr.controls.Output();
									output_1.value = "회원가입시 사용하신 Email을 찾기 위해 다음의 정보를 입력해주세요.";
									output_1.style.css({
										"font-size" : "20px"
									});
									container.addChild(output_1, {
										"colIndex": 0,
										"rowIndex": 0,
										"colSpan": 3,
										"rowSpan": 1
									});
									var output_2 = new cpr.controls.Output();
									output_2.value = "- 회원명";
									output_2.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									container.addChild(output_2, {
										"colIndex": 0,
										"rowIndex": 1,
										"colSpan": 1,
										"rowSpan": 1
									});
									var output_3 = new cpr.controls.Output();
									output_3.value = "- 핸드폰 번호 ";
									output_3.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									if(typeof onOutputValueChange == "function") {
										output_3.addEventListener("value-change", onOutputValueChange);
									}
									container.addChild(output_3, {
										"colIndex": 0,
										"rowIndex": 2
									});
									var output_4 = new cpr.controls.Output();
									output_4.value = "- 회원 생년월일";
									output_4.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									container.addChild(output_4, {
										"colIndex": 0,
										"rowIndex": 3
									});
									var inputBox_1 = new cpr.controls.InputBox("ipbName1");
									inputBox_1.showClearButton = true;
									inputBox_1.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_1.bind("value").toDataMap(app.lookup("dm_find_email"), "member_name");
									container.addChild(inputBox_1, {
										"colIndex": 1,
										"rowIndex": 1,
										"colSpan": 1,
										"rowSpan": 1
									});
									var inputBox_2 = new cpr.controls.InputBox("ipbPhone1");
									inputBox_2.showClearButton = true;
									inputBox_2.maxLength = 11;
									inputBox_2.inputFilter = "[0-9]";
									inputBox_2.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_2.bind("value").toDataMap(app.lookup("dm_find_email"), "member_phone");
									container.addChild(inputBox_2, {
										"colIndex": 1,
										"rowIndex": 2,
										"colSpan": 1,
										"rowSpan": 1
									});
									var inputBox_3 = new cpr.controls.InputBox("ipbBirthday");
									inputBox_3.showClearButton = true;
									inputBox_3.maxLength = 8;
									inputBox_3.inputFilter = "[0-9]";
									inputBox_3.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_3.bind("value").toDataMap(app.lookup("dm_find_email"), "member_birthday");
									if(typeof onIpbBirthdayKeydown == "function") {
										inputBox_3.addEventListener("keydown", onIpbBirthdayKeydown);
									}
									container.addChild(inputBox_3, {
										"colIndex": 1,
										"rowIndex": 3,
										"colSpan": 1,
										"rowSpan": 1
									});
									var output_5 = new cpr.controls.Output("opbFindEmailNotice");
									output_5.value = "";
									output_5.style.css({
										"font-size" : "20px"
									});
									container.addChild(output_5, {
										"colIndex": 0,
										"rowIndex": 5,
										"colSpan": 3,
										"rowSpan": 1
									});
									var output_6 = new cpr.controls.Output("opbFindEmailResult");
									output_6.style.css({
										"color" : "#EC631D",
										"font-weight" : "bolder",
										"font-size" : "32px",
										"font-family" : "푸른전남 Medium",
										"text-align" : "center"
									});
									output_6.bind("value").toDataSet(app.lookup("ds_member"), "memberEmail", 0);
									container.addChild(output_6, {
										"colIndex": 0,
										"rowIndex": 6,
										"colSpan": 3,
										"rowSpan": 1
									});
									var button_1 = new cpr.controls.Button("btnFindEmail");
									button_1.value = "조회";
									button_1.style.setClasses(["btn-outline-success"]);
									button_1.style.css({
										"color" : "#0CA44E",
										"border-bottom-color" : "#0ca44e",
										"border-top-width" : "2px",
										"border-right-width" : "2px",
										"font-weight" : "bolder",
										"border-left-color" : "#0ca44e",
										"font-size" : "20px",
										"border-right-color" : "#0ca44e",
										"border-left-width" : "2px",
										"background-color" : "#F4FAEC",
										"border-radius" : "20px",
										"border-bottom-width" : "2px",
										"border-top-color" : "#0ca44e",
										"background-image" : "none"
									});
									if(typeof onBtnFindEmailClick == "function") {
										button_1.addEventListener("click", onBtnFindEmailClick);
									}
									if(typeof onBtnFindEmailAnimationend == "function") {
										button_1.addEventListener("animationend", onBtnFindEmailAnimationend);
									}
									container.addChild(button_1, {
										"colIndex": 0,
										"rowIndex": 4,
										"colSpan": 3,
										"rowSpan": 1
									});
									var textArea_1 = new cpr.controls.TextArea("txa1");
									textArea_1.style.css({
										"border-right-style" : "none",
										"border-left-style" : "none",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none"
									});
									container.addChild(textArea_1, {
										"colIndex": 2,
										"rowIndex": 1
									});
									var textArea_2 = new cpr.controls.TextArea("txa2");
									textArea_2.value = "❈ (-) 을 제외한 11자리의 전화번호를 입력해주세요. (ex. 01012345678)";
									textArea_2.style.css({
										"border-right-style" : "none",
										"border-left-style" : "none",
										"font-size" : "16px",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none"
									});
									container.addChild(textArea_2, {
										"colIndex": 2,
										"rowIndex": 2
									});
									var textArea_3 = new cpr.controls.TextArea("txa3");
									textArea_3.value = "❈ 숫자만으로 이루어진 8자리의 숫자를 입력해주세요. (ex. 20230101)";
									textArea_3.style.css({
										"border-right-style" : "none",
										"border-left-style" : "none",
										"font-size" : "16px",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none"
									});
									container.addChild(textArea_3, {
										"colIndex": 2,
										"rowIndex": 3
									});
								})(group_5);
								container.addChild(group_5, {
									"top": "19px",
									"left": "19px",
									"width": "835px",
									"height": "515px"
								});
							})(group_4);
							tabItem_1.content = group_4;
							return tabItem_1;
						})(tabFolder_1);
						tabFolder_1.addTabItem(tabItem_1);
						
						var tabItem_2 = (function(tabFolder){
							var tabItem_2 = new cpr.controls.TabItem();
							tabItem_2.text = "Password 찾기";
							tabItem_2.name = "tabFindPswd";
							var group_6 = new cpr.controls.Container();
							var xYLayout_2 = new cpr.controls.layouts.XYLayout();
							group_6.setLayout(xYLayout_2);
							(function(container){
								var group_7 = new cpr.controls.Container();
								var formLayout_2 = new cpr.controls.layouts.FormLayout();
								formLayout_2.scrollable = false;
								formLayout_2.topMargin = "10px";
								formLayout_2.rightMargin = "10px";
								formLayout_2.bottomMargin = "10px";
								formLayout_2.leftMargin = "10px";
								formLayout_2.horizontalSpacing = "20px";
								formLayout_2.verticalSpacing = "20px";
								formLayout_2.setColumns(["200px", "300px", "1fr"]);
								formLayout_2.setRows(["50px", "50px", "50px", "50px", "50px", "50px", "1fr"]);
								group_7.setLayout(formLayout_2);
								(function(container){
									var output_7 = new cpr.controls.Output();
									output_7.value = "비밀번호를 찾기 위해 다음의 정보를 입력해주세요.";
									output_7.style.css({
										"font-size" : "20px"
									});
									container.addChild(output_7, {
										"colIndex": 0,
										"rowIndex": 0,
										"colSpan": 3,
										"rowSpan": 1
									});
									var output_8 = new cpr.controls.Output();
									output_8.value = "- Email";
									output_8.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									container.addChild(output_8, {
										"colIndex": 0,
										"rowIndex": 1,
										"colSpan": 1,
										"rowSpan": 1
									});
									var output_9 = new cpr.controls.Output();
									output_9.value = "- 회원명";
									output_9.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									container.addChild(output_9, {
										"colIndex": 0,
										"rowIndex": 2
									});
									var output_10 = new cpr.controls.Output();
									output_10.value = "- 핸드폰 번호";
									output_10.style.css({
										"border-radius" : "10px",
										"border-right-style" : "none",
										"background-color" : "#F0F0F0",
										"font-weight" : "bolder",
										"border-left-style" : "none",
										"font-size" : "20px",
										"border-bottom-style" : "none",
										"border-top-style" : "none"
									});
									container.addChild(output_10, {
										"colIndex": 0,
										"rowIndex": 3
									});
									var inputBox_4 = new cpr.controls.InputBox("ipbEmail");
									inputBox_4.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_4.bind("value").toDataMap(app.lookup("dm_find_pswd"), "member_email");
									container.addChild(inputBox_4, {
										"colIndex": 1,
										"rowIndex": 1,
										"colSpan": 1,
										"rowSpan": 1
									});
									var inputBox_5 = new cpr.controls.InputBox("ipbName2");
									inputBox_5.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_5.bind("value").toDataMap(app.lookup("dm_find_pswd"), "member_name");
									container.addChild(inputBox_5, {
										"colIndex": 1,
										"rowIndex": 2,
										"colSpan": 1,
										"rowSpan": 1
									});
									var inputBox_6 = new cpr.controls.InputBox("ipbPhone2");
									inputBox_6.maxLength = 11;
									inputBox_6.inputFilter = "[0-9]";
									inputBox_6.style.css({
										"border-radius" : "10px",
										"border-right-style" : "solid",
										"border-bottom-color" : "#a0a0a0",
										"border-left-style" : "solid",
										"padding-left" : "10px",
										"border-left-color" : "#a0a0a0",
										"border-top-color" : "#a0a0a0",
										"font-size" : "20px",
										"border-right-color" : "#a0a0a0",
										"border-bottom-style" : "solid",
										"border-top-style" : "solid"
									});
									inputBox_6.bind("value").toDataMap(app.lookup("dm_find_pswd"), "member_phone");
									if(typeof onIpbPhone2Keydown == "function") {
										inputBox_6.addEventListener("keydown", onIpbPhone2Keydown);
									}
									container.addChild(inputBox_6, {
										"colIndex": 1,
										"rowIndex": 3,
										"colSpan": 1,
										"rowSpan": 1
									});
									var output_11 = new cpr.controls.Output("opbFindPswdNotice");
									output_11.value = "";
									output_11.style.css({
										"font-size" : "20px"
									});
									container.addChild(output_11, {
										"colIndex": 0,
										"rowIndex": 5,
										"colSpan": 3,
										"rowSpan": 1
									});
									var output_12 = new cpr.controls.Output("opbFindPswdResult");
									output_12.style.css({
										"color" : "#EC631D",
										"font-weight" : "bolder",
										"font-size" : "32px",
										"font-family" : "푸른전남 Medium",
										"text-align" : "center"
									});
									output_12.bind("value").toDataSet(app.lookup("ds_member"), "memberPassword", 0);
									container.addChild(output_12, {
										"colIndex": 0,
										"rowIndex": 6,
										"colSpan": 3,
										"rowSpan": 1
									});
									var button_2 = new cpr.controls.Button("btnFindPswd");
									button_2.value = "조회";
									button_2.style.setClasses(["btn-outline-success"]);
									button_2.style.css({
										"color" : "#0CA44E",
										"border-bottom-color" : "#0ca44e",
										"border-top-width" : "2px",
										"border-right-width" : "2px",
										"font-weight" : "bolder",
										"border-left-color" : "#0ca44e",
										"font-size" : "20px",
										"border-right-color" : "#0ca44e",
										"border-left-width" : "2px",
										"background-color" : "#F4FAEC",
										"border-radius" : "20px",
										"border-bottom-width" : "2px",
										"border-top-color" : "#0ca44e",
										"background-image" : "none"
									});
									if(typeof onBtnFindPswdClick == "function") {
										button_2.addEventListener("click", onBtnFindPswdClick);
									}
									container.addChild(button_2, {
										"colIndex": 0,
										"rowIndex": 4,
										"colSpan": 3,
										"rowSpan": 1
									});
									var textArea_4 = new cpr.controls.TextArea("txa4");
									textArea_4.value = "❈ (-) 을 제외한 11자리의 전화번호를 입력해주세요. (ex. 01012345678)";
									textArea_4.style.css({
										"border-right-style" : "none",
										"border-left-style" : "none",
										"font-size" : "16px",
										"border-bottom-style" : "none",
										"background-image" : "none",
										"border-top-style" : "none"
									});
									container.addChild(textArea_4, {
										"colIndex": 2,
										"rowIndex": 3
									});
								})(group_7);
								container.addChild(group_7, {
									"top": "20px",
									"left": "20px",
									"width": "835px",
									"height": "515px"
								});
							})(group_6);
							tabItem_2.content = group_6;
							return tabItem_2;
						})(tabFolder_1);
						tabFolder_1.addTabItem(tabItem_2);
						tabFolder_1.setSelectedTabItem(tabItem_1);
						container.addChild(tabFolder_1, {
							"width": "880px",
							"height": "610px"
						});
					})(group_3);
					container.addChild(group_3, {
						"width": "1880px",
						"height": "740px"
					});
				})(group_2);
				container.addChild(group_2, {
					"autoSize": "height",
					"width": "1920px",
					"height": "762px"
				});
				var userDefinedControl_2 = new udc.footer();
				container.addChild(userDefinedControl_2, {
					"width": "1920px",
					"height": "100px"
				});
			})(group_1);
			container.addChild(group_1, {
				"width": "1920px",
				"height": "1080px"
			});
		}
	});
	app.title = "find-email-pswd";
	cpr.core.Platform.INSTANCE.register(app);
})();
