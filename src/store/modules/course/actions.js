import axios from 'axios';

export default {
    getAsyncCurrentLesson: ({ commit }) => {
        commit("setCurrentLesson");
    }
}