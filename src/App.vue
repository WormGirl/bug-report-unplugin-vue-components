<script setup lang="ts">
const a = 3
function test(a: Number, b: Number) {
  // a的值应该是1才对  实际变成了3 有点离谱
  console.log(a, b)
}
</script>

<template>
  <button @click="test(1, 2)">
    点我可复现
  </button>
</template>
