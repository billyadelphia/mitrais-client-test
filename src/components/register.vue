<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Registration</div>
            <div class="card-body">
                <form @submit.prevent="register" v-if="!success" method="post">
                   <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="mobile_number">Mobile Number</label>
                        <input type="text" required=required id="mobile_number" class="form-control" placeholder="6287827856426" v-model="mobile_number">
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.mobile_number">
                           {{ errors.mobile_number }}
                        </div>
                    </div>
                      <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.first_name }">
                        <label for="first_name">First Name</label>
                        <input type="text" required=required id="first_name" class="form-control" v-model="first_name">
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.first_name">
                           {{ errors.first_name }}
                        </div>
                      </div>

                      <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.last_name }">
                        <label for="last_name">Last Name</label>
                        <input type="text" required=required id="last_name" class="form-control" v-model="last_name">
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.last_name">
                            {{ errors.last_name }}
                        </div>
                      </div>

                      <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.date_of_birth }">
                        <label for="last_name">Date of birth</label>
                        <date-dropdown class="pl-2" min="1960"  default="" v-model="date_of_birth" />

                      </div>

                       <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.gender }">
                        
                        <div class="form-check-inline">
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="male" v-model="gender">Male
                          </label>
                        </div>
                        <div class="form-check-inline">
                          <label class="form-check-label">
                            <input type="radio" class="form-check-input" value="female" v-model="gender">Female
                          </label>
                        </div>
                       
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.gender">
                            {{ errors.gender }}
                        </div>
                      </div>

                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">
                        <div class="alert alert-danger" v-if="has_error && errors.email">
                           {{ errors.email }}
                        </div>
                    </div>

                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password">Password</label>
                        <input type="password" minLength=8 required=required id="password" class="form-control" v-model="password">
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.password">
                           {{ errors.password }}
                        </div>
                      </div>

                       <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password_confirmation }">
                        <label for="password_confirmation">Password Confirmation</label>
                        <input type="password" minLength=8 required=required id="password_confirmation" class="form-control" v-model="password_confirmation">
                        <div class="alert alert-danger alert-dismissible fade show" v-if="has_error && errors.password_confirmation">
                           {{ errors.password_confirmation }}
                        </div>
                      </div>

                    <button type="submit" class="btn btn-success">register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import DateDropdown from '../components/_dropdown';
  export default {
     components: {
        // eslint-disable-next-line vue/no-unused-components
        DateDropdown
    },
    data() {
      return {
        email: null,
        password: null,
        password_confirmation: null,
        last_name: null,
        first_name: null,
        mobile_number: null,
        gender: null,
        date_of_birth: null,
        has_error: false,
        error: null,
        errors: {},
        success: false
      }
    },
    methods: {
      register() {
        let app = this
        let validated = true;
        if (app.mobile_number.substring(0, 1) !== "0" && app.mobile_number.substring(0, 2) !== "62") {
              app.errors = Object.assign(app.errors, {mobile_number : "Please enter valid Indonesian phone number!"})
              app.has_error = true
              validated = false;
        }

        if(app.password !== app.password_confirmation){
          app.errors = Object.assign(app.errors, {password : "Please confirm your password"})
          app.has_error = true
          validated = false;
        }

        if(validated){
          this.$auth.register({
          data: {
            email: app.email,
            password: app.password,
            password_confirmation: app.password_confirmation,
            mobile_number : app.mobile_number,
            last_name: app.last_name,
            first_name: app.first_name,
            gender: app.gender,
            date_of_birth: app.date_of_birth,
          },
          success: function () {
            app.success = true
            this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
          },
          error: function (res) {
            if(res.response.data.message && res.response.data.message.length){
              for(const message of res.response.data.message ){
                app.errors[message.path] = message.message
              }
            }
            app.has_error = true
           // console.error(app.errors);
          }
        })
        }
         
        }
        
      }
    }
  
</script>