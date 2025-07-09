const save = (key: string, value: unknown) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error: any) {
    console.error("Set state error: ", error.message);
  }
};

const load = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error: any) {
    console.error("Get state error: ", error.message);
  }
};

const remove = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error: any) {
    console.error("Remove state error: ", error.message);
  }
};

export default {
  save,
  load,
  remove,
};
