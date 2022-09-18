<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-parallax src="~assets/fondo3.jpg" :height="450">
      <q-card  flat class="text-white bg-transparent" style="width:500px" >
        <q-card-section>
          <div class="text-h6">Editar cliente</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="updateCliente(), closeModal()">
            <div class="row">
              <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
                <div class="q-gutter-sm">
                  <q-radio
                    dense
                    v-model="apiedit.tipo_client"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="N"
                    label="Persona Natural"
                  />
                  <q-radio
                    dense
                    v-model="apiedit.tipo_client"
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
                  v-model="apiedit.personaId"
                  :options="apipersona"
                  :option-label="
                    apipersona =>
                      apipersona === null ? null : apipersona.nombres_per
                  "
                  :option-value="
                    apipersona => (apipersona === null ? null : apipersona.id)
                  "
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
                </q-select>
              </div>
            </div>
            <div class="row">
              <div
                class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
              >
                <q-input
                  dense
                  filled
                  v-model="apiedit.detalle_client"
                  standout
                  bg-color="accent"
                  label="Detalle"
                  hint="Detalle cliente"
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
                    v-model="apiedit.status_client"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="ACTIVO"
                    label="ACTIVO"
                  />
                  <q-radio
                    dense
                    v-model="apiedit.status_client"
                    checked-icon="task_alt"
                    unchecked-icon="panorama_fish_eye"
                    val="INACTIVO"
                    label="INACTIVO"
                  />
                </div>
              </div>
            </div>

            <div class="col-12 q-pt-md">
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
          </q-form>
        </q-card-section>
      </q-card>
    </q-parallax>
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
    apiedit: '',
    apipersona: Array
  },
  name: 'ModalEdit',
  data () {
    return {}
  },
  methods: {
    async updateCliente (req, res) {
      let params = {
        personaId: this.apiedit.personaId,
        status_client: this.apiedit.status_client,
        detalle_client: this.apiedit.detalle_client,
        tipo_client: this.apiedit.tipo_client
      }
      let persistent = false
      try {
        let edit = await axios.put(
          Global.url + 'cliente/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (edit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Cliente actualizado!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el cliente!',
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
.bg-image
      background: url(src/assets/fondo.jpg)
      background-size: cover
      background-position: center
      background-attachment: fixed
      background-repeat: no-repeat
.bg-transparent
   background: #fff0
</style>
