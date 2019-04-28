/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
    createMaterialTopTabNavigator,
    createAppContainer,
} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil";
import DetailPage from "./DetailPage";

type Props = {};
export default class PopularPage extends Component<Props> {

    constructor(props) {
        super(props)
        this.tabNames = ['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs(){
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs['tab${index}'] = {
                screen:PopularTab,
                navigationOptions:{
                    title:item,
                }
            }
        });
        return tabs;
    }

    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
                PopularTab1: {
                    screen: PopularTab,
                    navigationOptions: {
                        title: "Tab1",
                        tabBarLabel: "Tab1",
                    }
                },
                PopularTab2: {
                    screen: PopularTab,
                    navigationOptions: {
                        title: "Tab2",
                        tabBarLabel: "Tab2",
                    }
                }
            })
        );

        return <View style={{flex: 1, marginTop: 0}}>
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
    },

});
