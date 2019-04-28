/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {

    /**
     * 跳转到指定页面
     * @param params
     * @param page
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log("NavigationUtil.navigation can not be null")
            return;
        }
        navigation.navigate(page, {
            ...params
        })
    }

    /**
     * 返回上一页
     * @param navigation
     */
    static getBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置首页
     * @param params
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    }
}
