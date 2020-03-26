<template>
    <div>
        <edit-page :record="r"></edit-page>
        <v-row>
            <v-col cols="6">
                <v-text-field
                        v-model="record.annee"
                        :counter="4"
                        label="Année"
                        required
                ></v-text-field>
            </v-col>
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
            <v-col cols="3">
                <v-file-input
                        v-model="record.image"
                        label="image"
                        show-size
                        accept="image/*"

                ></v-file-input>
            </v-col>
        </v-row>
    </div>

</template>

<script>
    import EditPage from "@/components/records/EditPage";
    export default {
        name: "EditDate",
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