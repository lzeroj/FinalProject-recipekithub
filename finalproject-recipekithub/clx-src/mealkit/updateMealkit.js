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
//	var mealkitNo = cpr.core.Platform.INSTANCE.getParameter("mealkitNo");
//	var mealkitName = cpr.core.Platform.INSTANCE.getParameter("mealkitName");	
//	var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");	
//	var mealkitIngredients = cpr.core.Platform.INSTANCE.getParameter("mealkitIngredients");	
//	var mealkitPrice = cpr.core.Platform.INSTANCE.getParameter("mealkitPrice");	
//	var mealkitInventory = cpr.core.Platform.INSTANCE.getParameter("mealkitInventory");	
//	var mealkitCategory = cpr.core.Platform.INSTANCE.getParameter("mealkitCategory");
//	var mealkitMember = cpr.core.Platform.INSTANCE.getParameter("mealkitMember");
//	
//	var vsOpt = app.lookup("sampleThr");
//	vsOpt.value = $('#summernote').summernote('code');
//	//var message = vsOpt.value;
//	var dataMap = app.lookup("updateMealkit");	
//	dataMap.setValue("mealkitNo", mealkitNo);
//	dataMap.setValue("mealkitName", mealkitName);
//	dataMap.setValue("mealkitInfo", mealkitInfo);
//	dataMap.setValue("mealkitIngredients", mealkitIngredients);
//	dataMap.setValue("mealkitPrice", mealkitPrice);
//	dataMap.setValue("mealkitInventory", mealkitInventory);
//	dataMap.setValue("mealkitCategory", mealkitCategory);
//	dataMap.setValue("mealkitMember", mealkitMember);
//	
//	//vsOpt.value = dataMap.getValue("mealkitInfo");
//	
//	
//	//console.log("info = " + info);
//	//console.log("mealkitInfoInfo = " + mealkitInfoInfo);
//	
//	var name = app.lookup("ipb1");
//	var textArea = app.lookup("ipb2");
//	var price = app.lookup("ipb3");
//	var inven = app.lookup("ipb4");
//	
//	name.redraw();
//	vsOpt.redraw();
//	textArea.redraw();
//	price.redraw();
//	inven.redraw();

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
	var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");

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
        $("#summernote").summernote('code', mealkitInfo);
    }

}


/*
 * "등록" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e){
	var button = e.control;
	var vsOpt = app.lookup("sampleThr");
	var dataMap = app.lookup("updateMealkit");	
  	vsOpt.value = $('#summernote').summernote('code');
   	var message = vsOpt.value;
   	 var submission = app.lookup("updateMealkitSub");
   	
   	var name = app.lookup("ipb1");
   	var ingredients = app.lookup("ipb2");
   	var price = app.lookup("ipb3");
   	var inven = app.lookup("ipb4");
   	
   	var combo1 = app.lookup("cmb1").text;
   	var combo2 = app.lookup("cmb2").text;
   	var combo3 = app.lookup("cmb3").text;
   	var category = combo1+"/"+combo2+"/"+combo3;
   	
	dataMap.setValue("mealkitName", name);
	dataMap.setValue("mealkitInfo", message);
	dataMap.setValue("mealkitIngredients", ingredients);
	dataMap.setValue("mealkitPrice", price);
	dataMap.setValue("mealkitInventory", inven);
	dataMap.setValue("mealkitCategory", category);
	var fileInput = app.lookup("file2");
	var file = fileInput.file;
	var image = app.lookup("updateImg");
	
	if(confirm("수정하시겠습니까?")){
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
 		}else if(inven.value == null || inven.value == ""){
 			alert("밀키트 수량을 입력해주세요.");
 			inven.focus();
 			return;
 		
 		}else if(Number(inven.value) <= 0 || isNaN(inven.value)){
 			alert("밀키트 수량은 숫자만 입력이 가능합니다. 다시 확인해주세요");
 			inven.value = "";
 			inven.focus();
 			return;
 		}else{
 			submission.addFileParameter("image", file);
			submission = app.lookup("updateMealkitSub").send();
 		}
 	}
	
	

}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	window.location.href= "/"; //추후 상세 페이지로 바꿔야함.
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onUpdateMealkitSubSubmitSuccess(e){
	var updateMealkitSub = e.control;
	var mealkitNo = updateMealkitSub.getMetadata("result");
	alert("밀키트가 수정되었습니다.");
	//var dataMap = app.lookup("mealkitNo");
	//dataMap.setValue("mealkitNo", metadata);
	var url = '/mealkitDetail/'+mealkitNo; //상세 페이지 url
	window.location.href= url;
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var mealkitNo = cpr.core.Platform.INSTANCE.getParameter("mealkitNo");
	var mealkitName = cpr.core.Platform.INSTANCE.getParameter("mealkitName");	
	var mealkitInfo = cpr.core.Platform.INSTANCE.getParameter("mealkitInfo");	
	var mealkitIngredients = cpr.core.Platform.INSTANCE.getParameter("mealkitIngredients");	
	var mealkitPrice = cpr.core.Platform.INSTANCE.getParameter("mealkitPrice");	
	var mealkitInventory = cpr.core.Platform.INSTANCE.getParameter("mealkitInventory");	
	var mealkitCategory = cpr.core.Platform.INSTANCE.getParameter("mealkitCategory");
	var mealkitMember = cpr.core.Platform.INSTANCE.getParameter("mealkitMember");
	var mealkitImg = cpr.core.Platform.INSTANCE.getParameter("mealkitImg");
	console.log("mealkitImg = " + mealkitImg);
	
	var vsOpt = app.lookup("sampleThr");
	vsOpt.value = $('#summernote').summernote('code');
	//var message = vsOpt.value;
	var dataMap = app.lookup("updateMealkit");	
	dataMap.setValue("mealkitNo", mealkitNo);
	dataMap.setValue("mealkitName", mealkitName);
	dataMap.setValue("mealkitInfo", mealkitInfo);
	dataMap.setValue("mealkitIngredients", mealkitIngredients);
	dataMap.setValue("mealkitPrice", mealkitPrice);
	dataMap.setValue("mealkitInventory", mealkitInventory);
	dataMap.setValue("mealkitCategory", mealkitCategory);
	dataMap.setValue("mealkitMember", mealkitMember);
	dataMap.setValue("mealkitImg", mealkitImg);
	
	var  uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\_/i;
	app.lookup("updateImg").src = "/upload/mealkit/"+mealkitImg;
	
	var fileInput = app.lookup("file2");
	var name = app.lookup("ipb1");
	var textArea = app.lookup("ipb2");
	var price = app.lookup("ipb3");
	var inven = app.lookup("ipb4");
	
	// 파일인풋에 이름만 넣기 
	var  orgFileName = mealkitImg.replace(uuid, "");
	fileInput.value=orgFileName;
	
	name.redraw();
	vsOpt.redraw();
	textArea.redraw();
	price.redraw();
	inven.redraw();
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFile2ValueChange(e){
	var file2 = e.control;
	var image = app.lookup("updateImg");
	var fileInput = app.lookup("file2");
	//이미지 파일 아닌 걸 넣었을 때 
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
	var fileInput = app.lookup("file2");
	var image = app.lookup("updateImg");
	if(confirm("사진을 삭제하시겠습니까?")){
	fileInput.clear();
	image.src = "";
	}
}
