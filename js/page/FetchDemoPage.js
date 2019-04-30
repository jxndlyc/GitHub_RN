/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/theme';


class FavoritePage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FavoritePage</Text>
                <Button
                    title={"更改底部导航栏标签为紫色"}
                    onPress={() => {
                        this.props.onThemeChange("#909");
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

});

const mapStateToProps = state => ({});

const mapDispatchToProp = dispatch => ({
    onThemeChange:(theme) => dispatch(onThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProp,)(FavoritePage);
