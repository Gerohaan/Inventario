<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card
      class="q-pa-md box-shadow"

    >
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar proveedor
            </div>
          </q-card-section>
        </div>

        <div class="col-12 text-left">
          <p class="text-subtitle2">Estado proveedor</p>
        </div>
      </div>

      <q-form @submit.prevent="addProveedor()" @reset="onReset">
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="persona"
              :options="apipersona"
              :option-label="
                apipersona =>
                  apipersona === null
                    ? null
                    : apipersona.nombres_per + ' ' + apipersona.apellidos_per
              "
              :option-value="
                apipersona => (apipersona === null ? null : apipersona.id)
              "
              @filter="filterFn"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Persona"
              hint="Seleccione persona"
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
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
          >
            <q-select
              dense
              standout
              bg-color="accent"
              :options="apiempresa"
              :option-label="
                apiempresa =>
                  apiempresa === null
                    ? null
                    : apiempresa.nombre_empre + '  Rif:' + apiempresa.rif_empre
              "
              :option-value="
                apiempresa => (apiempresa === null ? null : apiempresa.id)
              "
              emit-value
              map-options
              filled
              v-model="empresa"
              label="Empresa"
              hint="Seleccione empresa"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-select>
          </div>
        </div>

        <div class="col-12 q-pr-md q-pt-md">
          <q-input
            dense
            standout="bg-teal text-blue"
            color="black"
            bg-color="accent"
            v-model="detalle"
            label="Detalle"
            hint="Escriba algún detalle"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Detalle no valido'
            ]"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pt-md">
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn no-caps
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
  props: ['apiempresa', 'apipersona'],

  data () {
    return {
      shape: 'ACTIVO',
      persona: null,
      empresa: null,
      detalle: null
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
      this.persona = null
      this.empresa = null
      this.detalle = null
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.apipersona
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.apipersona.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    async addProveedor (req, res) {
      let params = {
        personaId: this.persona,
        empresaId: this.empresa,
        status_prov: this.shape,
        detalle_prov: this.detalle
      }

      try {
        const add = await axios.post(
          Global.url + 'proveedor/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Proveedor Agregado',
            color: 'positive',
            position: 'bottom-right'
          })
          this.onReset()
        }
      } catch (error) {
        console.log(error)
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
