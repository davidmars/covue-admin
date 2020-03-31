<template>
    <div>
        <v-skeleton-loader
                type="list-item-avatar-two-line"
        ></v-skeleton-loader>
        <v-divider class="mt-4"></v-divider>
        <div class="pt-4 pb-4">
            <div class="d-flex justify-end">
                <v-skeleton-loader type="actions"></v-skeleton-loader>
            </div>
            <v-row>
                <v-col cols="12" md="4" class="pb-4"
                v-for="n in fieldsCount" :key="n">
                    <v-skeleton-loader  class="mr-4" :type="randComponent()"></v-skeleton-loader>
                </v-col>
            </v-row>
        </div>

    </div>
</template>

<script>
    export default {
        name: "EditLoading",
        data(){
            return{
                fieldsCount:10+Math.floor(Math.random()*5)
            }
        },
        methods:{
            randComponent(){
                let rands=[
                    "paragraph@1"
                    ,"heading"
                    ,"image"
                    ,"paragraph@2",
                ];
                return  rands[Math.floor(Math.random() * rands.length)];
            }
        }
    }
</script>

<style scoped>

</style>