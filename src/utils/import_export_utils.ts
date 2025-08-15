import { CannotImportFileIsBrokenAlertMessage, CannotImportMMPassOrBrokenFileAlertMessage } from "../constants";
import { ImportSecretsResult } from "../types";
import { decrypt } from "./crypto_utils";
import { loadPassHash, saveSecret } from "./save_utils";


const importSecrets = async (secretCipherDataStr: string): Promise<ImportSecretsResult> => {
  const passHash = await loadPassHash();

  if(passHash === null) {
    return { result: false, errorMessage: CannotImportFileIsBrokenAlertMessage }; // FIXME: Add new error message here
  }

  let secretCipherData;

  try {
    secretCipherData = JSON.parse(secretCipherDataStr);  
  } catch(err) {
    return { result: false, errorMessage: CannotImportFileIsBrokenAlertMessage };
  }


  if(!secretCipherData.cipherText || !secretCipherData.iv || !secretCipherData.salt) {
    return { result: false, errorMessage: CannotImportFileIsBrokenAlertMessage };
  }


  try {
    const unencryptedText = await decrypt(passHash, secretCipherData.cipherText, secretCipherData.iv, secretCipherData.salt);
    if(!unencryptedText) {
      return { result: false, errorMessage: CannotImportMMPassOrBrokenFileAlertMessage };
    }

    saveSecret(secretCipherData);
    return { result: true };

  } catch(err) {
    return { result: false, errorMessage: CannotImportMMPassOrBrokenFileAlertMessage };
  }
}


export {
  importSecrets,
}