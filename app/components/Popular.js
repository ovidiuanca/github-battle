var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

var SelectLanguage = function(props) {
  var languages = ['All', 'Ruby', 'Javascript', 'Elixir', 'Java'];

  return (
    <ul className="languages">
      {languages.map(function(language, index) {
        return(
          <li
            onClick={props.onSelect.bind(null, language)}
            className={props.selectedLanguage === language
              ? `languages selected-${language.toLowerCase()}`
              : "languages"}
            key={index}>{language}</li>
        );
      }, this)}
    </ul>
  );
}

SelectLanguage.propTypes = {
  onSelect: PropTypes.func,
  selectedLanguage: PropTypes.string
}

var RepoGrid = function(props) {
  return(
    <ul className='popular-list'>
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt="Avatar for #{repo.owner.login}"
                />
              </li>
              <li><a href={repo.html_url}>{repo.name }</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
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

class Popular extends React.Component {
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
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    api.fetchPopularRepos(lang)
      .then(function(repos){
        this.setState(function(){
          return {
            repos: repos
          }
        });
      }.bind(this));
  }
  render() {
    return(
      <div>
        <SelectLanguage
          onSelect={this.setLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {!this.state.repos
          ? "Loading..."
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

module.exports = Popular;
