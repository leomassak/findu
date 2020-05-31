import AsyncStorage from '@react-native-community/async-storage';

const PERSIST_KEY_IS_LOGGED = '@FindU:isLoged';
const PERSIST_KEY_USER_AUTH_DATA = '@FindU:authData';
const PERSIST_KEY_USER_DATA = '@FindU:userData';

async function isAuthenticated() {
    const token = await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA);
    const isLogged = await AsyncStorage.getItem(PERSIST_KEY_IS_LOGGED);
    return (token && isLogged);
}

async function createUserAuthData(token) {
    await AsyncStorage.setItem(PERSIST_KEY_IS_LOGGED, JSON.stringify(true));
    await AsyncStorage.setItem(PERSIST_KEY_USER_AUTH_DATA, JSON.stringify(token));
}

async function createUserData(user) {
    await AsyncStorage.setItem(PERSIST_KEY_USER_DATA, JSON.stringify(user));
}

async function getUserAuthData() {
    if(isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_AUTH_DATA));
}

async function getUserData() {
    if(isAuthenticated()) return JSON.parse(await AsyncStorage.getItem(PERSIST_KEY_USER_DATA));
}

async function cleanAuth() {
    console.log('entrou');
    await AsyncStorage.removeItem(PERSIST_KEY_USER_AUTH_DATA);
}

export default {
    isAuthenticated,
    createUserAuthData,
    createUserData,
    getUserAuthData,
    getUserData,
    cleanAuth,
}