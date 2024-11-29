import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/* Use to portal a React component into another React component based on DOM id */
class PortalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { container: null };
    this.checkForContainer = this.checkForContainer.bind(this);
  }

  checkForContainer() {
    const container = document.getElementById(this.props.containerId);
    if (container) {
      this.setState({ container });
      clearInterval(this._intervalId);
    }
  }

  findContainer() {
    const { containerId } = this.props;
    if (!containerId) {
      this.setState({ container: null });
      return;
    }
    this._intervalId = setInterval(this.checkForContainer, 50);
  }

  componentDidMount() {
    this.findContainer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.containerId !== prevProps.containerId) {
      clearInterval(this._intervalId);
      this.findContainer();
    }
  }

  componentWillUnmount() {
    clearInterval(this._intervalId);
  }

  render() {
    const { children, containerId } = this.props;
    const { container } = this.state;
    if (containerId) {
      return container ? createPortal(children, container) : null;
    }
    return children;
  }
}

PortalContainer.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.any
};

export default PortalContainer;
