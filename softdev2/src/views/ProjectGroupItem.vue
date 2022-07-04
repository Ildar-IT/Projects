<template>

  <div class="project-group-item">
    <section class="project-group-item__intro">
      <v-container>
        <v-row>
          <v-col cols="12" sm="5" class="d-flex align-start justify-center mb-5">
            <img class="d-block" :src="item.image" :alt="item.h1">
          </v-col>
          <v-col cols="12" sm="7">
            <h1 class="text-center text-sm-start my-8 mb-sm-16 mt-sm-0">{{ item.h1 }}</h1>
            <div v-html="item.teaser"></div>
            <div v-if="!item.cols" v-html="item.text"></div>
            <div class="d-flex justify-end mt-10">
              <!--                <btn-link-outlined :to="{name: 'Contacts'}">Make request</btn-link-outlined>-->
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="item.cols" v-for="(col, index) in item.cols" :key="item.cols[index]" class="mb-8"
            :class="item.colClass">
            <div v-html="col" class="content"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <our-services-main v-if="isSubProjects"
                       v-for="(item, index) in items"
                       :key="item.name"
                       :items="item.projects"
                       :index="index"
                       :title="item.name"
                       :isSubProjects="isSubProjects"/>

    <ProjectsGroupItems v-if="!isSubProjects" v-for="(item, index) of items" :key="index"
                        :item="item"
                        :index="index"
                        :isSubProjects="isSubProjects"/>

    <section class="project-group-item__more">
      <v-container>
        <btn-link class="d-inline-flex mb-15" :linkLeft="true" :to="{name: 'Projects'}">{{btnText[0].title}}
        </btn-link>
      </v-container>
    </section>
  </div>
</template>

<script>
import Competencies from '@/views/About-us/competencies';
import OurServicesMain from '@/views/Home/our-services-main';
import ProjectsGroupItems from '@/views/Projects/project-group-items';
import BtnLink from "@/components/btn-link";

import ShowDown from "showdown";

const showdown = new ShowDown.Converter();

export default {
  name: "project-group-item",
  components: {
    Competencies,

    BtnLink,
    ProjectsGroupItems,
    OurServicesMain
  },
  props: ["code"],
  data() {
    return {
      isSubProjects: true
    }
  },
  computed: {
    item() {
      const item = this.$store.state.page?.item;
      if (!item) return {};
      const text = item.content;
      const cols = text ? text.split('<hr />').map(el => showdown.makeHtml(el)) : undefined;
      const colClass = cols && cols.length <= 2 ? "col-12 col-sm-6" : "col-12 col-md-4";
      const towerClass = cols && cols.length <= 2 ? "top" : "";
      return {
        h1: item.title,
        teaser: showdown.makeHtml(item.teaser),
        text: showdown.makeHtml(item.content),
        image: item.media?.url,
        image2: item.media2?.url,
        cols,
        colClass,
        towerClass
      }
    },
  //     computed: {
  //   items() {
  //     const text = this.$store.state.page?.aboutUsText;
  //     if (!text) return null;

  //     if (text.content) text.content = text.content.split('<hr />');

  //     const content = text.content.map(el => showdown.makeHtml(el))
  //     if (content.length <= 2) {
  //       this.colClass = "col-12 col-sm-6";
  //       this.towerClass = "top";
  //     }

  //     return {
  //       content: content,
  //       title: text.title,
  //       url: text.url
  //     };
  //   }
  // }
    items() {
      const projects = this.$store.state.page?.item?.projects;
      const subProjects = this.$store.state.page?.item?.project_sub_groups;

      if (!projects && !subProjects) return {};
      if (subProjects.length !== 0 && subProjects) {

        return subProjects.map(el => ({
          name: el.shorttitle,
          text: showdown.makeHtml(el.teaser),
          image: el.media?.url,
          projects: el.projects.map(item => (
                  {
                    name: item.shorttitle,
                    text: showdown.makeHtml(item.teaser),
                    image: item.media?.url,
                    to: {name: "ProjectItem", params: {projectcode: item.url}}
                  })),
          to: {name: "ProjectSubGroupItem", params: {subcode: el.url}}
        }))
      }
      this.isSubProjects = false;
      return projects.map(el => ({
        name: el.shorttitle,
        text: showdown.makeHtml(el.teaser),
        image: el.media?.url,
        to: {name: "ProjectItem", params: {projectcode: el.url}}
      }))
    },
    btnText() {
      return this.$store.state.common?.buttonsText.filter(el => el.uid === "home_projects");
    }
  }
}
</script>

<style lang="scss">
.project-group-item {
  &__intro {
    padding: 104px 0 60px;
    @include up($sm) {
      padding: 120px 0 60px 0;
    }

    @include up($md) {
      padding: 170px 0 120px;
    }
    @include up($lg) {
      padding: 200px 0 120px;
    }
  }

  &__text {
    padding: 60px 0;
    @include up($lg) {
      padding: 120px 0;
    }
  }

  &__intro, &__text {
    img {
      object-fit: contain;
      width: 240px;
      height: 240px;

      @include up($sm) {
        width: 320px;
        height: 320px;
      }
      @include up($md) {
        width: 450px;
        height: 450px;
      }
      @include up($lg) {
        width: 570px;
        height: 570px;
      }
    }

    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 15px;

      &::before {
        content: "";
        display: block;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        position: absolute;
        width: 10px;
        height: 10px;
        background: #88B6FB;
      }
    }
  }

  &__head {
    padding: 95px 0 60px;
    @include up($sm) {
      padding: 85px 0;
    }
    @include up($md) {
      padding: 130px 0 100px;
    }
    @include up($lg) {
      padding: 250px 0 200px;
    }
  }


  p {
    color: $black !important;
  }

  &__wrapper {
    padding-bottom: 70px;
    @include up($sm) {
      padding-bottom: 135px;
    }
    @include up($md) {
      padding-bottom: 160px;
    }
    @include up($lg) {
      padding-bottom: 270px;
    }
  }

}


</style>
