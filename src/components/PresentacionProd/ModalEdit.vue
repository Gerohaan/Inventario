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
      style="width: 500px; max-width: 80vw;"
    >
      <q-card-section>
        <div class="text-h6">Editar presentación</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updatePresentacion(), closeModal()">
          <div class="row q-col-gutter-md">
            <div class="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
              <q-input
                dense
                filled
                v-model="apiedit.nombre_present"
                standout
                bg-color="accent"
                label="Nombre"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba presentación'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
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
                v-model="apiedit.abreviatura_present"
                label="Abreviatura"
                hint=" Abreviatura Identificatoria"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Abreviatura'
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
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="apiedit.unidadMedidadId"
                :options="apilista"
                :option-label="
                  apilista =>
                    apilista === null ? null : apilista.nombre_unidad
                "
                :option-value="
                  apilista => (apilista === null ? null : apilista.id)
                "
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
                v-model="apiedit.descripcion_present"
                label="Descripción"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba Descripción'
                ]"
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
                v-model="apiedit.status_present"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione Estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_present)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions align="right">
            <q-btn label="Guardar" no-caps type="submit" color="primary" />
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
    apiedit: '',
    apilista: Array
  },
  name: 'ModalEdit',
  data () {
    return {}
  },
  methods: {
    async updatePresentacion (req, res) {
      let params = {
        nombre_present: this.apiedit.nombre_present,
        descripcion_present: this.apiedit.descripcion_present,
        unidadMedidadId: this.apiedit.unidadMedidadId,
        abreviatura_present: this.apiedit.abreviatura_present,
        status_present: this.apiedit.status_present
      }
      let persistent = false
      try {
        let updatedit = await axios.put(
          Global.url + 'presentacion/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updatedit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Presentación del producto actualizada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la presentación!',
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
