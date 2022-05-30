<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5" style="margin: 10px 0px 0px 40px">
        Clientes
      </p>
    </div>
  </div>
  <div class="row">
    <List />
    <Add />
  </div>
</template>

<script>
import List from "../components/Clientes/List.vue";
import Add from "../components/Clientes/Add.vue";

export default {
  name: "Cliente",
  components: {
    List,
    Add,
  },
  data() {
    return {};
  },
};
</script>
