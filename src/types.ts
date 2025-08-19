import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailsScreenName, HomeScreenName, LoginScreenName, SettingsScreenName } from "./constants";
import { GestureResponderEvent, TextStyle } from "react-native";


export interface ColorsType {
  background: string;
  textPrimary: string;
  textSecondary: string;
  buttonPrimary: string;
  success: string;
  error: string;
  border: string;
}

export type RootStackParamList = {
  [LoginScreenName]: undefined;
  [HomeScreenName]: { masterPassword: string };
  [DetailsScreenName]: { secret: SecretItem, onConfirm: (confirmedSecretItem: SecretItem) => void, onDelete: (id: string) => void };
  [SettingsScreenName]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof HomeScreenName
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof DetailsScreenName
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof LoginScreenName
>;

export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof SettingsScreenName
>;

export interface ScreenHeaderProps {
  title: string;
  onTitleChanged?: (title: string) => void;
  editTitle?: boolean;
  titleTextStyle?: TextStyle;
  hideEditButton?: boolean;
}

export interface HomeSecretListProps {
  secretList: SecretItem[];
  onSecretItemClicked: (item: SecretItem) => void;
}

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
  name: string;
  username: string;
	password: string;
  notes: string;
}

export interface ErrorMessage {
  title: string;
  description: string;
}

export interface ImportSecretsResult {
  result: boolean;
  errorMessage?: ErrorMessage;
}
