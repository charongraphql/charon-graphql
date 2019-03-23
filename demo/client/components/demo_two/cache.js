import Charon from 'charon-graphql';

const config = {
  uri: 'api/graphql',
};

const charon = new Charon(config);

export default charon;
