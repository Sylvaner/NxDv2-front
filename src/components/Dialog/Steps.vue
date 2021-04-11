<template>
  <div class="p-steps p-component p-readonly">
    <ul role="tablist">
      <li v-for="(item, itemIndex) in items"
        :key="`step-${itemIndex}`"
        :class="['p-steps-item', itemIndex === parseInt(modelValue) ? 'p-highlight' : '']"
        role="tab"
        :aria-selected="itemIndex === modelValue"
        :aria-expanded="itemIndex === modelValue"
      >
        <a href="#" class="p-menuitem-link" role="presentation" @click="stepClicked(itemIndex)">
          <span class="p-steps-number">{{ itemIndex + 1 }}</span>
          <span class="p-steps-title">{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Steps",
  props: {
    items: Array,
    modelValue: Number
  },
  emits: ['update:modelValue', 'change'],
  methods: {
      stepClicked(targetItem) {
          if (targetItem !== this.modelValue) {
              this.$emit('update:modelValue', targetItem);
              this.$emit('change');
          }
      }
  }
};
</script>

<!--
CSS du fichier steps.esm.js
-->
<style>
.p-steps {
    position: relative;
}
.p-steps ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.p-steps-item {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
            flex: 1 1 auto;
}
.p-steps-item .p-menuitem-link {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    overflow: hidden;
    text-decoration: none;
}
.p-steps.p-steps-readonly .p-steps-item {
    cursor: auto;
}
.p-steps-item.p-steps-current .p-menuitem-link {
    cursor: default;
}
.p-steps-title {
    white-space: nowrap;
}
.p-steps-number {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.p-steps-title {
    display: block;
}

</style>
