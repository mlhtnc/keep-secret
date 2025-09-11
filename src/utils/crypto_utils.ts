import Aes from 'react-native-aes-crypto';
import base64 from 'react-native-base64';
import 'react-native-get-random-values';


export const encrypt = async (password: string, plainText: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const iv = await Aes.randomKey(16);
      const salt = await Aes.randomKey(32);
      const key = await Aes.pbkdf2(password, salt, 200000, 256, 'sha256');
      const cipherText = await Aes.encrypt(plainText, key, iv, 'aes-256-cbc');

      resolve({
        iv: iv,
        salt: salt,
        cipherText: cipherText
      });
      
    } catch(err) {
      reject(err);
    }
  });
}

export const decrypt = async (password: string, cipherText: string, iv: string, salt: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const key = await Aes.pbkdf2(password, salt, 200000, 256, 'sha256');
      const unencryptedText = await Aes.decrypt(cipherText, key, iv, 'aes-256-cbc');    

      resolve(unencryptedText);
    } catch(err) {
      reject(err);
    }
  });
}

export const sha512 = async (text: string) => {
  return await Aes.sha512(text);
}

export const generateDEK = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64Encode(array);
}

const base64Encode = (buffer: Uint8Array): string => {
  return base64.encode(String.fromCharCode.apply(null, buffer as any));
};