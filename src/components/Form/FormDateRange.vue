<template>
  <v-date-picker
    v-model.range="date"
    :mode="dateTime ? 'dateTime' : 'date'"
    :is24hr="dateTime"
    :masks="masksValues"
    :popover="{ visibility: disabled ? 'hidden' : 'focus' }"
    :disabled-dates="disabledDates"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <div class="form-container" :class="{ disabled, 'flex-field': flexField }">
        <label>{{ label }}</label>

        <div class="d-grid grid-2-cols gap-2">
          <div class="form-wrapper">
            <div class="icon" v-if="!flexField">
              <i class="fa-solid fa-calendar-day"></i>
            </div>
            <input :value="inputValue.start" v-on="inputEvents.start" />
          </div>
          <div class="form-wrapper">
            <div class="icon" v-if="!flexField">
              <i class="fa-solid fa-calendar-day"></i>
            </div>
            <input :value="inputValue.end" v-on="inputEvents.end" />
          </div>
        </div>
      </div>
    </template>
  </v-date-picker>
</template>

<script>
import { parseToDate, parseToString } from '@/utils/date.js'

export default {
  props: {
    modelValue: {
      type: [Object],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dateTime: {
      type: Boolean,
      default: false
    },
    disabledDates: {
      type: Object,
      default: null
      // Example:
      // To Disabled Weekends: :disabled-dates='{ weekdays: [1, 7] }'
      // More info: https://vcalendar.io/disable-dates.html
    },
    flexField: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: null
  }),
  computed: {
    masksValues() {
      return {
        inputDateTime24hr: 'DD-MM-YYYY H:mm',
        input: 'DD-MM-YYYY'
      }
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.date = {
          start: parseToDate(val.start, this.dateTime),
          end: parseToDate(val.end, this.dateTime)
        }
      }
    },
    date: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.$emit('update:modelValue', { start: null, end: null })
          this.$emit('change', { start: null, end: null })
        } else {
          const { start, end } = value
          const newEmitting = {
            start: parseToString(start, this.dateTime),
            end: parseToString(end, this.dateTime)
          }

          const START_CHANGED = newEmitting.start && newEmitting.start !== this.modelValue?.start
          const END_CHANGED = newEmitting.end && newEmitting.end !== this.modelValue?.end

          if (START_CHANGED || END_CHANGED) {
            this.$emit('update:modelValue', newEmitting)
            this.$emit('change', newEmitting)
          }
        }
      }
    }
  }
}
</script>

<style></style>
