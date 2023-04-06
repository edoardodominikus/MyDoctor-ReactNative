import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value == null){
        console.log("getData null");
    }
    if (value !== null) {
        console.log("getData");
        return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};
