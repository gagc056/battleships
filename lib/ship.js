const shipFactory = (length) => {
  const hits = (new Array(length)).fill(false);

  const shipInstance = {
    length,
    hits,
    isSunk: () => {
      for (let i = 0; i < shipInstance.hits.length; i += 1) {
        if (shipInstance.hits[i] === false) {
          return false;
        }
      }
      return true;
    },
    hit: (position) => {
      if (position in shipInstance.hits) {
        shipInstance.hits[position] = true;
        return true;
      }
      return false;
    },
  };

  return shipInstance;
};

export default shipFactory;
