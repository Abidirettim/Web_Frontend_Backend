<template>
  <div class="col-md-2" id="register">
    <input
      type="text"
      v-model="data.user"
      placeholder="User"
      class="form-control"
    />
    <input
      type="text"
      v-model="data.mail"
      placeholder="Mail"
      class="form-control"
    />
    <input
      type="password"
      v-model="data.pass"
      placeholder="Pass"
      class="form-control"
    />
    <button class="btn btn-primary" @click="Register">Register</button>
  </div>
</template>

<script>
import api from '../service/api';
export default {
  data() {
    return {
      data: {
        user: "",
        mail: "",
        pass: "",
      },
    };
  },
  methods: {
    async Register() {
      await api("POST", "/register", this.data).then(() => {
        this.$router.push("/login")
      })
    },
  },
};
</script>

<style>
#register {
  margin: auto;
  margin-top: 300px;
}
</style>