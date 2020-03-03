<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Dashboard</div>
            <div class="card-body" v-if="is_login">
                Hi {{ user.first_name }} {{ user.last_name }}
                <br>
                Your email : {{ user.email }}
                <br>
                Your Mobile Number : {{ user.mobile_number}}
                <br>
                Your Date of Birth : {{ user.date_of_birth}}
                <br>
                Your Gender : {{ user.gender}}
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import configs from "../../config";
  export default {
    data() {
      return {
        user: {},
        is_login : false,
      }
    },
    mounted(){
      let app = this
      let token = localStorage.getItem('user-token');
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };

      const bodyParameters = {
          key: "value"
      };
      let host = configs.serverHost || "Http://localhost:8081";
      host = `${host}/api/auth/data`;
      axios.post(
          host,
          bodyParameters,
          config
      ).then(function(response) {
           // handle redirection
           console.log(response.data);
           app.user = response.data.data;
           app.is_login = true;
      }).catch(function(error) {
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

      
    },
    methods: {
      data() {
        
      }
    }
  }
</script>