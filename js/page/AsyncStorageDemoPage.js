/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';

const KEY = "save_key";
export default class AsyncStorageDemoPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            showText: '测试内容',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch 使用</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>

                    <Button
                        title={"存储"}
                        onPress={() => {
                            this.doSave();
                        }}/>
                    <Button
                        title={"获取"}
                        onPress={() => {
                            this.getData();
                        }}/>
                    <Button
                        title={"删除"}
                        onPress={() => {
                            this.doRemove();
                        }}/>
                </View>
                <Text style={styles.show_text}>
                    {this.state.showText}
                </Text>
            </View>
        );
    }

    async doSave() {
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });

        /*AsyncStorage.setItem(KEY, this.value)
            .catch(error => {
                error => {
                    error && console.log(error.toString());
                }
            });

        try {
            await AsyncStorage.setItem(KEY, this.value);
        } catch (e) {
            e && console.log(e.toString());
        };*/
    }

    async getData() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                    showText: value,
                }
            );
            console.log(value);
            error && console.log(error.toString());
        });

        /*AsyncStorage.getItem(KEY)
            .then(value => {
                this.setState({
                    showText: value,
                });
                console.log(value);
            })
            .catch(error => {
                error && console.log(error.toString());
            })

        try {
            const value = await AsyncStorage.getItem(KEY);
            this.setState({
                showText: value,
            });
            console.log(value);
        } catch (e) {
            e && console.log(e.toString());
        }*/
    }

    async doRemove() {
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        });

        /*AsyncStorage.removeItem(KEY)
            .catch(error => {
                error && console.log(error.toString());
            });

        try {
            await AsyncStorage.removeItem(KEY);
        } catch (e) {
            e && console.log(e.toString());
        }*/
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


