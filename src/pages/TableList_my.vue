<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div class="centered-container">
          <h3 v-if="ifNothing"><strong>这里什么都没有...</strong></h3>
        </div>
      </div>
      <div v-if="!ifNothing" class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
        <md-card class="md-card-plain">
          <!-- <md-card-header data-background-color="gray"> -->
            <!-- <h3 class="title"><strong> My Resources </strong></h3> -->
            
          <!-- </md-card-header> -->
          <!-- ... -->
          <hr>
          <md-card-content>
            <p v-show="1===2">{{ machines[0].Name }}</p>
            <SimpleTable_my :machines="machines"></SimpleTable_my>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleTable_my from "../components/Tables/SimpleTable_my.vue";

export default {
  components: {
    SimpleTable_my,
  },
  data() {
    return {
      machines: [],
      ifNothing: false,
    };
  },
  mounted() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 10000);
  },
  methods: {
    fetchData() {
      this.$axios.get('/api/v1/listresources')
      .then(response => {
        if (response.data.message === "error") {
          this.$toast.error(''+response.data.error);
        }
        // this.machines = JSON.parse(response.data.data);
        if (response.data.data) {
            try {
              this.machines = JSON.parse(response.data.data); // 尝试解析 JSON
            } catch (error) {
              // console.error("JSON解析错误:", error); // 捕获 JSON 解析错误
              // this.$toast.error("数据解析错误");
              this.machines = []; // 设置默认值以防后续操作报错
            }
          } else {
            // console.warn("空数据返回");
            this.machines = []; // 设置为空数组，避免后续长度计算错误
          }
      })
      .catch(error => {
        this.$toast.error(''+error);
      })
      .finally(() => {
        if (this.machines.length === 0) {
          this.ifNothing = true;
        } else {
          this.ifNothing = false;
        }
      });
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

};
</script>
<style scoped>
  hr {
    border: none; /* 移除默认边框 */
    height: 2px; /* 设置线条高度 */
    background-color: #333; /* 设置颜色 */
  }

  .centered-container {
  display: flex !important;
  justify-content: center !important; /* 水平居中 */
  align-items: center !important; /* 垂直居中 */
}
</style>
