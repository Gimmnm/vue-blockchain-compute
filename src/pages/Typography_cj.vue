<template>
  <!-- <div class="content"> -->
    <!-- <div class="md-layout">
      <div class="md-layout-item"> -->
        <div class="overlay-page" @click="closeOverlayClick" ref="overlay">
          <div class="overlay-content" @click.stop>
            <button @click="closeOverlay">✖</button>
          <md-card>
          <md-card-header data-background-color="gray">
            <div class="flex-container">
              <h1 class="title"><strong>交易{{transactionId.slice(0, 10)}}...</strong></h1>
              <vue-simple-spinner v-if="isLoading" size="medium" line-fg-color="#009900"></vue-simple-spinner>
              <md-button :disabled="isLoading" style="padding: 10px 10px; min-width: 10px;" class="md-lg md-simple" @click="postPrice()">
                <strong>出价</strong>
              </md-button>
              <md-button :disabled="isLoading" style="padding: 10px 10px; min-width: 10px;" class="md-lg md-simple" @click="gotoMarket()">
                <strong>算力市场</strong>
              </md-button>
            </div>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
            <p v-show="1===2">{{ transactionId }}</p>
            <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                <label>ID</label>
                <md-input v-model="transactionId" tyep="text" readonly></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                <label>价格</label>
                <md-input v-model="formData.price" tyep="text"></md-input>
                </md-field>
            </div>
            </div>
        </md-card-content>
<!--           
          <md-card-content>
            <div id="typography">
              <div class="row">
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material, The life of Material, The life of Material, The life of Material, The life of Material Dashboard
                    <span class="tim-note">Header 5</span>The life of Material, The life of Material, The life of Material, The life of Material, The life of Material
                    Dashboard
                  </h5> 
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
              </div>
            </div>
          </md-card-content> -->
        </md-card>
          </div>
        </div>
        
      <!-- </div> -->
    <!-- </div>
  </div> -->
</template>

<script>
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  methods: {
    closeOverlay() {
      this.$router.go(-1); // 返回上一页面
    },
    gotoMarket() {
      this.$router.push("/table_tr");
    },
    postTransaction() {
    },
    postPrice() {
      if (this.formData.price !== '') {
        this.isLoading = true;
        this.$axios.get('/api/v1/market/price/' + this.transactionId + '/' + this.formData.price)
        .then(response => {
          if (response.data.message === "error") {
            this.$toast.error(''+response.data.error);
          }
        })
        .catch(error => {
          this.$toast.error(''+error);
        })
        .finally(() => {
          this.isLoading = false;
          this.$router.go(-1); 
        });
      }
    },
    closeOverlayClick(event) {
      if (event.target === this.$refs.overlay) {
        this.$router.go(-1);
      }
    },
  },
  created() {
  },
  data() {
    return {
      transactionId: this.$route.params.itemId,
      formData: {
        price: '',
      },
      isLoading: false,
    };
  },
};
</script>
<style scoped>
.overlay-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.flex-container {
  display: flex;
  align-items: center;  /* 垂直居中子元素 */
}
.title {
  margin-right: 10px;  /* 在标题和按钮之间添加一些间距 */
}
.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>