/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import DataStore from "../expand/dao/DataStore";

export default class DataStoreDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '测试内容',
        }
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data)}`;
                this.setState({
                    showText: showData,
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>离线缓存</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        this.value = text;
                    }}
                />
                <Button
                    title={"获取"}
                    onPress={() => {
                        this.loadData();
                    }}/>
                <Text style={styles.show_text}>
                    {this.state.showText}
                </Text>
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
    },
    input: {
        flex: 1,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 14,
    },
    input_container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
    },
    show_text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 20,
    },

});


