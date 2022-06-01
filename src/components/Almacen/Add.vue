<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-lg"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar Almacenes
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form id="form" @submit.prevent="onSubmit()" @reset="onReset">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-input
              dense
              filled
              v-model="name"
              standout
              bg-color="accent"
              label="Nombre de la Categoria"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba El Nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="direccion"
              label="Ubicación"
              hint="Dirreción "
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba la Dirreción',
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="apellido"
              label="Detalle de la Categoria"
              hint="Breve Descripcion"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba El Detalle',
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row">
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
          >
            <q-toggle
              left-label
              icon="task_alt"
              true-value="ACTIVO"
              false-value="INACTIVO"
              v-model="theModel2"
              label="Status"
            ></q-toggle>
            <div class="q-px-sm">
              Seleccione Un Status:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(theModel2)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>

        <div class="col-12 q-pt-md">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>
<script>
export default {
  name: "Add",
  data() {
    return {
      shape: "line",
      name: null,
      cedula: null,
      apellido: null,
      direccion: null,
      accept: false,
      model: null,
      theModel2: "",
    };
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      }
    },

    onReset() {
      this.name = null;
      this.cedula = null;
      this.direccion = null;
      this.telefono = null;
      this.accept = false;
      this.apellido = null;
      this.theModel2 = "";
    },
  },
};
</script>
