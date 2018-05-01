import _ from 'lodash';

const localStorage = typeof window !== 'undefined' && _.get(window, 'localStorage', undefined);

const isLocalStorageSupported = (function _checkLocalStorageSupported() {
  if (!localStorage) return false;
  const testKey = 'test';
  try {
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}());

const inMemoryStorage = {};

export const setItem = (key, value) => {
  if (!isLocalStorageSupported) {
    inMemoryStorage[key] = value;
    return;
  }
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  if (!isLocalStorageSupported) {
    return inMemoryStorage[key];
  }
  return localStorage.getItem(key);
};

export const removeItem = (key) => {
  if (!isLocalStorageSupported) {
    return inMemoryStorage[key];
  }
  return localStorage.removeItem(key);
};

export default {
  setItem,
  getItem,
  removeItem,
};
