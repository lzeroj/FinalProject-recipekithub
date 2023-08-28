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
        editorDiv.style.height = "100%";
        editorDiv.style.width = "100%";

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
   	var combo4 = app.lookup("cmb4").text;
   	
   	var category = combo1+"/"+combo2+"/"+combo3;
   	
   	var dataMap = app.lookup("mealkitMap");
   	dataMap.setValue("mealkitInfo", message);
   	dataMap.setValue("mealkitCategory", category);
   	dataMap.setValue("mealkitType", combo4);
 	//유효성
 	
 	var name = app.lookup("ipb1");
 	var ingredients = app.lookup("ipb2");
 	var price = app.lookup("ipb3");
 	var stock = app.lookup("ipb4");
 	
 	//
 	var fileInput = app.lookup("file1");
	var file = fileInput.file;
	app.lookup("uploadImg").src = file;  	
	var submission = app.lookup("mealkitSub");
 	//
 	
 	if(name.value == null || name.value.trim().length == 0){
 		alert("밀키트 이름을 입력해주세요.");
 		name.focus();
 		return;
 	}else if(combo1.length == 0 || combo2.length == 0 || combo3.length == 0){
 		alert("카테고리를 반드시 선택해주세요.");
 		return ;
 		
 	}else if(ingredients.value == null || ingredients.value.trim().length == 0){
 		alert("밀키트 성분을 입력해주세요.");
 		ingredients.focus();
 		return;
 	
 	}else if(message == null || message.trim().length == 0){
 		
 		alert("밀키트 정보를 입력해주세요.");
 		console.log("왜 안 먹지?");
 		//e.preventDefault();
 		return;
 	}else if(price.value == null || price.value == ""){
 		alert("밀키트 가격을 입력해주세요.");
 		price.focus();
 		return;
 		
 	}else if(Number(price.value) <= 0 || isNaN(price.value)){
 		alert("밀키트 가격은 숫자만 입력이 가능합니다. 다시 확인해주세요.");
 		price.value = "";
 		price.focus();
 		return;
 	}else if(stock.value == null || stock.value == ""){
 		alert("밀키트 수량을 입력해주세요.");
 		stock.focus();
 		return;
 		
 	}else if(Number(stock.value) <= 0 || isNaN(stock.value)){
 		alert("밀키트 수량은 숫자만 입력이 가능합니다. 다시 확인해주세요");
 		stock.value = "";
 		stock.focus();
 		return;
 	}
 	
 		var initValue = "밀키트를 등록하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			if (returnValue == true) {
				submission.addFileParameter("image", file);
				submission.send();
			}
		});
 	
 	
// 	var fileInput = app.lookup("file1");
//	var file = fileInput.file;
//	app.lookup("uploadImg").src = file;
// 	  	
//
//	var submission = app.lookup("mealkitSub");
//	submission.addFileParameter("image", file);
//	submission.send();
   	
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출. done..
 * 통신이 성공하면 발생합니다.
 */
function onMealkitSubSubmitSuccess(e){
	var mealkitSub = e.control;
	var mealkitNo = mealkitSub.getMetadata("result");
	alert("밀키트가 등록되었습니다.");
	//var dataMap = app.lookup("mealkitNo");
	//dataMap.setValue("mealkitNo", metadata);
	var url = '/mealkitDetail/'+mealkitNo; //상세 페이지 url
	window.location.href= url;
		
	}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	window.location.href= "/"; //추후 리스트 페이지로 바꿔야함.
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFile1ValueChange(e){
	var file1 = e.control;
	var image = app.lookup("uploadImg");
	var fileInput = app.lookup("file1");
	if (fileInput.files && fileInput.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			image.src = e.target.result;
		};
		
		reader.readAsDataURL(fileInput.files[0]);
	}
}

/*
 * "X" 버튼(deleteImgBtn)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDeleteImgBtnClick(e){
	var deleteImgBtn = e.control;
	var fileInput = app.lookup("file1");
	var image = app.lookup("uploadImg");
	fileInput.clear();
	image.src = "";
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick3(e){
	var button = e.control;
	var initValue = "작성된 사항은 반영되지 않습니다.\n취소하시겠습니까?";
		app.openDialog("dialog/registerPopup", {
			width: 400, height: 300, headerClose: true
		}, function(dialog) {
			dialog.ready(function(dialogApp) {
				// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
				dialogApp.initValue = initValue;
			});
		}).then(function(returnValue) {
			if (returnValue == true) {
				window.location.href = "/mealkitList";
			}
		});
}
