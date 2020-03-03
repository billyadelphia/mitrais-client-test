<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Login</div>

            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error">
                    <p>{{ error_message }}</p>
                </div>
                <form autocomplete="off" @submit.prevent="login" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password" required>
                    </div>
                    <button type="submit" class="btn btn-info">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "../../config";
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  export default {
    data() {
      return {
        email: null,
        password: null,
        has_error: false,
        error_message: null,
      }
    },
    mounted() {
      //
    },
    methods: {
      login() {
        let app = this;
        console.log(process.env);
        let host = config.serverHost || "http://localhost:8081";
        host = `${host}/api/auth/login`;
        axios.post(host, {
           email: app.email,
            password: app.password
        })
        .then(async function (response) {
           // handle redirection
           localStorage.setItem('user-token', response.data.token);
           await sleep(100)
           location.reload();
        })
        .catch(function (error) {
          app.has_error = true;
          let error_message = error.message;
          if (error.response) {
            error_message = error.response.data;
          } else if (error.request) {
            error_message = error.request;
          } else {
              error_message = error.message;
          }
          app.error_message = error_message;
        });
        
      }
    }
  }
</script>