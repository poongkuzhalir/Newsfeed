<template>
  <div>
    <span class="icon-add" v-if="!getShowForm" @click="addNew">
      <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
    </span>
    <b-container class="bv-example-row">
    <select class="form-control sortby" v-model="selectedSort" @change="changeJobTitle($event)">
        <option v-for="sortByItem in sortByItems" :value="sortByItem.value" :key="sortByItem.value">
          {{ sortByItem.text }}
        </option>
    </select>
        <div v-if="allnewsfeed.length != 0" >
          <b-card-group deck>
            <b-row>
              <b-col  xs="12" sm="12" lg="4" xl="3" md="6" class="d-flex align-items-stretch" v-for="newsfeed in allnewsfeed" :key="newsfeed.id">
                <b-card
                  :title="newsfeed.title"
                >
                <img :src="newsfeed.img" style="width:100%;" alt="">
                <span class="icon-edit" @click="editForm($event, newsfeed.id, newsfeed.title, newsfeed.body)">
                  <b-icon-pencil-square></b-icon-pencil-square>
                </span>
                <b-card-text>
                  {{newsfeed.body}}
                </b-card-text>
                <span>
                  <em>{{newsfeed.author}}</em>
                </span>
                </b-card>
              </b-col>
              </b-row>
          </b-card-group>
        </div>
        <div v-else>
          <b-card
            class="mb-2 clear"
          >
            <b-card-text class="center">
              Sorry! No Results...
            </b-card-text>
          </b-card>
        </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters, mapActions } from 'vuex';
export default {
  name: "NewsFeed",
  data() {
    return {
      selectedSort: '',          
          sortByItems: [
          { value: '', text: 'Sort-By' },
          { value: 'title-asc', text: 'Title-ASC' },
          { value: 'body-asc', text: 'Desc-ASC' },
          { value: 'author-asc', text: 'Author-ASC' },
          { value: 'title-dsc', text: 'Title-DSC' },
          { value: 'body-dsc', text: 'Desc-DSC' },
          { value: 'author-dsc', text: 'Author-DSC' },
        ]
    }
  },
  methods: {
    ...mapActions(['fetchNewsfeed']),
    addNew() {
      this.$store.commit("setShowForm", true);
    },
    editForm(e, id, title, body) {
      e.preventDefault();
      console.log(title)
      this.$store.commit("setShowForm", true);
      this.$store.commit("setEditNewsfeed", {id: id, title: title, body: body, action: 'EDIT'});
    },
    changeJobTitle () {
            this.$store.commit("sortBy", this.selectedSort);
        }
  },
  computed: mapGetters(['allnewsfeed', 'getShowForm']),
  created() {
    this.fetchNewsfeed()
  }
};
</script>

<style scoped>
.container {
  padding-top: 60px;
}
.center{
  text-align: center;
}
.clear{
  clear: both;
}
.card-deck {
    display: flex;
    flex-flow: row wrap;
    margin-right: -15px;
    margin-left: -15px;
}
.card-deck .card {
    margin-right: 15px;
    margin-bottom: 15px;
    margin-left: 15px;
}
.icon-edit{
  position: absolute;
  top: 0;
  right: 5px;
  color: #000;
}
.sortby{
  width: auto !important;
  margin-bottom: 10px;
}
.icon-add{
  position: fixed;
  right: 20px;
  top: 85%;
  font-size: 65px;
  z-index: 999;
  color: #0dcaf0;
}
</style>
