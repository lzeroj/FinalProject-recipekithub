/*
 * App URI: member/login-form
 * Source Location: member/login-form.clx
 *
 * This file was generated by eXBuilder6 compiler(1.0.4584), Don't edit manually.
 */
(function() {
	var app = new cpr.core.App("member/login-form", { 
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
			 * login-form.js
			 * Created at 2023. 8. 10. 오후 3:51:42.
			 *
			 * @author kjoon
			 ************************************************/

			/*
			 * "로그인" 버튼(loginBtn)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onLoginBtnClick(e) {
				//var loginBtn = e.control;
				var dataMap = app.lookup("dm_login");
				dataMap.setValue("member_email", app.lookup("emailInput").value);
				dataMap.setValue("member_password", app.lookup("pswdInput").value);
				var subLogin = app.lookup("sub_login");
				subLogin.send();
			}

			/*
			 * "회원가입" 버튼(registerBtn)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onRegisterBtnClick(e) {
				var registerBtn = e.control;
				window.location.href = "member/register-form.clx";
			}

			/*
			 * "이메일 / 비밀번호 찾기" 버튼(findBtn)에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onFindBtnClick(e) {
				var findBtn = e.control;
				window.location.href = "member/find-email-pswd.clx";
			}

			/*
			 * 서브미션에서 submit-success 이벤트 발생 시 호출.
			 * 통신이 성공하면 발생합니다.
			 */
			function onSub_loginSubmitSuccess(e) {
				var sub_login = e.control;
				//alert(sub_login.xhr.status);
				var checkBox = app.lookup("cbx1");
				var memberEmail = app.lookup("dm_login").getValue("member_email");
				
				// 현준
				if(checkBox.checked){
					localStorage.setItem("memberEmail", memberEmail);
				}
				setTimedSessionData("memsession", memberEmail,30);
				
				var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
				httpPostMethod.submit();
			}

			// 데이터 저장과 만료 시간 설정	// 현준
			function setTimedSessionData(key, value, expirationMinutes) {
			    var currentTime = new Date().getTime();
			    var expirationTime = currentTime + (expirationMinutes * 60 * 1000); // milliseconds

			    var data = {
			        value: value,
			        expirationTime: expirationTime
			    };
			    sessionStorage.setItem(key, JSON.stringify(data));
			}
			/*
			 * 서브미션에서 submit-error 이벤트 발생 시 호출.
			 * 통신 중 문제가 생기면 발생합니다.
			 */
			function onSub_loginSubmitError(e) {
				var sub_login = e.control;
				alert("회원 정보를 다시 확인해주시기 바랍니다.");
			}

			/*
			 * 인풋 박스에서 keydown 이벤트 발생 시 호출.
			 * 사용자가 키를 누를 때 발생하는 이벤트. 키코드 관련 상수는 {@link cpr.events.KeyCode}에서 참조할 수 있습니다.
			 */
			function onPswdInputKeydown(e) {
				var pswdInput = e.control;
				if (e.keyCode == cpr.events.KeyCode.ENTER) {
					app.lookup("btnLogin").click();
				}
			}

			/*
			 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
			 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
			 */
			function onBodyLoad(e){
				app.lookup("emailInput").focus();
				
				// 현준
				var item = localStorage.getItem("memberEmail");
				if(item == null || item == ''){
					return;
				}
				app.lookup("cbx1").checked = true;
				app.lookup("emailInput").text = item;
				app.lookup("pswdInput").focus();
			}

			/*
			 * 버튼에서 click 이벤트 발생 시 호출.
			 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
			 */
			function onButtonClick(e){
				var button = e.control;
				window.location.href = "index.clx";
			}

			/*

			//처음 실행하는 함수
			function init() {
				gapi.load('auth2', function() {
					gapi.auth2.init();
					options = new gapi.auth2.SigninOptionsBuilder();
					options.setPrompt('select_account');
			        // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
					options.setScope('email profile openid https://www.googleapis.com/auth/user.birthday.read');
			        // 인스턴스의 함수 호출 - element에 로그인 기능 추가
			        // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
					gapi.auth2.getAuthInstance().attachClickHandler('GgCustomLogin', options, onSignIn, onSignInFailure);
				})
			}


			function onSignIn(googleUser) {
			  var profile = googleUser.getBasicProfile();
			  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			  console.log('Name: ' + profile.getName());
			  console.log('Image URL: ' + profile.getImageUrl());
			  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
			}

			function onSignInFailure(t){		
				console.log(t);
			}

			*/
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
			var dataMap_1 = new cpr.data.DataMap("dm_login");
			dataMap_1.parseData({
				"columns" : [
					{
						"name": "member_email",
						"dataType": "string"
					},
					{
						"name": "member_password",
						"dataType": "string"
					}
				]
			});
			app.register(dataMap_1);
			var submission_1 = new cpr.protocols.Submission("sub_login");
			submission_1.action = "/member/login";
			submission_1.addRequestData(dataMap_1);
			if(typeof onSub_loginSubmitSuccess == "function") {
				submission_1.addEventListener("submit-success", onSub_loginSubmitSuccess);
			}
			if(typeof onSub_loginSubmitError == "function") {
				submission_1.addEventListener("submit-error", onSub_loginSubmitError);
			}
			app.register(submission_1);
			app.supportMedia("all and (min-width: 1024px)", "default");
			app.supportMedia("all and (min-width: 500px) and (max-width: 1023px)", "tablet");
			app.supportMedia("all and (max-width: 499px)", "mobile");
			
			// Configure root container
			var container = app.getContainer();
			container.style.css({
				"border-top-color" : "#0ca44e",
				"border-top-style" : "none",
				"border-right-style" : "none",
				"border-left-color" : "#0ca44e",
				"background-image" : "none",
				"border-bottom-style" : "none",
				"border-right-color" : "#0ca44e",
				"font-size" : "24px",
				"font-family" : "'fonts/PureunJeonnam.ttf' , 'Malgun Gothic' , sans-serif",
				"width" : "100%",
				"border-bottom-color" : "#0ca44e",
				"height" : "100%",
				"border-left-style" : "none"
			});
			
			// Layout
			var responsiveXYLayout_1 = new cpr.controls.layouts.ResponsiveXYLayout();
			container.setLayout(responsiveXYLayout_1);
			
			// UI Configuration
			var group_1 = new cpr.controls.Container();
			group_1.style.css({
				"background-color" : "#6A8B41"
			});
			var responsiveXYLayout_2 = new cpr.controls.layouts.ResponsiveXYLayout();
			group_1.setLayout(responsiveXYLayout_2);
			(function(container){
				var group_2 = new cpr.controls.Container();
				group_2.style.css({
					"border-radius" : "5px",
					"background-color" : "#F4FAEC",
					"background-repeat" : "no-repeat",
					"background-size" : "cover",
					"background-image" : "url('theme/images/member/20.png')",
					"background-position" : "center"
				});
				var responsiveXYLayout_3 = new cpr.controls.layouts.ResponsiveXYLayout();
				group_2.setLayout(responsiveXYLayout_3);
				(function(container){
					var group_3 = new cpr.controls.Container();
					group_3.style.css({
						"border-radius" : "10px",
						"background-color" : "#FFFFFF"
					});
					var xYLayout_1 = new cpr.controls.layouts.XYLayout();
					group_3.setLayout(xYLayout_1);
					(function(container){
						var group_4 = new cpr.controls.Container();
						group_4.style.css({
							"background-size" : "cover",
							"background-position" : "center",
							"background-image" : "url('theme/images/icon/recipekithubLog.png')"
						});
						var xYLayout_2 = new cpr.controls.layouts.XYLayout();
						group_4.setLayout(xYLayout_2);
						container.addChild(group_4, {
							"top": "20px",
							"width": "356px",
							"height": "209px",
							"left": "calc(50% - 178px)"
						});
						var group_5 = new cpr.controls.Container();
						var xYLayout_3 = new cpr.controls.layouts.XYLayout();
						group_5.setLayout(xYLayout_3);
						(function(container){
							var group_6 = new cpr.controls.Container();
							var formLayout_1 = new cpr.controls.layouts.FormLayout();
							formLayout_1.scrollable = false;
							formLayout_1.topMargin = "10px";
							formLayout_1.rightMargin = "10px";
							formLayout_1.bottomMargin = "10px";
							formLayout_1.leftMargin = "10px";
							formLayout_1.horizontalSpacing = "10px";
							formLayout_1.verticalSpacing = "30px";
							formLayout_1.setColumns(["40px", "1fr"]);
							formLayout_1.setRows(["40px", "40px"]);
							group_6.setLayout(formLayout_1);
							(function(container){
								var inputBox_1 = new cpr.controls.InputBox("emailInput");
								inputBox_1.placeholder = " Email";
								inputBox_1.style.css({
									"border-radius" : "10px",
									"font-size" : "16px"
								});
								inputBox_1.bind("value").toDataMap(app.lookup("dm_login"), "member_email");
								inputBox_1.bind("autocomplete").toDataMap(app.lookup("dm_login"), "member_email");
								container.addChild(inputBox_1, {
									"colIndex": 1,
									"rowIndex": 0
								});
								var inputBox_2 = new cpr.controls.InputBox("pswdInput");
								inputBox_2.placeholder = " Password";
								inputBox_2.style.css({
									"border-radius" : "10px",
									"font-size" : "16px"
								});
								inputBox_2.bind("value").toDataMap(app.lookup("dm_login"), "member_password");
								if(typeof onPswdInputKeydown == "function") {
									inputBox_2.addEventListener("keydown", onPswdInputKeydown);
								}
								container.addChild(inputBox_2, {
									"colIndex": 1,
									"rowIndex": 1
								});
								var image_1 = new cpr.controls.Image();
								image_1.src = "theme/images/member/circle-user1.png";
								image_1.style.item.setClasses(["memberIcon"]);
								container.addChild(image_1, {
									"colIndex": 0,
									"rowIndex": 0
								});
								var image_2 = new cpr.controls.Image();
								image_2.src = "theme/images/member/key.png";
								container.addChild(image_2, {
									"colIndex": 0,
									"rowIndex": 1
								});
							})(group_6);
							container.addChild(group_6, {
								"bottom": "32px",
								"width": "304px",
								"height": "129px",
								"left": "calc(50% - 152px)"
							});
							var checkBox_1 = new cpr.controls.CheckBox("cbx1");
							checkBox_1.value = "";
							checkBox_1.text = "ID 저장";
							checkBox_1.style.css({
								"font-size" : "15px",
								"text-align" : "right"
							});
							container.addChild(checkBox_1, {
								"bottom": "0px",
								"width": "304px",
								"height": "33px",
								"left": "calc(50% - 152px)"
							});
						})(group_5);
						container.addChild(group_5, {
							"top": "239px",
							"right": "40px",
							"bottom": "228px",
							"left": "40px"
						});
						var group_7 = new cpr.controls.Container();
						var formLayout_2 = new cpr.controls.layouts.FormLayout();
						formLayout_2.scrollable = false;
						formLayout_2.topMargin = "5px";
						formLayout_2.rightMargin = "5px";
						formLayout_2.bottomMargin = "5px";
						formLayout_2.leftMargin = "5px";
						formLayout_2.horizontalSpacing = "10px";
						formLayout_2.verticalSpacing = "30px";
						formLayout_2.setColumns(["1fr"]);
						formLayout_2.setRows(["45px", "45px", "25px"]);
						group_7.setLayout(formLayout_2);
						(function(container){
							var button_1 = new cpr.controls.Button("registerBtn");
							button_1.value = "회원가입";
							button_1.style.setClasses(["btn-apply"]);
							button_1.style.css({
								"background-color" : "#f9bb00",
								"border-radius" : "50px",
								"text-shadow" : "none",
								"border-bottom-color" : "#f9bb00",
								"color" : "#FFFFFF",
								"font-weight" : "normal",
								"border-left-color" : "#f9bb00",
								"font-size" : "24px",
								"border-top-color" : "#f9bb00",
								"border-right-color" : "#f9bb00",
								"font-style" : "normal",
								"background-image" : "none"
							});
							if(typeof onRegisterBtnClick == "function") {
								button_1.addEventListener("click", onRegisterBtnClick);
							}
							container.addChild(button_1, {
								"colIndex": 0,
								"rowIndex": 1
							});
							var button_2 = new cpr.controls.Button("findBtn");
							button_2.value = "이메일 / 비밀번호 찾기";
							button_2.ariaButtonType = "link";
							button_2.style.css({
								"background-color" : "#F0F0F0",
								"text-shadow" : "none",
								"border-bottom-color" : "#f0f0f0",
								"font-weight" : "normal",
								"border-left-color" : "#f0f0f0",
								"border-top-color" : "#f0f0f0",
								"border-right-color" : "#f0f0f0",
								"background-image" : "none"
							});
							if(typeof onFindBtnClick == "function") {
								button_2.addEventListener("click", onFindBtnClick);
							}
							container.addChild(button_2, {
								"colIndex": 0,
								"rowIndex": 2
							});
							var button_3 = new cpr.controls.Button("btnLogin");
							button_3.value = "로그인";
							button_3.style.setClasses(["btn-login"]);
							button_3.style.css({
								"border-right-style" : "none",
								"color" : "#FFFFFF",
								"border-bottom-color" : "#90be70",
								"border-left-style" : "none",
								"font-weight" : "normal",
								"border-left-color" : "#90be70",
								"border-top-color" : "#90be70",
								"border-bottom-style" : "none",
								"border-right-color" : "#90be70",
								"background-image" : "none",
								"border-top-style" : "none"
							});
							if(typeof onLoginBtnClick == "function") {
								button_3.addEventListener("click", onLoginBtnClick);
							}
							container.addChild(button_3, {
								"colIndex": 0,
								"rowIndex": 0,
								"colSpan": 1,
								"rowSpan": 1
							});
						})(group_7);
						container.addChild(group_7, {
							"bottom": "20px",
							"width": "304px",
							"height": "188px",
							"left": "calc(50% - 152px)"
						});
						var group_8 = new cpr.controls.Container();
						var formLayout_3 = new cpr.controls.layouts.FormLayout();
						formLayout_3.scrollable = false;
						formLayout_3.topMargin = "0px";
						formLayout_3.rightMargin = "0px";
						formLayout_3.bottomMargin = "0px";
						formLayout_3.leftMargin = "0px";
						formLayout_3.horizontalSpacing = "0px";
						formLayout_3.verticalSpacing = "0px";
						formLayout_3.setColumns(["1fr"]);
						formLayout_3.setRows(["1fr"]);
						group_8.setLayout(formLayout_3);
						(function(container){
							var button_4 = new cpr.controls.Button();
							button_4.value = "";
							button_4.style.css({
								"background-color" : "#FFFFFF",
								"border-right-style" : "none",
								"background-size" : "cover",
								"border-left-style" : "none",
								"border-bottom-style" : "none",
								"background-image" : "url('theme/images/member/ic_home.png')",
								"background-position" : "center",
								"border-top-style" : "none"
							});
							if(typeof onButtonClick == "function") {
								button_4.addEventListener("click", onButtonClick);
							}
							container.addChild(button_4, {
								"colIndex": 0,
								"rowIndex": 0
							});
						})(group_8);
						container.addChild(group_8, {
							"top": "20px",
							"right": "14px",
							"width": "20px",
							"height": "20px"
						});
					})(group_3);
					container.addChild(group_3, {
						positions: [
							{
								"media": "all and (min-width: 1024px)",
								"width": "384px",
								"height": "628px",
								"left": "calc(50% - 192px)",
								"top": "calc(50% - 314px)"
							}, 
							{
								"media": "all and (min-width: 500px) and (max-width: 1023px)",
								"width": "188px",
								"height": "628px",
								"left": "calc(50% - 94px)",
								"top": "calc(50% - 314px)"
							}, 
							{
								"media": "all and (max-width: 499px)",
								"width": "131px",
								"height": "628px",
								"left": "calc(50% - 65px)",
								"top": "calc(50% - 314px)"
							}
						]
					});
				})(group_2);
				container.addChild(group_2, {
					positions: [
						{
							"media": "all and (min-width: 1024px)",
							"top": "20px",
							"right": "20px",
							"bottom": "20px",
							"left": "20px"
						}, 
						{
							"media": "all and (min-width: 500px) and (max-width: 1023px)",
							"top": "20px",
							"right": "10px",
							"bottom": "20px",
							"left": "10px"
						}, 
						{
							"media": "all and (max-width: 499px)",
							"top": "20px",
							"right": "7px",
							"bottom": "20px",
							"left": "7px"
						}
					]
				});
			})(group_1);
			container.addChild(group_1, {
				positions: [
					{
						"media": "all and (min-width: 1024px)",
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
			if(typeof onBodyLoad == "function"){
				app.addEventListener("load", onBodyLoad);
			}
		}
	});
	app.title = "login-form";
	cpr.core.Platform.INSTANCE.register(app);
})();
