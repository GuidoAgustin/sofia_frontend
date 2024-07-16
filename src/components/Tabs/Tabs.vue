<template>
  <div class="tabs">
    <div class="tabs-head" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="tabs-nav">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="btn"
        :class="[
          {
            [`active`]: isActivePanel(item)
          }
        ]"
        @click="switchPanel(item)"
      >
        <div class="icon" v-if="item.icon">
          <i :class="item.icon"></i>
        </div>
        {{ item?.title || item }}
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="tabs-body">
        <template v-for="(item, index) in tabs">
          <template v-if="isActivePanel(tabs[index])">
            <div :key="index" class="tabs-pane" :class="getTabContent(index + 1)">
              <slot :name="getTabContent(index + 1)"> NO CONTENT TAB </slot>
            </div>
          </template>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    theme: {
      type: String,
      default: 'white'
    }
  },
  emits: ['change'],
  data() {
    return {
      activePanel: this.tabs[0]
    }
  },
  computed: {},
  methods: {
    switchPanel(panel) {
      this.activePanel = panel
      this.$emit('change', panel)
    },
    isActivePanel(panel) {
      return (this.activePanel?.title || this.activePanel) === (panel?.title || panel)
    },
    getTabContent(index) {
      return `tabs-pane-${index}`
    }
  }
}
</script>
