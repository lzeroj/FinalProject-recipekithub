/************************************************
 * common.module.js
 * Created at 2023. 7. 25. 오후 1:03:04.
 *
 * @author KOSTA
 ************************************************/

// 글로벌 출판 방법
globals.testAlert = function(){
	alert("글로벌 출판 방법");
	
}

//데이터 가져오기
//globals.getSessionStorage = // 데이터 가져오기
//function getTimedSessionData(key) {
//    var storedData = sessionStorage.getItem(key);
//
//    if (storedData) {
//        var data = JSON.parse(storedData);
//        var currentTime = new Date().getTime();
//
//        if (currentTime < data.expirationTime) {
//            return data.value;
//        } else {
//            sessionStorage.removeItem(key);
//        }
//    }
//    return null;
//}


//// 익스포츠 출판 방법
//function test2(){
//	alert("익스포츠");
//}
//exports.testAlert2 = test2;

