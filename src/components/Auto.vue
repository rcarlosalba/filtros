<script setup>
defineProps({
  auto: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="shadow-md rounded-md">
    <img
      :src="auto.imgUrl"
      alt="auto"
      class="w-full h-64 object-cover rounded-t-md"
    />
    <h2 class="font-semibold">
      {{ auto.marca }}
    </h2>
    <p class="text-gray-500 font-normal">
      <span class="font-semibold"> Año: </span>
      {{ auto.year }}
    </p>
    <p class="text-gray-500 font-normal">
      <span class="font-semibold"> Transmisión: </span>
      {{ auto.transmision }}
    </p>
    <p class="text-gray-500 font-normal">
      <span class="font-semibold"> Puertas: </span>
      {{ auto.puertas }}
    </p>
    <p class="text-gray-500 font-normal">
      <span class="font-semibold"> Color: </span>
      {{ auto.color }}
    </p>
    <p class="text-gray-500 font-normal">
      <span class="font-semibold"> Precio: </span>
      ${{ auto.precio }}
    </p>
  </div>
</template>

<style scope></style>
