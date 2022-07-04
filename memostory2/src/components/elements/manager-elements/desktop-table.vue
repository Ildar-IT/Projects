<template>
  <v-card class="desktop-table card-light mx-auto" :elevation="0">
    <v-simple-table class=" pa-lg-16 pa-8">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left py-6">
            <h6 class="grey-text">ФИО</h6>
          </th>
          <th class="text-left py-6">
            <h6 class="grey-text">Статус</h6>
          </th>
          <th class="text-right py-6">
            <h6 class="grey-text">Обновлено</h6>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(object, index) in items" :key="object.index" @click="onItemClick('manager-object')">
          <td class="text-left body-1 py-5">{{ object.initials }}</td>
          <td class="text-left body-1 py-5">
            <span :style="object.isCarried?'':'color:#BE4E4E'">{{object.isCarried? 'Забота оказана':'Требует заботы'}}</span>
          </td>
          <td class="text-right body-1 py-5">{{ object.lastReportDate }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "desktop-table",
  props: ['items'],
  methods:{
    onItemClick(routeName){
      this.$emit('onItemClick', routeName)
    }
  }
}
</script>

<style lang="scss">
.desktop-table{
  background-color: inherit;
tr{
  cursor: pointer;
}
}
.card-light{
  max-width: 845px;
  width: 100%;
}
</style>
