<template>
   <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-sm">
      <q-card
        class="my-card q-pa-md box-shadow"
        style="margin: 15px 20px 0px 10px"
      >
        <div class="row">
          <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
            <q-card-section>
              <div class="col text-center text-primary text-bold text-h5">
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
                bg-color="accent"
                label="Nombres"
                hint="Primero y Segundo Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus Nombres',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
              <q-input
                dense
                standout
                bg-color="accent"
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
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
              text-no-wrap
              q-pt-md q-pr-md
            "
          >
            <p class="col text-weight-medium">Documento</p>
            <div>
              <q-input label="" class="q-mt-sm" round dense v-model="cedula">
                <template v-slot:prepend>
                  <q-icon color="primary" class="q-mr-sm" name="wallet" />
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
            <div
              class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
                q-pr-md q-pt-md
              "
            >
              <p class="col text-subtitle2">Telefono</p>
              <q-input
                dense
                filled
                type="tel"
                v-model="telefono"
                standout
                bg-color="accent"
                label="Telefono"
                hint="Telefono de Contacto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Telefono de Conctato No valido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="phone_android" />
                </template>
              </q-input>
            </div>

            <div
              class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
                q-pr-md q-pt-md
              "
            >
              <p class="col text-subtitle2">Correo</p>
              <q-input
                dense
                filled
                v-model="correo"
                type="email"
                standout
                bg-color="accent"
                label="Corrreo"
                hint="Correo de Contacto"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Correo de Conctato No valido',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="contact_mail" />
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
              bg-color="accent"
              v-model="razon"
              label="Razón Social"
              hint="Razón Social"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Razón Social no Valida',
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
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
              bg-color="accent"
            />
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
    return{
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
    }

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
}
</script>
