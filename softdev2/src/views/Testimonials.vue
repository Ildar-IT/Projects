<template>
    <section class="testimonials">
        <v-container>
            <v-row>
                <v-col cols="12" md="5">
                    <h1>
                        Approved by experts
                    </h1>
                </v-col>
            </v-row>
            <v-row class="testimonials__text">
                <v-col cols="12" sm="6" md="4">
                    <p>
                        SoftDev's resume includes a wide range of projects – from professional systems to personal
                        applications
                        delivered to you by unique team of software architects, engineers and developers.
                    </p>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <p>
                        Our team members have extensive experience, diverse skills and backgrounds providing virtually
                        endless
                        capabilities to design and implement existing and emerging technology.
                    </p>
                </v-col>
                <v-col cols="12" md="4"/>
            </v-row>

            <ul>
                <li v-for="(item, index) of items" :key="index">
                    <v-row class="align-sm-center">
                        <v-col cols="12" sm="6" lg="7">
                            <img :src="item.img" class="mb-8 d-sm-none">
                            <img :src="item.imgSM" class="d-none d-sm-block d-md-none mb-8">
                            <img :src="item.imgMD" class="d-none d-md-block d-lg-none">
                            <img :src="item.imgLG" class="d-none d-lg-block">
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="4" class="ml-md-auto">
                            <h3 class="mb-8 mb-sm-10">{{ item.head }}</h3>
                            <p class="mb-8">{{ item.text }}</p>
                            <p>{{ item.author }}
                                <span class="d-block">{{ item.job }}</span>
                                <span class="d-block">{{ item.company }}</span>
                            </p>
                        </v-col>
                    </v-row>
                </li>
            </ul>
        </v-container>
    </section>
</template>

<style lang="scss">
.testimonials {
    padding: 88px 0 60px;
    background-color: $bg;
    text-align: left;
    @include up($md) {
        padding: 200px 0 60px;
    }
    @include up($lg) {
        padding: 240px 0 60px;
    }

    h1 {
        margin-bottom: 32px;
        text-align: center;
        @include up($md) {
            text-align: left;
            margin-bottom: 70px;
        }
    }

    p {
        color: $black;
    }

    img {
        width: 100%;
    }

    span {
        font-size: 12px;
        line-height: 150%;
    }

    li {
        padding: 40px 0 60px;
    }

    &__text {
        margin-bottom: 60px;
        @include up($md) {
            margin-bottom: 150px;
        }
    }

    .case {
        h2 {
            color: $primary-2;
            background: none;
            -webkit-text-fill-color: unset;
        }
    }

    body .layout-main footer img {
        display: none !important;
    }
}

</style>

<script>

export default {
    name: 'Testimonials',
    data() {
        return {
            items: [
                {
                    img: require('@/assets/Testimonials/john-xs.jpg'),
                    imgSM: require('@/assets/Testimonials/john-sm.jpg'),
                    imgMD: require('@/assets/Testimonials/john-md.jpg'),
                    imgLG: require('@/assets/Testimonials/john-lg.jpg'),
                    head: '“The level of technical depth is top notch”',
                    text: '“SoftDev delivers highly technical solutions with consistent quality. The level of technical depth — specifically in the areas of mathematics and Computer aided design — is top notch.”',
                    author: 'John Oberon,',
                    job: 'VP Engineering at Mashery',
                    company: 'Intel Company'
                },
                {
                    img: require('@/assets/Testimonials/doug-xs.jpg'),
                    imgSM: require('@/assets/Testimonials/doug-sm.jpg'),
                    imgMD: require('@/assets/Testimonials/doug-md.jpg'),
                    imgLG: require('@/assets/Testimonials/doug-lg.jpg'),
                    head: '“It is my pleasure to highly recommend the services of SoftDev”',
                    text: '“It is my pleasure and without any hesitation to highly recommend the programming services of SoftDev. We have used their services for over 2 decades of outstanding software development work. Their entire team of management and engineering staff is top-notch, courteous, and very experienced, which attests not only to the success of their company, but also to the success of the software products they deliver to us.”',
                    author: 'Doug Cochran,',
                    job: 'CTO at IMSI/Design',
                    //company: 'Intel Company'
                },
                {
                    img: require('@/assets/Testimonials/alex-xs.jpg'),
                    imgSM: require('@/assets/Testimonials/alex-sm.jpg'),
                    imgMD: require('@/assets/Testimonials/alex-md.jpg'),
                    imgLG: require('@/assets/Testimonials/alex-lg.jpg'),
                    head: '“SoftDev is a team of very experienced professionals”',
                    text: '“SoftDev is a team of very experienced professionals who love the projects they work on. They are always ready to help the customer and take full care of the project at any stage of development from the initial requirements and world class engineering to everyday support and maintenance.”',
                    author: 'Alexander Denisov,',
                    job: 'Computer systems manager',
                    company: 'Fourth Dimension Software'
                },
            ]
        }
    }
}
</script>