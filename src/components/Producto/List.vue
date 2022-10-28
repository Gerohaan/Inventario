<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="datapi"
          :columns="columns"
          :row-key="row => row.id"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"

        >
          <template v-slot:top-left>
            <q-input
              color="primary"
              class="text-secondary q-mb-lg q-mt-sm"
              standout
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
                @click="openModal(), editProducto(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="props.row.id;"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editApi"
      :apipersona="this.apipersona"
      :apiempresa="this.apiempresa"
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
    name: 'nombre_prod',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_prod,
    format: val => `${val}`,
  },

  {
    name: 'precio_prod',
    label: 'Precio',
    align: 'center',
    field: row => row.precio_prod
  },
  {
    name: 'codigo_prod',
    label: 'Código',
    align: 'center',
    field: row => row.codigo_prod
  },
  {
    name: 'Categoria.nombre_categoria',
    label: 'Categoria',
    align: 'center',
    field: row => row.Categoria.nombre_categoria
  },
  {
    name: 'PresentacionProd.nombre_present',
    label: 'Presentación',
    align: 'center',
    field: row => row.PresentacionProd.nombre_present
  },
  {
    name: 'Bodega.nombre_bodega',
    label: 'Bodega',
    align: 'center',
    field: row => row.Bodega.nombre_bodega
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
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows,
      filter: '',
      editApi: {}
    }
  },
  methods: {
    openModal () {
      this.persistent = true
    },
    async editProducto (req, res) {
      try {
        this.$router.push('/ProductoEdit/'+ `${req}`)
      } catch (error) {
        console.log(error)
      }
    }
  },
  props: ['datapi', 'apipersona', 'apiempresa']
}
</script>
