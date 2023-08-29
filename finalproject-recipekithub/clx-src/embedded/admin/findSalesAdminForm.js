/************************************************
 * findSalesAdminForm.js
 * Created at 2023. 8. 22. 오후 4:16:18.
 *
 * @author shj22k
 ************************************************/
//var shell = null;
/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindSalesRankAdminSubmitSuccess(e){
	var subfindSalesRankAdmin = e.control;
	var container = app.lookup("grp");
	container.removeAllChildren();
	var shell = new cpr.controls.UIControlShell('shell');
	shell.addEventListener("load", onShl1Load);
	container.addChild(shell, {
		width : "350px",
		height : "350px",
		autoSize : "none"	
	});
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	app.lookup("cmb1").value = "salesMealkit"; 
	app.lookup("subfindSalesRankAdmin").send();
}

function onShl1Load(e){
	var shl1 = e.control;
	var shlContent = e.content;
	var dsmlSales = app.lookup("dsmealkitSalesAdmin");
//	var dsmlTotalPrice = app.lookup("dsmealkitTotalPrice");
    
    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", "100%");
    svgElem.setAttributeNS(null, "height", "100%");
    svgElem.setAttribute("id", "svgElem");
    svgElem.style.display = "block";
//	console.log(dsmlTotalPrice.getValue(0, "mealkitTotalPrice"));
	
    shlContent.appendChild(svgElem);

    var jsonData = [{
        "name": dsmlSales.getValue(0, "mealkitName"),
        "value": dsmlSales.getValue(0, "mealkitTotalPrice"),
        "color": "#5487B1",
        "color2": "#C6E3A7"
    }, {
        "name": dsmlSales.getValue(1, "mealkitName"),
        "value": dsmlSales.getValue(1, "mealkitTotalPrice"),
        "color": "#63A1AF",
        "color2": "#ADD7A8"
    }, {
        "name": dsmlSales.getValue(2, "mealkitName"),
        "value": dsmlSales.getValue(2, "mealkitTotalPrice"),
        "color": "#7AB8AA",
        "color2": "#93CAA8"
    }, {
        "name": dsmlSales.getValue(3, "mealkitName"),
        "value": dsmlSales.getValue(3, "mealkitTotalPrice"),
        "color": "#93CAA8",
        "color2": "#7AB8AA"
    }, {
        "name": dsmlSales.getValue(4, "mealkitName"),
        "value": dsmlSales.getValue(4, "mealkitTotalPrice"),
        "color": "#ADD7A8",
        "color2": "#63A1AF"
    }, {
        "name": dsmlSales.getValue(5, "mealkitName"),
        "value": dsmlSales.getValue(5, "mealkitTotalPrice"),
        "color": "#C6E3A7",
        "color2": "#5487B1"
    }];

    var width = svgElem.getBoundingClientRect().width;
    var height = svgElem.getBoundingClientRect().height;
    var margin = {
        top: 100,
        right: 20,
        left: 40,
        bottom: 30
    };

    var svg = d3.select("svg#svgElem")
        .attr("text-anchor", "middle");

    /* 차트 제목 */
    svg.append("text")
        .attr("id", "title")
        .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
//		.attr("margin-bottom","20px")
        .text("밀키트별 매출 정보");

    /* 안쪽, 바깥쪽 반지름 값 설정 */
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2.5);

    /* 차트의 값을 나타낼 위치 설정 */
    var arcLabel = (function() {
        var radius = Math.min(width, height) / 2.5 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    })();

    /* 파이 차트 구성 */
    var pie = d3.pie()
        .sort(null)
        .value(function(b) {
            return b.value;
        });

    var arcs = pie(jsonData);

    var g = svg.append("g")
        .attr("id", "pieG")
        .attr("transform", "translate(" + (width / 2) + ", " + (height / 1.7) + ")");

    /* 파이 차트의 각 영역 */
    g.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", function(d) {
            return d.data.color2;
        })
        .attr("stroke", "white")
        .attr("d", arc)
        .append("title")
        .text(function(d) {
            return d.data.name + ": " + d.data.value;
        });

    /* 파이 차트의 각 영역 별 값을 나타냄 */
    var text = g.selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", function(d) {
            return "translate(" + arcLabel.centroid(d) + ")"
        })
        .attr("dy", "0.35em");

    text.append("tspan")
        .attr("x", 0)
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(function(d) {
            return d.data.name;
        });

    text.filter(function(d) {
            return d.endAngle - d.startAngle > 0.25;
        })
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", "0.7")
        .text(function(d) {
            return d.data.value+"원";
        });
}

function onRecipeLikeListLoad(e){
	var shl1 = e.control;
	var shlContent = e.content;
	var dsmlSales = app.lookup("dsrecipeLikeAdmin");
    
    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", "100%");
    svgElem.setAttributeNS(null, "height", "100%");
    svgElem.setAttribute("id", "svgElem");
    svgElem.style.display = "block";
	
    shlContent.appendChild(svgElem);

	console.log(dsmlSales.getValue(0, "recipeLikeCount").valueOf()+"원");

    var jsonData = [{
        "name": dsmlSales.getValue(0, "recipeBoardTitle"),
        "value": dsmlSales.getValue(0, "recipeLikeCount"),
        "color": "#5487B1",
        "color2": "#C6E3A7"
    }, {
        "name": dsmlSales.getValue(1, "recipeBoardTitle"),
        "value": dsmlSales.getValue(1, "recipeLikeCount"),
        "color": "#63A1AF",
        "color2": "#ADD7A8"
    }, {
        "name": dsmlSales.getValue(2, "recipeBoardTitle"),
        "value": dsmlSales.getValue(2, "recipeLikeCount"),
        "color": "#7AB8AA",
        "color2": "#93CAA8"
    }, {
        "name": dsmlSales.getValue(3, "recipeBoardTitle"),
        "value": dsmlSales.getValue(3, "recipeLikeCount"),
        "color": "#93CAA8",
        "color2": "#7AB8AA"
    }, {
        "name": dsmlSales.getValue(4, "recipeBoardTitle"),
        "value": dsmlSales.getValue(4, "recipeLikeCount"),
        "color": "#ADD7A8",
        "color2": "#63A1AF"
    }, {
        "name": dsmlSales.getValue(5, "recipeBoardTitle"),
        "value": dsmlSales.getValue(5, "recipeLikeCount"),
        "color": "#C6E3A7",
        "color2": "#5487B1"
    }];

    var width = svgElem.getBoundingClientRect().width;
    var height = svgElem.getBoundingClientRect().height;
    var margin = {
        top: 100,
        right: 20,
        left: 40,
        bottom: 30
    };

    var svg = d3.select("svg#svgElem")
        .attr("text-anchor", "middle");

    /* 차트 제목 */
    svg.append("text")
        .attr("id", "title")
        .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .text("레시피 좋아요 순위");

    /* 안쪽, 바깥쪽 반지름 값 설정 */
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2.5);

    /* 차트의 값을 나타낼 위치 설정 */
    var arcLabel = (function() {
        var radius = Math.min(width, height) / 2.5 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    })();

    /* 파이 차트 구성 */
    var pie = d3.pie()
        .sort(null)
        .value(function(b) {
            return b.value;
        });

    var arcs = pie(jsonData);

    var g = svg.append("g")
        .attr("id", "pieG")
        .attr("transform", "translate(" + (width / 2) + ", " + (height / 1.7) + ")");

    /* 파이 차트의 각 영역 */
    g.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", function(d) {
            return d.data.color2;
        })
        .attr("stroke", "white")
        .attr("d", arc)
        .append("title")
        .text(function(d) {
            return d.data.name + ": " + d.data.value;
        });

    /* 파이 차트의 각 영역 별 값을 나타냄 */
    var text = g.selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", function(d) {
            return "translate(" + arcLabel.centroid(d) + ")"
        })
        .attr("dy", "0.35em");

    text.append("tspan")
        .attr("x", 0)
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(function(d) {
            return d.data.name;
        });

    text.filter(function(d) {
            return d.endAngle - d.startAngle > 0.25;
        })
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", "0.7")
        .text(function(d) {
            return d.data.value;
        });		
}

function onMealkitLikeListLoad(e){
	var shl1 = e.control;
	var shlContent = e.content;
	var dsmlLike = app.lookup("dsmealkitLikeAdmin");
    
    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", "100%");
    svgElem.setAttributeNS(null, "height", "100%");
    svgElem.setAttribute("id", "svgElem");
    svgElem.style.display = "block";
	
    shlContent.appendChild(svgElem);


    var jsonData = [{
        "name": dsmlLike.getValue(0, "mealkitName"),
        "value": dsmlLike.getValue(0, "mealkitCount"),
        "color": "#5487B1",
        "color2": "#C6E3A7"
    }, {
        "name": dsmlLike.getValue(1, "mealkitName"),
        "value": dsmlLike.getValue(1, "mealkitCount"),
        "color": "#63A1AF",
        "color2": "#ADD7A8"
    }, {
        "name": dsmlLike.getValue(2, "mealkitName"),
        "value": dsmlLike.getValue(2, "mealkitCount"),
        "color": "#7AB8AA",
        "color2": "#93CAA8"
    }, {
        "name": dsmlLike.getValue(3, "mealkitName"),
        "value": dsmlLike.getValue(3, "mealkitCount"),
        "color": "#93CAA8",
        "color2": "#7AB8AA"
    }, {
        "name": dsmlLike.getValue(4, "mealkitName"),
        "value": dsmlLike.getValue(4, "mealkitCount"),
        "color": "#ADD7A8",
        "color2": "#63A1AF"
    }, {
        "name": dsmlLike.getValue(5, "mealkitName"),
        "value": dsmlLike.getValue(5, "mealkitCount"),
        "color": "#C6E3A7",
        "color2": "#5487B1"
    }];

    var width = svgElem.getBoundingClientRect().width;
    var height = svgElem.getBoundingClientRect().height;
    var margin = {
        top: 100,
        right: 20,
        left: 40,
        bottom: 30
    };

    var svg = d3.select("svg#svgElem")
        .attr("text-anchor", "middle");

    /* 차트 제목 */
    svg.append("text")
        .attr("id", "title")
        .attr("transform", "translate(" + (width / 2) + ", " + (margin.top / 2) + ")")
        .attr("font-size", "20px")
        .attr("font-weight", "bold")
        .text("밀키트 찜 순위");

    /* 안쪽, 바깥쪽 반지름 값 설정 */
    var arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2.5);

    /* 차트의 값을 나타낼 위치 설정 */
    var arcLabel = (function() {
        var radius = Math.min(width, height) / 2.5 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    })();

    /* 파이 차트 구성 */
    var pie = d3.pie()
        .sort(null)
        .value(function(b) {
            return b.value;
        });

    var arcs = pie(jsonData);

    var g = svg.append("g")
        .attr("id", "pieG")
        .attr("transform", "translate(" + (width / 2) + ", " + (height / 1.7) + ")");

    /* 파이 차트의 각 영역 */
    g.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", function(d) {
            return d.data.color2;
        })
        .attr("stroke", "white")
        .attr("d", arc)
        .append("title")
        .text(function(d) {
            return d.data.name + ": " + d.data.value;
        });

    /* 파이 차트의 각 영역 별 값을 나타냄 */
    var text = g.selectAll("text")
        .data(arcs)
        .enter()
        .append("text")
        .attr("transform", function(d) {
            return "translate(" + arcLabel.centroid(d) + ")"
        })
        .attr("dy", "0.35em");

    text.append("tspan")
        .attr("x", 0)
        .attr("y", "-0.7em")
        .style("font-weight", "bold")
        .text(function(d) {
            return d.data.name;
        });

    text.filter(function(d) {
            return d.endAngle - d.startAngle > 0.25;
        })
        .append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", "0.7")
        .text(function(d) {
            return d.data.value;
        });		
}

/*
 * "실행" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e){
	var button = e.control;
	var cbox = app.lookup("cmb1");
	var container = app.lookup("grp");
	container.removeAllChildren();
	if(cbox.value == 'salesMealkit'){
		app.lookup("subfindSalesRankAdmin").send();
	}else if(cbox.value == 'totalLikeRecipe'){
		app.lookup("subfindTotalLikeRecipe").send();
	}else if(cbox.value == 'totalLikeMealkit'){
		app.lookup("subfindTotalLikeMealkit").send();
	}
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindTotalLikeRecipeSubmitSuccess(e){
	var subfindTotalLikeRecipe = e.control;
	var container = app.lookup("grp");
	container.removeAllChildren();
	var shell = new cpr.controls.UIControlShell('shell');
	shell.addEventListener("load", onRecipeLikeListLoad);
	container.addChild(shell, {
		width : "350px",
		height : "350px",
		autoSize : "none"		
	});
}

/*
 * 서브미션에서 submit-success 이벤트 발생 시 호출.
 * 통신이 성공하면 발생합니다.
 */
function onSubfindTotalLikeMealkitSubmitSuccess(e){
	var subfindTotalLikeMealkit = e.control;
	var container = app.lookup("grp");
	container.removeAllChildren();
	var shell = new cpr.controls.UIControlShell('shell');
	shell.addEventListener("load", onMealkitLikeListLoad);
	container.addChild(shell, {
		width : "350px",
		height : "350px",
		autoSize : "none"		
	});
	
}


/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubfindSalesRankAdminSubmitDone(e){
	var subfindSalesRankAdmin = e.control;
	var container = app.lookup("grp");
	container.redraw();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubfindTotalLikeRecipeSubmitDone(e){
	var subfindTotalLikeRecipe = e.control;
	var container = app.lookup("grp");
	container.redraw();
}

/*
 * 서브미션에서 submit-done 이벤트 발생 시 호출.
 * 응답처리가 모두 종료되면 발생합니다.
 */
function onSubfindTotalLikeMealkitSubmitDone(e){
	var subfindTotalLikeMealkit = e.control;
	var container = app.lookup("grp");
	container.redraw();
}
