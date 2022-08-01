<template>
  <v-date-picker
    v-model="date"
    :mode="dateTime ? 'dateTime' : 'date'"
    :is24hr="dateTime"
    :masks="masksValues"
    :popover="{ visibility: disabled ? 'hidden' : 'hover-focus' }"
    :disabled-dates="disabledDates"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <div v-on="inputEvents">
        <FormText
          :modelValue="inputValue"
          :label="label"
          :disabled="disabled"
          icon="fa-solid fa-calendar-day"
        />
      </div>
    </template>
  </v-date-picker>
</template>

<script>
import moment from "moment";
import FormText from "./FormText.vue";

export default {
  components: {
    FormText,
  },
  props: {
    modelValue: {
      type: [moment, String],
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dateTime: {
      type: Boolean,
      default: false,
    },
    disabledDates: {
      type: Object,
      default: null,
      // Example:
      // To Disabled Weekends: :disabled-dates='{ weekdays: [1, 7] }'
      // More info: https://vcalendar.io/disable-dates.html
    },
  },
  data: () => ({
    date: null,
  }),
  computed: {
    masksValues() {
      return {
        inputDateTime24hr: "DD-MM-YYYY H:mm",
        input: "DD-MM-YYYY",
      };
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        let newDate = null;
        if (val && val instanceof moment) {
          newDate = val;
          if (!this.dateTime) newDate = newDate.startOf("day");
          newDate = newDate.toDate();

          if (!this.date || this.date.getTime() !== newDate.getTime()) {
            this.date = newDate;
          }
          return;
        }

        if (val && typeof val === "string") {
          const dateReg = /^\d{4}-\d{2}-\d{2}$/; // Regex for YYYY-MM-DD
          const dateRegLatin = /^\d{2}-\d{2}-\d{4}$/; // Regex for DD-MM-YYYY
          const dateTime = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/; // Regex for YYYY-MM-DD HH:mm
          const dateTimeLatin = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/; // Regex for DD-MM-YYYY HH:mm

          if (val.match(dateReg)) {
            newDate = moment(val).startOf("day").toDate();
          } else if (val.match(dateRegLatin)) {
            newDate = moment(val, "DD-MM-YYYY").startOf("day").toDate();
          } else if (val.match(dateTime)) {
            newDate = moment(val, "DD-MM-YYYY HH:mm").toDate();
          } else if (val.match(dateTimeLatin)) {
            newDate = moment(val, "DD-MM-YYYY HH:mm").toDate();
          } else {
            newDate = moment(val).toDate();
          }

          if (!this.date || this.date.getTime() !== newDate.getTime()) {
            this.date = newDate;
          }

          return;
        }
        this.date = null;
      },
    },
    date: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.$emit("update:modelValue", null);
          this.$emit("change", null);
        } else {
          const newEmitting = moment(value);

          if (!this.dateTime) newEmitting.startOf("day");

          if (
            !this.value ||
            !(this.value instanceof moment) ||
            !newEmitting.isSame(this.value)
          ) {
            this.$emit("update:modelValue", newEmitting);
            this.$emit("change", newEmitting);
          }
        }
      },
    },
  },
};
</script>

<style></style>
