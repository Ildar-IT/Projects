<template>
	<div class="margin-top-main padding-bottom-main text-center reports">
		<v-container>
			<template v-if="reports && reports.length">
				<h2 class="beige-text margin-bottom-main">{{ pageContent.titleReports ? pageContent.titleReports : "Отчёты о заботе"}} </h2>

				<v-row class="flex-column justify-center align-center">
					<v-col v-for="(report, index) in reports" :key="index" cols="12" sm="8" md="6" lg="5">
						<report-card :report="report" :place="placeOfReport(report)"/>
					</v-col>
				</v-row>

			</template>
			<template v-else>
				<h2 class="beige-text mb-md-8 mb-4">{{ pageContent.titleReports ? pageContent.titleReports :
					"Отчеты"}}</h2>
				<p class="body-1"> {{ pageContent.placeholder ? pageContent.placeholder : "Здесь будут отчеты."}}</p>
				<add-field class="mx-auto"/>
			</template>
		</v-container>
	</div>
</template>

<script>
    import addField from '@/components/elements/account-elements/add-field';
    import reportCard from '@/components/elements/account-elements/report-card';

    export default {
        name: 'reports',
        components: {addField, reportCard},
        data() {
            return {}
        },
        computed: {
            reports() {
                return this.$store.state.page.ReportListController.items || []
            },
            places() {
                return this.$store.state.page.ReportListController.places || [];
            },
            pageTitle() {
                return this.$store.state.page.ReportListController.texts?.title?.find(el => el.CODE === "REPORTS_TITLE").PREVIEW_TEXT;
            },
            pageContent() {
                return this.$store.state.page.ReportListController.texts.content || {}
            },
        },
        methods: {
            placeOfReport(report) {
                return this.places?.find(el=>el.ID === report.PLACE);
            },
            reportsOfPlace(place) {
                return this.reports?.filter(el=>el.PLACE === place.ID);
            }
        }
    }
</script>

<style lang="scss">
	.reports {
		position: relative;

		p {
			color: $grey1;
		}

		.add-field {
			margin-top: 32px;
			@include up($lg) {
				margin-top: 9%;
			}
		}
	}
</style>
