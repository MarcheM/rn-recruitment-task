import { View, TextInput, StyleSheet, Image } from "react-native";
import React from "react";

interface Props {
    value: string,
    setValue: (value: string) => void,
}

const Filter:React.FC<Props> = ({value, setValue}) => {
    return (
        <View style={styles.inputContainer}>
            <Image source={require('../../assets/icons/Magnify.png')} />
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={'Search the characters'}
                style={styles.input}
            />
        </View>
    );
}

export default Filter

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#162C1B',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginBottom: 16,
        paddingHorizontal: 12,
        gap: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
});