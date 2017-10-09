import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.text
    }
  }
  componentDidMount() {
    const { text } = this.state;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
      text === stopper
        ? this.setState(() => ({ text: this.props.text }))
        : this.setState(() => ({ text: `${text}.` }))
    }, 300);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading'
};

Loading.propTypes = {
  text: PropTypes.string.isRequired
};
