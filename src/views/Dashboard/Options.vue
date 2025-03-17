<template>
  <div class="row justify-content-center">
    <!-- Checkbox para ocultar el botón de registro -->
    <div class="col-md-10 mt-4" v-if="userIsAdmin">
      <div class="card">
        <div class="card-body d-flex align-items-center">
          <FormSwitch
            label="Ocultar botón de registrarme"
            v-model="showRegisterButton"
            @change="toggleRegisterButton"
          />
          <i
            class="fa fa-info-circle fa-2x ml-2"
            title="Esta opción oculta el botón de registrarse en el login para evitar que cualquier usuario 
            cree una cuenta con permisos especiales. Así, solo los administradores podrán hacer cambios importantes. 
            Se recomienda mantener esta opción activa para mantener la seguridad de la plataforma."
            style="cursor: pointer"
          ></i>
        </div>
      </div>
    </div>
    <div class="col-md-10">
      <div class="card" v-if="userIsAdmin">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h1>Usuarios</h1>
          <FormButton class="btn btn-primary" @click="showCreateUserModal = true">
            + Nuevo usuario
          </FormButton>
        </div>
        <div class="card-body">
          <vue-table
            v-if="vTable.headers"
            :values="vTable.values"
            :headers="vTable.headers"
            :actions="vTable.actions"
            ref="vtable"
            @changed="getData"
            @onDelete="onDelete"
            :showFiltersButton="false"
          >
          </vue-table>
        </div>
      </div>
    </div>

    <!-- Modal para crear nuevo usuario -->
    <VueModal v-if="showCreateUserModal" @close="showCreateUserModal = false" size="sm">
      <template #title> Crear cuenta de usuario </template>
      <template #body>
        <form @submit.prevent="crearCuenta">
          <!-- Campo de Usuario -->
          <FormText
            label="Crear usuario"
            v-model="formulario.name"
            placeholder="Ingrese su nombre de usuario"
          />

          <!-- Campo de Gmail -->
          <FormText
            label="Ingrese su Gmail"
            v-model="formulario.email"
            type="email"
            placeholder="Ingrese su Gmail"
          />

          <!-- Campo de Contraseña -->
          <FormText
            label="Cree una Contraseña"
            v-model="formulario.password"
            :password="!mostrarContraseñaCrearCuenta"
            placeholder="Ingrese su contraseña"
          >
            <FormButton
              :icon="mostrarContraseñaCrearCuenta ? 'fa fa-eye' : 'fa fa-eye-slash'"
              @click.prevent="toggleMostrarContraseñaCrearCuenta"
              class="p-0 m-0"
            />
          </FormText>

          <FormButton type="submit" class="btn btn-primary btn-block" theme="primary" block>
            Crear cuenta de usuario
          </FormButton>
        </form>
      </template>
    </VueModal>

    <!-- Formulario para cambiar la contraseña -->
    <div class="col-md-10 mt-4">
      <div class="card">
        <div class="card-header">
          <h1>Cambiar Contraseña</h1>
        </div>
        <form @submit.prevent="savePassword">
          <div class="card-body">
            <!-- Campo de Nueva Contraseña -->
            <FormText
              label="Nueva Contraseña"
              v-model="form.new_password"
              :password="!mostrarContraseña"
              placeholder="Ingrese su nueva contraseña"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <!-- Campo de Repetir Nueva Contraseña -->
            <FormText
              label="Repetir Nueva Contraseña"
              v-model="form.new_password_confirmation"
              :password="!mostrarContraseña"
              placeholder="Repita su nueva contraseña"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <!-- Campo de Contraseña Actual -->
            <FormText
              label="Contraseña Actual"
              v-model="form.password"
              :password="!mostrarContraseña"
              placeholder="Ingrese su contraseña actual"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <FormButton class="btn btn-primary btn-block" type="submit" theme="primary" block>
              Guardar
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FormSwitch from '@/components/Form/FormSwitch.vue'
import FormText from '@/components/Form/FormText.vue'
import FormButton from '@/components/Form/FormButton.vue'
import VueModal from '@/components/Modal/VueModal.vue'

export default {
  components: {
    FormSwitch,
    FormText,
    FormButton,
    VueModal
  },
  data: () => ({
    params: {},
    formulario: {
      name: '',
      email: '',
      password: '',
      role: 'user' // Set role to user
    },
    form: {
      new_password: null,
      new_password_confirmation: null,
      password: null
    },
    mostrarContraseña: false, // Estado para mostrar/ocultar la contraseña en el formulario de cambiar contraseña
    mostrarContraseñaCrearCuenta: false, // Estado para mostrar/ocultar la contraseña en el formulario de crear cuenta
    showCreateUserModal: false, // Estado para mostrar/ocultar el modal de crear usuario
    vTable: {
      filters: [],
      headers: [
        { title: 'user_id', sortable: true, hideable: true, mask: 'Id del usuario' },
        { title: 'name', sortable: true, hideable: true, mask: 'Nombre' },
        { title: 'email', sortable: true, hideable: true, mask: 'Email' },
        { title: 'role', sortable: true, hideable: true, mask: 'Rol' }
      ],
      actions: [{ title: 'Eliminar usuario', callback: 'onDelete' }],
      values: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 15,
        data: []
      }
    }
  }),
  computed: {
    userIsAdmin() {
      const user = this.$store.state.auth && this.$store.state.auth.user
      return user && user.role === 'admin'
    },
    showRegisterButton: {
      get() {
        return !this.$store.getters.showRegisterButton
      },
      set(value) {
        this.$store.dispatch('toggleShowRegisterButton', value)
      }
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      if (this.$refs.vtable) {
        this.$refs.vtable.init()
      }
    },
    refreshTable() {
    this.getData(this.params)
    },
    getData(params) {
      this.params = params
      this.$store.dispatch('allUsers', params).then((response) => {
        this.vTable.values = response
      })
    },
    async crearCuenta() {
      if (!this.formulario.name || !this.formulario.email || !this.formulario.password) {
        this.$toast.error('Por favor, complete todos los campos.')
        return
      }

      this.$store
        .dispatch('registrar', this.formulario)
        .then(() => {
          this.$toast.success('Usuario creado exitosamente')
          this.showCreateUserModal = false
          this.getData(this.params)
        })
        .catch(() => {
          this.$toast.error('Error al crear usuario')
        })
    },
    toggleMostrarContraseña() {
      this.mostrarContraseña = !this.mostrarContraseña
    },
    toggleMostrarContraseñaCrearCuenta() {
      this.mostrarContraseñaCrearCuenta = !this.mostrarContraseñaCrearCuenta
    },
    savePassword() {
      this.$store.dispatch('updateProfile', this.form).then(() => {
        this.$toast.success('Contraseña actualizada exitosamente')
        this.resetForm()
      })
    },
    resetForm() {
      this.form.new_password = null
      this.form.new_password_confirmation = null
      this.form.password = null
    },
    toggleRegisterButton() {
      this.$store.dispatch('toggleShowRegisterButton', this.showRegisterButton)
    },
    onDelete(item) {
      this.$store
        .dispatch('deleteUser', item.user_id)
        .then(() => {
          this.getData(this.params)
          this.$toast.success('Usuario eliminado exitosamente')
        })
        .catch(() => {
          this.$toast.error('Error al eliminar usuario')
        })
    }
  }
}
</script>
