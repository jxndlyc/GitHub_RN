/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {

    static resetToHomePage(navigation){
        navigation.goBack();
    }

    static resetToHomePage(params){
        const {navigation} = params;
        navigation.navigate("Main");
    }
}
