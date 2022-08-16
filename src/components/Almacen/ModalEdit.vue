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
        <q-form id="form" @submit.prevent="updateBodega()">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
            >
              <q-input
                dense
                filled
                v-model="apiedit.nombre_bodega"
                standout
                bg-color="accent"
                label="Nombre de la Bodega"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba la Bodega']"
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
                v-model="apiedit.descripcion_bodega"
                label="Breve Descripción"
                hint="Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba la Descripción'
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
                v-model="apiedit.ubicacion_bodega"
                label="Ubicación de la Bodega"
                hint="Dirección"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba la Dirección'
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
                v-model="apiedit.status_bodega"
                label="Status"
              ></q-toggle>
              <div class="q-px-sm">
                Seleccione Un Status:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_bodega)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>

          <div class="col-12 q-pt-md">
            <q-btn
              label="Guardar"
              type="submit"
              color="primary"
              v-close-popup
            />
            <q-btn
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              v-close-popup
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
      nombre_bodega: this.apiedit.nombre_bodega,
      descripcion_bodega: this.apiedit.descripcion_bodega,
      ubicacion_bodega: this.apiedit.ubicacion_bodega,
      status_bodega: this.apiedit.status_bodega
    }
  },
  methods: {
    async updateBodega (req, res) {
      let params = {
      nombre_bodega: this.apiedit.nombre_bodega,
      descripcion_bodega: this.apiedit.descripcion_bodega,
      ubicacion_bodega: this.apiedit.ubicacion_bodega,
      status_bodega: this.apiedit.status_bodega
      }
      let persistent = false
      try {
        let updatedit = await axios.put(
          Global.url + 'bodega/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updatedit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Bodega Actualizada!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar la Bodega!',
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
