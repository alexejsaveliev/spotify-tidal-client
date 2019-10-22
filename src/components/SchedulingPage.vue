<template>
  <div class="container">
    <add-new-schedule :visible="addFormVisible" @formClosed="addFormVisible=false"></add-new-schedule>
    <el-row>
      <el-col :span="6">
        <el-button-group>
          <el-button icon="el-icon-plus" @click="addFormVisible = true">Add</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          id="trackList"
          :data="playlistSettingsList"
          style="width: 100%; padding: 0px;"
          height="100%"
          :default-sort="{prop: 'name',  order: 'ascending'}"
        >
          <el-table-column prop="title" label="Title" width="auto" sortable></el-table-column>
          <el-table-column prop="source" label="Surce" width="auto" sortable></el-table-column>
          <el-table-column prop="destination" label="Destination" width="auto" sortable></el-table-column>
          <el-table-column prop="lastExec" label="Last exec" width="auto" sortable></el-table-column>
          <el-table-column prop="nextExec" label="Next exec" width="auto" sortable></el-table-column>
          <el-table-column prop="status" label="Status" width="auto" sortable></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { scheduling } from "../_services";
import AddNewSchedule from "./AddNewSchedule.vue";

export default {
  data() {
    return {
      addFormVisible: false,
      playlistSettingsList: []
    };
  },
  methods: {
    addSetting() {}
  },
  components: {
    AddNewSchedule
  },
  created() {
    scheduling
      .getSettingsList()
      .then(data => {
        this.playlistSettingsList = data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
  height: 100%;
  max-height: 100%;
}
</style>
