import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview({ avatar, username, children }) {
  return (
    <div className='column'>
      <img
        className='avatar'
        src={avatar}
        alt={'Username for ' + username}
      />
      <h3>@{username}</h3>
      {children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}
