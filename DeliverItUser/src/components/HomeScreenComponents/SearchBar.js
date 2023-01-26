import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';

const SearchBar = () =>{
    const [isFocused, setIsFocused] = useState(false);

    return(
        <View style={styles.SearchBar}>
            <Ionicons name="md-search" size={24} color="black" />
            <TextInput style={styles.TextInput} 
                placeholder = "Restaurants, Foods..."
                autoCapitalize = "none"
                caretHidden={true}
                autoFocus={false}/>
        </View>
    );
};

export default SearchBar;


const styles = StyleSheet.create({
    SearchBar: {
      marginHorizontal: 20,
      marginVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderRadius: 20,
      backgroundColor: "#FFFAF0",
    },

    TextInput: {
        marginLeft: 20,
    }
  });
  