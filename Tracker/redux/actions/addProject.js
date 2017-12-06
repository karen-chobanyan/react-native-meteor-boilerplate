export default function addProject(text) {
  return () => {
    Meteor.call('addProject', text);
  };
};
