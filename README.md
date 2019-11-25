# yz-gpshelp

***ps:*** 工具依赖 axios 异步访问服务

### 使用步骤

1. 项目中安装该工具

```
    yarn add yz-gpshelp
```
2. 项目中安装gpshelp(同 vue-router)

```
    import gpshelp from 'yz-gpshelp'
    
    Vue.use(gpshelp)
```

3. 使用

```
    Vue.$gps.getLocation()
    this.$gps.getLocation()
    Vue.$gps.getAddressByLocation()
    this.$gps.getAddressByLocation()
    Vue.$gps.getLocationByAddress()
    this.$gps.getLocationByAddress()
    Vue.$gps.createGoogleMapUrl()
    this.$gps.createGoogleMapUrl()
```
### getLocation()

***H5 定位***
```
    return (Promise)

    {
       ....
       coords: {
           latitude: 纬度,
           longitude: 经度,
           .....
       } 
       .....
    }
```

### getAddressByLocation(params)
***根据坐标获取地址信息***

```
    params (Object)

    {
        lat: 纬度，
        lon: 经度
    }

    returen (Promise)

    {
        getTime: 地理信息获取时间,
        Address: {
            display_name: d地址显示名称，
            country: 国家，
            ....
        },
        Location: {
            lat: 纬度，
            lon: 经度
        }
    }
```

### getLocationByAddress(params)

***地址查询根据地址信息获取位置坐标（坐标偏差较大）***

```
    params (String)

    详细地址信息

    returen (Promise)

    {
        lat: 纬度，
        lon: 经度
    }
```

### createGoogleMapUrl(params)

***生成google地图URL***

```
    parmas (String or Object)

        String: 地址信息

        Object: {
            lat: 纬度,
            lon: 经度
        }

    return (String)

    GoogleMap URL

```
