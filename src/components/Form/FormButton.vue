<template>
  <button
    v-if="!to"
    class="btn"
    :class="[
      { 'btn-block': block, 'btn-sm': small, disabled, 'btn-rounded': icon },
      `btn-${outlined ? 'outline-' : ''}${theme}`
    ]"
  >
    <slot />
  </button>

  <router-link
    v-else
    :to="to"
    class="btn"
    :class="[
      { 'btn-block': block, 'btn-sm': small, disabled, 'btn-rounded': icon },
      `btn-${outlined ? 'outline-' : ''}${theme}`
    ]"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    to: {
      type: [String, Object],
      default: null
    },
    block: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>
