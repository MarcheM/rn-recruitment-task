import React from "react";
import {
    SafeAreaView,
    Image,
    StyleSheet,
    View
} from "react-native";

interface Props {
    children: React.ReactNode
}

const AppLayout: React.FC<Props> = ({children})=>{
    return <SafeAreaView style={styles.container}>
        <Image
            source={require('../../assets/icons/Nav.png')}
            style={styles.icon}
        />
        <View style={styles.content}>
        {children}
        </View>
    </SafeAreaView>
}

export default AppLayout

const styles=StyleSheet.create({
    icon: {
        width: '100%',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20
    }
})