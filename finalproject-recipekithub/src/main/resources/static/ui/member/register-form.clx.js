/*
 * App URI: member/register-form
 * Source Location: member/register-form.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/register-form", { 
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
			 * register-form.js
			 * Created at 2023. 8. 10. 오후 3:52:01.
			 *
			 * @author kjoon
			 ************************************************/

			/*
			 * "가입" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e) {
				var dataMap1 = app.lookup("dm_register_member");
				var dataMap2 = app.lookup("dm_check_email");
				var dataMap3 = app.lookup("dm_check_pswd");
				var dataMap4 = app.lookup("dm_check_nick");
				dataMap2.setValue("member_email", app.lookup("ipbEmail").value);
				dataMap3.setValue("member_password", app.lookup("ipbPassword1").value);
				dataMap1.setValue("member_name", app.lookup("ipbName").value);
				dataMap4.setValue("member_nick", app.lookup("ipbNick").value);
				dataMap1.setValue("member_birthday", app.lookup("ipbBirthday").value);
				dataMap1.setValue("member_phone", app.lookup("ipbPhone").value);
				dataMap1.setValue("member_postcode", app.lookup("postCode").value);
				dataMap1.setValue("member_address", app.lookup("address").value);
				dataMap1.setValue("member_address_detail", app.lookup("detailAddress").value);
				var subLogin = app.lookup("sub_register");
				subLogin.send();
			}

			/*
			 * "취소" 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick2(e) {
				window.location.href = "index.clx";
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_registerSubmitSuccess(e) {
				var sub_register = e.control;
				alert("RecipeKitHub에 오신 것을 환영합니다..!!")
				var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
				httpPostMethod.submit();
			}

			/*
			 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
			 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onIpbEmailKeyup(e) {
				var ipbEmail = e.control;
				var subCheckEmail = app.lookup("sub_check_email");
				subCheckEmail.send();
				var checkEmailFlag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
				var metadata = subCheckEmail.getMetadata("message");
				
				var dataMap = app.lookup("dm_check_email");
				dataMap.setValue("member_email", app.lookup("ipbEmail").value);
				
				var memberEmail = app.lookup("ipbEmail").value;
				var opbCheckEmailResult = app.lookup("opbCheckEmail");
				
				if (memberEmail.length < 6 || memberEmail.length > 30) {
					opbCheckEmailResult.value = "email은 6자이상 ~ 30자 이하이어야 합니다.";
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							//if (xhr.responseText == "fail") {
							if (metadata == "fail") {
								opbCheckEmailResult.value = "이메일이 중복됩니다.";
							} else {
								checkEmailFlag = true;
								opbCheckEmailResult.value = "사용가능한 이메일입니다.";
							}
						}
					}
					//xhr.open("get", "../member/checkEmail", true);
					//xhr.open("get", "../member/checkEmail?memberEmail=" + memberEmail, true);
					//xhr.send();
					
				}
			}

			/*
			function checkMemberEmail() {
				var checkEmailFlag = false;	// 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
				var memberEmail = app.lookup("ipbEmail").value;
				var opbCheckEmailResult = app.lookup("opbCheckEmail");
				if (memberEmail.length < 6 || memberEmail.length > 25) {
					opbCheckEmailResult = "<font color=pink>email은 6자이상 ~ 30자 이하이어야 합니다.</font>";
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							if (xhr.responseText == "fail") {
								opbCheckEmailResult = "<font color=red>이메일이 중복됩니다.</font>";
							} else {
								checkEmailFlag = true;
								opbCheckEmailResult = "<font color=blue>사용가능한 이메일입니다.</font>";
							}
						}
					}
					xhr.open("get", "../member/CheckEmail");
					xhr.send();
				}
			}
			*/


			/*
			 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
			 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onIpbPassword1Keyup(e) {
				var ipbPassword1 = e.control;
				var checkPswd1Flag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
				var password1 = app.lookup("ipbPassword1").text;
				console.log(password1);
				var checkPswdResult1 = app.lookup("opbCheckPassword").text;
				if (password1.length < 2 || password1.length > 25) {
					checkPswdResult1 = "비밀번호는 1자 이상 25자 이하이어야 합니다.";
				} else {
					checkPswdResult1 = "사용가능한 비밀번호입니다.";
				}
			}

			/*
			 * 인풋 박스에서 keyup 이벤트 발생 시 호출.
			 * 사용자가 키에서 손을 뗄 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onIpbPassword2Keyup(e) {
				var ipbPassword2 = e.control;
				var checkPswd2Flag = false;
				var password2 = app.lookup("ipbPassword2").value;
				var checkPswdResult2 = app.lookup("opbCheckPassword1");
				//var pswd2_img1 = document.getElementById("pswd2_img1");
				
				if (app.lookup("ipbPassword1").value != password2) {
					checkPswdResult2 = "<font color=red>위의 비밀번호와 일치하지 않습니다. 다시 한번 확인해주세요.</font>";
					//pswd2_img1.classList.remove("glow"); 
					
				} else {
					checkPswdResult2 = "<font color=blue>비밀번호가 일치합니다.</font>";
					//pswd1_img1.classList.add("glow"); 
					//pswd2_img1.classList.add("glow"); 
				}
			}

			/*
			function comparePassword() {
				var checkPswd2Flag = false;
				var password2 = app.lookup("ipbPassword2").value;
				var checkPswdResult2 = app.lookup("opbCheckPassword2");
				//var pswd2_img1 = document.getElementById("pswd2_img1");
				
				if (app.lookup("ipbPassword1").value != password2) {
					checkPswdResult2 = "<font color=red>위의 비밀번호와 일치하지 않습니다. 다시 한번 확인해주세요.</font>";
					//pswd2_img1.classList.remove("glow"); 
					
				} else {
					checkPswdResult2 = "<font color=blue>비밀번호가 일치합니다.</font>";
					//pswd1_img1.classList.add("glow"); 
					//pswd2_img1.classList.add("glow"); 
				}
			}
			*/

			function checkNick() {
				var checkNickFlag = false; // 사용자가 사용 가능 상태에서 다시 사용불가 상태 아이디로 입력할 수 있으므로 keyup 이벤트 발생시마다 false로 상태 초기화
				var memberNick = app.lookup("ipbNick").value;
				var checkNickResult = document.getElementById("checkNickResult");
				if (memberNick.length < 2 || memberNick.length > 10) {
					checkNickResult = "닉네임은 1자 이상 ~ 8자 이하이어야 합니다.";
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							if (xhr.responseText == "fail") {
								checkNickResult = "닉네임이 중복됩니다.";
							} else {
								checkNickFlag = true;
								checkNickResult = "사용가능한 닉네임입니다.";
							}
						}
					}
					xhr.open("get", "../CheckNick");
					xhr.send();
				}
			}



			/*
			 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
			 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
			 */
			function onBodyInit(e) {
				// 다음에서 제공하는 통합로딩 url
				var voResourceLoader = new cpr.core.ResourceLoader();
				voResourceLoader.addScript("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js").load().then(function(input) {
					//후처리
				});
			}

			/*
			 * "우편번호" 버튼(btnPostcode)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onBtnPostcodeClick(e) {
				//var btnPostcode = e.control;
				//app.lookup("btnPostcode").click();
				
				postCode();
			}

			var appConf = cpr.core.AppConfig.INSTANCE;
			appConf.getEnvConfig().setValue("appcache", true);

			function postCode() {
				new daum.Postcode({
					/* 해당 정보를 받아 처리할 콜백 함수를 정의하는 부분 입니다. */
					oncomplete: function(data) {
						/* 팝업에서 검색결과 항목을 클릭했을떄 실행할 코드를 작성하는 부분 */
						var vcPostCode = app.lookup("postCode");
						var vcAddress = app.lookup("address");
						var vcDetailAddress = app.lookup("detailAddress");
						
						// 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
						// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
						var roadAddr = data.roadAddress; // 도로명 주소 변수
						var extraRoadAddr = ""; // 참고 항목 변수
						
						// 법정동명이 있을 경우 추가한다. (법정리는 제외)
						// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
						if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
							extraRoadAddr += data.bname;
						}
						// 건물명이 있고, 공동주택일 경우 추가한다.
						if (data.buildingName !== "" && data.apartment === "Y") {
							extraRoadAddr += (extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName);
						}
						
						// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
						if (extraRoadAddr !== "") {
							extraRoadAddr = " (" + extraRoadAddr + ")";
						}
						
						// 우편번호와 주소 정보를 해당 필드에 넣는다.
						vcPostCode.value = data.zonecode;
						
						// 사용자가 도로명 주소를 선택한 경우
						if (data.userSelectedType === "R") {
							vcAddress.value = roadAddr + extraRoadAddr; // 참고항목이 있다면, 괄호와 함께 추가한다.
						}
						// 사용자가 지번 주소를 선택한 경우
						else if (data.userSelectedType === "J") {
							vcAddress.value = data.jibunAddress;
						}
						
						// 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
						if (roadAddr !== "") {
							vcDetailAddress.value = extraRoadAddr;
						} else {
							vcDetailAddress.value = "";
						}
						
						/*커서를 상세주소 필드로 이동합니다. */
						vcDetailAddress.focus();
					}
				}).open();
			}

			/*
			 * 루트 컨테이너에서 unload 이벤트 발생 시 호출.
			 * 앱이 언로드된 후 발생하는 이벤트입니다.
			 */
			function onBodyUnload(e) {
				var appConf = cpr.core.AppConfig.INSTANCE;
				appConf.getEnvConfig().setValue("appcache", false);
			}
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
					},
					{
						"name": "member_postcode",
						"dataType": "string"
					},
					{
						"name": "member_address_detail",
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
						"name": "member_postcode",
						"dataType": "string"
					},
					{
						"name": "member_address_detail",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			
			var dataMap_2 = new cpr.data.DataMap("dm_check_email");
			dataMap_2.parseData({
				"columns" : [{
					"name": "member_email",
					"dataType": "string"
				}]
			});
			app.register(dataMap_2);
			
			var dataMap_3 = new cpr.data.DataMap("dm_check_pswd");
			dataMap_3.parseData({
				"columns" : [{
					"name": "member_password",
					"dataType": "string"
				}]
			});
			app.register(dataMap_3);
			
			var dataMap_4 = new cpr.data.DataMap("dm_check_nick");
			dataMap_4.parseData({
				"columns" : [{
					"name": "member_nick",
					"dataType": "string"
				}]
			});
			app.register(dataMap_4);
			var submission_1 = new cpr.protocols.Submission("sub_register");
			submission_1.action = "/member/register";
			submission_1.addRequestData(dataMap_2);
			submission_1.addRequestData(dataMap_3);
			submission_1.addRequestData(dataMap_4);
			submission_1.addRequestData(dataMap_1);
			if(typeof onSub_registerSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSub_registerSubmitSuccess);
			}
			app.register(submission_1);
			
			var submission_2 = new cpr.protocols.Submission("sub_check_email");
			submission_2.action = "/member/checkEmail";
			submission_2.addRequestData(dataMap_2);
			app.register(submission_2);
			
			var submission_3 = new cpr.protocols.Submission("sub_check_password");
			submission_3.action = "/member/checkPswd";
			submission_3.addRequestData(dataMap_3);
			app.register(submission_3);
			
			var submission_4 = new cpr.protocols.Submission("sub_check_nick");
			submission_4.action = "/member/checkNick";
			submission_4.addRequestData(dataMap_4);
			app.register(submission_4);
			app.supportMedia("all and (min-width: 1920px)", "FHD");
			app.supportMedia("all and (min-width: 1024px) and (max-width: 1919px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"background-color" : "#FFFFF6",
				"width" : "100%",
				"height" : "100%"
			});
			
			// Layout
			var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
			container.setLayout(responsiveXYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-repeat" : "no-repeat",
				"background-size" : "cover",
				"background-image" : "url('theme/images/member/20.png')",
				"background-position" : "center"
			});
			var xYLayout_1 = new cpr.controls.layouts.XYLayout();
			group_1.setLayout(xYLayout_1);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"background-size" : "cover",
					"background-position" : "center"
				});
				var xYLayout_2 = new cpr.controls.layouts.XYLayout();
				group_2.setLayout(xYLayout_2);
				(function(container){
					var group_3 = new cpr.controls.Container();
					group_3.style.css({
						"background-color" : "#E5F2E3",
						"border-radius" : "10px"
					});
					var responsiveXYLayout_2 = new cpr.controls.layouts.ResponsiveXYLayout();
					group_3.setLayout(responsiveXYLayout_2);
					(function(container){
						var group_4 = new cpr.controls.Container();
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
						group_4.setLayout(formLayout_1);
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
						})(group_4);
						container.addChild(group_4, {
							positions: [
								{
									"media": "all and (min-width: 1920px)",
									"top": "20px",
									"right": "347px",
									"left": "341px",
									"height": "52px"
								}, 
								{
									"media": "all and (min-width: 1024px) and (max-width: 1919px)",
									"top": "20px",
									"right": "185px",
									"left": "182px",
									"height": "52px"
								}, 
								{
									"media": "all and (min-width: 500px) and (max-width: 1023px)",
									"top": "20px",
									"right": "90px",
									"left": "89px",
									"height": "52px"
								}, 
								{
									"media": "all and (max-width: 499px)",
									"top": "20px",
									"right": "63px",
									"left": "62px",
									"height": "52px"
								}
							]
						});
						var group_5 = new cpr.controls.Container();
						var xYLayout_3 = new cpr.controls.layouts.XYLayout();
						group_5.setLayout(xYLayout_3);
						(function(container){
							var group_6 = new cpr.controls.Container();
							var xYLayout_4 = new cpr.controls.layouts.XYLayout();
							group_6.setLayout(xYLayout_4);
							(function(container){
								var group_7 = new cpr.controls.Container();
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
								group_7.setLayout(formLayout_2);
								(function(container){
									var button_1 = new cpr.controls.Button();
									button_1.value = "가입";
									button_1.style.css({
										"border-right-style" : "solid",
										"border-bottom-color" : "#097f3d",
										"border-top-width" : "2px",
										"color" : "#097f3d",
										"border-right-width" : "2px",
										"font-weight" : "bolder",
										"border-left-color" : "#097f3d",
										"font-size" : "16px",
										"border-right-color" : "#097f3d",
										"border-left-width" : "2px",
										"border-top-style" : "solid",
										"background-color" : "#FFFFFF",
										"text-shadow" : "none",
										"border-left-style" : "solid",
										"border-bottom-width" : "2px",
										"border-top-color" : "#097f3d",
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
										"font-weight" : "bolder",
										"border-left-color" : "#a0a0a0",
										"font-size" : "16px",
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
								})(group_7);
								container.addChild(group_7, {
									"top": "578px",
									"right": "21px",
									"bottom": "5px",
									"left": "20px"
								});
							})(group_6);
							container.addChild(group_6, {
								"top": "19px",
								"right": "0px",
								"bottom": "0px",
								"left": "0px"
							});
							var group_8 = new cpr.controls.Container();
							group_8.style.css({
								"background-color" : "#FFFFFF",
								"border-radius" : "10px"
							});
							var formLayout_3 = new cpr.controls.layouts.FormLayout();
							formLayout_3.scrollable = false;
							formLayout_3.topMargin = "20px";
							formLayout_3.rightMargin = "10px";
							formLayout_3.bottomMargin = "20px";
							formLayout_3.leftMargin = "20px";
							formLayout_3.horizontalSpacing = "20px";
							formLayout_3.verticalSpacing = "20px";
							formLayout_3.setColumns(["120px", "200px", "80px"]);
							formLayout_3.setRows(["30px", "25px", "30px", "25px", "30px", "30px", "30px", "30px", "30px", "115px"]);
							group_8.setLayout(formLayout_3);
							(function(container){
								var output_2 = new cpr.controls.Output();
								output_2.value = " - Email";
								output_2.style.setClasses(["emphasis"]);
								output_2.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_2, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var output_3 = new cpr.controls.Output();
								output_3.value = " - 비밀번호";
								output_3.style.setClasses(["emphasis"]);
								output_3.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_3, {
									"colIndex": 0,
									"rowIndex": 2
								});
								var output_4 = new cpr.controls.Output();
								output_4.value = " - 비밀번호 확인";
								output_4.style.setClasses(["emphasis"]);
								output_4.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_4, {
									"colIndex": 0,
									"rowIndex": 4
								});
								var output_5 = new cpr.controls.Output();
								output_5.value = " - 이름";
								output_5.style.setClasses(["emphasis"]);
								output_5.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_5, {
									"colIndex": 0,
									"rowIndex": 5
								});
								var output_6 = new cpr.controls.Output();
								output_6.value = " - 닉네임";
								output_6.style.setClasses(["emphasis"]);
								output_6.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_6, {
									"colIndex": 0,
									"rowIndex": 6
								});
								var output_7 = new cpr.controls.Output();
								output_7.value = " - 생년월일";
								output_7.style.setClasses(["emphasis"]);
								output_7.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_7, {
									"colIndex": 0,
									"rowIndex": 7
								});
								var output_8 = new cpr.controls.Output();
								output_8.value = " - 핸드폰 번호";
								output_8.style.setClasses(["emphasis"]);
								output_8.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px",
									"font-weight" : "bold",
									"font-size" : "15px"
								});
								container.addChild(output_8, {
									"colIndex": 0,
									"rowIndex": 8
								});
								var inputBox_1 = new cpr.controls.InputBox("ipbEmail");
								inputBox_1.showClearButton = true;
								inputBox_1.maxLength = 30;
								inputBox_1.spellCheck = false;
								inputBox_1.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								inputBox_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_email");
								if(typeof onIpbEmailKeyup == "function") {
									inputBox_1.addEventListener("keyup", onIpbEmailKeyup);
								}
								container.addChild(inputBox_1, {
									"colIndex": 1,
									"rowIndex": 0,
									"colSpan": 1,
									"rowSpan": 1
								});
								var inputBox_2 = new cpr.controls.InputBox("ipbPassword1");
								inputBox_2.showClearButton = true;
								inputBox_2.maxLength = 25;
								inputBox_2.spellCheck = false;
								inputBox_2.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								inputBox_2.bind("value").toDataMap(app.lookup("dm_register_member"), "member_password");
								if(typeof onIpbPassword1Keyup == "function") {
									inputBox_2.addEventListener("keyup", onIpbPassword1Keyup);
								}
								container.addChild(inputBox_2, {
									"colIndex": 1,
									"rowIndex": 2
								});
								var inputBox_3 = new cpr.controls.InputBox("ipbPassword2");
								inputBox_3.showClearButton = true;
								inputBox_3.maxLength = 25;
								inputBox_3.spellCheck = false;
								inputBox_3.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								if(typeof onIpbPassword2Keyup == "function") {
									inputBox_3.addEventListener("keyup", onIpbPassword2Keyup);
								}
								container.addChild(inputBox_3, {
									"colIndex": 1,
									"rowIndex": 4
								});
								var inputBox_4 = new cpr.controls.InputBox("ipbName");
								inputBox_4.showClearButton = true;
								inputBox_4.lengthUnit = "utf8";
								inputBox_4.maxLength = 18;
								inputBox_4.spellCheck = false;
								inputBox_4.imeMode = "active";
								inputBox_4.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								inputBox_4.bind("value").toDataMap(app.lookup("dm_register_member"), "member_name");
								container.addChild(inputBox_4, {
									"colIndex": 1,
									"rowIndex": 5
								});
								var inputBox_5 = new cpr.controls.InputBox("ipbNick");
								inputBox_5.showClearButton = true;
								inputBox_5.lengthUnit = "utf8";
								inputBox_5.maxLength = 24;
								inputBox_5.spellCheck = false;
								inputBox_5.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								inputBox_5.bind("value").toDataMap(app.lookup("dm_register_member"), "member_nick");
								container.addChild(inputBox_5, {
									"colIndex": 1,
									"rowIndex": 6
								});
								var dateInput_1 = new cpr.controls.DateInput("ipbBirthday");
								dateInput_1.spinButton = true;
								dateInput_1.showClearButton = true;
								dateInput_1.style.setClasses(["cl-dateinput-register", "single-datepicker"]);
								dateInput_1.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								dateInput_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_birthday");
								container.addChild(dateInput_1, {
									"colIndex": 1,
									"rowIndex": 7
								});
								var maskEditor_1 = new cpr.controls.MaskEditor("ipbPhone");
								maskEditor_1.mask = "000-0000-0000";
								maskEditor_1.showClearButton = true;
								maskEditor_1.style.css({
									"border-radius" : "5px",
									"font-size" : "15px"
								});
								maskEditor_1.bind("value").toDataMap(app.lookup("dm_register_member"), "member_phone");
								container.addChild(maskEditor_1, {
									"colIndex": 1,
									"rowIndex": 8
								});
								var output_9 = new cpr.controls.Output("opbCheckEmail");
								output_9.value = "";
								output_9.style.css({
									"font-size" : "12px"
								});
								if(typeof onOpbCheckEmailValueChange == "function") {
									output_9.addEventListener("value-change", onOpbCheckEmailValueChange);
								}
								container.addChild(output_9, {
									"colIndex": 1,
									"rowIndex": 1,
									"colSpan": 2,
									"rowSpan": 1
								});
								var output_10 = new cpr.controls.Output("opbCheckPassword");
								output_10.value = "";
								output_10.style.css({
									"font-size" : "12px"
								});
								if(typeof onOpbCheckPassword1ValueChange == "function") {
									output_10.addEventListener("value-change", onOpbCheckPassword1ValueChange);
								}
								container.addChild(output_10, {
									"colIndex": 1,
									"rowIndex": 3,
									"colSpan": 2,
									"rowSpan": 1
								});
								var output_11 = new cpr.controls.Output();
								output_11.value = "❈ 이메일 형식, 30자 이하";
								output_11.style.css({
									"font-size" : "10px"
								});
								container.addChild(output_11, {
									"colIndex": 0,
									"rowIndex": 1
								});
								var output_12 = new cpr.controls.Output();
								output_12.value = "❈ 1자 이상~25자 이하";
								output_12.style.css({
									"font-size" : "10px"
								});
								container.addChild(output_12, {
									"colIndex": 0,
									"rowIndex": 3
								});
								var group_9 = new cpr.controls.Container();
								group_9.style.css({
									"background-color" : "#F0F0F0",
									"border-radius" : "5px"
								});
								var formLayout_4 = new cpr.controls.layouts.FormLayout();
								formLayout_4.scrollable = false;
								formLayout_4.topMargin = "5px";
								formLayout_4.rightMargin = "5px";
								formLayout_4.bottomMargin = "5px";
								formLayout_4.leftMargin = "5px";
								formLayout_4.horizontalSpacing = "10px";
								formLayout_4.verticalSpacing = "10px";
								formLayout_4.setColumns(["1fr"]);
								formLayout_4.setRows(["30px", "25px"]);
								group_9.setLayout(formLayout_4);
								(function(container){
									var output_13 = new cpr.controls.Output();
									output_13.value = " - 주소";
									output_13.style.css({
										"font-weight" : "bold",
										"font-size" : "15px"
									});
									container.addChild(output_13, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_9);
								container.addChild(group_9, {
									"colIndex": 0,
									"rowIndex": 9
								});
								var group_10 = new cpr.controls.Container();
								var formLayout_5 = new cpr.controls.layouts.FormLayout();
								formLayout_5.scrollable = false;
								formLayout_5.topMargin = "5px";
								formLayout_5.rightMargin = "5px";
								formLayout_5.bottomMargin = "5px";
								formLayout_5.leftMargin = "5px";
								formLayout_5.horizontalSpacing = "10px";
								formLayout_5.verticalSpacing = "10px";
								formLayout_5.setColumns(["180px", "100px"]);
								formLayout_5.setRows(["26px", "30px", "30px"]);
								group_10.setLayout(formLayout_5);
								(function(container){
									var button_3 = new cpr.controls.Button("btnPostcode");
									button_3.value = "우편번호";
									if(typeof onBtnPostcodeClick == "function") {
										button_3.addEventListener("click", onBtnPostcodeClick);
									}
									container.addChild(button_3, {
										"colIndex": 1,
										"rowIndex": 0
									});
									var inputBox_6 = new cpr.controls.InputBox("address");
									inputBox_6.lengthUnit = "utf8";
									inputBox_6.maxLength = 30;
									inputBox_6.bind("value").toDataMap(app.lookup("dm_register_member"), "member_address");
									container.addChild(inputBox_6, {
										"colIndex": 0,
										"rowIndex": 1,
										"colSpan": 2,
										"rowSpan": 1
									});
									var inputBox_7 = new cpr.controls.InputBox("detailAddress");
									inputBox_7.lengthUnit = "utf8";
									inputBox_7.maxLength = 30;
									inputBox_7.bind("value").toDataMap(app.lookup("dm_register_member"), "member_address_detail");
									container.addChild(inputBox_7, {
										"colIndex": 0,
										"rowIndex": 2,
										"colSpan": 2,
										"rowSpan": 1
									});
									var maskEditor_2 = new cpr.controls.MaskEditor("postCode");
									maskEditor_2.mask = "00000";
									maskEditor_2.bind("value").toDataMap(app.lookup("dm_register_member"), "member_postcode");
									container.addChild(maskEditor_2, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_10);
								container.addChild(group_10, {
									"colIndex": 1,
									"rowIndex": 9,
									"colSpan": 2,
									"rowSpan": 1
								});
								var group_11 = new cpr.controls.Container();
								var formLayout_6 = new cpr.controls.layouts.FormLayout();
								formLayout_6.scrollable = false;
								formLayout_6.topMargin = "0px";
								formLayout_6.rightMargin = "0px";
								formLayout_6.bottomMargin = "0px";
								formLayout_6.leftMargin = "0px";
								formLayout_6.horizontalSpacing = "0px";
								formLayout_6.verticalSpacing = "0px";
								formLayout_6.setColumns(["1fr"]);
								formLayout_6.setRows(["1fr"]);
								group_11.setLayout(formLayout_6);
								(function(container){
									var image_1 = new cpr.controls.Image();
									image_1.src = "theme/images/member/circle-check-regular.svg";
									container.addChild(image_1, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_11);
								container.addChild(group_11, {
									"colIndex": 2,
									"rowIndex": 2
								});
								var group_12 = new cpr.controls.Container();
								var formLayout_7 = new cpr.controls.layouts.FormLayout();
								formLayout_7.scrollable = false;
								formLayout_7.topMargin = "0px";
								formLayout_7.rightMargin = "0px";
								formLayout_7.bottomMargin = "0px";
								formLayout_7.leftMargin = "0px";
								formLayout_7.horizontalSpacing = "0px";
								formLayout_7.verticalSpacing = "0px";
								formLayout_7.setColumns(["1fr"]);
								formLayout_7.setRows(["1fr"]);
								group_12.setLayout(formLayout_7);
								(function(container){
									var image_2 = new cpr.controls.Image();
									image_2.src = "theme/images/member/circle-check-solid (1).svg";
									container.addChild(image_2, {
										"colIndex": 0,
										"rowIndex": 0
									});
								})(group_12);
								container.addChild(group_12, {
									"colIndex": 2,
									"rowIndex": 4
								});
								var output_14 = new cpr.controls.Output();
								output_14.value = "Output";
								container.addChild(output_14, {
									"colIndex": 2,
									"rowIndex": 6
								});
							})(group_8);
							container.addChild(group_8, {
								"top": "5px",
								"right": "0px",
								"bottom": "60px",
								"left": "0px"
							});
						})(group_5);
						container.addChild(group_5, {
							positions: [
								{
									"media": "all and (min-width: 1920px)",
									"top": "81px",
									"right": "54px",
									"bottom": "10px",
									"left": "56px"
								}, 
								{
									"media": "all and (min-width: 1024px) and (max-width: 1919px)",
									"top": "81px",
									"right": "29px",
									"bottom": "10px",
									"left": "30px"
								}, 
								{
									"media": "all and (min-width: 500px) and (max-width: 1023px)",
									"top": "81px",
									"right": "14px",
									"bottom": "10px",
									"left": "15px"
								}, 
								{
									"media": "all and (max-width: 499px)",
									"top": "81px",
									"right": "10px",
									"bottom": "10px",
									"left": "10px"
								}
							]
						});
					})(group_3);
					container.addChild(group_3, {
						"width": "530px",
						"height": "738px",
						"left": "calc(50% - 265px)",
						"top": "calc(50% - 369px)"
					});
				})(group_2);
				container.addChild(group_2, {
					"top": "0px",
					"right": "20px",
					"bottom": "0px",
					"left": "20px"
				});
			})(group_1);
			container.addChild(group_1, {
				positions: [
					{
						"media": "all and (min-width: 1920px)",
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"left": "0px"
					}, 
					{
						"media": "all and (min-width: 1024px) and (max-width: 1919px)",
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"left": "0px"
					}, 
					{
						"media": "all and (min-width: 500px) and (max-width: 1023px)",
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"left": "0px"
					}, 
					{
						"media": "all and (max-width: 499px)",
						"top": "0px",
						"right": "0px",
						"bottom": "0px",
						"left": "0px"
					}
				]
			});
			if(typeof onBodyInit == "function"){
				app.addEventListener("init", onBodyInit);
			}
			if(typeof onBodyUnload == "function"){
				app.addEventListener("unload", onBodyUnload);
			}
		}
	});
	app.title = "register-form";
	cpr.core.Platform.INSTANCE.register(app);
})();
