<template>
  <transition name="fade" @after-enter="showContent = true">
    <div
      class="vue-modal"
      v-if="open"
      @keypress.esc="showContent = false"
      tabindex="0"
    >
      <transition name="modal" @after-leave="close">
        <div class="vue-modal-dialog" :class="modalSize" v-if="showContent">
          <div class="vue-modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <slot name="title"></slot>
              </h5>
              <button type="button" class="close" @click="showContent = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
const escapeHandler = (e) => {
  if (e.key === "Escape" && this.showContent) {
    this.showContent = false;
  }
};

export default {
  data() {
    return {
      showContent: false,
      open: false,
    };
  },
  props: {
    size: {
      validator: function (value) {
        // The value must match one of these strings
        return ["xs", "sm", "md", "lg"].indexOf(value) !== -1;
      },
      default: "lg",
    },
  },
  created() {
    document.addEventListener("keydown", escapeHandler);
  },
  mounted() {
    setTimeout(() => (this.open = true), 100);
    document.body.classList.add("no-scrollable");
  },
  unmounted() {
    document.removeEventListener("keydown", escapeHandler);
  },
  methods: {
    close() {
      document.body.classList.remove("no-scrollable");

      this.$emit("close");
    },
  },
  computed: {
    modalSize() {
      return "modal-" + this.size;
    },
  },
};
</script>

<style lang="scss">
.vue-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  overflow: auto;
  outline: 0;
  background: rgba(0, 0, 0, 0.8);

  .vue-modal-dialog {
    position: relative;
    width: auto;
    margin: 1rem auto;
    pointer-events: none;

    &.modal {
      &-xs {
        max-width: 300px;
      }
      &-sm {
        max-width: 450px;
      }
      &-md {
        max-width: 800px;
      }
      &-lg {
        max-width: 100%;
      }
    }

    .vue-modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      pointer-events: auto;
      background-color: #ffffff;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.3rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
      outline: 0;

      .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #e9ecef;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;
      }

      .modal-header .close {
        padding: 1rem;
        margin: -1rem -1rem -1rem auto;
      }

      .modal-title {
        margin-bottom: 0;
        line-height: 1.5;
      }

      .modal-body {
        position: relative;
        flex: 1 1 auto;
        padding: 1rem;
      }

      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        border-top: 1px solid #e9ecef;
      }

      .modal-footer > :not(:first-child) {
        margin-left: 0.25rem;
      }

      .modal-footer > :not(:last-child) {
        margin-right: 0.25rem;
      }
    }
  }
}

.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  .modal-dialog-centered {
    min-height: calc(100% - (1.75rem * 2));
  }
  .modal-content {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  }
}

.no-scrollable {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
