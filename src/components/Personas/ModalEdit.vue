<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      flat
      class="text-primary bg-white"
      style="width: 700px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar persona</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updatePersona(), closeModal()">
          <div class="row">
            <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
              <div class="q-gutter-sm">
                <q-radio
                  dense
                  v-model="apiedit.tipo_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="N"
                  label="Persona Natural"
                />
                <q-radio
                  dense
                  v-model="apiedit.tipo_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="J"
                  label="Persona Juridica"
                />
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-gutter-md">
              <q-input
                dense
                filled
                v-model="apiedit.nombres_per"
                standout
                bg-color="accent"
                label="Nombres"
                hint="Primero y segundo"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba sus Nombres'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-gutter-md"
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.apellidos_per"
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
             q-col-gutter-md
            "
          >
            <p class="col text-weight-medium">Documento</p>
          </div>
          <div class="row">
            <div
              class="
              col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4
              text-no-wrap  q-gutter-md

            "
            >
              <q-select
                borderless
                dense
                filled
                v-model="apiedit.nacionalidad_per"
                :options="options"
                label="Tipo"
                bg-color="accent"
                :rules="[
                  val => (val && val.length > 0) || 'Nacionalidad invalidad'
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
              text-no-wrap  q-gutter-md

            "
            >
              <q-input
                borderless
                type="number"
                dense
                filled
                v-model="apiedit.documento_per"
                label="Cedula"
                bg-color="accent"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <div
              class="
                col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-gutter-md

              "
            >
              <p class="col text-subtitle2">Teléfono</p>
              <q-input
                dense
                filled
                type="tel"
                v-model="apiedit.tlf_per"
                standout
                bg-color="accent"
                label="Teléfono"
                hint="Teléfono de contacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Conctato no valido'
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
                q-gutter-md
              "
            >
              <p class="col text-subtitle2">Correo</p>
              <q-input
                dense
                filled
                v-model="apiedit.correo_per"
                type="email"
                standout
                bg-color="accent"
                label="Corrreo"
                hint="Correo de contacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Conctato no valido'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="contact_mail" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
              <p class="col text-subtitle2">Fecha de Nacimiento</p>
              <q-input
                dense
                color="black"
                bg-color="accent"
                v-model="apiedit.fecha_nac_per"
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

            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <p class="col text-subtitle2">Genero</p>
              <div class="q-gutter-sm">
                <q-radio
                  dense
                  v-model="apiedit.genero_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="M"
                  label="Masculino"
                />
                <q-radio
                  dense
                  v-model="apiedit.genero_per"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="F"
                  label="Femenino"
                />
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div class="col q-gutter-md">
              <p class="col text-subtitle2">Dirección de habitación</p>
              <q-input
                v-model="apiedit.direccion_per"
                filled
                clearable
                type="textarea"
                color="red-12"
                label="Dirección de habitacion"
                input-style="height:2px"
                bg-color="accent"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-pt-md">
            <div class="col-12">
              <q-btn no-caps label="Guardar" type="submit" color="primary" />
              <q-btn
                no-caps
                label="Cancelar"
                color="primary"
                flat
                class="q-ml-sm"
                @click="closeModal()"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  props: {
    persistent: Boolean,
    apiedit: ''
  },
  name: 'ModalEdit',
  data () {
    return {
      options: ['V', 'E'],
      nacionalidad_per: this.apiedit.nacionalidad_per,
      tipo_per: this.apiedit.tipo_per,
      documento_per: this.documento_per
    }
  },
  methods: {
    onReset () {
      this.nombre_categoria = null
      this.apiedit.detalle_categoria = null
      this.status_categoria = null
    },

    async updatePersona (req, res) {
      let params = {
        nacionalidad_per: this.apiedit.nacionalidad_per,
        tipo_per: this.apiedit.tipo_per,
        documento_per: this.apiedit.documento_per,
        nombres_per: this.apiedit.nombres_per,
        apellidos_per: this.apiedit.apellidos_per,
        correo_per: this.apiedit.correo_per,
        tlf_per: this.apiedit.tlf_per,
        direccion_per: this.apiedit.direccion_per,
        fecha_nac_per: this.apiedit.fecha_nac_per,
        genero_per: this.apiedit.genero_per
      }
      let persistent = false
      try {
        let updateP = await axios.put(
          Global.url + 'persona/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updateP.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Persona Actualizada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar la Persona!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    closeModal () {
      let persistent = false
      this.$emit('closeModel', persistent)
    }
  }
}
</script>
<style lang="sass" scoped>
.bg-transparent
   background: #fff0
</style>
