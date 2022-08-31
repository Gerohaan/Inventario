<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar empresa
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="onSubmit, addEmpresa()" @reset="onReset">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              v-model="nombre_empre"
              standout
              bg-color="accent"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              type="number"
              filled
              v-model="rif_empre"
              standout
              bg-color="accent"
              label="Rif"
              hint="Documento Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Documento']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              v-model="representante_empre"
              standout
              bg-color="accent"
              label="Representante"
              hint="Representante Legal"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba  Representante'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              type="tel"
              v-model="tlf_local_empre"
              standout
              bg-color="accent"
              label="Teléfono local"
              hint="Conctacto valido"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba numero valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              type="tel"
              v-model="tlf_celular_empre"
              standout
              bg-color="accent"
              label="Teléfono celular"
              hint="Teléfono de conctacto"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba telefono valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              v-model="correo_empre"
              type="email"
              standout
              bg-color="accent"
              label="Correo"
              hint="Dirección  Electronica"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba Correo valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              v-model="direccion_empre"
              standout
              bg-color="accent"
              label="Dirección"
              hint="Dirección de Ubicación"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba Ubicación']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>

          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
          >
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="tipo_empre"
              label="Tipo de empresa"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba Tipo de Empresa'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="col-12 q-pt-md">
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn
            no-caps
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
      nombre_empre: null,
      rif_empre: null,
      representante_empre: null,
      direccion_empre: null,
      tlf_local_empre: null,
      tlf_celular_empre: null,
      correo_empre: null,
      porltal_web_empre: null,
      tipo_empre: null,
      model: null,
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
      this.nombre_empre = null
      this.rif_empre = null
      this.representante_empre = null
      this.direccion_empre = null
      this.tlf_local_empre = null
      this.tlf_celular_empre = null
      this.correo_empre = null
      this.porltal_web_empre = null
      this.tipo_empre = null
    },

    async addEmpresa (req, res) {
      let params = {
        nombre_empre: this.nombre_empre,
        rif_empre: this.rif_empre,
        representante_empre: this.representante_empre,
        direccion_empre: this.direccion_empre,
        tlf_local_empre: this.tlf_local_empre,
        tlf_celular_empre: this.tlf_celular_empre,
        correo_empre: this.correo_empre,
        porltal_web_empre: this.porltal_web_empre,
        tipo_empre: this.tipo_empre
      }
      try {
        let add = await axios.post(Global.url + 'empresa/add', params, Headers)
        this.apiAdd = add.data

        if (add.status === 200) {
          this.onReset()
          Notify.create({
            type: 'positive',
            message: 'Empresa Agregada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar Empresa!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
