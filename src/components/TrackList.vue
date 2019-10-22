<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </el-col>
    </el-row>
    <el-table
      id="trackList"
      :data="tableData"
      style="width: 100%; padding: 0px;"
      height="100%"
      :default-sort="{prop: 'name',  order: 'ascending'}"
    >
      <el-table-column prop="name" label="Title" width="250" sortable></el-table-column>
      <el-table-column prop="artist" label="Artist" width="200"></el-table-column>
      <!-- <el-table-column prop="album.name" label="Album"></el-table-column> -->
      <el-table-column prop="added_at" label="Added" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{ scope.row.added_at | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="source"
        label="Service"
        :filters="[{ text: 'Spoyify', value: 'spotify' }, { text: 'Tidal', value: 'tidal' }]"
        :filter-method="execFilter"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.source === 'spotify' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.source}}</el-tag>
        </template>
      </el-table-column>

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
    <!-- <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" @current-change="paginate"></el-pagination> -->
  </div>
</template>

<script>
import { trackListService } from "../_services";
import InfiniteLoading from "vue-infinite-loading";

const getTracks = (params, cb) => {
  trackListService.getTracks(params).then(cb);
};

export default {
  data() {
    return {
      tableData: [],
      currentPage: 0,
      search: "",
      limit: 50
    };
  },
  methods: {
    loadData($state) {
      this.currentPage++;

      getTracks(
        {
          offset: this.currentPage * this.limit,
          limit: this.limit,
          searchQuery: this.search
        },
        ( data ) => {
          if (data.length) {
            this.tableData = this.tableData.concat(data);
            $state.loaded();
          } else {
            $state.complete();
          }
        }
      );
    },
    execFilter(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  filters: {
    dateFormat(val) {
      const date = new Date(val);
      return date.toLocaleDateString();
    }
  },
  watch: {
    search() {
      this.currentPage = 0;

      getTracks(
        {
          offset: this.currentPage * this.limit,
          limit: this.limit,
          searchQuery: this.search
        },
        data => {
          this.tableData = data;
        }
      );
    }
  },
  components: {
    InfiniteLoading
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
