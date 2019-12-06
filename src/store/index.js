import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import constant from './modules/constant'
import apply from './modules/apply'
import campus from './modules/campus'
import exportFile from './modules/exportFile'
import itemQuestionMsg from './modules/itemQuestionMsg'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    constant,
    apply,
    campus,
    exportFile,
    itemQuestionMsg
  },
  getters
})

export default store
