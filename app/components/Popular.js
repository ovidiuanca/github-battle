var React = require('react');
var PropTypes = require('prop-types');

var SelectLanguage = function(props) {
  var languages = ['All', 'Ruby', 'Javascript', 'Elixir', 'Java'];

  return (
    <ul className="languages">
      {languages.map(function(language, index) {
        return(
          <li
            onClick={props.onSelect.bind(null, language)}
            className={props.selectedLanguage === language
              ? "languages selected-language"
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

class Popular extends React.Component {
  constructor(props) {
    super();

    this.state = {
      selectedLanguage: 'All'
    }

    this.setLanguage = this.setLanguage.bind(this);
  }
  setLanguage(lang) {
    this.setState(function(){
      return {
        selectedLanguage: lang
      }
    });
  }
  render() {
    return(
      <SelectLanguage
        onSelect={this.setLanguage}
        selectedLanguage={this.state.selectedLanguage} />
    );
  }
}

module.exports = Popular;
