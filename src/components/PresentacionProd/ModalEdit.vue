<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar Bodega</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updatePresentacion()">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
            >
              <q-input
                dense
                filled
                v-model="apiedit.nombre_present"
                standout
                bg-color="accent"
                label="Nombre de la Presentación"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba la Presentación'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.descripcion_present"
                label="Breve Descripción de la Presentación"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba la Presentación'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.abreviatura_present"
                label="Abreviatura de la Presentación"
                hint=" Abreviatura Identificatoria"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba la Abreviatura'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
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
                label="Unidad de Medidad"
                hint="Seleccione Unidad"
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
          </div>
          <div class="row">
            <div
              class="
              col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12
              q-pr-md q-pt-md
            "
            >
              <q-toggle
                left-label
                icon="task_alt"
                true-value="ACTIVO"
                false-value="INACTIVO"
                v-model="apiedit.status_present"
                label="Status"
              ></q-toggle>
              <div class="q-px-sm">
                Seleccione Un Status:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_present)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>

          <div class="col-12 q-pt-md">
            <q-btn label="Guardar" type="submit" color="primary" v-close-popup/>
            <q-btn
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              @click="closeModal()"
              v-close-popup
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
            message: 'Presentación del Producto Actualizada!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar la Presentación!',
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
