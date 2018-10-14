import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default class MessageSent extends React.Component {
    render(){
        return (
            <View>
                <View>

                </View>
                <View>
                    <Text style={styles.confirmation}>
                        You've been added to their list!
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    confirmation: {
        fontFamily: "Lato",
        fontSize: 35,
        lineHeight: 42,
        textAlign: 'center'
    }
});