import { ErrorMessage } from "./types";

export const LoginScreenName: string = "LoginScreen";
export const HomeScreenName: string = "HomeScreen";
export const SettingsScreenName: string = "SettingsScreen";




export const CannotImportAlreadyHaveSecretsAlertMessage: ErrorMessage = {
  title: "Cannot Import",
  description: "You already have secrets. To import new secrets you need delete all of them."
}

export const CannotImportFileIsBrokenAlertMessage: ErrorMessage = {
  title: "Cannot Import",
  description: "Secret file is broken."
}

export const CannotImportMMPassOrBrokenFileAlertMessage: ErrorMessage = {
  title: "Cannot Import",
  description: "Mismatched password or secret file may be broken."
}

export const CannotExportNoSecretsAlertMessage: ErrorMessage = {
  title: "Cannot Export",
  description: "You don't have any secrets to export."
}

export const CannotExportSecretFileAlreadyExistAlertMessage: ErrorMessage = {
  title: "Cannot Export",
  description: "You already have keep.secret file in your Downloads folder. Please rename or move your keep.secret file"
}