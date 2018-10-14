import React from 'react';
import { View, Text, TouchableHighlight, Slider, Image, StyleSheet } from 'react-native';
import { Player } from 'react-native-audio-toolkit';
import { Svg, Polygon, Rect } from 'react-native-svg';
import moment from 'moment';
import Users from '../../stores/users';

export default class Message extends React.Component {
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
        }
    }

    componentWillMount() {
        this.player = null;
        this.lastSeek = 0;
        this._reloadPlayer(this.props.item.Message);

        this._progressInterval = setInterval(() => {
            if (this.player && this._shouldUpdateProgressBar()) {
                this.setState({
                    progress: Math.max(0, this.player.currentTime) / this.player.duration
                });
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

    _updateState() {
        this.setState({
            playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
            stopButtonDisabled: !this.player || !this.player.canStop,
            playButtonDisabled: !this.player || !this.player.canPlay
        });
    }

    _playPause(filePath: string) {
        if(!this.player || !this.player.isPlaying){
            this.player = new Player(filePath);
        }
        
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
            this.player.destroy();
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

    _reloadPlayer(filename: string) {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(filename).prepare((err, fsPath) => {
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
            this.player.destroy();
            this._updateState();
        });
        this.player.on('pause', () => {
            this._updateState();
        });
    }
    
    RenderPlayButton() {
        if (!this.player || !this.player.isPlaying) {
            return (
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
            );
        } else {
            return (
                <View style={styles.PauseMessageButton}>
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
                        <Rect x="6" y="4" width="4" height="16"></Rect>
                        <Rect x="14" y="4" width="4" height="16"></Rect>
                    </Svg>
                </View>
            )
        }
    }
    
    render(){
        const MyUserId = 2;
        const {item} = this.props;

        if (item.FromUserId == MyUserId) {
            return (
                <View style={styles.FromMe}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10 }}>{moment(item.DateSent).format("MMM Do")}</Text>
                        <Text style={{ fontSize: 10 }}>{moment(item.DateSent).format("hh:mm")}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'right', marginRight: 6 }}>{Users[item.FromUserId].Name}</Text>
                        <View style={styles.MessageFromMe}>
                            <TouchableHighlight onPress={() => this._playPause(item.Message)} underlayColor="rgba(255,255,255,0.4)">
                                {this.RenderPlayButton()}
                            </TouchableHighlight>
                            <View style={styles.slider}>
                                <Slider step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} />
                            </View>
                            <View style={{ justifyContent: 'center' }}><Text style={styles.MessageLength}>{item.MessageLength}</Text></View>
                        </View>
                    </View>
                    <Image style={styles.picture} source={{ uri: Users[item.FromUserId].Picture}} />
                </View>
            );
        } else {
            return (
                <View style={styles.ToMe}>
                    <Image style={styles.picture} source={{ uri: Users[item.FromUserId].Picture}} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'left', marginLeft: 6 }}>{Users[item.FromUserId].Name}</Text>
                        <View style={styles.MessageToMe}>
                            <TouchableHighlight onPress={() => this._playPause(item.Message)} underlayColor="rgba(255,255,255,0.4)">
                                {this.RenderPlayButton()}
                            </TouchableHighlight>
                            <View style={styles.slider}>
                                <Slider step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} />
                            </View>
                            <View style={{ justifyContent: 'center' }}><Text style={styles.MessageLength}>{item.MessageLength}</Text></View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 10 }}>{moment(item.DateSent).format("MMM Do")}</Text>
                        <Text style={{ fontSize: 10 }}>{moment(item.DateSent).format("hh:mm")}</Text>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    PlayMessageButton: {
        backgroundColor: '#83C0EC',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        padding: 7,
        paddingLeft: 10,
        justifyContent: 'flex-start',
        color: "#fff",
        lineHeight: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    PauseMessageButton: {
        backgroundColor: '#83C0EC',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        padding: 7,
        paddingLeft: 8,
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
    picture: {
        height: 65,
        width: 65,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 65 / 2,
    },
    thread: {
        marginLeft: 10,
        marginTop: 15,
    },
    name: {
        fontSize: 20
    },
    slider: {
        height: 10,
        marginTop: 8,
        width: 175
    },
})