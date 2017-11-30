import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import Loading from '../components/Loading';
import { colors } from '../config/styles';

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
});

const Projects = ({ projectsReady, projects }) => {
  if (!projectsReady) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {projects.map((project) => (
          <View style={styles.item} key={project._id}>
            <Text style={styles.itemText}>{project.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

Projects.propTypes = {
  projectsReady: PropTypes.bool,
  projects: PropTypes.array,
};

export default createContainer(() => {
  const handle = Meteor.subscribe('projects-list');
  console.log(handle);
  return {
    projectsReady: handle.ready(),
    projects: Meteor.collection('projects').find() || [],
  };
}, Projects);
