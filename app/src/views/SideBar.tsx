/**
 * TODO:
 * Style this... it's ugly right now (sorry)
 */
import React from 'react';
import _ from 'underscore';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

const Routes = [
    { name: 'Home', screen: 'Home' },
    { name: 'Current Match', screen: 'Current' },
    { name: 'Previous Matches', screen: 'History' }
]

export default class SideBar extends React.Component {
    render(){
        return(
            <View>
                {_.map(Routes, (data) => {
                    return (
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate(data.screen)}
                            key={data.name}
                            style={styles.navigation}
                            underlayColor={'#3498db'}
                        >
                            <Text>{data.name}</Text>
                        </TouchableHighlight>
                    )
                }, this)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navigation: {
        margin: 10
    }
});