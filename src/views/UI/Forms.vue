<template>
  <div class="row">
    <div class="col-md-4">
      <Widget>
        <template #title>Form Autocomplete</template>

        <FormAutocomplete
          :options="ac_options_filtered"
          @onSearch="acGetter"
          @onSelectOption="onSelectOption"
          label="Autocomplete"
        />

        <p>Value: {{ ac_result }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Text</template>

        <FormText v-model="text" label="Texto" icon="fa-solid fa-equals" />
        <FormText
          v-model="text"
          label="Texto **disabled**"
          disabled
          icon="fa-solid fa-equals"
        />
        <p>Texto: {{ text }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Number</template>

        <FormNumber
          v-model="number"
          label="Telefono"
          icon="fa-solid fa-phone"
        />
        <FormNumber
          v-model="number"
          label="Telefono **disabled**"
          disabled
          icon="fa-solid fa-phone"
        />
        <p>Numero: {{ number }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Select</template>

        <FormSelect
          v-model="selOpt"
          label="Opciones"
          :options="options"
          icon="fa-solid fa-phone"
        />
        <FormSelect
          v-model="selOpt"
          label="Opciones **disabled**"
          disabled
          :options="options"
          icon="fa-solid fa-phone"
        />
        <p>Sel Opt: {{ selOpt }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Uploader</template>

        <FormUploader @onChange="selFile = $event" label="Archivo" />
        <FormUploader
          disabled
          @onChange="selFile = $event"
          label="Archivo **disabled**"
        />
        <img
          :src="selFile?.url || 'http://via.placeholder.com/300'"
          alt=""
          style="
            max-width: 100%;
            max-height: 250px;
            margin: 1em auto 0em;
            display: block;
          "
        />
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Date</template>

        <FormDate v-model="date" label="Date" />
        <FormDate v-model="date" disabled label="Date **disabled**" />
        <p>Date: {{ date }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Switch</template>

        <FormSwitch v-model="switched" label="Boolean" />
        <FormSwitch v-model="switched" disabled label="Boolean **disabled**" />
        <p>Value: {{ switched }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form HTML</template>

        <FormHtml v-model="html" label="HTML" />
        <p>Value: {{ html }}</p>
      </Widget>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget.vue";
import FormText from "@/components/Form/FormText.vue";
import FormNumber from "@/components/Form/FormNumber.vue";
import FormSelect from "@/components/Form/FormSelect.vue";
import FormUploader from "@/components/Form/FormUploader.vue";
import FormDate from "@/components/Form/FormDate.vue";
import FormSwitch from "@/components/Form/FormSwitch.vue";
import FormHtml from "@/components/Form/FormHtml.vue";
import FormAutocomplete from "@/components/Form/FormAutocomplete.vue";

export default {
  components: {
    Widget,
    FormText,
    FormNumber,
    FormSelect,
    FormUploader,
    FormDate,
    FormSwitch,
    FormHtml,
    FormAutocomplete,
  },
  data: () => ({
    number: null,
    html: null,
    text: null,
    selOpt: null,
    selFile: null,
    date: null,
    switched: false,
    options: [
      {
        value: 1,
        name: "Opt 1",
      },
      {
        value: 2,
        name: "Opt 2",
      },
    ],
    ac_options: [
      { id: 1, name: "Crock Pot Roast" },
      { id: 2, name: "Roasted Asparagus" },
      { id: 3, name: "Curried Lentils and Rice" },
      { id: 4, name: "Big Night Pizza" },
      { id: 5, name: "Cranberry and Apple Stuffed Acorn Squash Recipe" },
      { id: 6, name: "Mic's Yorkshire Puds" },
      { id: 7, name: "Old-Fashioned Oatmeal Cookies" },
      { id: 8, name: "Blueberry Oatmeal Squares" },
      { id: 9, name: "Curried chicken salad" },
    ],
    ac_options_filtered: [],
    ac_result: null,
  }),
  methods: {
    // Function to filter ac_options
    // Or to send a search to an API
    acGetter(search) {
      console.log("acGetter", search);
      this.ac_options_filtered = this.ac_options.filter((x) =>
        x.name.match(search)
      );
    },
    onSelectOption(event) {
      this.ac_result = event;
    },
  },
};
</script>
