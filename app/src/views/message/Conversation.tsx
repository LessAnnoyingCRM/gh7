/**
 * TODO:
 * Maybe also support passing in the conversation id instead of just loading the hardcoded one
 * Also dynamically figure out user's id... lol
 */
import React from 'react';
import _ from 'underscore';
<<<<<<< HEAD
import Api from '../../utils/api';
import { inject, observer } from 'mobx-react';

import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight, Alert, Slider } from 'react-native';
import { Svg, Path, Polyline, Circle, Line } from 'react-native-svg';
import Message from './Message';
import ConversationData from '../../stores/conversations';
import Users from '../../stores/users';
import { MatchStore } from '../../stores/matches'

interface State {ConversationData:any, MatchId:string};
type Props = {
    MatchStore: MatchStore
};
@inject('MatchStore')
@observer

export default class Conversation extends React.Component<Props, State> {
	
    componentWillMount() {
        Api.Call("GetCurrentMatch", {}).then((Result) => {
            this.setState({MatchId:Result['MatchId']});
            Api.Call("GetVoiceMessages", {MatchId:Result['MatchId']}).then((Result) => {
                this.setState({ConversationData:Result['Conversation']});
            });
        });
    }

    PlayMessage = () => {
        
    }

    count = 6;
    RenderMessage = ({item}) => {
        let Count = Math.floor(Math.random()*this.count) + 1;
        if(Count == 3){
            Count++;
        }
        const PlayPath = 'https://s3.amazonaws.com/gh7/'+Count+'.mp4'; //item.URL
        console.log("here's an item", item)
        return (
            <Message item={item} RecordingUrl={PlayPath} key={item.MessageId} />
        );
    }

    UnMatch = () => {
        this.props.MatchStore.HandleResponse("Like", 2);
        this.props.navigation.navigate("Matches");
    }

    render() {
        let MatchId = 2;
        //    const GroupedConversations = _.chain(this.state.ConversationData).filter((Message) => { return Message.MatchId == MatchId }).sortBy('DateSent').value();
        const GroupsConversations = this.state.ConversationData;

        return (
            <View style={styles.container}>
                <FlatList
                    data={GroupedConversations}
                    renderItem={this.RenderMessage}
                    keyExtractor={(item) => item.MessageId.toString()}
                />
                <View style={styles.ConvoFooter}>
                    <View style={styles.RecordMessageButton}>
                        <TouchableHighlight onPress={() => navigate('Record')}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.MicIcon}></Text>
                                <View style={{justifyContent:'center'}}><Text style={{fontSize:13, fontWeight:'bold', letterSpacing: 2.5}}>{"RECORD MESSAGE"}</Text></View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.ConvoFooterButtons}>
                        <View style={styles.UnmatchButton}>
                            <TouchableHighlight onPress={() => this.UnMatch()}>
                                <View style={{alignItems:'center'}}>
                                    <View>
                                        <Svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="#333" 
                                            strokeWidth="2" 
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={styles.icon}
                                        >
                                            <Path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></Path>
                                            <Circle cx="8.5" cy="7" r="4"></Circle>
                                            <Line x1="23" y1="11" x2="17" y2="11"></Line>
                                        </Svg>
                                    </View> 
                                    <Text style={{fontSize:10, letterSpacing:1}}>{"UNMATCH"}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.ConfirmMetButton}>
                            <TouchableHighlight>
                                <View style={{alignItems:'center'}}>
                                    <View>
                                        <Svg
                                            height='16'
                                            width='16'
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={styles.icon}
                                        >
                                            <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></Path>
                                            <Polyline points="22 4 12 14.01 9 11.01"></Polyline>
                                        </Svg>
                                    </View>
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
    icon: {
        marginBottom: 7
    }
});
