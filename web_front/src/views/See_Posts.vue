<template>
  <div id="see_post">
    <div class="post" v-for="post in posts" :key="post.article_id">
      <h1 class="post-title">{{ post.article_title }}</h1>
      <p class="post-text">{{ post.article_body }}</p>
      <span class="post-sender">{{ post.article_sender }}</span>
      <span class="post-date">{{ post.article_date }}</span>
    </div>
  </div>
</template>

<script>
import api from "../service/api";

export default {
    data() {
    return {
      posts: {}
    };
  },
  created() {
    this.GetArticles()
  },
  methods: {
    async GetArticles(){
      await api("GET", "/posts/get").then((data) => {
        this.posts = data.articles
      });
    }
  }
};
</script>

<style>
</style>