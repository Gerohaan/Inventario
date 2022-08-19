<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="pcapiList"
          :columns="columns"
          :row-key="row => row.id"
          separator="none"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
          style="margin: 10px 0px 0px 20px"
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
                @click="openModal(), editarCliente(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteCliente(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editcliente"
      :apipersona="this.apiList"
      @closeModel="persistent"
    >
    </ModalEdit>
    <!--     <pre>{{apiList}}</pre>
 -->
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
    name: 'Persona.nombres_per',
    required: true,
    label: 'Cliente',
    align: 'left',
    field: row => row.Persona.nombres_per,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'Persona.documento_per',
    align: 'center',
    label: 'Cedula',
    field: row => row.Persona.documento_per
  },
  {
    name: 'detalle_client',
    label: 'Detalle del Cliente',
    align: 'center',
    field: 'detalle_client'
  },
  {
    name: 'status_client',
    label: 'Status Cliente',
    align: 'center',
    field: 'status_client'
  },
  {
    name: 'tipo_client',
    label: 'Tipo Cliente',
    align: 'center',
    field: 'tipo_client'
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
      editcliente: {}
    }
  },
  methods: {
    async editarCliente (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'cliente/show/' + `${req}`,
          Headers
        )
        this.editcliente = list.data
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCliente (req, res) {
      try {
        let lista = await axios.delete(
          Global.url + 'cliente/delete/' + `${req}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Cliente Eliminado!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Este Cliente esta Asociado a un Proveedor!',
          color: 'warning',
          position: 'center'
        })
      }
    },

    openModal () {
      this.persistent = true
    }
  },
  props: ['pcapiList', 'apiList']
}
</script>
