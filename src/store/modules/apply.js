
const apply = {
  state: {
    courseCart: [],
    printCardInfo: []
  },
  mutations: {
    SET_COURSE_CART(state, list) {
      state.courseCart = list
    },
    SET_PRINT_CARD(state, info) {
      state.printCardInfo = info
    }
  },
  actions: {
    addCourseCart({ dispatch }, { studentId, classId }) {
      return new Promise((resolve, reject) => {

      })
    },
    getCourseCart({ commit }, params) {
      return new Promise((resolve, reject) => {

      })
    },
    delCourseCart({ dispatch }, { id, studentId }) {
      return new Promise((resolve, reject) => {

      })
    }
  }
}

export default apply
