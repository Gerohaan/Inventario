<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="papiList"
          column-sort-order="ad"
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
                @click="openModal(), editPago(props.row.id)"
              />

              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deletePago(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editApi"
      @closeModel="persistent = $event"
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
    name: 'nombre_pago',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_pago,
    format: val => `${val}`,
  },
  {
    name: 'descripcion_pago',
    align: 'center',
    label: 'Detalle',
    field: 'descripcion_pago',
  },
  {
    name: 'status_pago',
    align: 'center',
    label: 'Estado',
    field: 'status_pago',
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
    async deletePago (req, res) {
      try {
        let list = await axios.delete(
          Global.url + 'formaPago/delete/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Forma de pago eliminada!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
       // console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar forma de pago!',
          color: 'warning',
          position: 'center'
        })
      }
    },

    async  editPago(req, res) {
      try {
        let lista = await axios.get(
          Global.url + 'formaPago/show/' + `${req}`,
          Headers
        )
        this.editApi = lista.data
      } catch (error) {
        throw new Error('error en la consulta', error)
        //console.log(error)
      }
    },

    openModal () {
      this.persistent = true
    }
  }
}
</script>
