/************************************************
 * findChefList.js
 * Created at 2023. 8. 21. 오후 10:52:06.
 *
 * @author shj22k
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("subcheflist").send();
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubcheflistSubmitSuccess(e){
	var subcheflist = e.control;
	var xhr = subcheflist.xhr;
	var jsonData = JSON.parse(xhr.responseText);
	var chefList = jsonData.chefList;
	
	var container = app.lookup("grp");
	container.removeAllChildren();
	
	for (var i = 0; i < chefList.length; i++) {
		(function(index) {
			//udc 동적 생성
			var chef = new udc.chefListudc();
			chef.style.css({
				"paddingLeft":"30px",
				"padding-right":"30px",
				"padding-bottom":"30px",
				"padding-top":"30px"
			});
			//udc에서 출판한 이미지 경로 앱 속성 지정
			if(chefList[i].memberImage == null || chefList[i].memberImage == ''){
				chef.memberImage = "theme/images/icon/chefimg.png";
			}else{
				chef.memberImage = "/upload/profile/" + chefList[i].memberImage;
			}
			chef.memberNick = chefList[i].memberNick;
			chef.memberEmail = chefList[i].memberEmail;
			chef.rank = i+1;
			container.addChild(chef, {
				height: "215px",
				width: "180px",
				autoSize: "none"
			});
			chef.addEventListener("memberImageClick", function(e) {
				var host = app.getHost(); // 부모 임베디드 앱
				var initvalue = {
					"memberEmail":chefList[index].memberEmail,
					"memberNick":chefList[index].memberNick,
					"memberImage":"theme/images/icon/chefimg.png"
				};
				cpr.core.App.load("embedded/chefRecipeList", function(loadedApp){
					if (loadedApp){
						host.initValue = initvalue;
						host.app = loadedApp;
					}
				});
			});
		})(i);
	}
}
