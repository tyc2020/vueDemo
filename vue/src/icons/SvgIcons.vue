<template>
  <svg :class="svgClass" aria-hidden="false">
    <use :xlink:href="iconName"></use>
  </svg>

</template>
<script>
import { ref, computed, onMounted } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      default: ''
    }, 
    className: {
      type: String,
      default: ''
    }},
  setup(props) {
    const count = ref(1)
    const msg = ref("星月想法");

    /*
    计算属性

    */
    const iconName = computed(() => `#icon-${props.iconClass}`)

    const svgClass = computed(() => {
      if(props.className){
        return `svg-icon ${props.className}`
      }else{
        return `svg-icon`
      }
    })

    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scaped>
  .svg-icon {
    width:1em;
    height: 1em;
    fill: currentColor;
  }
</style>
