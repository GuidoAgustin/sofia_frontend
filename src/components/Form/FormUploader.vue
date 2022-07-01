<template>
  <div
    class="form-container form-uploader"
    :class="{ disabled }"
    @click="launchFilePicker"
  >
    <slot>
      <label>{{ label }}</label>
      <button class="btn btn-primary btn-block">Subir {{ label }}</button>
    </slot>
    <input type="file" @change="fileSelected" ref="fileInput" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Object, File, String],
      default: () => ({}),
    },
    label: {
      type: String,
      default: "File",
    },
    maxSize: {
      type: Number,
      default() {
        return 1024 * 2; // 2 MB
      },
    },
    pdfType: {
      type: Boolean,
      default: false,
    },
    imageType: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tooBigErrorMsg: {
      type: String,
      default: "The file max size is {maxSize} MB",
    },
  },
  computed: {
    tooBigMsg() {
      if (this.tooBigErrorMsg.includes("{maxSize}")) {
        return this.tooBigErrorMsg.replace(
          "{maxSize}",
          (this.maxSize / 1024).toFixed(2)
        );
      }
      return this.tooBigErrorMsg;
    },
    acceptedType() {
      if (this.imageType || this.pdfType) {
        return this.imageType ? "image" : "pdf";
      }

      return null;
    },
  },
  methods: {
    launchFilePicker() {
      if (this.disabled) return;
      this.$refs.fileInput.click();
    },
    fileSelected(evt) {
      // const fieldName = evt.target.name;
      const file = evt.target.files;
      const { maxSize } = this;

      // check if user actually selected a file
      if (file.length > 0) {
        const uploadedFile = file[0];
        const size = uploadedFile.size / maxSize / maxSize;

        // Check file type
        if (this.acceptedType) {
          if (
            this.acceptedType === "image" &&
            !uploadedFile.type.match("image.*")
          ) {
            // check whether the upload is an image
            this.$emit("error", "The file uploaded is not an image");
            return;
          }
          if (
            this.acceptedType === "pdf" &&
            !uploadedFile.type.match("application/pdf")
          ) {
            // check whether the upload is an image
            this.$emit("error", "The file uploaded is not a PDF");
            return;
          }
        } else if (
          !uploadedFile.type.match("image.*") &&
          !uploadedFile.type.match("application/pdf")
        ) {
          // check whether the upload is an image
          this.$emit("error", "The file uploaded is not a PDF or an Image");
          return;
        }

        // check whether the size is greater than the size limit
        if (size > 1) {
          this.$emit("error", this.tooBigMsg);
        } else {
          this.$emit("update:modelValue", uploadedFile);
          this.$emit("onChange", {
            file: uploadedFile,
            url: URL.createObjectURL(uploadedFile),
          });
        }
      }
    },
  },
};
</script>

<style scoped>
input {
  display: none;
}
</style>
