<template>
  <div id="new_post">
    <div class="md-3">
      <input type="text" placeholder="Title" v-model="post.post_title">
    </div>
    <div class="md-3">
      <textarea cols="30" rows="10" placeholder="Text" v-model="post.post_body"></textarea>
    </div>
    <div class="md-3">
      <input type="text" placeholder="Sender" v-model="post.post_sender">
      <input type="text" placeholder="Date" v-model="post.post_date">
    </div>
    <button type="submit" class="btn btn-primary" @click="NewPost()">Oluştur</button>
  </div>
</template>

<script>
import api from '../service/api';
export default {
  data() {
    return {
      post: {
        post_title: "",
        post_body: "",
        post_sender: "",
        post_date: "",
      }
    };
  },
  methods:{
    async NewPost(){
      await api("POST", "/posts/add", this.post).then(() => {
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>