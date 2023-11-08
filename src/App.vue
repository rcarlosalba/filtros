<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { FormKit } from '@formkit/vue';
import { reset } from '@formkit/core';
import {
  autos,
  brands,
  precios,
  colors,
  transmisiones,
  puertas,
} from './data/data.js';
import Auto from './components/Auto.vue';

const years = ref([]);
const getYears = () => {
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 2010; i--) {
    years.value.push(i);
  }
};

const resultado = ref([]);
const datosBusqueda = reactive({});

const filtrarAuto = () => {
  resultado.value = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo);
  if (resultado.value.length) {
    Auto.value = resultado.value;
  }
};

const filtrarMarca = (auto) => {
  if (datosBusqueda.marca) {
    return auto.marca === datosBusqueda.marca;
  }
  return auto;
};
const filtrarYear = (auto) => {
  if (datosBusqueda.year) {
    return auto.year === Number(datosBusqueda.year);
  }
  return auto;
};
const filtrarPuertas = (auto) => {
  if (datosBusqueda.puertas) {
    return auto.puertas === Number(datosBusqueda.puertas);
  }
  return auto;
};
const filtrarTransmision = (auto) => {
  if (datosBusqueda.transmision) {
    return auto.transmision === datosBusqueda.transmision;
  }
  return auto;
};
const filtrarColor = (auto) => {
  if (datosBusqueda.color) {
    return auto.color === datosBusqueda.color;
  }
  return auto;
};
const filtrarMinimo = (auto) => {
  if (datosBusqueda.minimo) {
    return auto.precio >= Number(datosBusqueda.minimo);
  }
  return auto;
};
const filtrarMaximo = (auto) => {
  if (datosBusqueda.maximo) {
    return auto.precio <= Number(datosBusqueda.maximo);
  }
  return auto;
};

const isEmpty = computed(() => {
  return resultado.value.length <= 0;
});

const clean = () => {
  reset('buscar-auto');
  resultado.value = autos;
};

onMounted(() => {
  resultado.value = autos;
});
getYears();
</script>
<template>
  <div class="container mx-auto my-16 max-w-5xl">
    <h1 class="text-center text-2xl font-semibold uppercase">
      Buscador de Carros
    </h1>
    <div class="form-container mx-auto shadow-md my-8 p-4">
      <FormKit
        id="buscar-auto"
        type="form"
        :actions="false"
        incomplete-message="Por favor complete todos los campos"
      >
        <div class="grid grid-cols-1 gap-2 md:grid-cols-4 my-2">
          <FormKit
            type="select"
            name="brand"
            label="Marca: "
            :options="brands"
            placeholder="Seleccione"
            v-model="datosBusqueda.marca"
            @change="filtrarAuto"
          />
          <FormKit
            type="select"
            name="year"
            label="Año: "
            :options="years"
            placeholder="Seleccione"
            v-model="datosBusqueda.year"
            @change="filtrarAuto"
          />
          <FormKit
            type="select"
            name="minimo"
            label="Precio Minimo: "
            :options="precios"
            placeholder="Seleccione"
            v-model="datosBusqueda.minimo"
            @change="filtrarAuto"
          />
          <FormKit
            type="select"
            name="maximo"
            label="Precio Maximo: "
            :options="precios"
            placeholder="Seleccione"
            v-model="datosBusqueda.maximo"
            @change="filtrarAuto"
          />
        </div>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-4 my-8">
          <FormKit
            type="select"
            name="puertas"
            label="Puertas: "
            :options="puertas"
            placeholder="Seleccione"
            v-model="datosBusqueda.puertas"
            @change="filtrarAuto"
          />
          <FormKit
            type="select"
            label="Transmisión: "
            name="transmision"
            :options="transmisiones"
            placeholder="Seleccione"
            v-model="datosBusqueda.transmision"
            @change="filtrarAuto"
          />
          <FormKit
            type="select"
            label="Color:"
            name="color"
            :options="colors"
            placeholder="Seleccione"
            v-model="datosBusqueda.color"
            @change="filtrarAuto"
          />
          <div class="flex items-end justify-center w-full">
            <FormKit
              type="button"
              label="Limpiar Fomulario"
              class="clean-button"
              @click="clean"
            />
          </div>
        </div>
      </FormKit>
    </div>
    <div
      class="result-container"
      v-if="!isEmpty"
    >
      <h1 class="text-center text-2xl font-semibold uppercase">Resultados:</h1>
      <div class="grid gap-4 text-center md:grid-cols-2 lg:grid-cols-4">
        <Auto
          v-for="(auto, index) in resultado"
          :auto="auto"
          :key="index"
        />
      </div>
    </div>
    <div v-else>
      <h2 class="text-center text-2xl font-semibold uppercase">
        No hay resultados, intenta con otros filtros
      </h2>
    </div>
  </div>
</template>
<style>
.clean-button {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
