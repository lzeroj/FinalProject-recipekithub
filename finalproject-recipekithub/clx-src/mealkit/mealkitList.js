/************************************************
 * mealkitList.js
 * Created at 2023. 8. 16. 오후 3:05:31.
 *
 * @author KOSTA
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var mealkitList = cpr.core.Platform.INSTANCE.getParameter("mealkitList");
	var cnt = app.lookup("mealkitCnt");
	cnt.value = mealkitList.length;
	console.log("mealkitList = " + mealkitList);
	var container = app.lookup("grp");
	for (var i = 0; i < mealkitList.length; i++) {
		(function(index) {
			var mealkit = new udc.recipeListudc();
			mealkit.img = "/upload/meaklkitUpload/" + mealkitList[i].recipeBoardImage;
			console.log(mealkitList.img);
			mealkit.hits = mealkitList[i].mealkitHits;
			mealkit.nick = mealkitList[i].memberVO.memberNick;
			mealkit.title = mealkitList[i].mealkitName;
			container.addChild(mealkit, {
				height: "250px",
				width: "230px",
				autoSize: "both"
			});
			mealkit.addEventListener("imgClick", function(e) {
				window.location.href = "/mealkitDetail/" + mealkitList[index].mealkitNo;
			});
		})(i);
	}
}