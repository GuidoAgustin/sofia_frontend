<template>
  <transition name="fade" @after-enter="showContent = true">
    <div
      class="vue-modal"
      :class="`position-${position}`"
      v-if="open"
      @keypress.esc="showContent = false"
      tabindex="0"
    >
      <transition :name="`modal-pos-${position}`" @after-leave="endClose">
        <div class="vue-modal-content" v-if="showContent" :class="`modal-${size}`">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
            <button type="button" class="close" @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-body-wrapper">
              <slot name="body"></slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
      open: false
    }
  },
  props: {
    size: {
      validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
      default: 'lg'
    },
    position: {
      validator: (value) => ['center', 'left', 'right', 'top', 'bottom'].includes(value),
      default: 'center'
    }
  },
  created() {
    document.addEventListener('keydown', this.escapeHandler)
  },
  mounted() {
    setTimeout(() => (this.open = true), 100)
    document.body.classList.add('no-scrollable')

    document.querySelector('.sidebar').style.zIndex = 0
  },
  unmounted() {
    document.removeEventListener('keydown', this.escapeHandler)
    document.body.classList.remove('no-scrollable')
    document.querySelector('.sidebar').style.zIndex = 3
  },
  methods: {
    escapeHandler(e) {
      if (e.key === 'Escape' && this.showContent) {
        this.showContent = false
      }
    },
    close() {
      this.showContent = false
    },
    endClose() {
      this.$emit('close')
    }
  }
}
</script>
