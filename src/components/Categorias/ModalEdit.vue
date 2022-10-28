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
        <div class="text-h6">Editar categoria</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit.prevent="onSubmit, updateCategoria(), closeModal()"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <q-input
                dense
                filled
                v-model="apiedit.nombre_categoria"
                standout
                bg-color="accent"
                label="Categoria"
                hint="Nombre identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba categoria']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <q-input
                dense
                standout
                bg-color="accent"
                filled
                v-model="apiedit.detalle_categoria"
                label="Detalle"
                hint="Descripción"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba detalle']"
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
                v-model="apiedit.status_categoria"
                label="Estado"
              ></q-toggle>
              <div>
                Seleccione estado:
                <strong>
                  <q-chip outline text-color="primary ">{{
                    JSON.stringify(apiedit.status_categoria)
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
                class="q-ml-sm"
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
            message: 'Categoria actualizada!',
            color: 'positive',
            position: 'botton-right'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar actualizar la categoria!',
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
