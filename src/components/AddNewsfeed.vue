<template>
  <div class="container">
      <b-card
        class="mb-2"
      >
        <span class="icon-close" @click="onClose">
          <b-icon-x-circle-fill></b-icon-x-circle-fill>
        </span>
        <b-form @submit="onSubmit">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <b-form-group
            id="input-group-1"
            label="Title"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              placeholder="Enter title"
              v-model="getEditNewsfeed.title"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Description:" label-for="input-2">
            <b-form-input
              id="input-2"         
              placeholder="Enter description"
              v-model="getEditNewsfeed.body"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Author:" label-for="input-2">
            <b-form-input
              id="input-2"         
              placeholder="Enter Author"
              v-model="getEditNewsfeed.author"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Image:" label-for="input-2">
            <input type="file" accept="image/*" @change="uploadImage">
            <img :src="previewImage" style="width:100px;" />
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "AddNewsfeed",
    data() {
      return {
        errors: [],
        previewImage: undefined
      }
    },
    methods: {
        ...mapActions(['addNewsfeed', 'editNewsfeed']),
        onSubmit(e) {
            this.errors = [];
            if (!this.getEditNewsfeed.title) {
              this.errors.push('Title required.');
            }
            if (!this.getEditNewsfeed.body) {
              this.errors.push('Description required.');
            }
              console.log(this.errors.length)
            e.preventDefault();
            if(this.errors.length != 0){
              return false;
            }
            if(this.getEditNewsfeed.action == 'EDIT'){
              this.editNewsfeed({id: this.getEditNewsfeed.id, title: this.getEditNewsfeed.title, body: this.getEditNewsfeed.body, author: this.getEditNewsfeed.author, img: this.previewImage});
            } else {
              this.addNewsfeed({id: Math.floor(Math.random() * 100), title: this.getEditNewsfeed.title, body: this.getEditNewsfeed.body, author: this.getEditNewsfeed.author, img: this.previewImage});
            }
            this.$store.commit("setEditNewsfeed", {id: '', title: '', body: '', action: ''})
            this.$store.commit("setShowForm", false);
        },
        uploadImage(e) {
          const [image] = e.target.files;
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = e => {
            this.previewImage = e.target.result;
          };
        },
        onClose() {
          this.$store.commit("setShowForm", false);
        }
    },
    computed: mapGetters(['getEditNewsfeed']),
}
</script>

<style scoped>
.container {
  padding-top: 60px;
}
.icon-close{
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
}
.form-group {
  margin-bottom: 20px;
}
.btn{
  margin-right: 10px;
  float: right;
}
</style>