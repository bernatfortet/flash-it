Accounts.validateLoginAttempt( function( data ){

	getAndAddFacebookFriends(data.user);

	return true;
});

var getAndAddFacebookFriends = function(user){
	console.log('hello')
	Meteor.http.get("https://graph.facebook.com/me/friends",
		{ params: {
			access_token:  user.services.facebook.accessToken,
			fields: 'installed'
		}},
		function (error, result){
			friends = result.data.data
			console.log( 'friends', friends)
			addFriends(user, friends)
		}
	);
}

var addFriends = function( user, friends ){
	//console.log('Adding Friends', friends)

	var friendsList = []
	friends.forEach( function(friend){

		meteorFriend = Meteor.users.findOne( {"services.facebook.id": friend.id })
		//console.log( 'meteorFriend', meteorFriend );

		friendsList.push(meteorFriend._id)
	});

	Meteor.users.update( { _id: user._id }, { $set: { 'friends': friendsList }} );
}

Accounts.onCreateUser(function(options, user) {

	console.log( '----------------------------------------------------' );

	var access_token = user.services.facebook.accessToken;
	//console.log( 'access_token', access_token );

	Meteor.http.get("https://graph.facebook.com/me",
		{ params: {
			access_token:  user.services.facebook.accessToken,
			fields: 'friends'
		}},
		function (error, result){
			console.log(error);
			console.log('result', result);
		}
	);

	if (options.profile) {
		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		user.profile = options.profile;
	}

	getAndAddFacebookFriends(user);


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
