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

import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, Alert, Slider } from 'react-native';

import Message from './Message';
import ConversationData from '../../stores/conversations';
import Users from '../../stores/users';

export default class Conversation extends React.Component {

    count = 6;
   
    RenderMessage= ({item}) => {
        let Count = Math.floor(Math.random()*this.count) + 1;
        if(Count = 3){
            Count++;
        }
        const PlayPath = 'https://s3.amazonaws.com/gh7/'+Count+'.mp4'; //item.URL

        return (
            <Message item={item} RecordingUrl={PlayPath} key={item.MessageId} />
        );
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
                <View style={styles.ConvoFooter}>
                    <View style={styles.RecordMessageButton}>
                        <TouchableHighlight>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.MicIcon}></Text>
                                <View style={{justifyContent:'center'}}><Text style={{fontSize:13, fontWeight:'bold', letterSpacing: 2.5}}>{"RECORD MESSAGE"}</Text></View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.ConvoFooterButtons}>
                        <View style={styles.UnmatchButton}>
                            <TouchableHighlight>
                                <View style={{alignItems:'center'}}>
                                    <Text>-</Text> 
                                    <Text style={{fontSize:10, letterSpacing:1}}>{"UNMATCH"}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.ConfirmMetButton}>
                            <TouchableHighlight>
                                <View style={{alignItems:'center'}}>
                                    <Text>O</Text>
                                    <Text style={{fontSize:10, letterSpacing:1}}>{"TAP HERE AFTER YOU’VE MET"}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    ConvoFooter: {
        width: '100%',
        alignItems: 'center',
    },
    ConvoFooterButtons: {
        flexDirection: 'row',
        height: 67,
        width: '100%',
        borderTopColor: '#DDDDDD',
        borderTopWidth: 1,
    },
    UnmatchButton: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#DDDDDD',
        borderRightWidth: 1,
    },
    ConfirmMetButton: {
        flex: 1,
        backgroundColor: '#F4E8DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    RecordMessageButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#AA282840',
        borderRadius: 36/2,
        borderWidth: 3,
        width: 217,
        height: 38,
        margin: 16,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MicIcon: {
        height: 24,
        width: 24,
        borderRadius: 24/2,
        backgroundColor: '#AA2828',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
    },
});
