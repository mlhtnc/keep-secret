import { ErrorMessage, ColorsType, SecretItem } from "./types";

export const LoginScreenName = "LoginScreen";
export const HomeScreenName = "HomeScreen";
export const DetailsScreenName = "DetailsScreen";


export const Colors: ColorsType = {
  background: "#000",
  textPrimary: "#E7E9EA",
  textSecondary: "#8899A6",
  buttonPrimary: "#EDAE46",
  success: "#00BA7C",
  error: "#F4212E",
  border: "#2F3336"
}

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

export const EmpytSecretItem: SecretItem = {
  id: "",
  name: '',
  username: '',
  password: '',
  notes: ''
}