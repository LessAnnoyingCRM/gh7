import React from 'react';
const RNFS = require('react-native-fs');

import { Alert, StyleSheet, TouchableHighlight, Text, View, Switch, Slider, Image } from 'react-native';
import { Player, Recorder, MediaStates } from 'react-native-audio-toolkit';
import Button from 'react-native-button';

type Props = {};

let filename = 'recording';
const ApiEndpoint = 'https://api.lacathon.com/api_endpoint.php?Function=SendVoiceMessage&UserId=1&Parameters={MatchId:123}';

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
        this.player = null;
        this.recorder = null;
        this.lastSeek = 0;

        this._reloadPlayer();
        this._reloadRecorder();

        this._progressInterval = setInterval(() => {
            if (this.player && this._shouldUpdateProgressBar()) {// && !this._dragging) {
                this.setState({ progress: Math.max(0, this.player.currentTime) / this.player.duration });
            }
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this._progressInterval);
    }

    _shouldUpdateProgressBar() {
        // Debounce progress bar update by 200 ms
        return Date.now() - this.lastSeek > 200;
    }

    _updateState(err) {
        this.setState({
            playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
            recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
            stopButtonDisabled: !this.player || !this.player.canStop,
            playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
            recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
        });
    }

    _playPause() {
        this.player.playPause((err, playing) => {
            if (err) {
                this.setState({
                    error: err.message
                });
            }
            this._updateState();
        });
    }

    _stop() {
        this.player.stop(() => {
            this._updateState();
        });
    }

    _seek(percentage) {
        if (!this.player) {
            return;
        }

        this.lastSeek = Date.now();

        let position = percentage * this.player.duration;

        this.player.seek(position, () => {
            this._updateState();
        });
    }

    _reloadPlayer() {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(filename, {
            autoDestroy: false
        }).prepare((err, fsPath) => {
            if (err) {
                console.log('error at _reloadPlayer():');
                console.log(err);
            } else {
                this.player.looping = this.state.loopButtonStatus;
            }

            this._updateState();
        });

        this._updateState();

        this.player.on('ended', () => {
            this._updateState();
        });
        this.player.on('pause', () => {
            this._updateState();
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
        if (this.player) {
            this.player.destroy();
        }

        this.recorder.toggleRecord((err, stopped) => {
            if (err) {
                this.setState({
                    error: err.message
                });
            }
            if (stopped) {
                this.SubmitFile();
                this._reloadPlayer();
                this._reloadRecorder();
            }
            this._updateState();
        });        
        this.previousFile = this.currentFile;
    }

    _toggleLooping(value) {
        this.setState({
            loopButtonStatus: value
        });
        if (this.player) {
            this.player.looping = value;
        }
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
            toUrl: ApiEndpoint,
            files: files,
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        }).promise.then((response) => {
            if(response.statusCode == 200){
                this.props.navigation.navigate('Confirmation');
            } else {
                Alert.alert("There was an error on the server! Please try again");
            }
        }).catch((err) => {
            Alert.alert("There was an error! Please try again.");
        });
    }

    render() {

        //I've commented this out because I want to keep this code for reference in implementing other features around the app -- RL

        // return (
        //     <View style={{flex: 1}}>
        //         <View>
        //             <Text style={styles.title}>
        //                 Playback
        //             </Text>
        //         </View>
        //         <View style={styles.buttonContainer}>
        //             <Button disabled={this.state.playButtonDisabled} style={styles.button} onPress={() => this._playPause()}>
        //                 {this.state.playPauseButton}
        //             </Button>
        //             <Button disabled={this.state.stopButtonDisabled} style={styles.button} onPress={() => this._stop()}>
        //                 Stop
        //             </Button>
        //         </View>
        //         <View style={styles.slider}>
        //             <Slider step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} />
        //         </View>
        //         <View>
        //             <Text style={styles.title}>
        //                 Recording
        //             </Text>
        //         </View>
        //         <View style={styles.buttonContainer}>
        //             <Button disabled={this.state.recordButtonDisabled} style={styles.button} onPress={() => this._toggleRecord()}>
        //                 {this.state.recordButton}
        //             </Button>
        //         </View>
        //         <View>
        //             <Text style={styles.errorMessage}>{this.state.error}</Text>
        //         </View>
        //     </View>
        // );

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
    // button: {
    //     padding: 20,
    //     fontSize: 20,
    //     backgroundColor: 'white',
    // },
    // slider: {
    //     height: 10,
    //     margin: 10,
    // },
    // buttonContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // settingsContainer: {
    //     flex: 1,
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
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