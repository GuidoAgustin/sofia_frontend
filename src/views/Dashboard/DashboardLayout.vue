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
          Copyright &reg; {{ new Date().getFullYear() }}  - Powered by
          <a target="_blank">&nbsp;GuidoB</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'

export default {
  components: {
    Sidebar,
    Topbar
  },
  beforeMount() {
    this.$store.dispatch('setCredentials')
    const isLoggedIn = this.$store.getters.isLoggedIn

    if (!isLoggedIn) {
      this.$router.push('/login')
    } else {
      // this.$store.dispatch("getUnreadNotifications");
    }
  }
}
</script>
