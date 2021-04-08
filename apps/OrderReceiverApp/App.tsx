import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import {
    InterfaceType,
    // StarConnectionSettings,
    // StarXpandCommand,
    // StarPrinter,
} from 'react-native-star-io10';
// import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 35,
    },
});

export default class App extends React.Component<
    {},
    {
        printerInterfaceType: InterfaceType;
        printerIdentifier: string;
    }
> {
    state = {
        printerInterfaceType: InterfaceType.Bluetooth,
        printerIdentifier: '',
    };

    render() {
        return (
            <SafeAreaView style={{ margin: 50 }}>
                <StatusBar />
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View>
                        <Text style={styles.title}>Order Receiver App</Text>
                        <Text style={styles.subtitle}>Please do not close this app</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
