<template>
  <div class="row">
    <div class="col-12">
      <p class="text-bold text-primary text-h5" style="margin: 10px 0px 0px 40px">
        Proveedor
      </p>
    </div>
  </div>
  <div class="row">
    <List />
    <Add />
  </div>
</template>

<script>
import List from "../components/Proveedor/List.vue";
import Add from "../components/Proveedor/Add.vue";

export default {
  name: "Proveedor",
  components: {
    List,
    Add,
  },
  data() {
    return {};
  },
};
</script>
