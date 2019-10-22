<template>
  <el-container id="app">
    <!-- <div class="col-sm-6 offset-sm-3"> -->
    <!-- <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div> -->
    <!-- <el-col :span="24"><div class="grid-content bg-purple-dark"></div> -->
      <!-- <el-alert v-if="alert.message" :title="alert.message" :type="alert.type"></el-alert> -->
    <router-view></router-view>
    <!-- </el-col> -->
    
    <!-- </div> -->
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
    'alert.message'(){
      if (!this.alert.message) {
        return
      }
      this.$message({
          message: this.alert.message,
          type: this.alert.type
        });
      this.clearAlert()  
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
#app {
  height: 100vh; 
  overflow: auto
}
/* body {
  background-size: 200% 100%;
  animation: move 10s ease infinite;
  transform: translate3d(0, 0, 0);
  background: linear-gradient(45deg, #49d49d 10%, #a2c7e5 90%);
  height: 100vh;
} */
/* 
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
