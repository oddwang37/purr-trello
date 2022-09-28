import { v4 as uuidv4 } from 'uuid';

const rand = () => {
  const id = uuidv4();
  return id;
};

export default rand;
