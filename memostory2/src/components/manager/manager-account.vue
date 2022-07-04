<template>
  <div class="manager-account margin-top-main px-4 text-center">
    <div class="manager-account__bg">
      <svgicon name="dandelion-cut" original color="#ECE3CF"/>
    </div>
    <div class="manager-account__wrapper">
      <h2 class="beige-text text-center margin-bottom-small">
        Личный кабинет менеджера
      </h2>
      <p class="body-1 grey-text mb-8 mb-md-16">
        Ваши объекты
      </p>
      <!--Desktop table-->
      <!--      <v-card class="card-light mx-auto" :elevation="0">
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
                  v-for="(object, index) in memories" :key="object.index" @click="goToObject">
                    <td class="text-left body-1 py-5">{{ object.initials }}</td>
                    <td class="text-left body-1 py-5">
                      <span :style="object.isCarried?'':'color:#BE4E4E'">{{object.isCarried? 'Забота оказана':'Требует заботы'}}</span>
                    </td>
                    <td class="text-right body-1 py-5">{{ object.lastReportDate }}</td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>-->
      <desktop-table :items="memories" @onItemClick="goToObject" class="manager-account__desktop-table"/>


      <!--Mobile table-->
      <v-card class="manager-account__mobile-table mobile-table card-light mx-auto pa-8" :elevation="0">
        <div v-for="(object, index) in memories" :key="index" class="mobile-table__cell text-left grey-text"
        @click="goToObject('manager-object')">
          <h6 class="grey-text">ФИО</h6>
          <div class="mb-4">
            <span class="body-1">{{ object.initials }}</span>
          </div>
          <h6 class="grey-text">Статус</h6>
          <div class="mb-4">
            <span class="body-1" :style="object.isCarried?'':'color:#BE4E4E'">
            {{ object.isCarried ? 'Обслужено' : 'Требует заботы' }}
          </span>
          </div>
          <h6 class="grey-text">Обновлено</h6>
          <div>
            <span class="body-1">{{ object.lastReportDate }}</span>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import desktopTable from '../elements/manager-elements/desktop-table'

export default {
  name: 'manager-account',
  components: {desktopTable},

  computed: {
    memories() {
      return this.$store.state.memories;
    }
  },
  methods: {
    goToObject(routeName) {
      this.$router.push({name: `${routeName}`})
    }
  }
}
</script>

<style lang="scss">
.manager-account {
  position: relative;

  &__bg {
    position: fixed;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &__wrapper {
    position: relative;
    z-index: 1;
  }

  &__desktop-table {
    display: none;
    @include up($sm) {
      display: block;
    }
  }

  &__mobile-table {
    display: block;
    @include up($sm) {
      display: none;
    }
  }


}
</style>
