<template>
    <div>
        <v-autocomplete
                :value="value"
                :items="$store.getters.recordsByType(type)"
                item-text="name"
                item-value="uid"
                chips
                deletable-chips
                @change="updateValue($event)"
                :label="label"
                multiple
        >

            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                    <v-list-item-avatar>
                        <record-icon :record="data.item"></record-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.uid"></v-list-item-subtitle>
                    </v-list-item-content>
                </template>
            </template>

        </v-autocomplete>



        <pre v-if="debug">
            <v-row>
                <v-col>
                    value<br>
                    {{value}}
                </v-col>
                <v-col>
                    dataValue<br>
                </v-col>
            </v-row>
        </pre>
    </div>

</template>

<script>
    export default {
        name: "FieldSharedModelList",
        props:{
            type:{
              type:String
            },
            value: {
                type: Array
            },
            /**
             * Permet d'activer ou non le débuggage
             */
            debug:{
                type:Boolean,
                default:false
            },
            label:{
                type:String,
                default: ""
            }
        },
        data(){
            return {
            }
        },
        methods: {
            updateValue: function (e) {
                console.log("e",e)
                this.$emit('input', e)
            }
        }
    }
</script>

<style scoped>

</style>