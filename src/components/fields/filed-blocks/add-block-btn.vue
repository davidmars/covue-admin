<template>
    <div>

        <v-menu offset-y>

            <template v-slot:activator="{ on }">
                <v-btn color="black" dark v-on="on">
                    <slot></slot>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(type, index) in blocksTypes" :key="index" @click="$emit('select',offset,type)">
                    <v-list-item-icon>
                        <v-icon>{{ $store.state.blocksDefinitions[type].icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ $store.state.blocksDefinitions[type].humanName }}</v-list-item-title>
                </v-list-item>
            </v-list>

        </v-menu>


    </div>
</template>

<script>
    export default {
        name: "add-block-btn",
        props:{
            /**
             * Types de blocks qu'on peut insérer via ce menu
             */
            blocksTypes:{
                type:Array
            },
            /**
             * Position où ajouter le block dans la liste de blocks
             */
            offset:{
                type:Number,
                default:0
            }
        }
    }
</script>

<style scoped>

</style>