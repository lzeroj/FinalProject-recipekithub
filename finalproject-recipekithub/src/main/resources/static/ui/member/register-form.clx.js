/*
 * App URI: member/register-form
 * Source Location: member/register-form.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/register-form", { 
		onPrepare: function(loader) {
		},
		onCreate: function(/* cpr.core.AppInstance */ app, exports) {
			var linker = {};
			// Start - User Script
			/************************************************
			 * register-form.js
			 * Created at 2023. 8. 10. 오후 3:52:01.
			 *
			 * @author kjoon
			 ************************************************/

			/*
			 * "가입" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				
			}

			/*
			 * "취소" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e){
				var button = e.control;
				
			};
			// End - User Script
			
			// Header
			var dataSet_1 = new cpr.data.DataSet("ds_member");
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
			app.register(dataSet_1);
			var dataMap_1 = new cpr.data.DataMap("dm_register_member");
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
			var submission_1 = new cpr.protocols.Submission("sub_register");
			submission_1.action = "/register";
			submission_1.addRequestData(dataMap_1);
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
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
				"background-color" : "#FEF9F6",
				"background-size" : "cover",
				"background-image" : "url('theme/images/member/clipboard.png')",
				"background-position" : "center"
			});
			var xYLayout_2 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				var xYLayout_3 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_3);
				(function(container){
					var group_3 = new cpr.controls.Container();
					var formLayout_1 = new cpr.controls.layouts.FormLayout();
					formLayout_1.scrollable = false;
					formLayout_1.topMargin = "5px";
					formLayout_1.rightMargin = "5px";
					formLayout_1.bottomMargin = "5px";
					formLayout_1.leftMargin = "5px";
					formLayout_1.horizontalSpacing = "0px";
					formLayout_1.verticalSpacing = "0px";
					formLayout_1.setColumns(["1fr"]);
					formLayout_1.setRows(["1fr"]);
					group_3.setLayout(formLayout_1);
					(function(container){
						var output_1 = new cpr.controls.Output();
						output_1.value = "회원가입";
						output_1.style.css({
							"font-weight" : "bolder",
							"font-size" : "32px",
							"text-align" : "center"
						});
						container.addChild(output_1, {
							"colIndex": 0,
							"rowIndex": 0
						});
					})(group_3);
					container.addChild(group_3, {
						"top": "20px",
						"left": "182px",
						"width": "163px",
						"height": "52px"
					});
					var group_4 = new cpr.controls.Container();
					var xYLayout_4 = new cpr.controls.layouts.XYLayout();
					group_4.setLayout(xYLayout_4);
					(function(container){
						var group_5 = new cpr.controls.Container();
						var xYLayout_5 = new cpr.controls.layouts.XYLayout();
						group_5.setLayout(xYLayout_5);
						(function(container){
							var group_6 = new cpr.controls.Container();
							var formLayout_2 = new cpr.controls.layouts.FormLayout();
							formLayout_2.scrollable = false;
							formLayout_2.topMargin = "0px";
							formLayout_2.rightMargin = "0px";
							formLayout_2.bottomMargin = "0px";
							formLayout_2.leftMargin = "0px";
							formLayout_2.horizontalSpacing = "20px";
							formLayout_2.verticalSpacing = "20px";
							formLayout_2.setColumns(["1fr", "1fr", "10px", "1fr", "1fr"]);
							formLayout_2.setRows(["1fr"]);
							group_6.setLayout(formLayout_2);
							(function(container){
								var button_1 = new cpr.controls.Button();
								button_1.value = "가입";
								button_1.style.css({
									"border-right-style" : "solid",
									"border-bottom-color" : "#ec631d",
									"border-top-width" : "2px",
									"color" : "#EC631D",
									"border-right-width" : "2px",
									"border-left-color" : "#ec631d",
									"border-right-color" : "#ec631d",
									"border-left-width" : "2px",
									"border-top-style" : "solid",
									"background-color" : "#FFFFFF",
									"text-shadow" : "none",
									"border-left-style" : "solid",
									"border-bottom-width" : "2px",
									"border-top-color" : "#ec631d",
									"border-bottom-style" : "solid",
									"background-image" : "none"
								});
								if(typeof onButtonClick == "function") {
									button_1.addEventListener("click", onButtonClick);
								}
								container.addChild(button_1, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var button_2 = new cpr.controls.Button();
								button_2.value = "취소";
								button_2.style.css({
									"border-right-style" : "solid",
									"border-top-width" : "2px",
									"border-bottom-color" : "#a0a0a0",
									"color" : "#646464",
									"border-right-width" : "2px",
									"border-left-color" : "#a0a0a0",
									"border-right-color" : "#a0a0a0",
									"border-left-width" : "2px",
									"border-top-style" : "solid",
									"background-color" : "#FFFFFF",
									"border-left-style" : "solid",
									"border-bottom-width" : "2px",
									"border-top-color" : "#a0a0a0",
									"border-bottom-style" : "solid",
									"background-image" : "none"
								});
								if(typeof onButtonClick2 == "function") {
									button_2.addEventListener("click", onButtonClick2);
								}
								container.addChild(button_2, {
									"colIndex": 3,
									"rowIndex": 0
								});
							})(group_6);
							container.addChild(group_6, {
								"top": "560px",
								"right": "21px",
								"bottom": "1px",
								"left": "20px"
							});
						})(group_5);
						container.addChild(group_5, {
							"top": "19px",
							"right": "0px",
							"bottom": "21px",
							"left": "0px"
						});
						var group_7 = new cpr.controls.Container();
						var formLayout_3 = new cpr.controls.layouts.FormLayout();
						formLayout_3.scrollable = false;
						formLayout_3.topMargin = "10px";
						formLayout_3.rightMargin = "10px";
						formLayout_3.bottomMargin = "0px";
						formLayout_3.leftMargin = "20px";
						formLayout_3.horizontalSpacing = "20px";
						formLayout_3.verticalSpacing = "20px";
						formLayout_3.setColumns(["120px", "200px", "80px"]);
						formLayout_3.setRows(["30px", "25px", "30px", "25px", "30px", "30px", "30px", "30px", "30px", "85px"]);
						group_7.setLayout(formLayout_3);
						(function(container){
							var output_2 = new cpr.controls.Output();
							output_2.value = " - Email";
							output_2.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_2, {
								"colIndex": 0,
								"rowIndex": 0
							});
							var output_3 = new cpr.controls.Output();
							output_3.value = " - 비밀번호";
							output_3.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_3, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var output_4 = new cpr.controls.Output();
							output_4.value = " - 비밀번호 확인";
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
							output_5.value = " - 이름";
							output_5.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_5, {
								"colIndex": 0,
								"rowIndex": 5
							});
							var output_6 = new cpr.controls.Output();
							output_6.value = " - 닉네임";
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
							output_7.value = " - 생년월일";
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
							output_8.value = " - 핸드폰 번호";
							output_8.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_8, {
								"colIndex": 0,
								"rowIndex": 8
							});
							var output_9 = new cpr.controls.Output();
							output_9.value = " - 주소";
							output_9.style.css({
								"background-color" : "#F0F0F0",
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(output_9, {
								"colIndex": 0,
								"rowIndex": 9
							});
							var inputBox_1 = new cpr.controls.InputBox("ipb1");
							inputBox_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_email");
							container.addChild(inputBox_1, {
								"colIndex": 1,
								"rowIndex": 0
							});
							var inputBox_2 = new cpr.controls.InputBox("ipb2");
							inputBox_2.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_2.bind("value").toDataMap(app.lookup("dm_register_member"), "member_password");
							container.addChild(inputBox_2, {
								"colIndex": 1,
								"rowIndex": 2
							});
							var inputBox_3 = new cpr.controls.InputBox("ipb3");
							inputBox_3.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							container.addChild(inputBox_3, {
								"colIndex": 1,
								"rowIndex": 4
							});
							var inputBox_4 = new cpr.controls.InputBox("ipb4");
							inputBox_4.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_4.bind("value").toDataMap(app.lookup("dm_register_member"), "member_name");
							container.addChild(inputBox_4, {
								"colIndex": 1,
								"rowIndex": 5
							});
							var inputBox_5 = new cpr.controls.InputBox("ipb5");
							inputBox_5.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							inputBox_5.bind("value").toDataMap(app.lookup("dm_register_member"), "member_nick");
							container.addChild(inputBox_5, {
								"colIndex": 1,
								"rowIndex": 6
							});
							var textArea_1 = new cpr.controls.TextArea("txa1");
							textArea_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							textArea_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_address");
							container.addChild(textArea_1, {
								"colIndex": 1,
								"rowIndex": 9
							});
							var dateInput_1 = new cpr.controls.DateInput("dti1");
							dateInput_1.style.setClasses(["cl-dateinput"]);
							dateInput_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							dateInput_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_birthday");
							container.addChild(dateInput_1, {
								"colIndex": 1,
								"rowIndex": 7
							});
							var maskEditor_1 = new cpr.controls.MaskEditor("mse1");
							maskEditor_1.mask = "000-0000-0000";
							maskEditor_1.style.css({
								"border-radius" : "5px",
								"font-size" : "15px"
							});
							maskEditor_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_phone");
							container.addChild(maskEditor_1, {
								"colIndex": 1,
								"rowIndex": 8
							});
							var button_3 = new cpr.controls.Button();
							button_3.value = "중복확인";
							container.addChild(button_3, {
								"colIndex": 2,
								"rowIndex": 0
							});
							var button_4 = new cpr.controls.Button();
							button_4.value = "중복확인";
							container.addChild(button_4, {
								"colIndex": 2,
								"rowIndex": 6
							});
						})(group_7);
						container.addChild(group_7, {
							"top": "19px",
							"left": "0px",
							"width": "471px",
							"height": "541px"
						});
					})(group_4);
					container.addChild(group_4, {
						"top": "81px",
						"right": "29px",
						"left": "30px",
						"height": "640px"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "20px",
					"right": "247px",
					"bottom": "22px",
					"left": "247px"
				});
			})(group_1);
			container.addChild(group_1, {
				"top": "0px",
				"left": "0px",
				"width": "1024px",
				"height": "768px"
			});
		}
	});
	app.title = "register-form";
	cpr.core.Platform.INSTANCE.register(app);
})();
