<template>
  <div>
    <AddNewsfeed v-if="getShowForm"/>
    <NewsFeed v-else />
  </div>
</template>

<script>
// @ is an alias to /src

import AddNewsfeed from "../components/AddNewsfeed.vue";
import NewsFeed from "../components/NewsFeed.vue";
import { mapGetters } from 'vuex';

export default {
  name: "Home",
  components: {
    AddNewsfeed,
    NewsFeed
  },
  computed: mapGetters(['getShowForm'])
};
</script>

<style scoped>

</style>
