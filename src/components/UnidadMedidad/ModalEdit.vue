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
      style="width: 400px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar bodega</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updateUnidad(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-input
                dense
                filled
                v-model="apiedit.nombre_unidad"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba unidad']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
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
                v-model="apiedit.descripcion_unidad"
                label="Descripción"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba descripción'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12

            "
            >
              <q-input
                dense
                min="0"
                standout
                bg-color="accent"
                filled
                v-model="apiedit.cantidad_unidad"
                label="Cantidad"
                hint="Cantidad contenidad en la unidad"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Escriba cantidad'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
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
                v-model="apiedit.status_unidad"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_unidad)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions>
            <q-btn no-caps label="Guardar" type="submit" color="primary" />
            <q-btn
              no-caps
              label="Cancelar"
              color="primary"
              flat
              @click="closeModal()"
            />
          </q-card-actions>
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
    return {}
  },
  methods: {
    async updateUnidad (req, res) {
      let params = {
        nombre_unidad: this.apiedit.nombre_unidad,
        descripcion_unidad: this.apiedit.descripcion_unidad,
        cantidad_unidad: this.apiedit.cantidad_unidad,
        status_unidad: this.apiedit.status_unidad
      }
      let persistent = false
      try {
        let updatedit = await axios.put(
          Global.url + 'unidad/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updatedit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Unidad de medidad actualizada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        //console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la unidad de medida!',
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
