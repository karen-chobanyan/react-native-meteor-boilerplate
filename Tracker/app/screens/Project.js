import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { Header } from 'react-native-elements'
import Loading from '../components/Loading';
import { colors } from '../config/styles';
import { connect }  from 'react-redux';

const window = Dimensions.get('window');
const MARGIN_HORIZONTAL = 10;
const cardSize = window.width - (MARGIN_HORIZONTAL * 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {},
  item: {
    backgroundColor: colors.buttonBackground,
    width: cardSize,
    height: cardSize / 2,
    marginHorizontal: MARGIN_HORIZONTAL,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.buttonText,
  },
  header: {
    backgroundColor: colors.buttonBackground,
  }
});

const Project = ({ projectReady, project }) => {
  if (!projectReady) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header style={styles.header}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: project.name, style: { color: '#fff' } }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      />    
      <View style={styles.item} key={project._id}>
        <Text style={styles.itemText}>{project.name}</Text>
      </View>        
    </View>
  );
};

Project.propTypes = {
  projectReady: PropTypes.bool,
  project: PropTypes.object,
  navigation: PropTypes.object,
};

const ProjectContainer = createContainer((project) => {
  const handle = Meteor.subscribe('projects-list');
  console.log(handle);
  return {
    projectReady: handle.ready(),
    project: Meteor.collection('projects').findOne(project._id) || {},
  };
}, Project);

export default connect()(ProjectContainer)