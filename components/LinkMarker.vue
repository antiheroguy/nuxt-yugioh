<template>
  <div class="link-marker-container">
    <div v-for="marker in markers" :key="marker.name"
      :class="['link-marker', marker.name, { active: modelValue.includes(marker.name), disabled: disabled }]"
      @click="toggleMarker(marker.name)"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const markers = [
  { name: 'top' },
  { name: 'top-right' },
  { name: 'right' },
  { name: 'bottom-right' },
  { name: 'bottom' },
  { name: 'bottom-left' },
  { name: 'left' },
  { name: 'top-left' },
]

const toggleMarker = (marker) => {
  if (props.disabled) {
    return;
  }

  const newModelValue = props.modelValue.includes(marker)
    ? props.modelValue.filter((m) => m !== marker)
    : [...props.modelValue, marker];

  emit('update:modelValue', newModelValue);
};
</script>

<style scoped>
.link-marker-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 40px
}

.link-marker {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  cursor: pointer
}

.link-marker.active {
  border-color: transparent transparent var(--va-primary) transparent
}

.link-marker.disabled {
  cursor: not-allowed;
  border-color: transparent transparent gray
}

.top,
.top-right {
  border-width: 0 30px 30px;
  border-color: transparent transparent #fff
}

.top {
  top: -25px;
  left: 50%;
  transform: translateX(-50%)
}

.top-right {
  top: -20px;
  right: -25px;
  transform: rotate(45deg)
}

.right {
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(90deg)
}

.bottom,
.bottom-right,
.right {
  border-width: 0 30px 30px;
  border-color: transparent transparent #fff
}

.bottom-right {
  bottom: -20px;
  right: -25px;
  transform: rotate(135deg)
}

.bottom {
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%) rotate(180deg)
}

.bottom-left {
  bottom: -20px;
  transform: rotate(225deg)
}

.bottom-left,
.left,
.top-left {
  left: -25px;
  border-width: 0 30px 30px;
  border-color: transparent transparent #fff
}

.left {
  top: 50%;
  transform: translateY(-50%) rotate(270deg)
}

.top-left {
  top: -20px;
  transform: rotate(-45deg)
}

.filter-info {
  margin-top: 20px;
  text-align: center
}
</style>
