<template>
  <div class="dashboard-layout">
    <Sidebar />
    <div class="main">
      <Topbar />
      <div class="content-wrapper">
        <div class="content">
          <router-view></router-view>
        </div>
        <div class="footer">
          Copyright &reg; {{ new Date().getFullYear() }} - APPNAME
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";

export default {
  components: {
    Sidebar,
    Topbar,
  },
};
</script>
