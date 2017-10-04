var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div className='column'>
      <img
        className='avatar'
        src={props.avatar}
        alt={'Username for ' + props.username}
      />
      <h3>@{props.username}</h3>
      {props.children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

module.exports = PlayerPreview;
