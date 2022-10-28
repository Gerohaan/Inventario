<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pa-md">
    <q-card>
      <q-card-section class="q-pa-none">
        <q-table
          :rows="apiList"
          :columns="columns"
          row-key="id"
          dense
          :filter="filter"
          :pagination="initialPagination"
          class="text-center box-shadow"
          flat
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
                @click="openModal(), editPersona(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deletePersona(props.row.id)"
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
    name: 'nacionalidad_per',
    required: true,
    label: 'Nacionalidad',
    align: 'center',
    field: row => row.nacionalidad_per,
    format: val => `${val}`,
  },
  {
    name: 'documento_per',
    align: 'center',
    label: 'Cedula',
    field: 'documento_per'
  },
  {
    name: 'nombres_per',
    label: 'Nombres',
    align: 'center',
    field: 'nombres_per'
  },
  {
    name: 'apellidos_per',
    label: 'Apellidos',
    align: 'center',
    field: 'apellidos_per'
  },
  {
    name: 'tlf_per',
    label: 'Teléfono',
    align: 'center',
    field: 'tlf_per'
  },
  {
    name: 'direccion_per',
    label: 'Dirección',
    align: 'center',
    field: 'direccion_per'
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
    async editPersona (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'persona/show/' + `${req}`,
          Headers
        )
        this.editApi = list.data
      } catch (error) {
        console.log(error)
      }
    },
    openModal () {
      this.persistent = true
    },

    async deletePersona (req, res) {
      try {
        let lista = await axios.delete(
          Global.url + 'persona/delete/' + `${req}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
          type: 'positive',
          message: 'Persona Eliminada!',
          color: 'positive',
          position: 'center'
        })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Esta Empresa esta Asociada A un Proveedor!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  },
  props: ['apiList']
}
</script>
