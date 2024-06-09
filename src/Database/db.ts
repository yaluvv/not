import { openDB, DBSchema } from 'idb';

interface CryptocashDB extends DBSchema {
  users: {
    key: string;
    value: {
      userid: string;
      coins: number;
      isClick: boolean;
      isClick2: boolean;
    };
  };
}

const dbPromise = openDB<CryptocashDB>('cryptocash-db', 1, {
  upgrade(db) {
 db.createObjectStore('users', {
      keyPath: 'userid',
    });
    
  },
});


export const addUser = async (user: { userid: string; coins: number, isClick: boolean,    isClick2: boolean; }) => {
  const db = await dbPromise;
  await db.put('users', user);
};

export const updateUserCoins = async (userid: string, coins: number) => {
  const db = await dbPromise;
  const user = await db.get('users', userid);
  if (user) {
    user.coins = coins;
    await db.put('users', user);
  }
};


export const updateUserClick = async (userid: string, isClick: boolean) => {
  const db = await dbPromise;
  const user = await db.get('users', userid);
  if (user) {
    user.isClick = isClick;
    await db.put('users', user);
  }
};

export const updateUserClick2 = async (userid: string, isClick2: boolean) => {
  const db = await dbPromise;
  const user = await db.get('users', userid);
  if (user) {
    user.isClick2 = isClick2;
    await db.put('users', user);
  }
};

export const getUser = async (userid: string) => {
  const db = await dbPromise;
  return db.get('users', userid);
};

export const getAllUsers = async () => {
  const db = await dbPromise;
  return db.getAll('users');
};

export const clearDB = async () => {
  const db = await dbPromise;
  const tx = db.transaction('users', 'readwrite');
  await tx.objectStore('users').clear();
  await tx.done;
};
