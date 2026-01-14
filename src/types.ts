import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { DetailsScreenName, HomeScreenName, ImportSecretsScreenName, LoginScreenName, NoteDetailsScreenName } from "./constants";
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
  [HomeScreenName]: { dek: string };
  [DetailsScreenName]: { secret: Item, onConfirm: (confirmedSecretItem: Item) => void, onDelete: (id: string) => void };
  [NoteDetailsScreenName]: { secret: Item, onConfirm: (confirmedSecretItem: Item) => void, onDelete: (id: string) => void };
  [ImportSecretsScreenName]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof HomeScreenName
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof DetailsScreenName
>;

export type NoteDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof NoteDetailsScreenName
>;

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof LoginScreenName
>;

export interface ScreenHeaderProps {
  title: string;
  onTitleChanged?: (title: string) => void;
  onBackPress?: () => void;
  showBackButton?: boolean;
  editTitle?: boolean;
  titleTextStyle?: TextStyle;
  hideEditButton?: boolean;
}

export interface HomeSecretListProps {
  secretList: Item[];
  onSecretItemClicked: (item: Item) => void;
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

export interface NoteSecretItem {
  type: "note";
  id: string;
  name: string;
  notes: string;
}

export interface SecretItem {
  type: "secret";
  id: string;
  name: string;
  username: string;
	password: string;
  notes: string;
}

export type Item = SecretItem | NoteSecretItem;

export interface ErrorMessage {
  title: string;
  description: string;
}

export interface ImportSecretsResult {
  result: boolean;
  errorMessage?: ErrorMessage;
}
