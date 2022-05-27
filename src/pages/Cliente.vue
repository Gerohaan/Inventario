<template>
  <div class="row">
    <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
      <q-table
        class="my-card q-pa-sm flex flex-center text-center box-shadow"
        style="margin: 50px 20px 0px 35px"
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
      />
    </div>

    <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
      <q-card
        class="my-card q-pa-md box-shadow"
        style="margin: 49px 20px 0px 10px"
      >
        <div class="row">
          <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <q-card-section>
              <div class="col text-center text-bold text-h5">
                Agregar Cliente
              </div>
            </q-card-section>
          </div>
          <div class="col-12 text-left">
            <p class="text-subtitle2">Tipo de Persona</p>
          </div>
        </div>
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="line"
                label="Persona Natural"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="rectangle"
                label="Persona Juridica"
              />
            </div>
          </div>
        </div>

        <q-form @submit="onSubmit" @reset="onReset">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
              <q-input
                dense
                filled
                v-model="name"
                standout
                bg-color="grey-4"
                label="Nombres"
                hint="Primero y Segundo Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus Nombres',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
              <q-input
                dense
                standout
                bg-color="grey-4"
                filled
                v-model="apellido"
                label="Apellidos"
                hint="Primero y Segundo Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus Apellidos',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>
          </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-no-wrap q-pt-md q-pr-md">
              <p class="col text-weight-medium">Documento</p>
              <div>
                <q-input label="" class="q-mt-sm" round dense v-model="cedula">
                  <template v-slot:prepend>
                    <q-icon class="q-mr-sm" name="wallet" />
                    <q-btn-dropdown
                      dense
                      flat
                      no-caps
                      label="Tipo"
                      class="q-mr-none q-ml-none"
                    >
                      <q-list>
                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>V</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup>
                          <q-item-section>
                            <q-item-label>E</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-btn-dropdown>
                    <span class="text-black">|</span>
                  </template>
                </q-input>
              </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-md">
              <p class="col text-subtitle2">Telefono</p>
              <q-input
                dense
                filled
                type="tel"
                v-model="telefono"
                standout
                bg-color="grey-4"
                label="Telefono"
                hint="Telefono de Contacto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Telefono de Conctato No valido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="phone_android" />
                </template>
              </q-input>
            </div>

            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-md">
              <p class="col text-subtitle2">Correo</p>
              <q-input
                dense
                filled
                v-model="correo"
                type="email"
                standout
                bg-color="grey-4"
                label="Corrreo"
                hint="Correo de Contacto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Correo de Conctato No valido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="contact_mail" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-pr-md q-pt-md">
            <p class="col text-subtitle2">Razón Social</p>
            <q-input
              dense
              standout="bg-teal text-blue"
              color="black"
              bg-color="grey-4"
              v-model="razon"
              label="Razón Social"
              hint="Razón Social"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Razón Social no Valida',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="storefront" />
              </template>
            </q-input>
          </div>

          <div class="col-12 q-pr-md q-pt-md">
            <p class="col text-subtitle2">Dirección de Habitación</p>
            <q-input
              v-model="direccion"
              filled
              clearable
              type="textarea"
              color="red-12"
              label="Dirección de Habitacion"
              input-style="height:2px"
            />
          </div>
          <div class="col-12">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    name: "nacionalidad",
    required: true,
    label: "Nacionalidad",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "cedula",
    align: "center",
    label: "Cedula",
    field: "calories",
    sortable: true,
  },
  {
    name: "nombres",
    label: "Nombres",
    field: "fat",
    sortable: true,
  },
  {
    name: "apellidos",
    label: "Apellidos",
    field: "carbs",
  },
  {
    name: "razon",
    label: "Razón Social",
    field: "protein",
  },
  {
    name: "telefono",
    label: "Telefono",
    field: "sodium",
  },
  {
    name: "email",
    label: "Correo",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

export default {
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows,
      shape: "line",
      name: null,
      cedula: null,
      apellido: null,
      correo: null,
      telefono: null,
      razon: null,
      direccion: null,
      accept: false,
      model: null,
      options: ["V", "E"],
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
      this.correo = null;
      this.telefono = null;
      this.accept = false;
      this.apellido = null;
      this.razon = null;
      this.direccion = null;
    },
  },
};
</script>
