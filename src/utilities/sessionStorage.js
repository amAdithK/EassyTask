export function sessionStorageGet(name, defaultValue = "") {
  const valueFromStore = sessionStorage.getItem(name);
  if (valueFromStore === null) return defaultValue;

  try {
    return JSON.parse(valueFromStore);
  } catch {
    return valueFromStore;
  }
}

export function sessionStorageSet(name, value) {
  if (typeof value === "undefined") return;

  sessionStorage.setItem(name, JSON.stringify(value));
}

export function sessionStorageDelete(name) {
  if (name) {
    sessionStorage.removeItem(name);
  } else {
    sessionStorage.clear();
  }
}
