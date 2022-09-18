<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="datapi"
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
                @click="openModal(), editProveedor(props.row.id)"
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
    name: 'Empresa.rif_empre',
    required: true,
    label: 'Rif empresa',
    align: 'center',
    field: row => row.Empresa.rif_empre,
    format: val => `${val}`,
  },

  {
    name: 'Persona.nombres_per',
    label: 'Nombres',
    align: 'center',
    field: row => row.Persona.nombres_per
  },
  {
    name: 'Persona.apellidos_per',
    label: 'Apellidos',
    align: 'center',
    field: row => row.Persona.apellidos_per
  },
  {
    name: 'Persona.tlf_per',
    label: 'Teléfono',
    align: 'center',
    field: row => row.Persona.tlf_per
  },
  {
    name: 'status_prov',
    label: 'Estado',
    align: 'center',
    field: 'status_prov'
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
    async editProveedor (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'proveedor/show/' + `${req}`,
          Headers
        )
        this.editApi = list.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  props: ['datapi', 'apipersona','apiempresa']
}
</script>
