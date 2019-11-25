import axios from 'axios'

const service = axios.create({})
/**
 * GPS处理的基本信息
 *
 * @class GSPHelp
 */
// TODO: 当前
class OSMHelp {
  getLocation() {
    return new Promise((resolve, reject) => {
      if (!this._isAvailable()) {
        reject(new Error('no browser suppor'))
      }
      window.navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
      }, (error) => {
        reject(error)
      }, {
        timeout: 9000,
        maximumAge: 60000
      })
    })
  }

  /**
   * 根据坐标获取地址信息(地址逆解析)
   *
   * @param {Object} [params={lat,lon}]
   * @returns
   * @memberof UserService
   */
  getAddressByLocation(params) {
    const that = this
    return new Promise((resolve, reject) => {
      if (that.addRes) {
        const diffSecond = Math.abs(new Date() - that.addRes.getTime) / 1000
        if (diffSecond <= 10) {
          resolve(that.addRes)
        }
      }
      const urlArray = []
      urlArray.push('https://nominatim.openstreetmap.org/reverse?format=json')
      urlArray.push(`lat=${params.lat}`) // 纬度
      urlArray.push(`lon=${params.lon}`) // 经度
      urlArray.push('zoom=18') // 详细程度
      urlArray.push('addressdetails=1') // 地址展示行为
      urlArray.push('accept-language=en') // 数据展示的语言
      service.get(urlArray.join('&')).then((response) => {
        that.addRes = {}
        that.addRes.getTime = new Date()
        that.addRes.Address = response.data.address
        that.addRes.Address.display_name = response.data.display_name
        that.addRes.Location = {
          lat: response.data.lat,
          lon: response.data.lon
        }
        resolve(that.addRes)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  // TODO: 地址查询
  getLocationByAddress(params) {
    return new Promise((resolve, reject) => {
      const urlArray = []
      urlArray.push('https://nominatim.openstreetmap.org/search?format=json')
      urlArray.push(`q=${params}`) // 地址信息
      urlArray.push('limit=1') // 详细程度
      urlArray.push('addressdetails=1') // 地址展示行为
      urlArray.push('accept-language=en') // 数据展示的语言
      service.get(urlArray.join('&')).then((response) => {
        resolve({
          lat: response.data.lat,
          lon: response.data.lon
        })
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * 生成google地图的地址查询
   *
   * @param {Object} [params={lat,lon}] // 经纬度信息 lat = 经度, lon = 纬度
   * @param {String} params
   * @memberof UserService
   */
  // TODO: 生成google地图地址类型
  createGoogleMapUrl(params) {
    const urlArray = []
    urlArray.push('https://www.google.com/maps/search/?api=1')
    if (typeof params === 'string') {
      urlArray.push(`query=${params}`)
    } else {
      urlArray.push(`query=${params.lat},${params.lon}`)
    }
    return urlArray.join('&')
  }

  // TODO: 确定浏览器是否支持GPS定位功能
  _isAvailable () {
    return 'geolocation' in window.navigator
  }
}
export default {
  install(Vue) {
    // TODO: 目前时间紧张当前只处理一种服务类型
    Vue.$gps = Vue.prototype.$gps = new OSMHelp()
  }
}
