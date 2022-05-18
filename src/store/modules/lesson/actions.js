import axios from "axios"

export default {
    setAsyncProgress: async ({ commit }, { id, index }) => {
        let token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post("/history/update", {
                id: id,
                isBlock: false,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
              }
            }).then(response => {
                commit('updateProgress', { index: index, isBlock: false });
                resolve(response);
            }, error => {
                reject(error);
            })
        });
    },
    getAsyncTrace: async ({ commit }, params) => {
        let token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.get("/assessment/student", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
              }
            }).then(response => {
                // commit('setTrace', response.data);
                resolve(response);
            }, error => {
                reject(error);
            })
        })
    },
    getLastAsyncTrace: async ({ commit }, params) => {
        let token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.get("/assessment/student", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
              }
            }).then(response => {
                if (response.data.length > 0) {
                    let last = response.data[response.data.length - 1];
                    resolve(last);
                }
            }, error => {
                reject(error);
            })
        })
    },
    getAsyncProgress({ commit }, params) {
        let token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.get("/history/one", {
                params: {
                    student: params.student,
                    course: params.course,
                    lesson: params.lesson,
                    structure: params.structure
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
        let token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post("/history/create", {
                student: params.student,
                course: params.course,
                lesson: params.lesson,
                structure: params.structure,
                isBlock: params.isBlock,
                index: params.index,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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