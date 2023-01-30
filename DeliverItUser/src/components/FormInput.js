//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    TextInputProps,
    TextInput,
    ViewStyle,
    StyleSheet,
} from 'react-native';
import COLORS from '../../assets/constants/colors';

// create a component
const FormInput = ({
    containerStyle,
    label,
    placeholder,
    inputStyle,
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = 'default',
    autoComplete = 'off',
    autoCapitalize = 'none',
    errorMsg = '',
    maxLength,
    inputContainerStyle,
}) => {
    return (
        <View style={{ ...containerStyle }}>
            {/* Label & Error msg */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: COLORS.gray}}>{label}</Text>
                <Text style={{ color: COLORS.red}}>{errorMsg}</Text>
            </View>
            {/* Text input */}
            <View style={[styles.containerInput, { ...inputContainerStyle }]}>
                {prependComponent}
                <TextInput
                    style={{
                        flex: 1,
                        ...inputStyle,
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoComplete={autoComplete}
                    autoCapitalize={autoCapitalize}
                    onChangeText={(text) => onChange(text)}
                    maxLength={maxLength}
                />
                {appendComponent}
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        height: 52,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.grey,
    },
});

//make this component available to the app
export default FormInput;
