/************************************************
 * detailrecipe.js
 * Created at 2023. 8. 11. 오후 4:20:38.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var submission = app.lookup("detailRecipe");
	submission.send();
}
