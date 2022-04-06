import { encrypt, decrypt } from './Cypher';

export const save = (key: string, value: string): void =>{
  if (!(key && value != null)) {
    throw new Error('key, value params are required');
  }
  localStorage.setItem(btoa(key), encrypt(value));
}

export const get = (key: string): string | null=>{
  if (key == null) {
    throw new Error('key param is required');
  }
  const cipherText = localStorage.getItem(btoa(key));
  if (cipherText == null) {
    return null;
  } else {
    return decrypt(cipherText);
  }
}

export const checkSession = (key:string) =>  {
  let session = localStorage.getItem(btoa(key));
  const result =  session != null;
  return result;
}

export const cleanSession = () =>  {
  localStorage.clear();
}