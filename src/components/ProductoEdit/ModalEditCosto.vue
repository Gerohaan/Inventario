<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar producto</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updatestock(), closeModal()">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
            >
              <q-input
                disable
                dense
                type="number"
                min="0"
                filled
                v-model="apiedit.cantidad_inicial"
                standout
                bg-color="accent"
                label="Cantidad inicial"
                hint="Stock inicial"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Escriba stock inicial'
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
                disable
                type="number"
                min="0"
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.cantidad_actual"
                label="Cantidad actual"
                hint="Stock Actual"
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || 'Escriba stock actual'
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
                type="number"
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.cantidad_reservda"
                label="Notificación"
                hint="Sin Stock antes de:"
                lazy-rules
                min="0"
                :rules="[
                  val => (val !== null && val !== '') || 'Escriba notificación'
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
    apiedit: '',
    apilista: Array
  },
  name: 'ModalEditCosto',
  data () {
    return {
      apicategoria: [],
      apipresent: [],
      apibodega: []
    }
  },

  methods: {
    async updatestock (req, res) {
      let params = {
        //cantidad_inicial: this.apiedit.cantidad_inicial,
        //cantidad_actual: this.apiedit.cantidad_actual,
        cantidad_reservda: this.apiedit.cantidad_reservda,
        productoId: this.apiedit.productoId
      }
      try {
        let updatedit = await axios.put(
          Global.url + 'stock/update/' + `${this.$route.params.id}`,
          params,
          Headers
        )

        if (updatedit.status === 200) {
          console.log(this.$route.params.id)
          Notify.create({
            type: 'positive',
            message: 'Stock actualizado!',
            color: 'positive',
            position:'bottom-right'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar el stock!',
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
