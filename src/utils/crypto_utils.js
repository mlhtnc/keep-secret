import Aes from 'react-native-aes-crypto';


const encrypt = async (password, plainText) => {
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

const decrypt = async (password, cipherText, iv, salt) => {
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

const sha512 = async (text) => {
  return await Aes.sha512(text);
}


export {
  encrypt,
  decrypt,
  sha512
}