<template>

    <div >
        <v-row v-if="record">
            <v-col cols="6">
                <v-text-field
                        v-model="r.name"
                        :counter="20"
                        label="Name"
                        required
                ></v-text-field>
            </v-col>
        </v-row>

        <slot></slot>

    </div>

</template>

<script>
    export default {
        name: "EditPage",
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