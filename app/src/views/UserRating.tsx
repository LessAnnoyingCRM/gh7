import React from 'react';
import _ from 'underscore';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import StarRating from 'react-native-star-rating';

export default class UserRating extends React.Component {
    state = {
        LanguageSkills: null,
        Friendliness: null,
        Food: null
    }
    
    onStarRatingPress(rating: number, key: string) {
        const NewState: any = {};
        NewState[key] = rating;
        this.setState(NewState);
    }

    SubmitForm(){
        this.props.navigation.navigate("RatingConfirmation");
    }

    CanSubmitForm(){
        return _.isNull(this.state.LanguageSkills) || _.isNull(this.state.Friendliness) || _.isNull(this.state.Food);
    }

    render(){
        const IsDisabled = this.CanSubmitForm();
        return(
            <View style={styles.container}>
                <Text style={styles.header}>
                    How was your meal with Nicola?
                </Text>
                <View style={styles.starContainer}>
                    <Text style={styles.label}>
                        LANGUAGE SKILLS
                    </Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.LanguageSkills}
                        selectedStar={(rating: number) => this.onStarRatingPress(rating, 'LanguageSkills')}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'#EEE05D'}
                        emptyStarColor={'#E0D56F'}
                        halfStarEnabled={true}
                        starStyle={{margin: 5}}
                    />
                </View>
                <View style={styles.starContainer}>
                    <Text style={styles.label}>
                        FRIENDLINESS
                    </Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.Friendliness}
                        selectedStar={(rating: number) => this.onStarRatingPress(rating, 'Friendliness')}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'#EEE05D'}
                        emptyStarColor={'#E0D56F'}
                        halfStarEnabled={true}
                        starStyle={{ margin: 5 }}
                    />
                </View>
                <View style={styles.starContainer}>
                    <Text style={styles.label}>
                        FOOD
                    </Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.Food}
                        selectedStar={(rating: number) => this.onStarRatingPress(rating, 'Food')}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        fullStarColor={'#EEE05D'}
                        emptyStarColor={'#E0D56F'}
                        halfStarEnabled={true}
                        starStyle={{ margin: 5 }}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => this.SubmitForm()}
                        disabled={IsDisabled}
                        style={styles.buttonText}
                        containerStyle={styles.activeButton}
                        disabledContainerStyle={styles.disabledButton}
                    >
                        SUBMIT
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "Lato",
        fontSize: 35,
        lineHeight: 42,
        color: "#000",
        textAlign: 'center',
        marginBottom: 40
    },
    container: {
        padding: 36,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: 'Lato',
        fontSize: 16,
        lineHeight: 17,
        letterSpacing: 2.3,
        color: '#666',
        textAlign: 'left',
        marginLeft: 3
    },
    starContainer: {
        marginBottom: 25,
        //flex: 1
    },
    buttonText: {
        color: "#fff",
        paddingTop: 7,
        fontSize: 20,
        letterSpacing: 2.5
    },
    activeButton: {
        backgroundColor: '#D78B47',
        width: 200,
        height: 40,
        borderRadius: 50,
        marginTop: 50
    },
    disabledButton: {
        backgroundColor: 'gray',
        width: 200,
        height: 40,
        borderRadius: 50,
        marginTop: 50
    }
})