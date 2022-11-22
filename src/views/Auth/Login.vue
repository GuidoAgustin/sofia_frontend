<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-header text-center">
        <img src="/img/logo.svg" alt="Logo" class="brand-logo my-3" />
        <h3 class="m-0">QUARTZ</h3>
        <small>Content Management System</small>
      </div>
      <div class="card-body px-4 pb-4">
        <FormText
          label="Email"
          icon="fa-solid fa-envelope"
          v-model="form.email"
        />
        <FormText
          label="Password"
          password
          icon="fa-solid fa-fingerprint"
          v-model="form.password"
          @keyup.enter="signIn"
        />
        <FormSwitch label="Recordarme" v-model="form.remember" small />

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
import FormSwitch from "@/components/Form/FormSwitch.vue";

export default {
  components: {
    FormText,
    FormSwitch,
  },
  data: () => ({
    form: {
      email: null,
      password: null,
      remember: true,
    },
  }),
  beforeMount() {
    this.$store.dispatch("setCredentials");
    const isLoggedIn = this.$store.getters.isLoggedIn;

    if (isLoggedIn) {
      this.$router.push("/dashboard");
    }

    const default_email = localStorage.getItem("default_email");
    const default_pw = localStorage.getItem("default_pw");
    if (default_email) this.form.email = default_email;
    if (default_pw) this.form.password = default_pw;
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("login", this.form)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch((err) => this.$toast.error(err));
    },
  },
};
</script>
