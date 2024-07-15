<template>
  <div :class="{ disabled }" @click="launchFilePicker">
    <slot>
      <div class="form-container form-uploader" :class="{ 'flex-field': flexField }">
        <label>{{ label }}</label>

        <div class="form-wrapper">
          <button class="btn btn-primary btn-sm btn-block">
            {{ buttonText }}
          </button>

          <div>
            <small v-if="file">{{ file.name }} ({{ (file.size / 1024).toFixed(2) }}kb)</small>
          </div>
        </div>
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
      default: () => ({})
    },
    label: {
      type: String,
      default: 'File'
    },
    buttonText: {
      type: String,
      default: 'Upload File'
    },
    maxSizeMB: {
      type: Number,
      default() {
        return 2 // 2 MB
      }
    },
    pdfType: {
      type: Boolean,
      default: false
    },
    imageType: {
      type: Boolean,
      default: false
    },
    videoType: {
      type: Boolean,
      default: false
    },
    xlsType: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    flexField: {
      type: Boolean,
      default: false
    },
    tooBigErrorMsg: {
      type: String,
      default: 'El archivo no puede pesar mas de {maxSize}MB'
    }
  },
  data: () => ({
    file: null
  }),
  computed: {
    tooBigMsg() {
      if (this.tooBigErrorMsg.includes('{maxSize}')) {
        return this.tooBigErrorMsg.replace('{maxSize}', this.maxSizeMB.toFixed(2))
      }
      return this.tooBigErrorMsg
    },
    acceptedTypes() {
      if (!this.imageType && !this.pdfType && !this.videoType && !this.xlsType) {
        return [
          {
            accepted: true,
            mime: 'image.*',
            error: 'una Imagen'
          },
          {
            accepted: true,
            mime: 'application/pdf',
            error: 'un PDF'
          },
          {
            accepted: true,
            mime: 'video.*',
            error: 'un Video'
          },
          {
            accepted: true,
            mime: 'sheet',
            error: 'un XLS'
          }
        ]
      }

      let types = []

      if (this.imageType) {
        types.push({
          accepted: true,
          mime: 'image.*',
          error: 'una Imagen'
        })
      }

      if (this.pdfType) {
        types.push({
          accepted: true,
          mime: 'application/pdf',
          error: 'un PDF'
        })
      }

      if (this.videoType) {
        types.push({
          accepted: true,
          mime: 'video.*',
          error: 'un Video'
        })
      }

      if (this.xlsType) {
        types.push({
          accepted: true,
          mime: 'sheet',
          error: 'un XLS'
        })
      }

      return types
    }
  },
  methods: {
    launchFilePicker() {
      if (this.disabled) return
      this.$refs.fileInput.click()
    },
    fileSelected(evt) {
      if (!evt.target.files.length) return

      this.file = evt.target.files[0]
      // Check file type
      if (!this.checkFileType(this.file.type)) return

      // check whether the size is greater than the size limit
      if (!this.checkFileSize(this.file.size)) return

      this.$emit('update:modelValue', this.file)
      this.$emit('onChange', {
        file: this.file,
        url: URL.createObjectURL(this.file)
      })
    },

    // check type match with at least 1 of the accepted mimetypes
    checkFileType(type) {
      let valid = false
      let errors = []

      for (const acceptedType of this.acceptedTypes) {
        if (!type.match(acceptedType.mime)) {
          errors.push(acceptedType.error)
        } else {
          valid = true
        }
      }

      if (!valid) {
        this.$toast.error(`El archivo no es ${errors.join(' o ')}`)
      }

      return valid
    },
    checkFileSize(fileSize) {
      const sizeMB = fileSize / (1024 * 1024)

      if (sizeMB > this.maxSizeMB) {
        this.$toast.error(this.tooBigMsg)
        return false
      }

      return true
    }
  }
}
</script>

<style scoped>
input {
  display: none;
}
</style>
