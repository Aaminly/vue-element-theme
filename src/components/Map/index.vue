<template>
  <div>
    <div class="mapWrap">
      <div id="qqmapCont" class="qqmap"/>
      <div class="lngTips"/>
    </div>
  </div>
</template>

<script>
const defLatlng = '34.720085,113.668587'
export default {
  props: {
    mapCenter: {
      type: String,
      default: defLatlng
    },
    oldMarker: {
      type: String,
      default: ''
    },
    inputDefault: {
      type: String,
      default: ''
    },
    hasClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      qqmap: '',
      premarker: '',
      marker: '',
      markers: [],
      latlngCurrent: ''
    }
  },
  computed: {
    hasLatlng() {
      const latlng = this.mapCenter.split(',')
      return latlng.some(item => isNaN(+item) || !+item) ? defLatlng : this.mapCenter
    }
  },
  watch: {
    oldMarker(newVal, oldVal) {
      if (newVal) {
        this.latlngCurrent = newVal
        this.qqmap && this.createMarker()
      }
    },
    hasClick() {
      this[(this.hasClick ? 'bind' : 'remove') + 'MapEvent']()
    }
  },
  mounted() {
    if (this.oldMarker) {
      this.latlngCurrent = this.oldMarker || this.hasLatlng
    }
    this.$nextTick(() => {
      if (typeof (window.qq) === 'object') {
        this.createMap()
      } else {
        this.loadQQmap()
      }
      window.onMapFileLoad = () => {
        this.createMap()
      }
    })
  },
  destroyed() {
    if (!this.hasClick) return
    this.removeMapEvent()
  },
  methods: {
    loadQQmap() {
      const script = document.createElement('script')
      // 设置标签的type属性
      script.type = 'text/javascript'
      // 设置标签的链接地址
      script.src = 'https://map.qq.com/api/js?v=2.exp&key=CKMBZ-K26RX-DSS43-Z2TTF-VWDBZ-BYFE5&callback=onMapFileLoad'
      // 添加标签到dom
      document.body.appendChild(script)
    },
    search() {
      // 调用地址解析类
      const latlngBounds = new window.qq.maps.LatLngBounds()
      // 调用Poi检索类
      const searchService = new window.qq.maps.SearchService({
        complete: results => {
          const pois = results.detail.pois
          pois.forEach(poi => {
            latlngBounds.extend(poi.latLng)
            const marker = new window.qq.maps.Marker({
              map: this.qqmap,
              position: poi.latLng
            })
            marker.setTitle(poi.name)
            this.bindMarkerClick(marker, poi)
            this.markers.push(marker)
          })
          this.qqmap.fitBounds(latlngBounds)
        }
      })
      this.clearOverlays()
      searchService.search(this.inputDefault)
    },
    bindMarkerClick(marker, { address, latLng }) {
      window.qq.maps.event.addListener(marker, 'click', () => {
        this.$emit('inputDefault:update', address)
        this.$emit('mapclick', { address, latLng })
      })
    },
    clearOverlays() {
      this.markers.forEach(overlay => {
        overlay.setMap(null)
      })
      this.markers = []
    },
    createMap() {
      const [lat, lng] = this.hasLatlng.split(',')
      this.qqmap = new window.qq.maps.Map(document.getElementById('qqmapCont'), {
        center: new window.qq.maps.LatLng(lat, lng), // 地图的中心地理坐标。
        zoom: 12 // 地图的中心地理坐标。
      })
      setTimeout(() => {
        this.createMarker()
        this.bindMapEvent()
      }, 500)
    },
    createMarker() {
      if (this.premarker) {
        this.premarker.setMap(null)
      }
      if (this.oldMarker) {
        const [lat, lng] = this.hasLatlng.split(',')
        this.qqmap.setCenter(new window.qq.maps.LatLng(lat, lng))
        this.premarker = new window.qq.maps.Marker({
          position: new window.qq.maps.LatLng(lat, lng),
          map: this.qqmap
        })
      } else {
        // 获取城市列表接口设置中心点
        const citylocation = new window.qq.maps.CityService({
          complete: result => {
            this.qqmap.setCenter(result.detail.latLng)
          }
        })
        // 调用searchLocalCity();方法
        citylocation.searchLocalCity()
      }
    },
    bindMapEvent() {
      // 地图点击事件
      if (!this.hasClick) return
      window.qq.maps.event.addListener(this.qqmap, 'click', event => {
        this.marker && this.marker.setMap(null)
        this.premarker && this.premarker.setMap(null)
        this.$emit('mapclick', { address: this.inputDefault, latLng: event.latLng }) // 地图点击坐标 传递给父组件
        this.latlngCurrent = event.latLng.lat + ',' + event.latLng.lng
        this.marker = new window.qq.maps.Marker({
          position: event.latLng,
          map: this.qqmap
        })
      })
    },
    removeMapEvent() {
      window.qq.maps.event.clearListeners(this.qqmap, 'click')
    }
  }
}
</script>

<style>
.qqmap {
  width: 100%;
  height: 500px;
}
.mapWrap {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-top: 15px;
}
.lngTips {
  display: none;
  width: 255px;
  height: 40px;
  padding: 5px 7px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 123456;
  background: #ffffff;
  border-radius: 5px;
  line-height: 20px;
  box-shadow: #eeeeee 1px 1px 3px;
  border: #eeeeee 1px solid;
  font-size: 12px;
}
</style>
