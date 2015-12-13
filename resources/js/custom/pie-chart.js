var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

    var color = d3.scale.ordinal()
        .range(["#65A6BF", "#9AC4D5", "#CCE2EA"]);

    var ring = d3.svg.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius - 1000);

    var ring2 = d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius - 150);

    var pie = d3.layout.pie()
        .sort(null)
        .startAngle(1.0*Math.PI)
        .endAngle(3.0*Math.PI)
        .value(function(d) { return d.procent; });

    var data = [
      {label:'10%', procent: 10},
      {label: '40%', procent: 40},
      {label: '50%', procent: 50}
    ];

    var svg = d3.select("#piechart").append("svg")
        .attr("id", "chart")
        .attr("width", width)
        .attr("height", height)
        .attr('viewBox', '0 0 '+width+' '+width)
        .attr('perserveAspectRatio', 'xMinYMid')
        .append("g")
        .attr("transform", "translate(" + (width) / 2 + "," + (height) / 2 + ")");

      data.forEach(function(d) {
        d.procent = +d.procent;
      });

      var g = svg.selectAll(".ring")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "ring");

      g.append("path")
          .style("fill", function(d) { return color(d.data.label); })
          .transition().delay(function(d, i) { return i * 500; }).duration(500)
          .attrTween('d', function(d) {
             var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
             return function(t) {
               d.endAngle = i(t);
               return ring(d);
             };
          });

      g.append("text")
          .attr("transform", function(d) { return "translate(" + ring2.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .attr("class", "d3-label")
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.label; });

    var aspect = width / height,
        chart = $("#chart");
    $(window).on("resize", function() {
        var targetWidth = Math.min(width, chart.parent().width());
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    }).trigger('resize');