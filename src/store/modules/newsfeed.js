import axios from 'axios';


const state = {
    showForm: false,
    newsfeed: [],
    editNewsfeed: {
        id: '',
        title: '',
        body: '',
        author: '',
        img: '',
        action: ''
    }
};

const getters = {
    allnewsfeed: (state) => state.newsfeed,
    getShowForm: (state) => state.showForm,
    getEditNewsfeed: (state) => state.editNewsfeed
};

const actions = {
    async fetchNewsfeed({commit}) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/');

        commit('setNewsfeed', response.data)
    },

    async addNewsfeed({commit}, payload) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts/', payload);
        commit('newNewsfeed', response.data)
    },

    async editNewsfeed({commit}, payload) {
        const response = await axios.put('https://jsonplaceholder.typicode.com/posts/'+payload.id, payload);
        commit('updateNewsfeed', response.data)
    },

    async fetchShowForm({commit}, showForm) {
        commit('setShowForm', showForm)
    }
};

const mutations = {    
    setShowForm: (state, showForm) => (state.showForm = showForm),
    setNewsfeed: (state, newsfeed) => (state.newsfeed = newsfeed),
    newNewsfeed: (state, newsfeed) => state.newsfeed.unshift(newsfeed),
    updateNewsfeed(state, newsfeed){
        state.newsfeed = state.newsfeed.map((item) => {
            if(item.id == newsfeed.id){
                return {
                    title: newsfeed.title,
                    body: newsfeed.body
                };
            } else {
                return item;
            }
        });
    },
    searchByTitle(state, searchKeyword){
        state.newsfeed = state.newsfeed.filter((item) => {
            if(item.title === searchKeyword)
                return item;
        });
    },
    sortBy(state, keyword){
        const sortby = keyword.split('-')[1];
        const searchKeyword = keyword.split('-')[0];
        if(sortby === 'asc'){
            state.newsfeed = state.newsfeed.sort((a,b) => (a[searchKeyword] > b[searchKeyword]) ? 1 : ((b[searchKeyword] > a[searchKeyword]) ? -1 : 0))
        }
        else{
            state.newsfeed = state.newsfeed.sort((a,b) => (a[searchKeyword] < b[searchKeyword]) ? 1 : ((b[searchKeyword] < a[searchKeyword]) ? -1 : 0))
        }
    },
    setEditNewsfeed: (state, editNewsfeed) => (state.editNewsfeed = editNewsfeed)
};

export default {
    state,
    getters,
    actions,
    mutations
}
