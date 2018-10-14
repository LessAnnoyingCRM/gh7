import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Svg, Path, Polyline } from 'react-native-svg';

export default class MessageSent extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Matches');
        }, 1500)
    }

    render(){
        return (
            <View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
    },
    icon: {
        marginTop: 126,
        marginBottom: 65,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});