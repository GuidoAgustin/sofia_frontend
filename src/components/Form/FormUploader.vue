<template>
  <div :class="{ disabled }" @click="launchFilePicker">
    <slot>
      <div class="form-container form-uploader">
        <label>{{ label }}</label>
        <button class="btn btn-primary btn-sm btn-block">
          {{ buttonText }}
        </button>
      </div>
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
    buttonText: {
      type: String,
      default: "Upload File",
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
    videoType: {
      type: Boolean,
      default: false,
    },
    xlsType: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tooBigErrorMsg: {
      type: String,
      default: "El archivo no puede pesar mas de {maxSize}MB",
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
    acceptedTypes() {
      if (
        !this.imageType &&
        !this.pdfType &&
        !this.videoType &&
        !this.xlsType
      ) {
        return [
          {
            accepted: true,
            mime: "image.*",
            error: "una Imagen",
          },
          {
            accepted: true,
            mime: "application/pdf",
            error: "un PDF",
          },
          {
            accepted: true,
            mime: "video.*",
            error: "un Video",
          },
          {
            accepted: true,
            mime: "sheet",
            error: "un XLS",
          },
        ];
      }

      let types = [];

      if (this.imageType) {
        types.push({
          accepted: true,
          mime: "image.*",
          error: "una Imagen",
        });
      }

      if (this.pdfType) {
        types.push({
          accepted: true,
          mime: "application/pdf",
          error: "un PDF",
        });
      }

      if (this.videoType) {
        types.push({
          accepted: true,
          mime: "video.*",
          error: "un Video",
        });
      }

      if (this.xlsType) {
        types.push({
          accepted: true,
          mime: "sheet",
          error: "un XLS",
        });
      }

      return types;
    },
  },
  methods: {
    launchFilePicker() {
      if (this.disabled) return;
      this.$refs.fileInput.click();
    },
    fileSelected(evt) {
      if (!evt.target.files.length) return;

      const uploadedFile = evt.target.files[0];

      // Check file type
      if (!this.checkFileType(uploadedFile.type)) return;

      // check whether the size is greater than the size limit
      if (!this.checkFileSize(uploadedFile.size)) return;

      this.$emit("update:modelValue", uploadedFile);
      this.$emit("onChange", {
        file: uploadedFile,
        url: URL.createObjectURL(uploadedFile),
      });
    },

    // check type match with at least 1 of the accepted mimetypes
    checkFileType(type) {
      let valid = false;
      let errors = [];

      console.log(type);

      for (const acceptedType of this.acceptedTypes) {
        if (!type.match(acceptedType.mime)) {
          errors.push(acceptedType.error);
        } else {
          valid = true;
        }
      }

      if (!valid) {
        this.$toast.error(`El archivo no es ${errors.join(" o ")}`);
      }

      return valid;
    },
    checkFileSize(fileSize) {
      const size = fileSize / this.maxSize / this.maxSize;

      if (size > 1) {
        this.$toast.error(this.tooBigMsg);
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
input {
  display: none;
}
</style>
