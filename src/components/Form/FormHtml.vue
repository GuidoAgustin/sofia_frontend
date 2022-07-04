<template>
  <div class="form-container">
    <label v-if="label">{{ label }}</label>
    <div class="formHtml" :class="{ 'mt-1': label !== null }">
      <trumbowyg v-model="resultHtml" :config="config" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
import Trumbowyg from "vue-trumbowyg";
import "trumbowyg/dist/ui/trumbowyg.css";

export default {
  components: {
    Trumbowyg,
  },
  props: {
    modelValue: {
      type: [String],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    config: {
      type: Object,
      default: () => ({
        btns: [
          ["viewHTML"],
          ["undo", "redo"], // Only supported in Blink browsers
          ["formatting"],
          ["strong", "em", "del"],
          ["superscript", "subscript"],
          ["link"],
          ["insertImage"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
          ["unorderedList", "orderedList"],
          ["horizontalRule"],
          ["removeformat"],
        ],
        semantic: {
          div: "div", // Editor does nothing on div tags now
        },
      }),
    },
  },
  data: () => ({
    resultHtml: null,
  }),
  watch: {
    resultHtml(val) {
      this.$emit("update:modelValue", val);
    },
  },
  mounted() {
    this.resultHtml = this.value;
  },
};
</script>

<style scoped></style>
