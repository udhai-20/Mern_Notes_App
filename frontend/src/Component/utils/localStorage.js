const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getData = (key) => {
  try {
    let data = localStorage.getItem(key);
    let res = JSON.parse(data);
    return res;
  } catch {
    return null;
  }
};

export { saveData, getData };
