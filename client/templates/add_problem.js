Template.add_problem.events({
	"click .grade": function (event) {
		$(".grade").removeClass('Active');
		$(event.target).addClass('Active');

		if( $('.flash').hasClass('Active') || $('.redpoint').hasClass('Active') ){
			Template.add_problem.add();
			Template.add_problem.clearAll();
		}
	},
	"click .mode": function(event) {
		$(event.target).addClass('Active')

		if( $('.grade.Active').length > 0 ){
			Template.add_problem.add();
			Template.add_problem.clearAll();
		}
	}
});


var updateChart = function( data ){
	data = [14,2,2,5,77,3];

	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	var barWidth = width / data.length;

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

	bar.append("rect")
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.attr("width", barWidth - 1);

	bar.append("text")
		.attr("x", barWidth / 2)
		.attr("y", function(d) { return y(d.value) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return d.value; });

	function type(d) {
	  d.value = +d.value; // coerce to number
	  return d;
	}
}

Template.add_problem.add = function(){
	var grade = $('.grade.Active').attr('grade')
	var flashed = $('.flash').hasClass('Active');

	//updateChart();

	Meteor.call("addProblem", grade, flashed);
}

Template.add_problem.clearAll = function(){
	$(".grade").removeClass('Active');
	$(".mode").removeClass('Active');
}