<template>
    <div id="main">
      <navigationMenu></navigationMenu>
        <div class="container" style="margin-top:30px" id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import navigationMenu from './menu.vue'
  export default {
    data() {
      return {
        //
      }
    },
    components: {
      navigationMenu
    }
  }
</script>