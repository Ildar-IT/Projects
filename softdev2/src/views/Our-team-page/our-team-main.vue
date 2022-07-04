<template>
  <section class="our-team-main">
    <img class="d-sm-none" src="@/assets/Our-team-page/bg-lg.jpg" alt="Our Team">
    <img class="d-none d-sm-block" src="@/assets/Our-team-page/bg-lg.jpg" alt="Our Team">
    <h1 class="white--text">Our team</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <p >
            The strong team of best-of-breed professionals.
            Rendering services to the customers for over 18 years.
          </p>
          <p >
            Situated in St.Petersburg, a big European city that is well-known
            for its educational establishments with respectable traditions,
            SoftDev enjoys a unique opportunity of hiring the best and the brightest.
          </p>
          <p >
            Our engineers’ approach to problem-solving is both innovative and result-oriented. This makes the engineering
            team of SoftDev well-armed for solving problems of any level of complexity.
          </p>
          <p>
            Our R&D Division is an exceptional group of
            self-motivated and highly-skilled software engineers,
            who have diverse background and possess many years of experience in creating
            software applications for various areas: Computer Aided Design, Graphic
            applications, Graphic File Conversion, Database,
            Project Management applications, Internet/Intranet and Web-based applications.
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <p>
            Development Support Division has a skilled Quality
            Assurance team, which employs
            standard procedures of program testing as well as automated testing.
          </p>
          <p >
            Localization and Release Engineering team provides localization of products to
            any European or Asian language, using DBCS and Unicode technologies.
          </p>
          <p>
            Content creation team ensures that the applications have
            the necessary content (templates, samples, symbol libraries, etc.)
            This team has vast experience in creating 3D images using 3D Studio Max.
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="d-none d-md-block">
          <p>
            Localization and Release Engineering team provides
            localization of products to any
            European or Asian language, using DBCS and Unicode technologies.
          </p>
          <p>
            Content creation team ensures that the applications have
            the necessary content (templates, samples, symbol libraries, etc.)
            This team has vast experience in creating 3D images using 3D Studio Max.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "our-team-main"
}
</script>

<style lang="scss">
.our-team-main {
  position: relative;
  h1 {
    position: absolute;
    top: 510px;
    left: 24px;
    @include up($sm) {
      top: 80px;
      left: 30px;
    }
    @include up($md) {
      top: 140px;
      left: 50px;
    }
  }

  .row {
    padding: 60px 0;
    @include up($sm) {
      padding: 80px 0;
    }
    @include up($md) {
      padding: 100px 0;
    }
  }
  img {
    width: 100%;
    height: 584px;
    max-height: 584px;
    object-fit: cover;
    @include up($sm) {
      height: auto;
      max-height: 1120px;
    }

  }

}
</style>