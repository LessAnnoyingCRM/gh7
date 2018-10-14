import * as React from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';
import Api from '../../utils/Api';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FakeConversationData from '../../stores/conversations';
import ConversationSummary from './ConversationSummary';

import { Message } from '../../types/Message';

type Props = {
    navigation: any
};
interface State {Conversations:any};
export default class Inbox extends React.Component<Props, State> {

    componentWillMount() {
        Api.Call("GetAllConversations", {}).then((Result) => {
            this.setState({Conversations:Result});
        });
    }

    render() {
        if(_.size(this.state.Conversations) == 0){
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>You have no conversations!</Text>
                </View>
            );
        }

        const GroupedData = _.chain(FakeConversationData).groupBy('ConversationId').value();
        let MostRecentConversations: any = {};

        _.each(this.state.Conversations, (Messages, MatchId: number) => {
            MostRecentConversations[MatchId] = _.max(Messages, (Message) => { return moment(Message.DateSent).unix() });
        });

        const SortedData = _.sortBy(MostRecentConversations, (Message: Message) => { return Message.DateSent; }).reverse();
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.ChatsHeader}>
                    <Text style={{fontSize:30, letterSpacing:2, color:'#000'}}>{"YOUR CHATS"}</Text>

                </View>
                <ScrollView>
                    {_.map(SortedData, (Message: Message) => {
                        return (
                            <View style={styles.PastChat}>
                                <ConversationSummary
                                    key={Message.MatchId}
                                    Messages={GroupedData[Message.MatchId]} 
                                    MatchId={Message.MatchId} 
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
