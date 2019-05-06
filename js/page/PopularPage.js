/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View, Button} from 'react-native';
import {
    createMaterialTopTabNavigator,
    createAppContainer,
} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil";
import DetailPage from "./DetailPage";
import FetchDemoPage from "./FetchDemoPage";
import AsyncStorageDemoPage from "./AsyncStorageDemoPage";


export default class PopularPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.tabNames = ["Java", "Android", "IOS", "React", "React Native", "PHP"];
    }

    _genTabs() {
        /*const tabs = {
            Java:{
                screen: props => <PopularTab {...props} tabLabel='Java'/>,
                navigationOptions: {
                    title: 'Java',
                }
            },Android:{
                screen: props => <PopularTab {...props} tabLabel='Android'/>,
                navigationOptions: {
                    title: 'Android',
                }
            },IOS:{
                screen: props => <PopularTab {...props} tabLabel='IOS'/>,
                navigationOptions: {
                    title: 'IOS',
                }
            },React:{
                screen: props => <PopularTab {...props} tabLabel='React'/>,
                navigationOptions: {
                    title: 'React',
                }
            },React_Native:{
                screen: props => <PopularTab {...props} tabLabel='React Native'/>,
                navigationOptions: {
                    title: 'React Native',
                }
            },PHP:{
                screen: props => <PopularTab {...props} tabLabel='PHP'/>,
                navigationOptions: {
                    title: 'PHP',
                }
            },
        };*/
        const tabs = {};

        this.tabNames.forEach((item, index) => {
            console.log("index:" + index + ", item:" + item);
            const tab = "tab" + index;
            tabs[`tab${index}`] = {
                screen: props => <PopularTab {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                }
            };
        });

        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false, //标签是否大写，默认为true
                    scrollEnabled: true,//是否支持选项卡滑动，默认为false
                    style: {
                        backgroundColor: '#678'//tabBar颜色
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                }
            }
            )
        );

        return <View style={{flex: 1, marginTop: 0}}>
            <StatusBar backgroundColor={'#678'} translucent={false} animated={true} barStyle={'default'}/>
            <TabNavigator/>
        </View>

    }
}

class PopularTab extends Component<Props> {
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>进入：{tabLabel}</Text>
                <Text style={styles.welcome}
                      onPress={() => {
                          NavigationUtil.goPage({
                              navigation: this.props.navigation,
                          }, "DetailPage")
                      }}>点击跳转详情页</Text>
                <Button
                    style={styles.button_popular}
                    title={"Fetch使用"}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "FetchDemoPage")
                    }}/>
                <Button
                    style={styles.button_popular}
                    title={"AsyncStorage使用"}
                    onPress={() => {
                        NavigationUtil.goPage({
                            navigation: this.props.navigation,
                        }, "AsyncStorageDemoPage")
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
    },
    tabStyle: {
        minWidth: 30,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        textAlign: 'center',
    },
    button_popular: {
        marginTop:10,
    },

});
