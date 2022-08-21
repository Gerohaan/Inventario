<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-lg"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar Unidad de Medidad
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form id="form" @submit.prevent="addUnidad()" @reset="onReset">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-input
              dense
              filled
              v-model="nombre_unidad"
              standout
              bg-color="accent"
              label="Nombre de la Unidad de Medidad"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba la Unidad']"
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
              v-model="descripcion_unidad"
              label="Breve Descripción de la Unidad"
              hint="Descripción"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba la Unidad de Medidad'
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
              v-model="cantidad_unidad"
              label="Cantidad de la Unidad"
              hint="Cantidad contenidad en la Unidad"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba la Cantidad'
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
              v-model="status_unidad"
              label="Status"
            ></q-toggle>
            <div class="q-px-sm">
              Seleccione Un Status:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_unidad)
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
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'
export default {
  name: 'Add',
  data () {
    return {
      nombre_unidad: null,
      descripcion_unidad: null,
     cantidad_unidad : null,
      accept: false,
      model: null,
      status_unidad: ''
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
      this.nombre_unidad = null
      this.descripcion_unidad = null
      this.cantidad_unidad = null
      this.status_unidad = ''
    },

    async addUnidad (req, res) {
      try {
        let addform = {
          nombre_unidad: this.nombre_unidad,
          descripcion_unidad: this.descripcion_unidad,
          cantidad_unidad: this.cantidad_unidad,
          status_unidad: this.status_unidad
        }

        const add = await axios.post(
          Global.url + 'unidad/add',
          addform,
          Headers
        )

        if (add.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Unidad de Medidad Agregada',
            color: 'positive'
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
