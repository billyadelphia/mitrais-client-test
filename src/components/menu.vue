<template>
    <nav id="nav" class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          
            <li v-if="!auth" class="nav-item">
               <router-link class="nav-link" :to="{ name: 'login'}">Login</router-link>
            </li>

             <li v-if="!auth" class="nav-item">
               <router-link class="nav-link" :to="{ name: 'register'}">Register</router-link>
            </li>
            
             <li v-if="auth" class="nav-item">
                <router-link class="nav-link" :to="{ name: 'dashboard'}">Dashboard</router-link>
            </li>
      
            <li v-if="auth" class="nav-item">
                <a class="nav-link" href="#" v-on:click.prevent="logout">Logout</a>
            </li>
        </ul>
    </nav>
</template>

<script>
  import isAuthenticated from '../js/customAuth';
  export default {
    data() {
     return {
       auth: false
     }
    },

    created : async function(){
        this.auth = await isAuthenticated;
    },

    methods : {
     
      logout: async function() {
         console.log(this.$props);
        try{
          localStorage.removeItem('user-token');
          location.reload();
        }catch(error){
          console.log(error)
        }
      },
    }
  }
</script>