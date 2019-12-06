<template>
  <div class="weather-box">
    <template v-if="weatherInfo.temperature">
      <div class="weather-box-img">
        <img v-if="img" :src="img" :title="weatherInfo.weatherName" :alt="weatherInfo.weatherName">
      </div>
      <div>
        <p>{{ weatherInfo.temperature }} / AQI: {{ weatherInfo.aqi }}</p>
        <p>{{ weatherInfo.province }} {{ weatherInfo.city }}</p>
      </div>
    </template>
    <span v-else>天气获取中...</span>
  </div>
</template>

<script>
import { getWeather } from '@/api'
export default {
  data() {
    return {
      img: '',
      weatherInfo: {}
    }
  },
  created() {
    // this.getWeather()
  },
  methods: {
    getWeather() {
      getWeather({}).then(({ data }) => {
        this.weatherInfo = data.weatherInfo || {}
        this.img = this.weatherInfo.weather ? require(`@/assets/images/weather/${this.weatherInfo.weather}.png`) : ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.weather-box {
  display: flex;
  align-items: center;
  &-img {
    height: 46px;
    img {
      width: 46px;
      filter: drop-shadow(0 0 4px #ddd);
    }
  }
  div:last-child {
    padding-left: 10px;
  }
  p {
    margin: 0;
    height: 20px;
    line-height: 20px;
    color: #656565;
    font-size: 13px;
    text-shadow: 1px 1px #f7f7f7;
  }
  span {
    color: #999;
    font-size: 13px;
  }
}
</style>
