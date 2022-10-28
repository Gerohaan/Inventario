<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pt-md q-pr-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar presentación
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>
      <q-form id="form" @submit.prevent="addPresent()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div
            class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7"
          >
            <q-input
              dense
              filled
              v-model="nombre_present"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba Presentación'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="
              col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5

            "
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="abreviatura_present"
              label="Abreviatura"
              hint=" Abreviatura identificatoria"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba abreviatura']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="unidadMedidadId"
              :options="apilista"
              :option-label="
                apilista => (apilista === null ? null : apilista.nombre_unidad)
              "
              :option-value="
                apilista => (apilista === null ? null : apilista.id)
              "
              @filter="filterFn"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Unidad de medidad"
              hint="Seleccione unidad"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
              v-model="descripcion_present"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
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
              v-model="status_present"
              label="Estado"
            ></q-toggle>
            <div>
              Seleccione estado:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_present)
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
      nombre_present: null,
      descripcion_present: null,
      abreviatura_present: null,
      unidadMedidadId: null,
      accept: false,
      model: null,
      status_present: ''
    }
  },
  props: ['apilista'],
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
      this.nombre_present = null
      this.descripcion_present = null
      this.unidadMedidadId = null
      this.abreviatura_present = null
      this.status_present = ''
    },

    async addPresent (req, res) {
      try {
        let addform = {
          nombre_present: this.nombre_present,
          descripcion_present: this.descripcion_present,
          unidadMedidadId: this.unidadMedidadId,
          abreviatura_present: this.abreviatura_present,
          status_present: this.status_present
        }

        const add = await axios.post(
          Global.url + 'presentacion/add',
          addform,
          Headers
        )

        if (add.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Presentación del producto agregada',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(addform)
        Notify.create({
          type: 'warning',
          message: 'Error con el servidor!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.apilista
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.apilista.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
