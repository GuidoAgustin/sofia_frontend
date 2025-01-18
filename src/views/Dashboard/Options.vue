<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h4>Cambiar Contraseña</h4>
        </div>
        <form @submit.prevent="savePassword">
          <div class="card-body">
            <FormText label="Nueva Contraseña" password v-model="form.new_password" />
            <FormText
              label="Repetir Nueva Contraseña"
              password
              v-model="form.new_password_confirmation"
            />
            <FormText label="Contraseña Actual" password v-model="form.password" />
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-block" type="submit">Guardar</button>
          </div>
        </form>
      </div>
          <button @click="irAtras" class="btn btn-primary">Ir atrás</button>
    </div>
  </div>
</template>

<script>
import FormText from '@/components/Form/FormText.vue'

export default {
  components: {
    FormText
  },
  data: () => ({
    form: {
      new_password: null,
      new_password_confirmation: null,
      password: null
    }
  }),
  methods: {
    savePassword() {
      this.$store.dispatch('updateProfile', this.form)
    },
        irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    }
  }
}
</script>
