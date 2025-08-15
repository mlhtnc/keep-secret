import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeScreenName, LoginScreenName, SettingsScreenName } from "./constants";
import { GestureResponderEvent } from "react-native";


export interface ColorsType {
  background: string;
  textPrimary: string;
  success: string;
  error: string;
}

export type RootStackParamList = {
  [LoginScreenName]: undefined;
  [HomeScreenName]: undefined;
  [SettingsScreenName]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof HomeScreenName
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof LoginScreenName
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof SettingsScreenName
>;

export interface AlertModalRef {
	open: (options?: { title: string; description: string }) => void;
	close: () => void;
}

export interface SyncActivitiyIndicatorParams {
  show: boolean;
}

export interface SettingsListElementProps {
  title: string;
  subtitle?: string;
  onPress: (event: GestureResponderEvent) => void;
}


export interface SecretModalInfoOnAdd {
  info: string;
  password: string;
} 

export interface AddEditSecretModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onAdded: (info: SecretModalInfoOnAdd) => void;
}

export interface SecretItem {
	id: string;
	info: string;
	password: string;
}

export interface ErrorMessage {
  title: string;
  description: string;
}

export interface ImportSecretsResult {
  result: boolean;
  errorMessage?: ErrorMessage;
}
