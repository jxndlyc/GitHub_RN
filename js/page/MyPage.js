/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/theme';

class MyPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>MyPage</Text>
                <Button
                    title={"更改底部导航栏标签为蓝色"}
                    onPress={() => {
                        this.props.onThemeChange("#399");
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

export default connect(mapStateToProps, mapDispatchToProp,)(MyPage);