/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/theme';
import NavigationUtil from "../navigator/NavigationUtil";
import DetailPage from "./DetailPage";
import FetchDemoPage from "./FetchDemoPage";
import AsyncStorageDemoPage from "./AsyncStorageDemoPage";
import DataStoreDemoPage from "./DataStoreDemoPage";
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678';

class MyPage extends Component<Props> {

    getRightButton() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                }}
            >
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    getLeftButton(callBack) {
        return <TouchableOpacity
            style={{padding: 8, marginRight: 12}}
            onPress={callBack}
        >
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}
            />
        </TouchableOpacity>

    }

    render() {

        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }

        let navigationBar = <NavigationBar
            title={"我的"}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR,}}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />

        return (
            <View style={styles.container}>
                {navigationBar}
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