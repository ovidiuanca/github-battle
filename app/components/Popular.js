import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

import Loading from './Loading';

function SelectLanguage(props) {
  const languages = ['All', 'Ruby', 'Javascript', 'Elixir', 'Java'];

  return (
    <ul className="languages">
      {languages.map((language, index) => {
        return(
          <li
            onClick={props.onSelect.bind(null, language)}
            className={props.selectedLanguage === language
              ? `languages selected-${language.toLowerCase()}`
              : "languages"}
            key={index}>{language}</li>
        );
      })}
    </ul>
  );
}

SelectLanguage.propTypes = {
  onSelect: PropTypes.func,
  selectedLanguage: PropTypes.string
}

function RepoGrid(props) {
  return(
    <ul className='popular-list'>
      {props.repos.map(({name, owner, html_url, stargazers_count}, index) => {
        return (
          <li key={name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={owner.avatar_url}
                  alt="Avatar for #{repo.owner.login}"
                />
              </li>
              <li><a href={html_url}>{name }</a></li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super();

    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.setLanguage = this.setLanguage.bind(this);
  }
  componentDidMount() {
    this.setLanguage(this.state.selectedLanguage);
  }
  setLanguage(lang) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));
    api.fetchPopularRepos(lang)
      .then((repos) => {
        this.setState(() => ({ repos: repos }))
      });
  }
  render() {
    return(
      <div>
        <SelectLanguage
          onSelect={this.setLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}
