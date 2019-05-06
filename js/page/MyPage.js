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
import NavigationUtil from "../navigator/NavigationUtil";
import DetailPage from "./DetailPage";
import FetchDemoPage from "./FetchDemoPage";
import AsyncStorageDemoPage from "./AsyncStorageDemoPage";
import DataStoreDemoPage from "./DataStoreDemoPage";

class MyPage extends Component<Props> {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>MyPage</Text>
                <Text style={styles.welcome}
                      onPress={() => {
                          NavigationUtil.goPage({
                              navigation: this.props.navigation,
                          }, "DetailPage")
                      }}>点击跳转详情页</Text>

                <View style={{height: 20}}/>
                <Button
                    title={"Fetch使用"}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "FetchDemoPage")
                    }}/>
                <View style={{height: 20}}/>
                <Button
                    title={"AsyncStorage使用"}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "AsyncStorageDemoPage")
                    }}/>
                <View style={{height: 20}}/>
                <Button
                    title={"离线缓存"}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "DataStoreDemoPage")
                    }}/>
                <View style={{height: 20}}/>
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
    onThemeChange: (theme) => dispatch(onThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProp,)(MyPage);