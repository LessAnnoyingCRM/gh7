/**
 * TODO:
 * Style this to look pretty...
 */
import React from 'react';
import moment from 'moment-timezone';
import _ from 'underscore';
import Users from '../../stores/users'

import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Message } from '../../types/Message';

type Props = {
    Messages: Message[],
    MatchId: Message['MatchId'],
    navigation: any
};

export default class ConversationSummary extends React.Component<Props> {
    _onPressButton = () => {
        this.props.navigation.navigate('Conversation', { MatchId: this.props.MatchId, Messages: this.props.Messages});
    }

    render(){
        const { Messages } = this.props;

        if(!_.size(Messages)){
            return null;
        }

        const Message = Messages[0];
				
        return (
            <View>
                <TouchableHighlight onPress={this._onPressButton}>
                    <View style={styles.container}>
                        <Image style={styles.picture} source={{ uri: Users[Message.FromUserId].Picture }} />
                        <View style={styles.thread}>
                            <Text style={styles.name}>{Users[Message.FromUserId].Name}</Text>
                            <Text>{"Last message: " + Message.DateSent}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
            
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 15,
        flexDirection: 'row'
    },
    picture: {
        height: 65,
        width: 65,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 65/2,
    },
    thread: {
        marginLeft: 10,
        marginTop: 15,
    },
    name: {
        fontSize: 20,
        color: '#000',
    }
});
