import React from 'react'
import PropTypes from 'prop-types'
import Meteor, { createContainer } from 'react-native-meteor'
import { AuthStack, HomeStack } from './config/routes'
import Loading from './components/Loading'
import settings from './config/settings'
import { connect } from 'react-redux'

Meteor.connect(settings.METEOR_URL);

const RNApp = (props) => {
  const { status, user, loggingIn } = props;

  if (status.connected === false || loggingIn) {
    return <Loading />;
  } else if (user !== null) {
    return <HomeStack />;
  }
  return <AuthStack />;
};

RNApp.propTypes = {
  status: PropTypes.object,
  user: PropTypes.object,
  loggingIn: PropTypes.bool,
};

export default createContainer(() => {
  console.log(settings.METEOR_URL);
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, RNApp);
