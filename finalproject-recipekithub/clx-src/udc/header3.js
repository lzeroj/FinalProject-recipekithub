/************************************************
 * header.js
 * Created at 2023. 8. 8. 오후 3:17:56.
 *
 * @author shj22k
 ************************************************/

/**
 * UDC 컨트롤이 그리드의 뷰 모드에서 표시할 텍스트를 반환합니다.
 */
exports.getText = function(){
	// TODO: 그리드의 뷰 모드에서 표시할 텍스트를 반환하는 하는 코드를 작성해야 합니다.
	return "";
};

/*
 * 이미지에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onHeaderLogoClick(e){
	var headerLogo = e.control;
	window.location.href="/";
}

/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	window.location.href="/findMyCartForm";
}

/*
 * 버튼(mypage)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onMypageClick(e){
	var mypage = e.control;
	window.location.href="/findMyPageForm";
}

/*
 * 내비게이션 바에서 item-click 이벤트 발생 시 호출.
 * 아이템 클릭시 발생하는 이벤트.
 */
function onNavigationBarItemClick(e){
	var navigationBar = e.control;
	if(navigationBar.value == 'question'){
		console.log(1);
	}
	
	if(navigationBar.value == 'mealkit'){
		window.location.href='/insertMealkitForm';
	}
		
	if(navigationBar.value == 'recipe'){
		window.location.href='/findRecipeBoardList';
	}
}

/*
 * 버튼(btnWrite)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnWriteClick(e){
	var btnWrite = e.control;
	
}

/*
 * 버튼(btnLoginoff)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnLoginoffClick(e){
	var btnLoginoff = e.control;
	window.location.href="/memberUI/loginForm";
}
