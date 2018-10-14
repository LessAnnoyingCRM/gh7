import * as React from 'react';
import _ from 'underscore';
import moment from 'moment-timezone';

import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FakeConversationData from '../../stores/conversations';
import ConversationSummary from './ConversationSummary';

import { Message } from '../../types/Message';

type Props = {
    navigation: any
};
export default class Inbox extends React.Component<Props> {    
    render() {
        if(_.size(FakeConversationData) == 0){
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>You have no conversations!</Text>
                </View>
            );
        }

        const GroupedData = _.chain(FakeConversationData).groupBy('ConversationId').value();
        let MostRecentConversations: any = {};

        _.each(GroupedData, (Messages, ConversationId: number) => {
            MostRecentConversations[ConversationId] = _.max(Messages, (Message) => { return moment(Message.DateSent).unix() });
        });

        const SortedData = _.sortBy(MostRecentConversations, (Message: Message) => { return Message.DateSent; }).reverse();
        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <ScrollView>
                    {_.map(SortedData, (Message: Message) => {
                        return (
                            <ConversationSummary
                                key={Message.ConversationId}
                                Messages={GroupedData[Message.ConversationId]} 
                                ConversationId={Message.ConversationId} 
                                navigation={navigation}
                            />
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
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
