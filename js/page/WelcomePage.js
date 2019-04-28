/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default class WelcomePage extends Component<Props> {

    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 500);
    }

    componentWillMount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={'#FFFFFF'} translucent={true} animated={true} barStyle={'dark-content'}/>
                <Image
                    style={styles.welcome}
                    source={require("../resoures/splash2.png")}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        height: screenHeight
    },
    welcome: {
        flex: 1,
        width: screenWidth,
        height: screenHeight
    },

});
