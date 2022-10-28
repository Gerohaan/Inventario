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
        <div class="text-h6">Editar forma de pago</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit.prevent="onSubmit, updatePago(), closeModal()"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-input
                dense
                filled
                v-model="apiedit.nombre_pago"
                standout
                bg-color="accent"
                label="Forma de pago"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba forma de pago'
                ]"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="draw" />
                </template>
              </q-input>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.descripcion_pago"
                label="Detalle"
                hint="Descripción"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
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
                v-model="apiedit.status_pago"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_pago)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions align="right">
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
    return {
      nombre_pago: this.apiedit.nombre_pago,
      descripcion_pago: this.apiedit.descripcion_pago,
      status_pago: this.apiedit.status_pago
    }
  },
  methods: {
    onReset () {
      this.apiedit.nombre_pago = null
      this.apiedit.descripcion_pago = null
      this.status_pago = null
    },

    async updatePago (req, res) {
      let params = {
        nombre_pago: this.apiedit.nombre_pago,
        descripcion_pago: this.apiedit.descripcion_pago,
        status_pago: this.apiedit.status_pago
      }
      try {
        let add = await axios.put(
          Global.url + 'formaPago/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Forma de pago actualizada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        //console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la forma de pago!',
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
