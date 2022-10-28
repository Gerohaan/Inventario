<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-md q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar pago
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="onSubmit, addPago()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <q-input
              dense
              filled
              v-model="nombre_pago"
              standout
              bg-color="accent"
              label="Forma de pago"
              hint="Nombre identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba forma de pago']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="descripcion_pago"
              label="Detalle"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
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
            "
          >
            <q-toggle
              left-label
              icon="task_alt"
              true-value="ACTIVO"
              false-value="INACTIVO"
              v-model="status_pago"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione un estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_pago)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>
        <q-card-actions>
          <q-btn no-caps label="Guardar" type="submit" color="primary" />
          <q-btn
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            flat
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
      shape: 'line',
      nombre_pago: null,
      descripcion_pago: null,
      model: null,
      status_pago: '',
      apiAdd: []
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
      this.nombre_pago = null
      this.descripcion_pago = null
      this.status_pago = ''
    },

    async addPago (req, res) {
      let params = {
        nombre_pago: this.nombre_pago,
        descripcion_pago: this.descripcion_pago,
        status_pago: this.status_pago
      }
      try {
        let add = await axios.post(
          Global.url + 'formaPago/add',
          params,
          Headers
        )
        this.apiAdd = add.data

        if (add.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Forma de pago agregada!',
            color: 'positive',
            position:'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar la forma de pago!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
