<template>
  <el-dialog
    :visible.sync="visible"
    @closed="closeForm"
    destroy-on-close
    class="dialogForm"
    width="50%"
  >
    <span slot="title" class="dialog-title">
      <el-row class="margin-bottom: 20px">
        <el-col :span="1">
          <el-button type="text" icon="el-icon-back"></el-button>
        </el-col>
        <el-col :span="23" style="text-align: center">
          <span>SYNCHRONIZE</span>
          <!-- <div><span style="font-size: 13px;">Push automaticaly your playlists</span></div> -->
        </el-col>
      </el-row>
      <el-row>
        <el-steps :active="activeStep" align-center>
          <el-step title="Step 1"></el-step>
          <el-step title="Step 2"></el-step>
          <el-step title="Step 3"></el-step>
          <el-step title="Step 4"></el-step>
        </el-steps>
      </el-row>
      <el-row>
        <span
          style="font-size: 16px; display: grid; text-align: center; margin-top: 20px"
        >{{ stepDescription }}</span>
      </el-row>

      <!-- <el-divider></el-divider> -->
    </span>

    <!-- STEP 1 -->
    <div v-if="activeStep === 0" class="step1">
      <el-row justify="center" type="flex">
        <el-col :span="12">
          <el-button @click="sourceSelected('spotify')" class="block">
            <el-image
              style="width: 150px; height: 50px"
              src="../src/assets/Spotify_Logo_RGB_Green.png"
              fit="contain"
            ></el-image>
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="sourceSelected('tidal')" class="block">
            <el-image
              style="width: 150px; height: 50px"
              src="../src/assets/tidal-logo.svg"
              fit="contain"
            ></el-image>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- STEP 2 AND 3 -->
    <el-row v-else-if="activeStep === 1 || activeStep === 2">
      <el-col :span="24">
        <el-table
          :data="playlists"
          highlight-current-row
          @current-change="handlePlayListSelect"
          style="width: 100%; overflow-y: scroll"
          height="300"
          :show-header="false"
          size="medium"
          v-loading="loading"
        >
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-image style="width: 30px; height: 30px" :src="scope.row.img">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column property="title" width="auto" show-overflow-tooltip></el-table-column>
          <infinite-loading
            slot="append"
            spinner="waveDots"
            @infinite="loadData"
            force-use-infinite-wrapper=".el-table__body-wrapper"
          >
            <div slot="waveDots">Loading...</div>
            <div slot="no-more">No more message</div>
            <div slot="no-results">No results message</div>
          </infinite-loading>
        </el-table>
      </el-col>
    </el-row>

    <!-- STEP 4 Scedululing -->
    <div v-else-if="activeStep === 3">
      <el-divider content-position="left">Method</el-divider>
      <el-row>
        <el-col :span="24">
          <el-radio-group v-model="settingData.syncMethod">
            <el-radio-button label="Add tracks"></el-radio-button>
            <el-radio-button label="Replace all"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-divider content-position="left">Scedule</el-divider>
      <el-row :gutter="10">
        <el-col :span="11">
          <!-- <div> -->
          <span class="title">START</span>
          <el-date-picker v-model="settingData.startDay" type="date" placeholder="Pick a day"></el-date-picker>
          <!-- </div> -->
        </el-col>
        <el-col :span="6">
          <!-- <div> -->
          <span class>AT</span>
          <el-time-select
            v-model="settingData.time"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }"
            placeholder="Select time"
            style="width: 117px"
          ></el-time-select>
          <!-- </div> -->
        </el-col>
        <el-col :span="7">
          <!-- <div> -->
          <span class>Frequency</span>
          <el-select v-model="settingData.frequency" placeholder="Frequency" width="30%">
            <el-option
              v-for="(item, key) in frequencyOptions"
              :key="key"
              :label="`Each ${item}`"
              :value="item"
            ></el-option>
          </el-select>
          <!-- </div> -->
        </el-col>
      </el-row>
      <el-divider content-position="left">Title</el-divider>
      <el-row>
        <el-col :span="24">
          <!-- <span class="input-label">TITLE</span> -->
          <el-input placeholder="Title" v-model="settingData.title"></el-input>
        </el-col>
      </el-row>
    </div>

    <span slot="footer" class="dialog-footer" v-if="activeStep !== 0">
      <el-button @click="closeForm">Cancel</el-button>
      <el-button
        type="primary"
        :disabled="!nextStepAvaliable"
        @click="nextStep"
      >{{ activeStep === 3 ? 'Save' : 'Next >' }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { spotify, tidal, scheduling } from "../_services";
import InfiniteLoading from "vue-infinite-loading";

export default {
  props: ["visible"],
  data() {
    return {
      activeStep: 0,
      playlists: [],
      loading: false,
      settingData: {
        source: "",
        destinadion: "",
        sourcePlaylist: null,
        destinationPlaylist: null,
        syncMethod: "Add tracks",
        frequency: "Day",
        syncMethod: "Add tracks",
        title: "",
        time: null,
        startDay: new Date()
      },
      frequencyOptions: ["Day", "Week", "Month"],
      stepDescriptions: [
        "Select a source",
        "Select source playlist",
        "Select destination playlist",
        "Scedule your synhronization"
      ]
    };
  },
  computed: {
    nextStepAvaliable() {
      const step = this.activeStep;
      return (
        (step === 0 && this.settingData.source) ||
        (step === 1 && this.settingData.sourcePlaylist) ||
        (step === 2 && this.settingData.destinationPlaylist)
      );
    },
    stepDescription() {
      return this.stepDescriptions[this.activeStep];
    }
  },
  methods: {
    nextStep() {
      this.activeStep++;

      if (this.activeStep === 2) {
        this.playlists = [];
        this.loading = true;
        this.settingData.title = `[${this.settingData.source} > ${this.settingData.destination}] ${this.settingData.sourcePlaylist.title}`;

        this.getPlaylists(this.settingData.destination)
          .then(data => {
            this.playlists = data;
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      } else if (this.activeStep === 4) {
        //Finish. Save settings
        scheduling
          .saveSetting()
          .then(res => {})
          .catch(err => {});
      }
    },
    closeForm() {
      this.$emit("formClosed");
      //   this.visible = false;
      this.activeStep = 0;
      this.playlists = [];
    },
    sourceSelected(source) {
      this.settingData.source = source;
      this.settingData.destination = source === "tidal" ? "spotify" : "tidal";
      this.activeStep = 1;
      this.loading = true;
      this.getPlaylists(source)
        .then(data => {
          this.playlists = data;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    getPlaylists(source) {
      if (source === "spotify") {
        return spotify.getUserPlaylists();
      } else if (source === "tidal") {
        return tidal.getUserFavoritePlaylists(true);
      }
    },
    handlePlayListSelect(val) {
      if (this.activeStep === 1) {
        this.settingData.sourcePlaylist = val;
      } else if (this.activeStep === 2) {
        this.settingData.destinationPlaylist = val;
      }
    },
    loadData() {
      // spotify
      //   .getUserPlaylists()
      //   .then(data => {
      //     data.forEach(el => {
      //       this.playlists.push(el);
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  watch: {
    // activeStep(val) {
    //   if (val === 0) {
    //     this.stepDescription = "Select a source";
    //   } else {
    //   }
    // }
  },
  components: {
    InfiniteLoading
  }
};
</script>

<style scoped>
.block {
  display: block;
  margin: 0 auto;
}
el-row {
  margin-bottom: 20px;
}
.el-dialog__body {
  padding-top: 0px;
}
</style>
