<template>
    <v-img :src="file" :width="width" class="contain" ></v-img>
</template>
<script>
export default {
    name: 'MaterialImage',
    inheritAttrs: false,
    computed: {
        file(){
            return require(`@/assets/images/${this.$props.name}.${this.$props.type}`)
        }
    },
    props: {
        width: {
            type: Number,
            default: 300
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
    },
}
</script>