<template>
  <Dialog v-model:visible="showedValue" modal>
    <template #header>
      Device Wizard
    </template>
    Content
    <template #footer>Footer</template>
  </Dialog>
</template>

<script lang="ts">
import Dialog from 'primevue/dialog';
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "DeviceWizard",
  components: {
    Dialog
  },
  props: {
    device: Object,
    modelValue: Boolean
  },
  emits: ["update:modelValue"],
  mounted() {
    console.log('coucou');
  },
  setup(props, { emit }) {
    const showedValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    return {
      showedValue
    }
  }
});
</script>

<style scoped>

</style>