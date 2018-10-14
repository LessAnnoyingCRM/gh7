import * as React from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';
import { inject, observer } from 'mobx-react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FakeConversationData from '../../stores/conversations';
import ConversationSummary from './ConversationSummary';

type Props = {
    navigation: any
};
interface State {Conversations:any};

@inject("ConversationStore")
export default class Inbox extends React.Component<Props, State> {

    render() {
        if(_.size(this.props.ConversationStore.Conversations) == 0){
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>You have no conversations!</Text>
                </View>
            );
        }

				console.log(this.props.ConversationStore.Conversations);

        return (
            <View style={styles.container}>
                <View style={styles.ChatsHeader}>
                    <Text style={{fontSize:30, letterSpacing:2, color:'#000'}}>{"YOUR CHATS"}</Text>

                </View>
                <ScrollView>
                    {_.map(this.props.ConversationStore.Conversations, (Conversation, MatchId) => {
                        return (
                            <View style={styles.PastChat}>
                                <ConversationSummary
                                    key={MatchId}
                                    Messages={Conversation[MatchId]['Conversation']} 
                                    MatchId={MatchId} 
                                    navigation={navigation}
                                />
                            </View>
                           
                        );
                    }, this)}
                </ScrollView>                 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    ChatsHeader: {
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#999',
        borderBottomWidth: 1,
    },
    PastChat: {
        backgroundColor: '#fff',
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        
    },
});
