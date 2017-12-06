import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import { connect }  from 'react-redux';
import Loading from '../components/Loading';
import { colors } from '../config/styles';
import { Header } from 'react-native-elements'
import { Store } from '../../redux/stores/store'
import { NavigationActions } from 'react-navigation'



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

const Projects = ({ projectsReady, projects, navigation }) => {
  if (!projectsReady) {
    return <Loading />;
  }
  onProjectPress = project => {
        const navigate = navigation.navigate;
        navigate("Project", {
            project: project
        });
    };

  

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <ScrollView>
        {projects.map((project) => (  
            <TouchableOpacity onPress={ () => this.onProjectPress(project) } style={styles.item} key={project._id}>
              <Text style={styles.itemText}>{project.name}</Text>
            </TouchableOpacity>        
        ))}
      </ScrollView>
    </View>
  );
};

Projects.propTypes = {
  projectsReady: PropTypes.bool,
  projects: PropTypes.array,
  navigation: PropTypes.object,
};

const TodoApp =  createContainer(() => {
  const handle = Meteor.subscribe('projects-list');
  return {
    projectsReady: handle.ready(),
    projects: Meteor.collection('projects').find() || [],
  };
}, Projects);

function mapStateToProps(state) {
  return {

  };
}

export default connect()(TodoApp)