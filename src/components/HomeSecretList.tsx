import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

import { Colors } from '../constants';
import { HomeSecretListProps } from '../types';


export default function HomeSecretList({ secretList, onSecretItemClicked }: HomeSecretListProps) {

  return (
    <FlatList
      data={secretList}
      renderItem={({item}) => {
      
        return (
          <View style={styles.listItemContainer}>

            <TouchableOpacity style={styles.listItemButton} onPress={() => onSecretItemClicked(item)}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{color: Colors.textPrimary, fontWeight:"bold", fontSize: 18}}>{item.name}</Text>
                  <Text style={{color: Colors.textSecondary, fontSize: 16}}>{item.username}</Text>
                </View>

                <Icon name='chevron-forward-outline' size={24} color={Colors.textSecondary} style={{flex: 0.05}} />

              </View>

            </TouchableOpacity>
          </View>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 80,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  listItemButton: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.background
  }
});