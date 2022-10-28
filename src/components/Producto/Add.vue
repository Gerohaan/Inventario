<template>
  <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pa-md">
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar producto
            </div>
          </q-card-section>
        </div>

        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="addProducto()" @reset="onReset">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="nombre_prod"
              label="Nombre"
              hint="Nombre Identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba nombre']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="costo_prod"
              label="Precio costo"
              hint="Valor inicial"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba precio costo'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="precio_prod"
              label="Precio venta"
              hint="Valor de venta"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba precio venta'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="codigo_prod"
              label="Código"
              hint="Numero identificatorio"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba código']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              type="number"
              min="0"
              standout
              bg-color="accent"
              filled
              v-model="impuesto_prod"
              label="Impuesto"
              hint="Impuesto agregado"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba impuesto']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="utilidad_prod"
              label="Utilidad"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba utilidad']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              standout
              bg-color="accent"
              filled
              v-model="descripcion_prod"
              label="Descripción"
              hint="Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba descripción']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              dense
              filled
              v-model="categoriaId"
              :options="apicategoria"
              :option-label="
                apicategoria =>
                  apicategoria === null ? null : apicategoria.nombre_categoria
              "
              :option-value="
                apicategoria => (apicategoria === null ? null : apicategoria.id)
              "
              @filter="filterFn"
              emit-value
              map-options
              standout
              bg-color="accent"
              label="Categoria "
              hint="Seleccione categoria"
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
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              standout
              bg-color="accent"
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
              filled
              v-model="bodegaId"
              label="Bodega"
              hint="Seleccione una Bodega"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <q-select
              dense
              standout
              bg-color="accent"
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
              filled
              v-model="presentacionProdId"
              label="Presentación"
              hint="Seleccione presentación"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="person" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="col col-12 q-pt-xs">
          <p class="text-subtitle2">Stock</p>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              type="number"
              standout
              bg-color="accent"
              filled
              v-model="cantidad_inicial"
              label="Cantidad inicial"
              hint="Valor inicial"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba cantidad inicial'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <q-input
              dense
              min="0"
              standout
              type="number"
              bg-color="accent"
              filled
              v-model="cantidad_reservda"
              label="Notificación"
              hint="Alerta sin stock"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Escriba alerta',
                //val =>  ( val === -(val))|| 'No se aceptan Numeros Negativos',
                val =>
                  val < cantidadinicial ||
                  'Debe indicar un valor menor a la cantidad inicial'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>
        </div>
        <q-card-actions class="q-pt-md">
          <q-btn label="Guardar" no-caps type="submit" color="primary" />
          <q-btn
            no-caps
            label="Limpiar"
            type="reset"
            color="primary"
            flat

          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'
export default {
  name: 'Add',
  props: ['apicategoria', 'apibodega', 'apipresent'],

  data () {
    return {
      nombre_prod: null,
      descripcion_prod: null,
      costo_prod: null,
      precio_prod: null,
      codigo_prod: null,
      impuesto_prod: null,
      utilidad_prod: null,
      bodegaId: null,
      categoriaId: null,
      presentacionProdId: null,
      cantidad_inicial: null,
      cantidad_reservda: null
    }
  },
  computed: {
    cantidadinicial () {
      return this.cantidad_inicial
    },
    notificacion () {
      return this.cantidad_reservda
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.nombre_prod = null
      this.descripcion_prod = null
      this.costo_prod = null
      this.precio_prod = null
      this.codigo_prod = null
      this.impuesto_prod = null
      this.utilidad_prod = null
      this.bodegaId = null
      this.categoriaId = null
      this.presentacionProdId = null
      this.cantidad_inicial = null
      this.cantidad_reservda = null
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.apipersona
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.apipersona.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    async addProducto (req, res) {
      let params = {
        nombre_prod: this.nombre_prod,
        descripcion_prod: this.descripcion_prod,
        costo_prod: this.costo_prod,
        precio_prod: this.precio_prod,
        codigo_prod: this.codigo_prod,
        impuesto_prod: this.impuesto_prod,
        utilidad_prod: this.utilidad_prod,
        bodegaId: this.bodegaId,
        categoriaId: this.categoriaId,
        presentacionProdId: this.presentacionProdId,
        cantidad_inicial: this.cantidad_inicial,
        cantidad_reservda: this.cantidad_reservda
      }

      try {
        const add = await axios.post(
          Global.url + 'producto/add',
          params,
          Headers
        )
        if (add.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Producto agregado!',
            color: 'positive',
            position: 'bottom-right'
          })
          this.onReset()
        }
      } catch (error) {
        // throw new Error('error en la consulta', error)
        //console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error con el servidor!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
