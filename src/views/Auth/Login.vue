<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-header text-center">
        <img src="/img/logo.svg" alt="Logo" class="brand-logo my-3" />
        <h3 class="m-0">QUARTZ</h3>
        <small>Content Management System</small>
      </div>
      <div class="card-body px-4 pb-4">
        <FormText label="Email" icon="fa-solid fa-envelope" />
        <FormText label="Password" password icon="fa-solid fa-fingerprint" />

        <button class="btn btn-primary btn-block" @click="signIn">
          Log In
        </button>

        <div class="text-center mt-3">
          <small>
            by <a href="http://farenasoft.com" target="_blank"> Farenasoft </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormText from "@/components/Form/FormText.vue";

export default {
  components: {
    FormText,
  },
  methods: {
    signIn() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
