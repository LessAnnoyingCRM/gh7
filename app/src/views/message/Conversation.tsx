/**
 * TODO:
 * Start at the bottom of the list
 * Include user input -- button or something to record audio
 * Render audio so they can listen
 * Figure out how to stream it to the phone
 * Maybe also support passing in the conversation id instead of just loading the hardcoded one
 * Also dynamically figure out user's id... lol
 */
import React from 'react';
import _ from 'underscore';

import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import ConversationData from '../../stores/conversations';
import Users from '../../stores/users';

export default class Conversation extends React.Component {
    RenderMessage({item}) {
        const MyUserId = 2;

        if(item.FromUserId == MyUserId){
            return (
                <View style={styles.fromMe}>
                    <Text>{item.DateSent}</Text>
                    <Image style={styles.picture} source={{ uri: Users[item.FromUserId].Picture }} />
                </View>
            );
        } else {
            return (
                <View style={styles.toMe}>
                    <Image style={styles.picture} source={{ uri: Users[item.FromUserId].Picture }} />
                    <Text>{item.DateSent}</Text>
                </View>
            );
        }
    }

    render() {
        const ConversationId = 1234;
        const GroupedConversations = _.chain(ConversationData).filter((Message) => { return Message.ConversationId == ConversationId }).sortBy('DateSent').value();

        return (
            <View style={styles.container}>
                <FlatList
                    data={GroupedConversations}
                    renderItem={this.RenderMessage}
                    keyExtractor={(item) => item.MessageId.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    },
    fromMe: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        maxWidth: '95%'
    },
    toMe: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: '95%'
    },
    picture: {
        height: 75,
        width: 75,
        marginLeft: 5,
        marginRight: 5
    },
    thread: {
        marginLeft: 10,
        marginTop: 15,
    },
    name: {
        fontSize: 20
    }
});
