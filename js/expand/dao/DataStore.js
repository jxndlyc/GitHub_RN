import {AsyncStorage} from 'react-native';

export default class DataStore {

    fetchData(url) {
        return new Promise(((resolve, reject) => {
            this.fetchLocalData(url)
                .then((wrapData) => {
                    if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                        resolve(wrapData);
                    } else {
                        this.fetchNetData(url)
                            .then((data) => {
                                resolve(this._wrapData(data));
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    }
                })
                .catch((error) => {
                    this.fetchNetData(url)
                        .then((data) => {
                            resolve(this._wrapData(data));
                        })
                        .catch((error) => {
                            reject(error);
                        })
                })
        }));
    }

    saveData(url, data, callback) {
        if (!url || !data) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }

    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.log(e.toString());
                    }
                } else {
                    reject(e);
                    console.log(e.toString());
                }
            })

        });
    }

    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("NetWork response was not ok");
                })
                .then((responseData) => {
                    this.saveData(url, responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }

    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();

        targetDate.setTime(timestamp);

        if (currentDate.getMonth() != targetDate.getMonth()) return false;
        if (currentDate.getDay() != targetDate.getDay()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;
        return true;
    }
}