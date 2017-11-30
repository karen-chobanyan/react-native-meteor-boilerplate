import { Meteor } from 'meteor/meteor';
import { Projects } from '/lib/collections';

export default () => {
  Meteor.publish('projects-list', () => {
    return Projects.find();
  });
}
