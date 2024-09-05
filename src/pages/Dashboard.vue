<template>
  <!-- <div class="content">
    <div class="md-layout"> -->
      <div class="create-page-container">
          <div class="option-box">
          <!-- <div class="icon-text">
              <img src="@/assets/img/bulb-filled-svgrepo-com.svg" alt="Auto Create">
              <div class="text-content">
              <router-link to="/create/template" style="font-size: 23px;"><strong>Create from template</strong></router-link>
              <p>This option allows you to automatically create content using predefined templates.</p>
              </div>
          </div> -->
          </div>
          <div class="option-box">
          <!-- <div class="icon-text">
              <img src="@/assets/img/bulb-outline-svgrepo-com.svg" alt="Manual Create">
              <div class="text-content">
              <router-link to="/create/blank" style="font-size: 23px;"><strong>Create from blank</strong></router-link>
              <p>This option allows you to manually create content starting with a blank slate.</p>
              </div>
          </div> -->
          </div>

      </div>
      <!-- </div>
    </div> -->
</template>

<script>

export default {
  name: "CreateMachine",
};

</script>
<style scoped>
.create-page-container {
display: flex;
flex-direction: row; 
justify-content: center;
align-items: center;
height: 33vh;
width: 100%;  /* 确保容器宽度占满可用空间 */
}

.option-box {
width: 50%;
display: flex;
align-items: center;  /* 垂直居中 */
justify-content: center;  /* 水平居中 */
margin: 20px;
padding: 70px;
border: 1px solid #9e9c9c;
border-radius: 8px;
}

.icon-text {
display: flex;
align-items: center;
}

.icon-text img {
margin-right: 10px;
width: 100px;
height: auto;
}

.text-content {
display: flex;
flex-direction: column;
}

.text-content p, .text-content a {
font-size: 18px;  
line-height: 1.5;
text-align: center;
}
</style>
