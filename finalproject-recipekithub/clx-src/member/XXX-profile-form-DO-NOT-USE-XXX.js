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
	var dsProfile = app.lookup("ds_profile");
	
	app.lookup("ipbEmail").text = dsProfile.getValue(0, "memberEmail");
	app.lookup("ipbPassword1").text = dsProfile.getValue(0, "memberPassword");
	app.lookup("ipbName").text = dsProfile.getValue(0, "memberName");
	app.lookup("ipbNick").text = dsProfile.getValue(0, "memberNick");
	app.lookup("ipbAddress").text = dsProfile.getValue(0, "memberAddress");
	app.lookup("ipbPhone").mask = dsProfile.getValue(0, "memberPhone");
	app.lookup("ipbBirthday").value = dsProfile.getValue(0, "memberBirthday");
	
}

/*
 * "수정" 버튼(btnMemUpdate)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnMemUpdateClick(e){
	var btnMemUpdate = e.control;
	if(confirm("정말로 수정하시겠습니까?")) {
		var dataMap = app.lookup("dm_update");
		dataMap.setValue("memberEmail", app.lookup("ipbEmail").value);
		dataMap.setValue("memberPassword", app.lookup("ipbPassword1").value);
		dataMap.setValue("memberName", app.lookup("ipbName").value);
		dataMap.setValue("memberNick", app.lookup("ipbNick").value);
		dataMap.setValue("memberBirthday", app.lookup("ipbBirthday").value);
		dataMap.setValue("memberPhone", app.lookup("ipbPhone").value);
		dataMap.setValue("memberAddress", app.lookup("ipbAddress").value);
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
		dataMap.setValue("memberEmail", app.lookup("ipbEmail").value);
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
}


/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var submission = app.lookup("sub_logout");
	submission.send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSub_logoutSubmitSuccess(e){
	var sub_logout = e.control;
	alert("로그아웃이 완료되었습니다!")
	var httpPostMethod = new cpr.protocols.HttpPostMethod("index.clx");
	httpPostMethod.submit();
}
