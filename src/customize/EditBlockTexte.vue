<template>
    <div>
        <edit-page :record="r"></edit-page>
        <v-row>
            <v-col cols="12">
                <v-textarea
                        filled
                        v-model="record.texte"
                        :counter="500"
                        label="Texte"
                        auto-grow
                        required
                ></v-textarea>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import EditPage from "@/customize/EditPage";
    export default {
        name: "EditBlockTexte",
        components: {EditPage},
        props:["record"],
        data(){
            return{
                r:null
            }
        },
        created(){
            this.r=this.record;
        }
    }
</script>

<style scoped>

</style>