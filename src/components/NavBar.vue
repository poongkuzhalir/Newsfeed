<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>
                <router-link class="navbar-brand" to="/">Home</router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form class="mr-25" v-if="currentRouteName && !getShowForm">
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="title"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" @click="onSearch">Search</b-button>
                </b-nav-form>
        
                <b-nav-item>
                    <router-link class="navbar-brand" to="/about">About</router-link>
                </b-nav-item>

                <b-nav-item>
                    <router-link class="navbar-brand" to="/products">Products</router-link>
                </b-nav-item>

                <b-nav-item>
                    <router-link class="navbar-brand" to="/user">User</router-link>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "NavBar",
  data() {
      return{
          title: '',
      }
  },
    methods: {
        ...mapActions(['fetchNewsfeed']),
        onSearch(e) {
            e.preventDefault();
            if(this.title !== '') {
                this.$store.commit("searchByTitle", this.title);
            } else {
                this.fetchNewsfeed();
            }
        },
    },
  computed: {
      ...mapGetters(['getShowForm']),
    currentRouteName() {
        return this.$route.name === 'Home';
    }
}
};
</script>

<style scoped>
.logo{
  width: 60px;
}
.ml-auto{
    margin-left: auto !important;
}
.navbar{
    padding: 10px 25px;
}
.navbar-brand {
    color: #fff;
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.form-inline {
    display: flex;
    align-items: center;
}
.mr-25{
    margin-right: 25px;
}
</style>
