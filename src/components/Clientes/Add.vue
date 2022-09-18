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
              Agregar cliente
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Tipo cliente</p>
        </div>
      </div>
      <q-form @submit.prevent="addCliente()" @reset="onReset">
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="N"
                label="Persona Natural"
              />
              <q-radio
                dense
                v-model="shape"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="J"
                label="Persona Juridica"
              />
            </div>
          </div>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Persona</p>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
          >
            <q-select
              dense
              filled
              v-model="persona"
              :options="apiList"
              :option-label="
                apiList => (apiList === null ? null : apiList.nombres_per)
              "
              :option-value="apiList => (apiList === null ? null : apiList.id)"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Persona"
              hint="Seleccione Persona"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md">
            <q-input
              dense
              filled
              v-model="detalle"
              standout
              bg-color="accent"
              label="Detalle"
              hint="Detalle Cliente"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-12 text-left q-pt-md">
          <p class="text-subtitle2">Estado cliente</p>
        </div>
        <div class="row">
          <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
            <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="status"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="ACTIVO"
                label="ACTIVO"
              />
              <q-radio
                dense
                v-model="status"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="INACTIVO"
                label="INACTIVO"
              />
            </div>
          </div>
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
  props: ['apiList'],
  data () {
    return {
      shape: 'N',
      detalle: null,
      persona: null,
      status: 'ACTIVO',
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
      this.detalle = null
      this.persona = null
      this.status = 'ACTIVO'
      this.shape = 'N'
    },

    async addCliente (req, res) {
      let params = {
       personaId : this.persona,
       status_client: this.status,
       detalle_client: this.detalle,
       tipo_client: this.shape,
      }
      try {
        const add = await axios.post(
          Global.url + 'cliente/add',
          params,
          Headers
        )
        if (add.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Cliente Agregado',
            color: 'positive'
          })
        }
      } catch (error) {
        //console.log(params)
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
