<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12 q-pt-none">
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
                @click="openModal(), editEmpresa(props.row.id)"
              />

              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deleteEmpresa(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editempresa"
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
    name: 'nombre_empre',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_empre,
    format: val => `${val}`
  },
  {
    name: 'rif_empre',
    align: 'center',
    label: 'Rif',
    field: 'rif_empre'
  },
  {
    name: 'representante_empre',
    align: 'center',
    label: 'Representante',
    field: 'representante_empre'
  },
  {
    name: 'tlf_local_empre',
    align: 'center',
    label: 'Telefono de Conctacto',
    field: 'tlf_local_empre'
  },
  {
    name: 'tipo_empre',
    align: 'center',
    label: 'Tipo',
    field: 'tipo_empre'
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
      editempresa: {}
    }
  },

  props: ['papiList'],

  methods: {
    async deleteEmpresa (req, res) {
      try {
        let list = await axios.delete(
          Global.url + 'empresa/delete/' + `${req}`,
          Headers
        )
        if (list.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Empresa Eliminado!',
            color: 'positive',
            position: 'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Esta Persona esta Asociada A un Proveedor o Cliente!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    openModal () {
      this.persistent = true
    },
    async editEmpresa (req, res) {
      try {
        let lista = await axios.get(
          Global.url + 'empresa/show/' + `${req}`,
          Headers
        )
        this.editempresa = lista.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
