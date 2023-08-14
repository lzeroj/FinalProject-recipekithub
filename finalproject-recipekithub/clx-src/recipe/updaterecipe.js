/************************************************
 * updaterecipe.js
 * Created at 2023. 8. 14. 오전 11:49:00.
 *
 * @author user
 ************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e) {
	var voResourceLoader = new cpr.core.ResourceLoader();
	voResourceLoader.addScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js").load().then(function(input) {
		voResourceLoader.addScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js").load().then(function(input) {
			loaded = true;
			app.lookup("smnote").redraw();
		});
	});
}

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 * 쉘이 그려진 후 내용을 작성하는 이벤트.
 */
function onSmnoteLoad(e){
	var smnote = e.control;
	var content = e.content;
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	
	if (loaded) {
		smnote.registerComponent("Editor", content);
		
		//에디터를 넣어줄 div 생성
		var editorDiv = document.createElement("div")
		editorDiv.id = "summernote";
		editorDiv.style.height = "100%";
		editorDiv.style.width = "100%";
		
		//생성한 에디터를 쉘 영역안에 넣어준다.
		content.appendChild(editorDiv);
		
		$('#summernote').summernote({
			placeholder: '글 작성란',
			tabsize: 2,
			height: 300,
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'underline', 'clear']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['table', ['table']],
				//['insert', ['link', 'picture', 'video']],
				['view', ['fullscreen', 'codeview', 'help']]
			]
			
		});
		  $("#summernote").summernote('code',  recipeBoardVO.recipeBoardContent);
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	var recipeBoardVO = cpr.core.Platform.INSTANCE.getParameter("recipeBoardVO");
	var imagePath = cpr.core.Platform.INSTANCE.getParameter("imagePath");
	app.lookup("ipb1").value = recipeBoardVO.recipeBoardTitle;
	app.lookup("lcb1").value = recipeBoardVO.categoryType;
	app.lookup("lcb2").value = recipeBoardVO.categoryIngredients;
	app.lookup("lcb3").value = recipeBoardVO.categoryMethod;
	app.lookup("uploadImg").src = imagePath;
//	var fileInput = app.lookup("fi1");
//	var imageFile = new File([""], imagePath);
//	fileInput.files = [imageFile];
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e){
	var fi1 = e.control;
	var image = app.lookup("uploadImg");
	var fileInput = app.lookup("fi1");
	if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
           image.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

/*
 * "x" 버튼(deleteImg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDeleteImgClick(e){
	var deleteImg = e.control;
	var fileInput = app.lookup("fi1");
	var image = app.lookup("uploadImg");
	fileInput.clear();
	image.src = "";
}

/*
 * "저장" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	alert(app.lookup("uploadImg").src);
}
