<template>
  <div class="row">
    <div class="col-12">
      <p
        class="text-bold text-primary text-h5 q-pt-lg q-pl-xl"
      >
        Almacenes
      </p>
    </div>
  </div>
  <div class="row">
    <Add />
    <List />
  </div>
</template>

<script>
import List from "../components/Almacen/Add.vue";
import Add from "../components/Almacen/List.vue";

export default {
  name: "Almacen",
  components: {
    List,
    Add,
  },
  data() {
    return {};
  },
};
</script>
