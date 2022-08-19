<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar Categoria</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="onSubmit, updateCategoria()" @reset="onReset">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
            >
              <q-input
                dense
                filled
                v-model="apiedit.nombre_categoria"
                standout
                bg-color="accent"
                label="Nombre de la Categoria"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba El Nombre']"
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
                v-model="apiedit.detalle_categoria"
                label="Detalle de la Categoria"
                hint="Breve Descripción"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Escriba El Detalle'
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
                v-model="apiedit.status_categoria"
                label="Status"
              ></q-toggle>
              <div class="q-px-sm">
                Seleccione Un Status:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_categoria)
                  }}</q-chip></strong
                >
              </div>
            </div>
          </div>
          <q-card-actions align="right" class="bg-white text-teal">
            <div class="col-12 q-pt-md">
              <q-btn
                label="Enviar"
                type="submit"
                color="primary"
                v-close-popup
              />
              <q-btn
                label="Cancelar"
                color="primary"
                flat
                class="q-ml-sm"
                @click="closeModal()"
                v-close-popup
              />
            </div>
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
      nombre_categoria: this.apiedit.nombre_categoria,
      detalle_categoria: this.apiedit.detalle_categoria,
      status_categoria: this.apiedit.status_categoria
    }
  },
  methods: {
    onReset () {
      this.nombre_categoria = null
      this.apiedit.detalle_categoria = null
      this.status_categoria = null
    },

    async updateCategoria (req, res) {
      let params = {
        nombre_categoria: this.apiedit.nombre_categoria,
        detalle_categoria: this.apiedit.detalle_categoria,
        status_categoria: this.apiedit.status_categoria
      }
      let persistent = false
      try {
        let updateCategoria = await axios.put(
          Global.url + 'categoria/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updateCategoria.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Categoria Actualizada!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar la Categoria!',
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
