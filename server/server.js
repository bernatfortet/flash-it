var getUserFriends = function(userId){
	return Meteor.users.findOne({ _id: userId }).friends
}

Meteor.publish("problems", function () {
	return Problems.find({
		$or: [
			{ owner: this.userId }
		]
	});
});



Meteor.publish("friends", function (userId) {

	var userFriendsArray = getUserFriends(userId)
	console.log('userFriends', getUserFriends(userId) )

	var friendsIds = Meteor.users.find({
		'_id': { $in: userFriendsArray }
	});
	console.log('friends.fetch()', friendsIds.fetch())

	return friendsIds;
});

/*
Meteor.publish("userStats", function () {
	return UserStats.find({
		$or: [
			{ owner: this.userId }
		]
	});
});*/



Meteor.publish("userStats", function () {
	return 'test';
});