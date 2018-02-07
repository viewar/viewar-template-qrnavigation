export function createStorageService(viewarApi) {
  const storageService = {
    editKey,
    deleteKey
  };

  return storageService;

  async function editKey({ path, type = 'cloud', oldKey, newKey }) {
    const data = await viewarApi.storage[type].read(path);
    data[newKey] = data[oldKey];
    delete data[oldKey];
    await viewarApi.storage[type].write(path, JSON.stringify(data));
    return data;
  }

  async function deleteKey({ path, type = 'cloud', key }) {
    const data = await viewarApi.storage[type].read(path);
    delete data[key];
    await viewarApi.storage[type].write(path, JSON.stringify(data));
    return data;
  }
}
