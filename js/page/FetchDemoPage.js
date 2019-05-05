/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/theme';


export default class FetchDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '测试内容',
            //searchKey: 'java',
        }
    }

    loadData() {
        //https://github.com/search?q=gi
        //https://api.github.com/search/repositories?q=gi
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        console.log("url: " + url)
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText,
                })
            })
    };

    loadData2() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw new Error('NetWork response was not ok');
            })
            .then(responseText => {
                this.setState({
                    showText: responseText,
                })
            })
            .catch(e => {
                this.setState({
                   showText: e.toString(),
                });
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch 使用</Text>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        /*onChangeText={(searchKey) => this.setState({
                            searchKey
                        })}*/
                        onChangeText={(text) =>{
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title={"获取"}
                        onPress={() => {
                            this.loadData2();
                        }}/>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    show_text: {
        flex: 1,
        alignItems: 'center',
        fontSize: 20,
    },

});


