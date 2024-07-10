import { CannotImportFileIsBrokenAlertMessage, CannotImportMMPassOrBrokenFileAlertMessage } from "../constants";
import { decrypt } from "./crypto_utils";
import { loadPassHash, saveSecret } from "./save_utils";


const importSecrets = async (secretCipherDataStr) => {
  const passHash = await loadPassHash();
  let secretCipherData;

  try {
    secretCipherData = JSON.parse(secretCipherDataStr);  
  } catch(err) {
    return [ false, CannotImportFileIsBrokenAlertMessage ];
  }


  if(!secretCipherData.cipherText || !secretCipherData.iv || !secretCipherData.salt) {
    return [ false, CannotImportFileIsBrokenAlertMessage ];
  }


  try {
    const unencryptedText = await decrypt(passHash, secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt);
    if(!unencryptedText) {
      return [ false, CannotImportMMPassOrBrokenFileAlertMessage ];
    }

    saveSecret(secretCipherData);
    console.log("done")
    return [ true ];

  } catch(err) {
    return [ false, CannotImportMMPassOrBrokenFileAlertMessage ];
  }
}


export {
  importSecrets,
}