//Problem grade, flashed, owner, username
Problems = new Meteor.Collection("Problems");
UserStats = new Meteor.Collection("UserStats");




Meteor.methods({
	addProblem: function (grade, flashed) {
		
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		console.log( grade )

		Problems.insert({
				grade: grade,
				flashed: flashed,
				owner: Meteor.userId(),
				username: Meteor.user().username,
				createdAt: new Date() // current time
		});


		var stats = UserStats.findOne({
			$or: [
				{ owner: this.userId }
			]
		});

		var gradeRecord = "v"+grade;
		var newStats = stats;
		
		if( flashed ){
			newStats.flashedProblems[grade].amount = stats.flashedProblems[grade].amount+1
		} else {
			newStats.problems[grade].amount = stats.problems[grade].amount+1
		}
		
		var updatedStats = UserStats.update(
			{ owner: Meteor.userId()}, 
			{ $set: {
				totalProblems: stats.totalProblems + 1,
				totalFlashs: (flashed) ? stats.totalFlashs++ : stats.totalFlashs,
				totalRedpoints: (flashed) ? stats.totalFlashs : stats.totalFlashs++ ,
				hardestProblem: (grade > stats.hardestProblem) ? grade : stats.hardestProblem,
				hardestFlash: (flashed && grade > stats.hardestFlash) ? grade : stats.hardestFlash,
				hardestRedpoint: (!flashed && grade > stats.hardestFlash) ? grade : stats.hardestFlash,	
				problems: newStats.problems,
				flashedProblems: newStats.problems
			}}
		);


		console.log( updatedStats )




	},

	deleteProblem: function (problemId) {
		Problems.remove(problemId);
	}
});



// Momentum
//

//Facebook Image
//Meteor.user().profile.picture
