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
              Agregar persona
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Tipo de persona</p>
        </div>
      </div>
      <q-form @submit.prevent="addPer()" @reset="onReset">
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

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pr-md">
            <q-input
              dense
              filled
              v-model="name"
              standout
              bg-color="accent"
              label="Nombres"
              hint="Primero y Segundo"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba sus Nombres']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
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
              hint="Primero y segundo"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba sus Apellidos'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="draw" />
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
        </div>
        <div class="row">
          <div
            class="
              col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4
              text-no-wrap
              q-pt-xs
            "
          >
            <q-select
              borderless
              dense
              filled
              v-model="nacionalidad"
              :options="options"
              label="Tipo"
              bg-color="accent"
              :rules="[
                val => (val && val.length > 0) || 'Nacionalidad Invalidad'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="wallet" />
              </template>
            </q-select>
          </div>
          <div
            class="
              col-xs-8 col-sm-8 col-md-8 col-lg-8 col-xl-8
              text-no-wrap
              q-pt-xs q-pr-md
            "
          >
            <q-input
              borderless
              type="number"
              dense
              filled
              v-model="cedula"
              label="Cedula"
              bg-color="accent"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Cedula Invalidad']"
            />
          </div>
        </div>

        <div class="row">
          <div
            class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6
                q-pr-md q-pt-md
              "
          >
            <p class="col text-subtitle2">Teléfono</p>
            <q-input
              dense
              filled
              type="tel"
              v-model="telefono"
              standout
              bg-color="accent"
              label="Teléfono"
              hint="Teléfono de Contacto"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'Conctato No valido'
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
              label="Correo"
              hint="Correo de Contacto"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Conctato No valido'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="contact_mail" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Fecha de nacimiento</p>
          <q-input
            dense
            standout
            bg-color="accent"
            v-model="nacimiento"
            hint="Fecha nacimiento"
            type="date"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Nacimiento no valido'
            ]"
          >
            <template v-slot:prepend>
              <q-icon color="primary" name="draw" />
            </template>
          </q-input>
        </div>
        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Genero</p>
          <div class="q-gutter-sm">
              <q-radio
                dense
                v-model="genero"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="M"
                label="Masculino"
              />
              <q-radio
                dense
                v-model="genero"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="F"
                label="Femenino"
              />
            </div>
            </div>
        <div class="col-12 q-pr-md q-pt-md">
          <p class="col text-subtitle2">Dirección de habitación</p>
          <q-input
            v-model="direccion"
            filled
            clearable
            type="textarea"
            color="red-12"
            label="Dirección"
            input-style="height:2px"
            bg-color="accent"
          />
        </div>
        <div class="col-12 q-pt-md">
          <q-btn no-caps label="Guardar" type="submit" color="primary" />
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
  data () {
    return {
      genero:'M',
      shape: 'N',
      name: null,
      cedula: null,
      apellido: null,
      correo: null,
      telefono: null,
      nacimiento: null,
      direccion: null,
      nacionalidad: null,
      accept: false,
      model: null,
      nacionalidad: null,
      options: ['V', 'E']
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
      this.name = null
      this.cedula = null
      this.correo = null
      this.telefono = null
      this.apellido = null
      this.razon = null
      this.direccion = null
      this.nacionalidad = null
      this.shape = 'N'
      this.genero = 'M'
    },

    async addPer (req, res) {
      let params = {
        nombres_per: this.name,
        documento_per: this.cedula,
        correo_per: this.correo,
        tlf_per: this.telefono,
        apellidos_per: this.apellido,
        nacionalidad_per: this.nacionalidad,
        fecha_nac_per: this.nacimiento,
        direccion_per: this.direccion,
        tipo_per: this.shape,
        genero_per:this.genero
      }
      try {
        const add = await axios.post(
          Global.url + 'persona/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Persona Agregada',
            color: 'positive',
            position: 'bottom-right'
          })
          this.onReset()
        }
      } catch (error) {
        console.log(params)
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
