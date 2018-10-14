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

import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';
import ConversationData from '../../stores/conversations';
import Users from '../../stores/users';

export default class Conversation extends React.Component {
    PlayMessage = () => {
        
    }
   
    RenderMessage({item}) {
        const MyUserId = 2;

        if(item.FromUserId == MyUserId){
            return (
                <View style={styles.FromMe}>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={{fontSize: 10}}>{item.DateCleaned}</Text>
                        <Text style={{fontSize: 10}}>{item.TimeCleaned}</Text>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{textAlign: 'right', marginRight: 6}}>{"Nicola Pedretti"}</Text>
                        <View style={styles.MessageFromMe}>
                            <TouchableHighlight onPress={() => this.PlayMessage} underlayColor="rgba(255,255,255,0.4)">
                                <View style={styles.PlayMessageButton}>
                                    <Svg
                                        width="16"
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="#fff" 
                                        stroke="#fff" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <Polygon points="5 3 19 12 5 21 5 3"></Polygon>
                                    </Svg>
                                </View>
                            </TouchableHighlight>
                            <View style={{justifyContent:'center'}}><Text style={styles.MessageLength}>{item.MessageLength}</Text></View>
                        </View>
                    </View>
                    <Image style={styles.picture} source={ require('../../nic.jpg') } />
                </View>
            );
        } else {
            return (
                <View style={styles.ToMe}>
                    <Image style={styles.picture} source={ require('../../woman.jpg') } />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{textAlign: 'left', marginLeft: 6}}>{"Michelle Smith"}</Text>
                        <View style={styles.MessageToMe}>
                            <TouchableHighlight onPress={() => this.PlayMessage} underlayColor="rgba(255,255,255,0.4)">
                                <View style={styles.PlayMessageButton}>
                                    <Svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <Polygon points="5 3 19 12 5 21 5 3"></Polygon>
                                    </Svg>
                                </View>
                            </TouchableHighlight>
                            <View style={{justifyContent:'center'}}><Text style={styles.MessageLength}>{item.MessageLength}</Text></View>
                        </View>
                    </View>    
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={{fontSize: 10}}>{item.DateCleaned}</Text>
                        <Text style={{fontSize: 10}}>{item.TimeCleaned}</Text>
                    </View>
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
        fontSize: 20
    },
    FromMe: {
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        maxWidth: '95%',      
    },
    ToMe: {
        flex: 1,
        backgroundColor: '#FFF',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: '95%',
    },
    MessageFromMe: {
        backgroundColor: '#E7EFF5',
        width: 250,
        height: 45,
        borderRadius: 9,
        color: '#000',
        lineHeight: 28,
        padding: 6,
        margin: 6,
        flexDirection: "row",
		justifyContent: "space-between",
    },
    MessageToMe: {
        backgroundColor: '#F3F3F3',
        width: 250,
        height: 45,
        borderRadius: 9,
        color: '#000',
        lineHeight: 28,
        padding: 6,
        margin: 6,
        flexDirection: "row",
		justifyContent: "space-between",
    },
    PlayMessageButton: {
        backgroundColor: '#83C0EC',
        width: 30,
        height: 30,
        borderRadius: 30/2,
        alignItems: 'center',
        padding: 7,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        color: "#fff",
        lineHeight: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    MessageLength: {
        justifyContent: 'flex-end',
        fontSize: 11,
        lineHeight: 14,
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
    }
});
