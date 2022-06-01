<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5 q-pt-lg q-pl-lg">
        Categorias
      </p>
    </div>
  </div>
  <div class="row">
    <List />
    <Add />
  </div>
</template>

<script>
import List from "../components/Categorias/List.vue";
import Add from "../components/Categorias/Add.vue";

export default {
  name: "Categoria",
  components: {
    List,
    Add,
  },
  data() {
    return {};
  },
};
</script>
