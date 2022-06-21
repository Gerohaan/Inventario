<template>
  <div
    class="col col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 q-pl-md q-pr-lg q-pt-md"
  >
    <q-card class="my-card q-pa-md box-shadow">
      <div class="row">
        <div class="col col-md-12 col-lg-12 col-xs-12 col-sm-12">
          <q-card-section>
            <div class="col text-center text-primary text-bold text-h5">
              Agregar Categorias
            </div>
          </q-card-section>
        </div>
        <div class="col-12 text-left">
          <p class="text-subtitle2">Caracteristicas</p>
        </div>
      </div>

      <q-form @submit.prevent="onSubmit, addCategoria()" @reset="onReset">
        <div class="row">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-sm"
          >
            <q-input
              dense
              filled
              v-model="nombre_categoria"
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
              v-model="detalle_categoria"
              label="Detalle de la Categoria"
              hint="Breve Descripción"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Escriba El Detalle']"
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
              v-model="status_categoria"
              label="Status"
            ></q-toggle>
            <div class="q-px-sm">
              Seleccione Un Status:
              <strong>
                <q-chip outline text-color="primary ">{{
                  JSON.stringify(status_categoria)
                }}</q-chip></strong
              >
            </div>
          </div>
        </div>

        <div class="col-12 q-pt-md">
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn
            label="Limpiar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
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
  data () {
    return {
      shape: 'line',
      nombre_categoria: null,
      detalle_categoria: null,
      model: null,
      status_categoria: '',
      apiAdd: []
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
      this.nombre_categoria = null
      this.detalle_categoria = null
      this.status_categoria = null
    },

    async addCategoria (req, res) {
      let params = {
        nombre_categoria: this.nombre_categoria,
        detalle_categoria: this.detalle_categoria,
        status_categoria: this.status_categoria
      }
      try {
        let add = await axios.post(
          Global.url + 'categoria/add',
          params,
          Headers
        )
        this.apiAdd = add.data

        if(add.status === 200){
          Notify.create({
            type:'positive',
            message: 'Categoria Agregada!',
            color:'positive',
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
            type:'warning',
            message: 'Error al intentar eliminar la Categoria!',
            color:'warning',
            position:'center'
          })
      }
    }
  }
}
</script>
