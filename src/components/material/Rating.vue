<template>
    <v-rating
        v-model="value"
        :background-color="colorWrap"
        :color="color"
        large
    >
    </v-rating>
</template>
<script>
export default {
    name: 'MaterialRating',
    inheritAttrs: false,
    props: {
        value: {
            type: Number,
        },
        color: {
            type: String
        }
    },
    computed: {
        colorWrap() {
            return this.$props.color +  ' lighten-3';
        }
    }
}
</script>
