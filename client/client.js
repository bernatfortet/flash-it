Meteor.subscribe("problems");
Meteor.subscribe("userStats");
Session.setDefault("counter", 0);


Meteor.startup(function () {

	setTimeout( function(){
		setChart();
	}, 1000)
	

});

var setChart = function(){

	var data = UserStats.findOne().problems
	console.log( data[0] )

	var width = 200,
	    height = 200;

	var y = d3.scale.linear()
	    .range([height, 0]);

	var chart = d3.select(".chart")
	    .attr("width", width)
	    .attr("height", height);

	   /*
	var data = [
		{name: "Locke",    value:  4},
		{name: "Reyes",    value:  8},
		{name: "Ford",     value: 15},
		{name: "Jarrah",   value: 16},
		{name: "Shephard", value: 23},
		{name: "Kwon",     value: 42},
		{name: "Kwon",     value: 12}
	];
	*/

	y.domain([0, d3.max(data, function(d, i) { return d.amount; })]);

	var barWidth = width / data.length;

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

	bar.append("rect")
		.attr("y", function(d, i) { 
			return y(d.amount); 
		})
		.attr("height", function(d, i) { return height - y(d.amount); })
		.attr("width", barWidth - 1);

	bar.append("text")
		.attr("x", barWidth / 2)
		.attr("y", function(d, i) { return y(d.amount) + 3; })
		.attr("dy", ".75em")
		.text(function(d, i) { return d.amount; });

	function type(d, i) {
	  d.amount = +d.amount; // coerce to number
	  return d;
	}


}



Template.problem.helpers({
	isOwner: function () {
		return this.owner === Meteor.userId();
	},
	date: function () {
		momentDate = moment(this.createdAt)
		return momentDate.format('MMM Do, HH:mm'); 
	}
});


Template.body.helpers({
	problems: function () {
		return Problems.find({}, {sort: {createdAt: -1}});
	}
});


Template.problem.events({
	"click .delete": function() {
		Meteor.call("deleteProblem", this._id);
	}
});


Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});

