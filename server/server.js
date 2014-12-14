Accounts.onCreateUser(function(options, user) {
	if (options.profile) {
		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		user.profile = options.profile;
	}



    var test = UserStats.insert({
        totalProblems: 0,
        totalFlashs: 0,
        totalRedpoints: 0,
        hardestProblem: 0,
        hardestFlash: 0,
        hardestRedpoint: 0,
        problems: [
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 }
        ],
        flashedProblems: [
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 },
            {amount: 0 }
        ],
        owner: user._id,
        username: user.username,
        createdAt: new Date()
    });

    console.log( test );

	return user;
});


Meteor.publish("problems", function () {
	return Problems.find({
		$or: [
			{ owner: this.userId }
		]
	});
});
Meteor.publish("userStats", function () {
	return UserStats.find({
		$or: [
			{ owner: this.userId }
		]
	});
});