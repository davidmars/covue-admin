<template>
    <v-avatar :color="color">
        <img
                v-if="img"
                :src="img"
                :alt="text"


        >
        <span v-if="!img"
                class="title white--text text-uppercase">{{initials}}</span>
    </v-avatar>
</template>

<script>
    /**
     *
     */
    export default {
        name: "SmartAvatar",
        props:{
            /**
             * Text duquel seront déduits les initiales et la couleur
             */
            text:{
                type:String,
                default:"??"
            },
            /**
             * Thumbnail à afficher en priorité
             */
            img:{
                type:String,
            }
        },
        computed:{
            initials:function(){
                if(this.text.length<=2){
                    return this.text;
                }
                let parts = this.text.split(/[\s,.]+/);
                let initials = '';
                for (let i = 0; i < parts.length && initials.length<2; i++) {
                    if (parts[i].length > 0 && parts[i] !== '') {
                        initials += parts[i][0]
                    }
                }
                return initials;
            },
            color:function(){
                let hashCode=function(str) { // java String#hashCode
                    var hash = 0;
                    for (var i = 0; i < str.length; i++) {
                        hash = str.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    return hash;
                };

                let intToRGB=function(i){
                    var c = (i & 0x00FFFFFF)
                        .toString(16)
                        .toUpperCase();

                    return "00000".substring(0, 6 - c.length) + c;
                };
                return "#"+intToRGB(hashCode(this.text));
            }
        }
    }
</script>

<style scoped>
    .v-avatar{
        user-select: none;
    }
</style>