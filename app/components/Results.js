var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');

var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName])
      .then(function(results) {
        if (results === null) {
          this.setState(function() {
            return {
              error: "There is an error. Make sure both users are on GitHub.",
              loading: false
            }
          });
        }
        this.setState(function() {
          return {
            winner: results[0],
            loser: results[1],
            loading: false,
            error: null
          }
        });
      }.bind(this))
  }
  render() {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    return(
      <div>
        {loading && <Loading />}
        {error && <p>{error}</p>}
        {!loading && <Link className='button' to='/battle'>Reset</Link>}
        {!loading && !error &&
          <div className='row'>
            <div>
              <h3 className='header'>Winner</h3>
              <h3 className='header'>{'Score: ' + winner.score}</h3>
              <PlayerPreview
                avatar={winner.profile.data.avatar_url}
                username={winner.profile.data.login}
              >
                <div>
                  <p>{'Public repositories: ' + winner.profile.data.public_repos}</p>
                  <p>{'Followers: ' + winner.profile.data.followers}</p>
                </div>
              </PlayerPreview>
            </div>
            <div>
              <h3 className='header'>Loser</h3>
              <h3 className='header'>{'Score: ' + loser.score}</h3>
              <PlayerPreview
                avatar={loser.profile.data.avatar_url}
                username={loser.profile.data.login}
              >
                <div>
                  <p>{'Public repositories: ' + loser.profile.data.public_repos}</p>
                  <p>{'Followers: ' + loser.profile.data.followers}</p>
                </div>
              </PlayerPreview>
            </div>
          </div>
        }

      </div>
    )
  }
}

module.exports = Results;
