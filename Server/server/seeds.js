import Projects from '/lib/collections/projects';

const seed = () => {
  if (Projects.find().count() === 0) {
    for (let i = 0; i < 10; i++) {
      Projects.insert({
        name: `Project #${i}`
      });
    }
  }
}

export default seed;
