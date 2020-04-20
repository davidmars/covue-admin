<template>
    <div class="flex">
        <v-icon>{{devices[$vuetify.breakpoint.name]}}</v-icon>
        <span class="overline ml-2 font-weight-bold">{{$vuetify.breakpoint.name}}</span>
    </div>
</template>

<script>
    /**
     * Un composant qui permet d'afficher la taille de l'écran et l'icone correspondante
     */
    export default {
        name: "ScreenSize",
        data(){
            return{
                devices:{
                    "xs":"mdi-cellphone-iphone",
                    "sm":"mdi-tablet",
                    "md":"mdi-laptop",
                    "lg":"mdi-desktop-mac",
                    "xl":"mdi-television",
                }
            }
        }
    }
</script>

<style scoped>

</style>