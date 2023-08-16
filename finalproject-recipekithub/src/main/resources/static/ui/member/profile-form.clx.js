/*
 * App URI: member/profile-form
 * Source Location: member/profile-form.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4640), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/profile-form", { 
		onPrepare: function(loader) {
			loader.addCSS("theme/cleopatra-theme.css");
			loader.addCSS("theme/controls/htmlobject.css");
			loader.addCSS("theme/custom-theme.css");
			loader.addCSS("theme/custom/member.part.css");
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * mypage.js
			 * Created at 2023. 8. 10. 오후 3:52:23.
			 *
			 * @author kjoon
			 ************************************************/

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			*/
			function onBodyLoad(e){
				var submission = app.lookup("sub_profile");
				submission.send();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_profileSubmitSuccess(e){
				var sub_profile = e.control;
				//var metadata = sub_profile.getMetadata("myProfile");
				var dsProfile = app.lookup("ds_profile");
				
				
				var memberEmail = cpr.core.Platform.INSTANCE.getParameter("memberEmail");
				var memberPassword = cpr.core.Platform.INSTANCE.getParameter("memberPassword");
				var memberName = cpr.core.Platform.INSTANCE.getParameter("memberName");
				var memberNick = cpr.core.Platform.INSTANCE.getParameter("memberNick");
				var memberAddress = cpr.core.Platform.INSTANCE.getParameter("memberAddress");
				var memberPhone = cpr.core.Platform.INSTANCE.getParameter("memberPhone");
				var memberBirthday = cpr.core.Platform.INSTANCE.getParameter("memberBirthday");
				
				/*
				app.lookup("ipbEmail") = dsProfile.setValue("member_email", memberEmail);
				app.lookup("ipbPassword1") = dsProfile.setValue("member_password", memberPassword);
				app.lookup("ipbName") = dsProfile.setValue("member_name", memberName);
				app.lookup("ipbNick") = dsProfile.setValue("member_nick", memberNick);
				app.lookup("ipbAddress") = dsProfile.setValue("member_address", memberAddress);
				app.lookup("ipbPhone") = dsProfile.setValue("member_phone", memberPhone);
				app.lookup("ipbBirthday") = dsProfile.setValue("member_birthday", memberBirthday);
				*/
				
				dsProfile.setValue("member_email", memberEmail);
				dsProfile.setValue("member_password", memberPassword);
				dsProfile.setValue("member_name", memberName);
				dsProfile.setValue("member_nick", memberNick);
				dsProfile.setValue("member_address", memberAddress);
				dsProfile.setValue("member_phone", memberPhone);
				dsProfile.setValue("member_birthday", memberBirthday);
				
				/*
				for(var idx = 0; idx < metadata.length; idx++){
					dsProfile.setValue(idx, "member_email", metadata[idx].memberEmail);
					dsProfile.setValue(idx, "member_password", metadata[idx].memberPassword);
					dsProfile.setValue(idx, "member_name", metadata[idx].memberName);
					dsProfile.setValue(idx, "member_nick", metadata[idx].memberNick);
					dsProfile.setValue(idx, "member_address", metadata[idx].memberAddress);
					dsProfile.setValue(idx, "member_phone", metadata[idx].memberPhone);
					dsProfile.setValue(idx, "member_birthday", metadata[idx].memberBirthday);
				}
				*/
				
				/*
				dsProfile.setValue(1, "member_email", metadata.memberEmail);
				dsProfile.setValue(2, "member_password", metadata.memberPassword);
				dsProfile.setValue(3, "member_name", metadata.memberName);
				dsProfile.setValue(4, "member_nick", metadata.memberNick);
				dsProfile.setValue(5, "member_address", metadata.memberAddress);
				dsProfile.setValue(6, "member_phone", metadata.memberPhone);
				dsProfile.setValue(7, "member_birthday", metadata.memberBirthday);
				*/
				
				dsProfile.refresh();
				
			//	app.lookup("ipbEmail").redraw();
			//	app.lookup("ipbPassword1").redraw();
			//	app.lookup("ipbName").redraw();
			//	app.lookup("ipbNick").redraw();
			//	app.lookup("ipbBirthday").redraw();
			//	app.lookup("ipbPhone").redraw();
			//	app.lookup("ipbAddress").redraw();
			}

			/*
			 * "수정" 버튼(btnMemUpdate)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnMemUpdateClick(e){
				var btnMemUpdate = e.control;
				if(confirm("정말로 수정하시겠습니까?")) {
					var dataMap = app.lookup("dm_update");
					dataMap.setValue("member_email", app.lookup("ipbEmail").value);
					dataMap.setValue("member_password", app.lookup("ipbPassword1").value);
					dataMap.setValue("member_name", app.lookup("ipbName").value);
					dataMap.setValue("member_nick", app.lookup("ipbNick").value);
					dataMap.setValue("member_birthday", app.lookup("ipbBirthday").value);
					dataMap.setValue("member_phone", app.lookup("ipbPhone").value);
					dataMap.setValue("member_address", app.lookup("ipbAddress").value);
					var submission = app.lookup("sub_update");
					submission.send();
				}
			}

			/*
			 * "탈퇴" 버튼(btnMemDelete)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnMemDeleteClick(e){
				var btnMemDelete = e.control;
				if(confirm("정말로 탈퇴하시겠습니까?")) {
					var dataMap = app.lookup("dm_delete");
					dataMap.setValue("member_email", app.lookup("ipbEmail").value);
					var submission = app.lookup("sub_delete");
					submission.send();
				}
			}

			/*
			 * "취소" 버튼(btnCancel)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnCancelClick(e){
				window.location.href = "index.clx";
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_updateSubmitSuccess(e){
				var sub_update = e.control;
				alert("회원 정보 수정이 완료되었습니다. 감사합니다!")
				var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
				httpPostMethod.submit();
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_deleteSubmitSuccess(e){
				var sub_delete = e.control;
				alert("지금까지 RecipeKitHub을 이용해주셔서 감사합니다!")
				var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
				httpPostMethod.submit();
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_profile");
			dataSet_1.parseData({
				"columns" : [
					{
						"name": "member_email",
						"dataType": "string"
					},
					{
						"name": "member_password",
						"dataType": "string"
					},
					{
						"name": "member_name",
						"dataType": "string"
					},
					{
						"name": "member_nick",
						"dataType": "string"
					},
					{
						"name": "member_address",
						"dataType": "string"
					},
					{
						"name": "member_phone",
						"dataType": "string"
					},
					{
						"name": "member_birthday",
						"dataType": "string"
					},
					{
						"name": "member_type",
						"dataType": "string"
					},
					{
						"name": "member_status",
						"dataType": "string"
					},
					{
						"name": "member_reg_date",
						"dataType": "string"
					}
				]
			});
			if(typeof onDs_profileLoad == "function") {
				dataSet_1.addEventListener("load", onDs_profileLoad);
			}
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm_profile");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "member_email",
						"dataType": "string"
					},
					{
						"name": "member_password",
						"dataType": "string"
					},
					{
						"name": "member_name",
						"dataType": "string"
					},
					{
						"name": "member_nick",
						"dataType": "string"
					},
					{
						"name": "member_address",
						"dataType": "string"
					},
					{
						"name": "member_phone",
						"dataType": "string"
					},
					{
						"name": "member_birthday",
						"dataType": "string"
					},
					{
						"name": "member_type",
						"dataType": "string"
					},
					{
						"name": "member_status",
						"dataType": "string"
					},
					{
						"name": "member_reg_date",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dm_delete");
			dataMap_2.parseData({
				"columns" : [{
					"name": "member_email",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dm_update");
			dataMap_3.parseData({
				"columns" : [
					{
						"name": "member_email",
						"dataType": "string"
					},
					{
						"name": "member_password",
						"dataType": "string"
					},
					{
						"name": "member_name",
						"dataType": "string"
					},
					{
						"name": "member_nick",
						"dataType": "string"
					},
					{
						"name": "member_address",
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
			app.register(dataMap_3);
			var submission_1 = new cpr.protocols.Submission("sub_update");
			submission_1.action = "/member/updateMember";
			submission_1.addRequestData(dataMap_1);
			if(typeof onSub_updateSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSub_updateSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sub_delete");
			submission_2.action = "/member/deleteMember";
			submission_2.addRequestData(dataMap_2);
			if(typeof onSub_deleteSubmitSuccess == "function") {
				submission_2.addEventListener("submit-success", onSub_deleteSubmitSuccess);
			}
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("sub_profile");
			submission_3.action = "/memberUI/profileInfo";
			submission_3.addResponseData(dataSet_1, false);
			if(typeof onSub_profileSubmitSuccess == "function") {
				submission_3.addEventListener("submit-success", onSub_profileSubmitSuccess);
			}
			app.register(submission_3);
			app.supportMedia("all and (min-width: 1920px)", "1080");
			app.supportMedia("all and (min-width: 1280px) and (max-width: 1919px)", "new-screen");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1279px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.setClasses(["emphasis"]);
			container.style.css({
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			container.setLayout(xYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#F0F0F0"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-color" : "#ecfef4",
					"border-radius" : "5px",
					"background-image" : "url('theme/images/member/19.png')"
				});
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var group_3 = new cpr.controls.Container();
					group_3.style.css({
						"border-right-style" : "solid",
						"border-bottom-color" : "#a0a0a0",
						"border-top-width" : "1px",
						"border-right-width" : "1px",
						"border-left-color" : "#a0a0a0",
						"border-right-color" : "#a0a0a0",
						"border-left-width" : "1px",
						"border-top-style" : "solid",
						"border-radius" : "10px",
						"background-color" : "#FFFFFF",
						"border-left-style" : "solid",
						"border-bottom-width" : "1px",
						"border-top-color" : "#a0a0a0",
						"border-bottom-style" : "solid"
					});
					var xYLayout_4 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_4);
					(function(container){
						var group_4 = new cpr.controls.Container();
						group_4.style.css({
							"background-color" : "#FFFFFF",
							"border-radius" : "10px"
						});
						var formLayout_1 = new cpr.controls.layouts.FormLayout();
						formLayout_1.scrollable = false;
						formLayout_1.topMargin = "20px";
						formLayout_1.rightMargin = "10px";
						formLayout_1.bottomMargin = "20px";
						formLayout_1.leftMargin = "20px";
						formLayout_1.horizontalSpacing = "20px";
						formLayout_1.verticalSpacing = "20px";
						formLayout_1.setColumns(["120px", "200px", "80px"]);
						formLayout_1.setRows(["30px", "30px", "25px", "30px", "30px", "30px", "30px", "30px", "85px"]);
						group_4.setLayout(formLayout_1);
						(function(container){
							var output_1 = new cpr.controls.Output();
							output_1.value = " - Email";
							output_1.style.setClasses(["emphasis"]);
							output_1.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_1, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_2 = new cpr.controls.Output();
							output_2.value = " - 비밀번호";
							output_2.style.setClasses(["emphasis"]);
							output_2.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_2, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var output_3 = new cpr.controls.Output();
							output_3.value = " - 비밀번호 확인";
							output_3.style.setClasses(["emphasis"]);
							output_3.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_3, {
								"colIndex": 0,
								"rowIndex": 3
							});
							var output_4 = new cpr.controls.Output();
							output_4.value = " - 이름";
							output_4.style.setClasses(["emphasis"]);
							output_4.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_4, {
								"colIndex": 0,
								"rowIndex": 4
							});
							var output_5 = new cpr.controls.Output();
							output_5.value = " - 닉네임";
							output_5.style.setClasses(["emphasis"]);
							output_5.style.css({
								"background-color" : "#F0F0F0",
								"font-size" : "15px",
								"border-top-style" : "none"
							});
							container.addChild(output_5, {
								"colIndex": 0,
								"rowIndex": 5
							});
							var output_6 = new cpr.controls.Output();
							output_6.value = " - 생년월일";
							output_6.style.setClasses(["emphasis"]);
							output_6.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_6, {
								"colIndex": 0,
								"rowIndex": 6
							});
							var output_7 = new cpr.controls.Output();
							output_7.value = " - 핸드폰 번호";
							output_7.style.setClasses(["emphasis"]);
							output_7.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_7, {
								"colIndex": 0,
								"rowIndex": 7
							});
							var output_8 = new cpr.controls.Output();
							output_8.value = " - 주소";
							output_8.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px",
								"font-family" : "'fonts/PureunJeonnam.ttf' , 'Malgun Gothic' , sans-serif"
							});
							container.addChild(output_8, {
								"colIndex": 0,
								"rowIndex": 8
							});
							var inputBox_1 = new cpr.controls.InputBox("ipbEmail");
							inputBox_1.readOnly = true;
							inputBox_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_1.bind("value").toDataSet(app.lookup("ds_profile"), "member_email", 0);
							container.addChild(inputBox_1, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var inputBox_2 = new cpr.controls.InputBox("ipbPassword1");
							inputBox_2.secret = true;
							inputBox_2.maxLength = 25;
							inputBox_2.spellCheck = false;
							inputBox_2.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_2.bind("value").toDataSet(app.lookup("ds_profile"), "member_password", 0);
							inputBox_2.bind("placeholder").toDataSet(app.lookup("ds_profile"), "member_password", 0);
							container.addChild(inputBox_2, {
								"colIndex": 1,
								"rowIndex": 1
							});
							var inputBox_3 = new cpr.controls.InputBox("ipbPassword2");
							inputBox_3.secret = true;
							inputBox_3.maxLength = 25;
							inputBox_3.spellCheck = false;
							inputBox_3.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(inputBox_3, {
								"colIndex": 1,
								"rowIndex": 3
							});
							var inputBox_4 = new cpr.controls.InputBox("ipbName");
							inputBox_4.lengthUnit = "utf8";
							inputBox_4.maxLength = 18;
							inputBox_4.spellCheck = false;
							inputBox_4.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_4.bind("value").toDataSet(app.lookup("ds_profile"), "member_name", 0);
							inputBox_4.bind("placeholder").toDataSet(app.lookup("ds_profile"), "member_name", 0);
							container.addChild(inputBox_4, {
								"colIndex": 1,
								"rowIndex": 4
							});
							var inputBox_5 = new cpr.controls.InputBox("ipbNick");
							inputBox_5.lengthUnit = "utf8";
							inputBox_5.maxLength = 24;
							inputBox_5.spellCheck = false;
							inputBox_5.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_5.bind("value").toDataSet(app.lookup("ds_profile"), "member_nick", 0);
							inputBox_5.bind("placeholder").toDataSet(app.lookup("ds_profile"), "member_nick", 0);
							container.addChild(inputBox_5, {
								"colIndex": 1,
								"rowIndex": 5
							});
							var textArea_1 = new cpr.controls.TextArea("ipbAddress");
							textArea_1.lengthUnit = "utf8";
							textArea_1.maxLength = 90;
							textArea_1.spellCheck = false;
							textArea_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							textArea_1.bind("value").toDataSet(app.lookup("ds_profile"), "member_address", 0);
							textArea_1.bind("placeholder").toDataSet(app.lookup("ds_profile"), "member_address", 0);
							container.addChild(textArea_1, {
								"colIndex": 1,
								"rowIndex": 8
							});
							var dateInput_1 = new cpr.controls.DateInput("ipbBirthday");
							dateInput_1.spinButton = true;
							dateInput_1.style.setClasses(["cl-dateinput-register", "single-datepicker"]);
							dateInput_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							dateInput_1.bind("value").toDataSet(app.lookup("ds_profile"), "member_birthday", 0);
							dateInput_1.bind("placeholder").toDataSet(app.lookup("ds_profile"), "member_birthday", 0);
							container.addChild(dateInput_1, {
								"colIndex": 1,
								"rowIndex": 6
							});
							var maskEditor_1 = new cpr.controls.MaskEditor("ipbPhone");
							maskEditor_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							maskEditor_1.bind("value").toDataSet(app.lookup("ds_profile"), "member_phone", 0);
							maskEditor_1.bind("mask").toDataSet(app.lookup("ds_profile"), "member_phone", 0);
							container.addChild(maskEditor_1, {
								"colIndex": 1,
								"rowIndex": 7
							});
							var output_9 = new cpr.controls.Output();
							output_9.value = "Output";
							container.addChild(output_9, {
								"colIndex": 1,
								"rowIndex": 2
							});
							var output_10 = new cpr.controls.Output();
							output_10.value = "❈ 1자 이상~25자 이하";
							output_10.style.css({
								"font-size" : "10px"
							});
							container.addChild(output_10, {
								"colIndex": 0,
								"rowIndex": 2
							});
						})(group_4);
						container.addChild(group_4, {
							"top": "53px",
							"right": "4px",
							"bottom": "75px",
							"left": "5px"
						});
						var group_5 = new cpr.controls.Container();
						var formLayout_2 = new cpr.controls.layouts.FormLayout();
						formLayout_2.scrollable = false;
						formLayout_2.topMargin = "0px";
						formLayout_2.rightMargin = "0px";
						formLayout_2.bottomMargin = "0px";
						formLayout_2.leftMargin = "0px";
						formLayout_2.horizontalSpacing = "30px";
						formLayout_2.verticalSpacing = "10px";
						formLayout_2.setColumns(["60px", "70px", "70px", "70px", "60px"]);
						formLayout_2.setRows(["1fr"]);
						group_5.setLayout(formLayout_2);
						(function(container){
							var button_1 = new cpr.controls.Button("btnMemUpdate");
							button_1.value = "수정";
							button_1.style.css({
								"border-right-style" : "solid",
								"color" : "#097f3d",
								"border-bottom-color" : "#097f3d",
								"border-top-width" : "2px",
								"font-weight" : "bolder",
								"border-right-width" : "2px",
								"border-left-color" : "#097f3d",
								"font-size" : "16px",
								"border-right-color" : "#097f3d",
								"border-left-width" : "2px",
								"border-top-style" : "solid",
								"background-color" : "#dfefdc",
								"border-left-style" : "solid",
								"border-bottom-width" : "2px",
								"border-top-color" : "#097f3d",
								"border-bottom-style" : "solid",
								"background-image" : "none"
							});
							if(typeof onBtnMemUpdateClick == "function") {
								button_1.addEventListener("click", onBtnMemUpdateClick);
							}
							container.addChild(button_1, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var button_2 = new cpr.controls.Button("btnCancel");
							button_2.value = "취소";
							button_2.style.css({
								"border-right-style" : "solid",
								"border-top-width" : "2px",
								"border-bottom-color" : "#646464",
								"font-weight" : "bolder",
								"border-right-width" : "2px",
								"border-left-color" : "#646464",
								"font-size" : "16px",
								"border-right-color" : "#646464",
								"border-left-width" : "2px",
								"border-top-style" : "solid",
								"background-color" : "#F0F0F0",
								"border-left-style" : "solid",
								"border-bottom-width" : "2px",
								"border-top-color" : "#646464",
								"border-bottom-style" : "solid",
								"background-image" : "none"
							});
							if(typeof onBtnCancelClick == "function") {
								button_2.addEventListener("click", onBtnCancelClick);
							}
							container.addChild(button_2, {
								"colIndex": 3,
								"rowIndex": 0
							});
							var button_3 = new cpr.controls.Button("btnMemDelete");
							button_3.value = "탈퇴";
							button_3.style.css({
								"border-right-style" : "solid",
								"color" : "#FF0000",
								"border-bottom-color" : "#ff0000",
								"border-top-width" : "2px",
								"font-weight" : "bolder",
								"border-right-width" : "2px",
								"border-left-color" : "#ff0000",
								"border-right-color" : "#ff0000",
								"border-left-width" : "2px",
								"border-top-style" : "solid",
								"background-color" : "#FFEBEB",
								"border-left-style" : "solid",
								"border-bottom-width" : "2px",
								"border-top-color" : "#ff0000",
								"border-bottom-style" : "solid",
								"background-image" : "none"
							});
							if(typeof onBtnMemDeleteClick == "function") {
								button_3.addEventListener("click", onBtnMemDeleteClick);
							}
							container.addChild(button_3, {
								"colIndex": 2,
								"rowIndex": 0
							});
						})(group_5);
						container.addChild(group_5, {
							"right": "20px",
							"bottom": "13px",
							"left": "20px",
							"height": "50px"
						});
					})(group_3);
					container.addChild(group_3, {
						"top": "60px",
						"right": "250px",
						"bottom": "20px",
						"left": "250px"
					});
					var group_6 = new cpr.controls.Container();
					group_6.style.setClasses(["a"]);
					group_6.style.css({
						"background-color" : "#7dbe70",
						"border-radius" : "10px"
					});
					var formLayout_3 = new cpr.controls.layouts.FormLayout();
					formLayout_3.scrollable = false;
					formLayout_3.topMargin = "10px";
					formLayout_3.rightMargin = "10px";
					formLayout_3.bottomMargin = "10px";
					formLayout_3.leftMargin = "10px";
					formLayout_3.horizontalSpacing = "0px";
					formLayout_3.verticalSpacing = "0px";
					formLayout_3.setColumns(["1fr"]);
					formLayout_3.setRows(["1fr"]);
					group_6.setLayout(formLayout_3);
					(function(container){
						var output_11 = new cpr.controls.Output();
						output_11.value = "My Page";
						output_11.style.css({
							"color" : "#FFFFFF",
							"font-weight" : "bolder",
							"font-size" : "32px",
							"text-align" : "center"
						});
						container.addChild(output_11, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_6);
					container.addChild(group_6, {
						"top": "26px",
						"right": "353px",
						"left": "354px",
						"height": "69px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "20px",
					"right": "20px",
					"bottom": "20px",
					"left": "20px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"right": "0px",
				"bottom": "0px",
				"left": "0px"
			});
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "profile-form";
	cpr.core.Platform.INSTANCE.register(app);
})();
