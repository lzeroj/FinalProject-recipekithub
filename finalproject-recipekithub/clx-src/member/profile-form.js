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
}

