<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="papiList"
          column-sort-order="ad"
          :columns="columns"
          :row-key="row => row.id"
          separator="none"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-lg q-mt-sm"
              standouts
              round
              bg-color="accent"
              dense
              debounce="300"
              v-model="filter"
              placeholder="Búsqueda"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                icon="visibility"
                size="xs"
                class="q-ma-none"
                color="primary"
                @click="openModal(), editCategoria(props.row.id)"
              />

              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteCategoria(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editApi"
      @closeModel="persistent"
    >
    </ModalEdit>
  </div>
</template>

<script>
import ModalEdit from './ModalEdit.vue'
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

const columns = [
  {
    name: 'nombre_categoria',
    required: true,
    label: 'Nombre Categorias',
    align: 'center',
    field: row => row.nombre_categoria,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'detalle_categoria',
    align: 'center',
    label: 'Detalle Categorias',
    field: 'detalle_categoria',
    sortable: true
  },
  {
    name: 'status_categoria',
    align: 'center',
    label: 'Status Categorias',
    field: 'status_categoria',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Acciones'
  }
]

const rows = []
export default {
  name: 'List',
  components: {
    ModalEdit
  },

  data () {
    return {
      persistent: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      editApi: {},
      columns,
      rows,
      filter: ''
    }
  },

  props: ['papiList'],

  methods: {
    async deleteCategoria (req, res) {
      try {
        let list = await axios.delete(
          Global.url + 'categoria/delete/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Categoria Eliminada!',
            color: 'positive'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar Categoria!',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async editCategoria (req, res) {
      try {
        let lista = await axios.get(
          Global.url + 'categoria/show/' + `${req}`,
          Headers
        )
        this.editApi = lista.data
      } catch (error) {
        console.log(error)
      }
    },

    openModal () {
      this.persistent = true
    }
  }
}
</script>
