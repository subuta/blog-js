import _ from 'lodash';

const PREFIX = 'com.sub-labo.'

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
  // Add prefix if not specified.
  if (!_.startsWith(key, PREFIX)) {
    key = PREFIX + key
  }

  if (!isLocalStorageSupported) {
    inMemoryStorage[key] = value;
    return;
  }
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  // Add prefix if not specified.
  if (!_.startsWith(key, PREFIX)) {
    key = PREFIX + key
  }

  if (!isLocalStorageSupported) {
    return inMemoryStorage[key];
  }
  return localStorage.getItem(key);
};

export const removeItem = (key) => {
  // Add prefix if not specified.
  if (!_.startsWith(key, PREFIX)) {
    key = PREFIX + key
  }

  if (!isLocalStorageSupported) {
    return inMemoryStorage[key];
  }
  return localStorage.removeItem(key);
};

export const keys = (startsWith = '') => {
  let keys = []

  if (!isLocalStorageSupported) {
    keys = _.keys(inMemoryStorage);
  } else {
    keys = _.keys(localStorage);
  }

  if (startsWith) {
    keys = _.filter(keys, (key) => _.startsWith(key, PREFIX + startsWith))
  }

  return keys
}

export default {
  setItem,
  getItem,
  removeItem,
  keys,
};
