import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer,
} from "react-navigation";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,//可以通过将header设为null, 来禁用StackNavigation bar
        },
    },

});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null,//可以通过将header设为null, 来禁用StackNavigation bar
        },
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            //header: null,//可以通过将header设为null, 来禁用StackNavigation bar
            tabBarLabel:"详情",
        },
    },

});

const AppSwitch = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    }
});

export default createAppContainer(AppSwitch)
