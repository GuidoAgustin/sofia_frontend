<template>
  <div class="row">
    <div class="col">
      <Widget>
        <Tabs :tabs="tabs" @change="onTabChange">
          <template #header> <h4>TABS HEADER</h4> </template>
          <template #tabs-pane-1> Pane 1 </template>
          <template #tabs-pane-2> Pane 2 </template>
          <template #tabs-pane-3> Pane 3 </template>
          <template #tabs-pane-4> Pane 4 </template>
          <template #tabs-pane-5> Pane 5 </template>
        </Tabs>
      </Widget>
    </div>
  </div>
</template>

<script>
import Widget from '@/components/Widget.vue'
import Tabs from '@/components/Tabs/Tabs.vue'

export default {
  components: {
    Widget,
    Tabs
  },
  data: () => ({
    tabs: [
      { title: 'Bookings', icon: 'fa fa-home' },
      { title: 'Properties', icon: 'fa fa-gears' },
      'Landlords',
      'Rooms',
      'Beds'
    ]
  }),
  methods: {
    onTabChange(tab) {
      console.log('tab has changed', tab)
    }
  }
}
</script>
