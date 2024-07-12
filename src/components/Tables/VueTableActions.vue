<template>
  <button class="btn btn-sm btn-borderless-dark" @click="dropdown_open = true">
    <i class="fa fa-ellipsis"></i>
  </button>

  <Teleport to="#modal-container">
    <div class="vt-actions-dropdown">
      <VueModal
        size="sm"
        position="bottom"
        class="vt-actions-modal"
        ref="modal"
        v-if="dropdown_open"
        @close="dropdown_open = false"
      >
        <template #title>
          <span class="material-symbols-outlined"> interests </span>
          <span>ACTIONS</span>
        </template>

        <template #body>
          <slot :close="close"></slot>
        </template>
      </VueModal>
    </div>
  </Teleport>
</template>

<script>
import VueModal from '@/components/Modal/VueModal.vue'

export default {
  components: {
    VueModal
  },
  data: () => ({
    dropdown_open: false
  }),
  methods: {
    close() {
      this.$refs.modal.close()
    }
  }
}
</script>
