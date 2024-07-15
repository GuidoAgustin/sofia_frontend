<template>
  <div class="row">
    <div class="col-md-4">
      <Widget>
        <template #title>Form Combobox</template>

        <UsersCombobox v-model="selectedUser" label="Users combo no icon" />
        <UsersCombobox v-model="selectedUser" label="Users combo disabled" disabled />
        <UsersCombobox v-model="selectedUser" label="Users combo" icon="fa fa-users" />
        <UsersCombobox v-model="selectedUser" label="Users combo 2" icon="fa fa-users" flex-field />

        <p>Value: {{ selectedUser }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Text</template>

        <FormText v-model="text" label="Texto" icon="fa-solid fa-equals" />
        <FormText v-model="text" label="Texto no icon" />
        <FormText v-model="text" label="Texto no icon" maxChars="25" />
        <FormText v-model="text" label="Texto **disabled**" disabled icon="fa-solid fa-equals" />
        <p>Texto: {{ text }}</p>
      </Widget>
    </div>
    <div class="col-md-4">
      <Widget>
        <template #title>Form Number</template>

        <FormNumber v-model="number" label="Telefono" icon="fa-solid fa-phone" />
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

        <FormSelect v-model="selOpt" label="Opciones" :options="options" icon="fa-solid fa-phone" />
        <FormSelect v-model="selOpt" label="Opciones no icon" :options="options" />
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
        <FormUploader disabled @onChange="selFile = $event" label="Archivo **disabled**" />
        <img
          :src="selFile?.url || 'http://via.placeholder.com/300'"
          alt=""
          style="max-width: 100%; max-height: 250px; margin: 1em auto 0em; display: block"
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
        <FormSwitch v-model="switched" label="Boolean small" small />
        <FormSwitch v-model="switched" disabled label="Boolean **disabled**" />
        <p>Value: {{ switched }}</p>
      </Widget>
    </div>
  </div>
</template>

<script>
import Widget from '@/components/Widget.vue'
import FormText from '@/components/Form/FormText.vue'
import FormNumber from '@/components/Form/FormNumber.vue'
import FormSelect from '@/components/Form/FormSelect.vue'
import FormUploader from '@/components/Form/FormUploader.vue'
import FormDate from '@/components/Form/FormDate.vue'
import FormSwitch from '@/components/Form/FormSwitch.vue'
// import FormHtml from '@/components/Form/FormHtml.vue'
import UsersCombobox from '@/components/Comboboxes/UsersCombobox.vue'

export default {
  components: {
    Widget,
    FormText,
    FormNumber,
    FormSelect,
    FormUploader,
    FormDate,
    FormSwitch,
    // FormHtml,
    UsersCombobox
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
        name: 'Opt 1'
      },
      {
        value: 2,
        name: 'Opt 2'
      }
    ],
    selectedUser: { value: 1, label: 'John Smith' }
  })
}
</script>
