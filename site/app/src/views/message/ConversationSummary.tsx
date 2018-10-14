/**
 * TODO:
 * Style this to look pretty...
 */
import React from 'react';
import moment from 'moment-timezone';
import _ from 'underscore';

import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Message } from '../../types/Message';
import Users from '../../stores/users';

type Props = {
    Messages: Message[],
    ConversationId: Message['ConversationId'],
    navigation: any
};

export default class ConversationSummary extends React.Component<Props> {
    _onPressButton = () => {
        this.props.navigation.navigate('Conversation', { ConversationId: this.props.ConversationId });
    }

    render(){
        const { Messages } = this.props;

        if(!_.size(Messages)){
            return null;
        }

        const Message = Messages[0];

        return (
            <TouchableHighlight onPress={this._onPressButton}>
                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: Users[Message.FromUserId].Picture }} />
                    <View style={styles.thread}>
                        <Text style={styles.name}>{Users[Message.FromUserId].Name}</Text>
                        <Text>{moment.tz(Message.DateSent, 'UTC').calendar()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
         );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin: 15,
        flexDirection: 'row'
    },
    picture: {
        height: 75,
        width: 75,
    },
    thread: {
        marginLeft: 10,
        marginTop: 15,
    },
    name: {
        fontSize: 20
    }
});
