/************************************************
 * recipeinsert.js
 * Created at 2023. 8. 8. 오전 9:52:52.
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
function onShl1Load(e) {
	var shl1 = e.control;
	var content = e.content;
	
	if (loaded) {
		shl1.registerComponent("Editor", content);
		
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
			height: 700,
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
	}
}

/*
 * "Button" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e) {
	var button = e.control;
	var vsOpt = app.lookup("smnote");
	var dataMap = app.lookup("recipe");
	vsOpt.value = $('#summernote').summernote('code');
	dataMap.setValue("RECIPE_BOARD_CONTENT", vsOpt.value);
	var submission = app.lookup("insertRecipe");
	
	var fileInput = app.lookup("fi1");
	var file = fileInput.file;
	var image = app.lookup("uploadImg");
	var value = dataMap.getValue("RECIPE_BOARD_TITLE");
	var value2 = dataMap.getValue("CATEGORY_TYPE");
	var value3 = dataMap.getValue("CATEGORY_INGREDIENTS");
	var value4 = dataMap.getValue("CATEGORY_METHOD");
	if (value == "") {
		alert("제목을 작성하세요");
	} else if (value2 == "" || value3 == "" || value4 == "") {
		alert("카테고리를 등록하세요");
	} else if (image.src == null) {
		alert("사진을 등록하세요");
	} else {
		var initValue = {
			"msg": "레시피 등록하시겠습니까?"
		}
		app.openDialog("dialog/recipeCheck", {
			width: 405,
			height: 300
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
	}
}

/*
 * "취소" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2(e) {
	var button = e.control;
	var initValue = {
		"msg": "변경사항이 저장되지 않습니다.\n 취소하시겠습니까?"
	}
	app.openDialog("dialog/recipeCheck", {
		width: 405,
		height: 300
	}, function(dialog) {
		dialog.ready(function(dialogApp) {
			// 필요한 경우, 다이얼로그의 앱이 초기화 된 후, 앱 속성을 전달하십시오.
			dialogApp.initValue = initValue;
		});
	}).then(function(returnValue) {
		if (returnValue == true) {
			window.location.href = "/";
		}
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onInsertRecipeSubmitSuccess(e) {
	var insertRecipe = e.control;
	var recipeBoardId = insertRecipe.getMetadata("recipeBoardId");
	if (recipeBoardId != null) {
		window.location.href = "/detailRecipe?recipeBoardId=" + recipeBoardId;
	}
}

/*
 * 파일 인풋에서 value-change 이벤트 발생 시 호출.
 * FileInput의 value를 변경하여 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onFi1ValueChange(e) {
	var fi1 = e.control;
	app.lookup("deleteImg").redraw();
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
 * "X" 버튼(deleteImg)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onDeleteImgClick(e) {
	var deleteImg = e.control;
	var fileInput = app.lookup("fi1");
	var image = app.lookup("uploadImg");
	if (confirm("사진을 삭제하시겠습니까?")) {
		fileInput.clear();
		image.src = "";
	}
}
