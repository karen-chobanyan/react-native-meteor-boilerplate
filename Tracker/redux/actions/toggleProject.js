export default function toggleProject(id) {
  return () => {
    Meteor.call('toggleProject', id);
  };
};