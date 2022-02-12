<template>
  <div class="col-md-2" id="login">
    <input
      type="text"
      v-model="data.user"
      placeholder="User"
      class="form-control"
    />
    <input
      type="password"
      v-model="data.pass"
      placeholder="Pass"
      class="form-control"
    />
    <button class="btn btn-primary" @click="Login">Login</button>
  </div>
</template>

<script>
import api from "../service/api"
export default {
  data() {
    return {
      data: {
        user: "",
        pass: "",
      },
    };
  },
  methods: {
    async Login() {
      await api("POST", "/login", this.data).then((data) => {
        localStorage.setItem("token", data.token)
      })
    },
  },
};
</script>

<style>
#login {
  margin: auto;
  margin-top: 300px;
}
</style>