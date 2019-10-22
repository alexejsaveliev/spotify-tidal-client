<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Auto Synchronization">
      <el-switch v-model="form.autoSync"></el-switch>
    </el-form-item>
    <el-form-item label="Interval (Hours)">
      <el-input-number v-model="form.syncInterval" controls-position="right" :min="1" :max="24"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Save</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="Spotify">
      <el-button v-if="spotifyConnected" type="danger" round @click="spotifyLogin">Disconect</el-button>
      <el-button v-else type="success" round @click="spotifyLogin">Connect</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="Tidal">
      <el-button v-if="tidalConnected" type="danger" round @click="tidalLogout">Disconect</el-button>
      <el-button v-else type="success" round @click="dialogVisible=true">Connect</el-button>
    </el-form-item>
    <el-dialog title="Tidal" :visible.sync="dialogVisible" width="30%">
      <el-form :model="tidalCreds" class="form-login">
        <el-form-item label="Username">
          <el-input v-model="tidalCreds.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input placeholder="Please input password" v-model="tidalCreds.password" show-password></el-input>
        </el-form-item>
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="tidalLogin">Log in</el-button>
      </el-form>
    </el-dialog>
  </el-form>
</template>

<script>
import { userService, spotify, tidal } from "../_services";
import { mapActions } from 'vuex'

export default {
  data() {
    const userSettings = this.$store.state.account.user.settings
    return {
      form: {
        autoSync: userSettings.general.syncOn,
        syncInterval: userSettings.general.syncInterval
      },
      tidalCreds: {
          username: userSettings.tidal.login,
          password: ''
      },
      spotifyConnected: !!userSettings.spotify.token,
      tidalConnected: !!userSettings.tidal.username,
      dialogVisible: false
    };
  },
  methods: {
    ...mapActions('account', ['updateSettings']),
    onSubmit() {
      this.updateSettings({
        syncInterval: this.form.syncInterval,
        syncOn: this.form.autoSync
      });
    },
    spotifyLogin() {
      spotify.login();
    },
    tidalLogin() {
      tidal.login(this.tidalCreds.username, this.tidalCreds.password)
        .then((userData) => {
            if (userData.userId) {
                this.tidalConnected = true
                this.dialogVisible = false
            }
        })
    }, 
    tidalLogout(){

    }
  },
  mounted: function() {
    const params = this.$route.query;
    if (params.code) {
      spotify.auth(params);
    }

    userService.getSettings().then(
      settings => {
        this.form.autoSync = settings.general.syncOn
        this.form.syncInterval = settings.general.syncInterval
        this.spotifyConnected = !!settings.spotify.token
        this.tidalConnected = !!settings.tidal.username
        this.tidalCreds.username = settings.tidal.username
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style>
</style>
