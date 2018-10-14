import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path, Polyline } from 'react-native-svg';
import Button from 'react-native-button';

export default class RatingConfirmation extends React.Component {
    render() {
        return (
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Svg
                        height='100'
                        width='100'
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={styles.icon}
                    >
                        <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke='#AA493C' strokeOpacity={0.6}></Path>
                        <Polyline points="22 4 12 14.01 9 11.01" stroke='#AA493C'></Polyline>
                    </Svg>
                </View>
                <View>
                    <Text style={styles.confirmation}>
                        Thanks for rating your experience!
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 154}}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Matches')}
                        style={styles.buttonText}
                        containerStyle={styles.activeButton}
                    >
                        FIND YOUR NEXT MATCH
                    </Button>
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
    },
    icon: {
        marginTop: 100,
        marginBottom: 65,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonText: {
        color: "#fff",
        paddingTop: 7,
        fontSize: 20,
        letterSpacing: 2.5,
        fontWeight: 'bold'
    },
    activeButton: {
        backgroundColor: '#D78B47',
        width: 325,
        height: 40,
        borderRadius: 50,
        marginTop: 50
    },
});