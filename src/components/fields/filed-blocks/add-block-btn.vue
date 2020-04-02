<template>
    <div>
        <v-menu offset-y>

            <template v-slot:activator="{ on }">
                <v-btn dark
                       :small="floattingBtn"
                       :fab="floattingBtn" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                    <slot v-if="!floattingBtn"></slot>
                </v-btn>
            </template>
            <v-card
                    min-width="300"
                    tile
                    dark
            >
            <v-list rounded>
                <v-subheader><slot></slot></v-subheader>
                <v-list-item
                        v-for="(type, index) in blocksTypes" :key="index"
                        @click="click($event,offset,type)"
                        class="one-item">

                    <v-list-item-icon>
                        <v-icon>{{ $store.state.blocksDefinitions[type].icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ $store.state.blocksDefinitions[type].humanName }}</v-list-item-title>

                    <input v-if="$store.state.blocksDefinitions[type].file"
                           multiple
                           @change="selectFiles($event,offset,type)" ref="input-file"
                           type="file">

                </v-list-item>
            </v-list>
            </v-card>

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
            },
            /**
             * Si true n'affichera pas le label, mais juste un petit bouton "+" flottant
             */
            floattingBtn:{
                type:Boolean,
                default: false
            }
        },
        methods:{
            click(event,offset,type,){
                if(!this.$store.state.blocksDefinitions[type].file){
                    this.$emit("select",offset,type);
                }
            },
            selectFiles(event,offset,type){
                for(let f of event.target.files){
                    this.$emit("select",offset,type,f);
                }

            }
        }
    }
</script>

<style scoped lang="less">
    .one-item{
        position: relative;
        input[type=file]{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>