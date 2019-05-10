/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, ActivityIndicator, View, FlatList, RefreshControl} from 'react-native';
import {
    createMaterialTopTabNavigator,
    createAppContainer,
} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil";
import {connect} from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem'
import NavigationBar from '../common/NavigationBar'
import Toast from 'react-native-easy-toast'

const THEME_COLOR = '#678';
const URL = `https://api.github.com/search/repositories?q=`;
const QUERY_STR = `&sort=stars`;
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
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                }
            };
        });

        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content',
        }

        let navigationBar = <NavigationBar
            title={"最热"}
            statusBar={statusBar}
            style={{backgroundColor:THEME_COLOR, }}
        />

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
            {navigationBar}
            <TabNavigator/>
        </View>

    }
}
const pageSize = 10;

class PopularTab extends Component<Props> {

    constructor(props) {
        super(props)
        const {tabLable} = this.props;
        this.storeName = tabLable;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onRefreshPopular, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.getFetchUrl(this.storeName);
        if (loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show("没有更多了");
            })
        } else {
            onRefreshPopular(this.storeName, url, pageSize);
        }

    }

    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true,
            }
        }
        return store;
    }

    getFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem
            item={item}
            onSelect={() => {

            }}
        />
    }

    getIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>上拉加载更多</Text>
            </View>
    }

    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
                    refreshControl={
                        <RefreshControl
                            title={"loading"}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.getIndicator()}
                    onEndReached={() => {
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true;
                    }}
                />

                <Toast
                    ref={'toast'}
                    position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack)),
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
});
