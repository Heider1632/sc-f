import axios from "axios"

export default {
    getAsyncTrace: async ({ commit }, params) => {
        return new Promise((resolve, reject) => {
            axios.get("/assessment/student", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson
                }
            }).then(response => {
                commit('setTrace', response.data);
                resolve(response);
            }, error => {
                reject(error);
            })
        })
    },
    getAsyncProgress({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.get("/history/one", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson,
                    structure: params.structure
                }
            }).then(response => {
                commit('pushProgress', response.data);
                resolve(response);
            }, error => {
                reject(error);
            })
        })

    },
    createAsyncProgress({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post("/history/create", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson,
                    structure: params.structure,
                    isBlock: params.isBlock,
                    index: params.index,
                  }
            }).then(response => {
                commit('pushProgress', response.data);
                resolve(response);
            }, error => {
                reject(error);
            })
        })
    }


}