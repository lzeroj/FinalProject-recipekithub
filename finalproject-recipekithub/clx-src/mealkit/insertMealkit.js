/************************************************
 * insertMealkit.js
 * Created at 2023. 8. 10. 오후 3:23:42.
 *
 * @author KOSTA
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit2(e){
	var sampleThr = e.control;
	var voResourceLoader = new cpr.core.ResourceLoader();
    voResourceLoader.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js").load().then(function(input) {
    voResourceLoader.addScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js").load().then(function(input) {
            loaded = true;
            app.lookup("sampleThr").redraw();
        });
    });
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 * 쉘이 그려진 후 내용을 작성하는 이벤트.
 */
function onSampleThrLoad(e){
	/** 
     * @type cpr.controls.UIControlShell
     */
    var sampleThr = e.control;
    var content = e.content;

    if (loaded) {
        sampleThr.registerComponent("Editor", content);

        //에디터를 넣어줄 div 생성
        var editorDiv = document.createElement("div")
        editorDiv.id = "summernote";
        editorDiv.style.height = "60%";
        editorDiv.style.width = "80%";

        //생성한 에디터를 쉘 영역안에 넣어준다.
        content.appendChild(editorDiv);

        $('#summernote').summernote({
            placeholder: '내용을 입력해주세요.',
            tabsize: 1,
            height: 200,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video']],
       
            ]
        });
    }
	
}


/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var vsOpt = app.lookup("sampleThr");
  	vsOpt.value = $('#summernote').summernote('code');
   	var message = vsOpt.value;
   	
   	var combo1 = app.lookup("cmb1").text;
   	var combo2 = app.lookup("cmb2").text;
   	var combo3 = app.lookup("cmb3").text;
   	var category = combo1+"/"+combo2+"/"+combo3;
   	
   	var dataMap = app.lookup("mealkitMap");
   	dataMap.setValue("mealkitInfo", message);
   	dataMap.setValue("mealkitCategory", category);
	
	console.log("mealkitName = "+ dataMap.getValue("mealkitName"));
	console.log("mealkitInfo = "+ dataMap.getValue("mealkitInfo"));
	console.log("mealkitIngredients = "+ dataMap.getValue("mealkitIngredients"));
	console.log("mealkitPrice = "+ dataMap.getValue("mealkitPrice"));
	console.log("mealkitInventory = "+ dataMap.getValue("mealkitInventory"));
	console.log("mealkitCategory = "+ dataMap.getValue("mealkitCategory"));
	console.log("category = " + category);
	var submission = app.lookup("mealkitSub");
	submission.send();
   	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. done..
 * 통신이 성공하면 발생합니다.
 */
function onMealkitSubSubmitSuccess(e){
	var mealkitSub = e.control;
	var mealkitNo = mealkitSub.getMetadata("result");
	//var dataMap = app.lookup("mealkitNo");
	//dataMap.setValue("mealkitNo", metadata);
	var url = '/mealkitDetail/'+mealkitNo; //상세 페이지 url
	window.location.href= url;
		
	}
	
