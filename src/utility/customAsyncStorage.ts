import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Get Item
export async function retrieveItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Error retrieving item:', error);
    return null;
  }
}

// 🔹 Store Item
export async function storeItem<T>(key: string, item: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing item:', error);
  }
}

// 🔹 Remove Single Key
export async function clearAsyncKeyData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

// 🔹 Clear All
export async function clearData(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}
