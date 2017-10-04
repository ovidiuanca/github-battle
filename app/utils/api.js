var axios = require('axios');

var clientId = 'Iv1.f790c67d31019bb9';
var clientSecret = 'e50b7c6983780eb406fb21035b6e58a89b11cc4b';
var params = `client_id=${clientId}&client_secret=${clientSecret}`;

function getProfile(username) {
  axios.get('https://github.com/users/' + username)
    .then(function(user) {
      return user.data;
    });
}

function getRepos(username) {
  axios.get('https://github.com/users/' + username + '/repos' + params + '&per_parge=100')
}

function getStarCount(repos) {
  repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0)
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    b.score - a.score;
  })
}

module.exports = {
  battle: function (users) {
    return axios.all(players.map(getUserData()))
      .then(sortPlayers)
      .error(handleError);
  },
  fetchPopularRepos: function(language) {
     var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories' + '&' + params);

     return axios.get(encodedURI)
       .then(function(response){
         return response.data.items;
       });
  }
}
