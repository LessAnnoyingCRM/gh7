import React from 'react';
const RNFS = require('react-native-fs');
import moment from 'moment-timezone';

import { inject } from 'mobx-react';
import { Alert, StyleSheet, TouchableHighlight, Text, View, Switch, Slider, Image } from 'react-native';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';
import Button from 'react-native-button';

type Props = {};

let filename = 'recording';

@inject('ConversationStore')
export default class RecordMessage extends React.Component<Props> {
    constructor(props: any) {
        super(props);

        this.state = {
            playPauseButton: 'Preparing...',
            recordButton: 'Preparing...',

            stopButtonDisabled: true,
            playButtonDisabled: true,
            recordButtonDisabled: true,

            loopButtonStatus: false,
            progress: 0,

            error: null
        };

        this.currentFile = filename
        this.count = 0
        this.previousFile = ''
    }

    componentWillMount() {
        this.recorder = null;
        this._reloadRecorder();
    }

    _updateState(err) {
        this.setState({
            recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
            recordButtonDisabled: !this.recorder,
        });
    }
    
    _reloadRecorder = () => {
        if (this.recorder) {
            this.recorder.destroy();
        }

        this.currentFile = filename + "_" + this.count;
        this.count++;

        this.recorder = new Recorder(this.currentFile + ".mp4", {
            bitrate: 256000,
            channels: 2,
            sampleRate: 44100,
            quality: 'max'
            //format: 'ac3', // autodetected
            //encoder: 'aac', // autodetected
        });

        this._updateState();
    }

    _toggleRecord = () => {
        this.recorder.toggleRecord((err, stopped) => {
            if (err) {
                this.setState({
                    error: err.message
                });
            }
            if (stopped) {
                this.SubmitFile();
                this._reloadRecorder();
            }
            this._updateState();
        });        
        this.previousFile = this.currentFile;
    }
    SubmitFile = () => {
        const files = [
            {
                name: this.previousFile,
                filename: this.previousFile+'.mp4',
                filepath: RNFS.DocumentDirectoryPath + '/' + this.previousFile + '.mp4',
                filetype: 'audio/mp4'
            }
        ];

        RNFS.uploadFiles({
            toUrl: 'https://api.lacathon.com/api_endpoint.php?Function=SendVoiceMessage&UserId=1&Parameters={MatchId:'+this.props.navigation.getParam("MatchId", 2)+'}',
            files: files,
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        }).promise.then((response) => {
            this.props.navigation.navigate('Confirmation');
            this.props.ConversationStore.saveMessage(this.props.navigation.getParam("MatchId", 2), files[0].filepath, moment().format());
        }).catch((err) => {
            //Alert.alert("There was an error! Please try again.");
        });
        //this.props.navigation.navigate('Confirmation');
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View>
                    <Text style={styles.title}>Say hi to {this.props.navigation.getParam('Name', 'Jane Doe')}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        containerStyle={styles.recordButton}
                        onPress={() => this._toggleRecord()}
                        style={{color: 'white'}}
                    >
                        <Image source={this.recorder && this.recorder.isRecording ? require('../../baseline_stop_white_24.png') : require('../../baseline_mic_none_white_24.png')} />
                    </Button>
                </View>
                <View style={styles.recordingSound} />
                <View style={{marginTop: 70, textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <Text style={{color: "#D78B47", fontSize: 24, lineHeight: 29, fontFamily: 'Lato'}}>Need some help?</Text>
                    <Text style={styles.subText}>"I would love to share a meal with you!"</Text>
                    <Text style={styles.subText}>"I hope to get to know you better!"</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        textAlign: 'center',
        lineHeight: 42,
        fontFamily: 'Lato'
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 110
    },
    buttonWrapper: { 
        borderWidth: 1, 
        borderColor: '#333', 
        borderRadius: 100, 
        padding: 10, 
        marginTop: 25 
    },
    recordButton: {
        borderRadius: 75,
        height: 110,
        width: 110,
        backgroundColor: '#AA2828',
        //marginTop: 35,
        paddingTop: 10,
        paddingLeft: 7
    },
    recordingSound: {
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        paddingBottom: 20,
        width: 295,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        height: 92
    },
    subText: {
        lineHeight: 29,
        fontFamily: 'Lato',
        fontSize: 16,
        color: "#555"
    }
});