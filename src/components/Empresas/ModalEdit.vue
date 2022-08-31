<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="onSubmit, updateEmpresa(), closeModal()">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
            >
              <q-input
                disable
                dense
                filled
                v-model="apiedit.nombre_empre"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba un nombre']"
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
                v-model="apiedit.representante_empre"
                standout
                bg-color="accent"
                label="Representante"
                hint="Representante Legal"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Representante'
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
                v-model="apiedit.tlf_local_empre"
                standout
                bg-color="accent"
                label="Teléfono local"
                hint="Teléfono local valido"
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
                v-model="apiedit.tlf_celular_empre"
                standout
                bg-color="accent"
                label="Teléfono celular"
                hint="Teléfono de Conctacto"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Telefono Valido'
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
                v-model="apiedit.correo_empre"
                type="email"
                standout
                bg-color="accent"
                label="Correo"
                hint="Dirección Electronica"
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
                v-model="apiedit.direccion_empre"
                standout
                bg-color="accent"
                label="Dirección"
                hint="Dirección de Ubicación"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba ubicación'
                ]"
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
                v-model="apiedit.tipo_empre"
                label="Tipo de Empresa"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba el Tipo de Empresa'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 q-pt-md">
            <q-btn no-caps
              label="Guardar"
              type="submit"
              color="primary"
            />
            <q-btn no-caps
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              @click="closeModal()"
            />
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
      nombre_empre: this.apiedit.nombre_empre,
      representante_empre: this.apiedit.representante_empre,
      direccion_empre: this.apiedit.direccion_empre,
      tlf_local_empre: this.apiedit.tlf_local_empre,
      tlf_celular_empre: this.apiedit.tlf_celular_empre,
      correo_empre: this.apiedit.correo_empre,
      porltal_web_empre: this.apiedit.porltal_web_empre,
      tipo_empre: this.apiedit.tipo_empre
    }
  },
  methods: {
    async updateEmpresa (req, res) {
      let params = {
        // nombre_empre: this.apiedit.nombre_empre,
        representante_empre: this.apiedit.representante_empre,
        direccion_empre: this.apiedit.direccion_empre,
        tlf_local_empre: this.apiedit.tlf_local_empre,
        tlf_celular_empre: this.apiedit.tlf_celular_empre,
        correo_empre: this.apiedit.correo_empre,
        porltal_web_empre: this.apiedit.porltal_web_empre,
        tipo_empre: this.apiedit.tipo_empre
      }
      let persistent = false
      try {
        let edit = await axios.put(
          Global.url + 'empresa/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (edit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Empresa actualizada!',
            color: 'positive',
            position:'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la empresa!',
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
