/************************************************
 * findSalesAdminForm.js
 * Created at 2023. 8. 22. 오후 4:16:18.
 *
 * @author shj22k
 ************************************************/

/*
 * 쉘에서 load 이벤트 발생 시 호출.
 * 쉘이 그려진 후 내용을 작성하는 이벤트.
 */
function onShl1Load(e){
	var shl1 = e.control;
	
	var shlContent = e.content;
	
    var xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "width", "100%");
    svgElem.setAttributeNS(null, "height", "100%");
    svgElem.setAttribute("id", "svgElem");
    svgElem.style.display = "block";

    shlContent.appendChild(svgElem);

    var jsonData = [{
        "name": "A",
        "value": 120,
        "color": "#5487B1",
        "color2": "#C6E3A7"
    }, {
        "name": "B",
        "value": 80,
        "color": "#63A1AF",
        "color2": "#ADD7A8"
    }, {
        "name": "C",
        "value": 110,
        "color": "#7AB8AA",
        "color2": "#93CAA8"
    }, {
        "name": "D",
        "value": 160,
        "color": "#93CAA8",
        "color2": "#7AB8AA"
    }, {
        "name": "E",
        "value": 140,
        "color": "#ADD7A8",
        "color2": "#63A1AF"
    }, {
        "name": "F",
        "value": 180,
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
        .attr("font-size", "32px")
        .text("D3 Pie Chart Example");

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
