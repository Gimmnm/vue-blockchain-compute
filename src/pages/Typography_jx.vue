<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <div class="overlay-page">
          <div class="overlay-content">
            <button @click="closeOverlay">✖</button>
          <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">{{ machineId }}</h4>
          </md-card-header>
          <md-card-content>
            <div id="typography">
              <div class="row">
                <div class="tim-typo">
                  <h1>
                    <span class="tim-note">Header 1</span>The Life of Material
                    Dashboard
                  </h1>
                </div>
                <div class="tim-typo">
                  <h2>
                    <span class="tim-note">Header 2</span>The life of Material
                    Dashboard
                  </h2>
                </div>
                <div class="tim-typo">
                  <h3>
                    <span class="tim-note">Header 3</span>The life of Material
                    Dashboard
                  </h3>
                </div>
                <div class="tim-typo">
                  <h4>
                    <span class="tim-note">Header 4</span>The life of Material
                    Dashboard
                  </h4>
                </div>
                <div class="tim-typo">
                  <h5>
                    <span class="tim-note">Header 5</span>The life of Material
                    Dashboard
                  </h5>
                </div>
                <div class="tim-typo">
                  <h6>
                    <span class="tim-note">Header 6</span>The life of Material
                    Dashboard
                  </h6>
                </div>
                <div class="tim-typo">
                  <p>
                    <span class="tim-note">Paragraph</span>
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers. I understand
                    culture. I am the nucleus. I think that’s a responsibility
                    that I have, to push possibilities, to show people, this is
                    the level that things could be at.
                  </p>
                </div>
                <div class="tim-typo">
                  <span class="tim-note">Muted Text</span>
                  <p class="text-muted">
                    I will be the leader of a company that ends up being worth
                    billions of dollars, because I got the answers...
                  </p>
                </div>       
              </div>
            </div>
          </md-card-content>
        </md-card>
          </div>
        </div>
        
      </div>
    </div>
  </div>
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
    }
  },
  data() {
    return {
      machineId: this.$route.params.itemId,
    };
  },
};
</script>
<style>
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
  z-index: 1000; /* 覆盖内容但不覆盖sidebar */
}

.overlay-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>