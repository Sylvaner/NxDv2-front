<template>
    <InputText v-model="modelValue" @input="textChanged" />
</template>

<script>
import InputText from 'primevue/inputtext';

export default {
    name: 'TextInput',
    components: {
        InputText
    },
    props: {
        modelValue: String
    },
    emits: ['update:modelValue'],
    methods: {
        textChanged() {
            this.$emit('update:modelValue', this.modelValue);
        }
    }
}
</script>

<style>

</style>