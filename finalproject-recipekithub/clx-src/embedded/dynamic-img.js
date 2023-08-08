/************************************************
 * dynamic-img.js
 * Created at 2022. 5. 30. 오후 5:00:45.
 *
 * @author techdom
 ************************************************/

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var container = app.getContainer();
	
	// 둘중 편한걸로 택 하셔서 사용하시면 됩니다.
	//1. 데이터의 양에따라
//	app.lookup("ds1").getRowDataRanged().forEach(function(each){
//		
//	}); 
    
    //2. for문 데이터의 양에따라
	for(var idx = 0; idx < 10; idx++) {
		//udc 동적 생성
		var imgButton = "imgButton" + idx;
		imgButton = new udc.imgButton(imgButton);
		
		//udc에서 출판한 이미지 경로 앱 속성 지정
		imgButton.src = "https://image.ajunews.com/content/image/2014/08/29/20140829165234761245.jpg";
		
		//생성한 udc를 루트 컨테이너에 부착
		container.addChild(imgButton, {
			height: "300px",
			width: "300px",
			autoSize: "both"
		});
		
		//udc에서 출판한 이미지 삭제 이벤트 구현
		imgButton.addEventListener("deleteImg", function(e){
			e.control.dispose();
		});
	}
}
