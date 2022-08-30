<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar Producto</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form id="form" @submit.prevent="updateProducto(), closeModal()">
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
            >
              <q-input
                dense
                filled
                v-model="apiedit.nombre_prod"
                standout
                bg-color="accent"
                label="Nombre del Producto"
                hint="Nombre Identificatorio"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Escriba el Nombre']"
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
                v-model="apiedit.descripcion_prod"
                label="Breve Descripción"
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
                v-model="apiedit.codigo_prod"
                label="Codificación"
                hint=" Codigo Identificatorio"
                lazy-rules
                min="0"
                :rules="[val => val !== null && val !== '' || 'Escriba el Código']"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-input>
            </div>
          </div>
          <div class="row">
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
                v-model="apiedit.categoriaId"
                :options="apicategoria"
                :option-label="
                  apicategoria =>
                    apicategoria === null ? null : apicategoria.nombre_categoria
                "
                :option-value="
                  apicategoria =>
                    apicategoria === null ? null : apicategoria.id
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Categoria"
                hint="Seleccione Categoria"
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
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
            >
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="apiedit.presentacionProdId"
                :options="apipresent"
                :option-label="
                  apipresent =>
                    apipresent === null ? null : apipresent.nombre_present
                "
                :option-value="
                  apipresent => (apipresent === null ? null : apipresent.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Prsentación"
                hint="Seleccione Prsentación"
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
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
            >
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="apiedit.bodegaId"
                :options="apibodega"
                :option-label="
                  apibodega =>
                    apibodega === null ? null : apibodega.nombre_bodega
                "
                :option-value="
                  apibodega => (apibodega === null ? null : apibodega.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Bodega"
                hint="Seleccione Bodega"
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
          <div class="col-12 q-pt-md">
            <q-btn label="Guardar" type="submit" color="primary" />
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
    return {
      apicategoria: [],
      apipresent: [],
      apibodega: []
    }
  },

  mounted () {
    this.listCategoria()
    this.listBodega()
    this.listPresent()
  },
  computed: {
    codigo () {
      return this.apiedit.codigo_prod
    }
  },
  methods: {
    async updateProducto (req, res) {
      let params = {
        nombre_prod: this.apiedit.nombre_prod,
        descripcion_prod: this.apiedit.descripcion_prod,
        codigo_prod: this.apiedit.codigo_prod,
        bodegaId: this.apiedit.bodegaId,
        categoriaId: this.apiedit.categoriaId,
        presentacionProdId: this.apiedit.presentacionProdId
      }
      try {
        let updatedit = await axios.put(
          Global.url + 'producto/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (updatedit.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto Actualizado!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(params)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar el Producto!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    closeModal () {
      let persistent = false
      this.$emit('closeModel', persistent)
      //console.log(this.persistent)
    },
    async listCategoria (req, res) {
      try {
        let list2 = await axios.get(Global.url + 'categoria/list', Headers)
        this.apicategoria = list2.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    },
    async listBodega (req, res) {
      try {
        let list3 = await axios.get(Global.url + 'bodega/list', Headers)
        this.apibodega = list3.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    },

    async listPresent (req, res) {
      try {
        let list4 = await axios.get(Global.url + 'presentacion/list', Headers)
        this.apipresent = list4.data
      } catch (error) {
        throw new Error('error en la consulta', error)
      }
    }
  }
}
</script>
