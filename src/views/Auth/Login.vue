<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-header text-center px-4">
        <img src="/img/logo.jpg" alt="Logo" class="brand-logo mt-4 mt-md-0" />
        <h3>Bienvenido a APPNAME!</h3>
        <p>Por favor Logeá para continuar.</p>
      </div>
      <div class="card-body px-4 pb-4">
        <FormText label="Email" icon="fa-solid fa-envelope" />
        <FormText label="Password" icon="fa-solid fa-fingerprint" />

        <router-link to="/dashboard" class="btn btn-primary btn-block">
          Log In
        </router-link>
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
};
</script>
