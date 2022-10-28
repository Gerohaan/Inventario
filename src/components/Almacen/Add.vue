<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-lg"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar bodega
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form id="form" @submit.prevent="addBodega()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              filled
              v-model="nombre_bodega"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba bodega']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="descripcion_bodega"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="ubicacion_bodega"
              label="Ubicación"
              hint="Dirección"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba dirección']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-col-gutter-md">
          <div
            class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
          >
            <q-toggle
              left-label
              icon="task_alt"
              true-value="ACTIVO"
              false-value="INACTIVO"
              v-model="theModel2"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(theModel2)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>
        <q-card-actions>
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'
export default {
  name: 'Add',
  data () {
    return {
      nombre_bodega: null,
      descripcion_bodega: null,
      ubicacion_bodega: null,
      accept: false,
      model: null,
      theModel2: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.nombre_bodega = null
      this.descripcion_bodega = null
      this.ubicacion_bodega = null
      this.theModel2 = ''
    },

    async addBodega (req, res) {
      try {
        let addform = {
          nombre_bodega: this.nombre_bodega,
          descripcion_bodega: this.descripcion_bodega,
          ubicacion_bodega: this.ubicacion_bodega,
          status_bodega: this.theModel2
        }

        const addBodegas = await axios.post(
          Global.url + 'bodega/add',
          addform,
          Headers
        )

        if (addBodegas.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Bodega agregada',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(addform)
        Notify.create({
          type: 'warning',
          message: 'Error con el Servidor!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
