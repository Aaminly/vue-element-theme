import Cookies from 'js-cookie'

const theme = Cookies.get('theme') || 'blackgold'

if (theme) {
  document.body.className = theme + '-theme'
  require(`@/assets/theme/${theme}-theme/index.css`)
}
