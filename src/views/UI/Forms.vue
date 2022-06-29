<template>
  <h1>DASHBOARD</h1>
  <div class="row">
    <div class="col-md-4">
      <Widget>
        <template #title>Form Text</template>

        <FormText v-model="text" label="Texto" icon="fa-solid fa-equals" />
        <FormText
          v-model="text"
          label="Texto"
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
          label="Telefono"
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
          label="Opciones"
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
        <FormUploader disabled @onChange="selFile = $event" label="Archivo" />
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
        <FormDate v-model="date" disabled label="Date" />
        <p>Date: {{ date }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Switch</template>

        <FormSwitch v-model="switched" label="Boolean" />
        <FormSwitch v-model="switched" disabled label="Boolean" />
        <p>Value: {{ switched }}</p>
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

export default {
  components: {
    Widget,
    FormText,
    FormNumber,
    FormSelect,
    FormUploader,
    FormDate,
    FormSwitch,
  },
  data: () => ({
    number: null,
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
  }),
};
</script>
