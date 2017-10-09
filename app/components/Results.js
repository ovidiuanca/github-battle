import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

export default class Results extends React.Component {
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
    const players = queryString.parse(this.props.location.search);
    const { playerOneName, playerTwoName } = players;

    api.battle([playerOneName, playerTwoName])
      .then((results) => {
        if (results === null) {
          this.setState(() => ({
            error: "There is an error. Make sure both users are on GitHub.",
            loading: false
          }));
        }
        this.setState(() => ({
          winner: results[0],
          loser: results[1],
          loading: false,
          error: null
        }));
      })
  }
  render() {
    const { winner, loser, error, loading } = this.state;

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
