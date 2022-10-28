<template>
  <div class="col-md-8 col-lg-8 col-xs-12 col-sm-12">
    <q-card flat>
      <q-card-section>
        <q-table
          :rows="vialist"
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
                @click="openModal(), editPresent(props.row.id)"
              />
              <q-btn
                flat
                dense
                icon="delete"
                size="xs"
                color="primary"
                class="q-ma-none"
                @click="deletePresent(props.row.id)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <ModalEdit
      :persistent="persistent"
      :apiedit="this.editApi"
      :apilista="this.apilista"
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
    name: 'nombre_present',
    required: true,
    label: 'Nombre',
    align: 'center',
    field: row => row.nombre_present,
    format: val => `${val}`,
  },
  {
    name: 'descripcion_present',
    align: 'center',
    label: 'Descripción',
    field: 'descripcion_present'
  },
  {
    name: 'UnidadMedidad.nombre_unidad',
    label: 'Unidad de medidad',
    align: 'center',
    field: row => row.UnidadMedidad.nombre_unidad
  },
  {
    name: 'abreviatura_present',
    label: 'Abrevitura',
    align: 'center',
    field: 'abreviatura_present'
  },
  {
    name: 'status_present',
    label: 'Estado',
    align: 'center',
    field: 'status_present'
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
  props: ['vialist','apilista'],
  methods: {
    async editPresent (req, res) {
      try {
        let list = await axios.get(
          Global.url + 'presentacion/show/' + `${req}`,
          Headers
        )
        this.editApi = list.data
      } catch (error) {
        throw new Error('error en la consulta', error)
        //console.log(error)
      }
    },
    openModal () {
      this.persistent = true
    },
    async deletePresent (req, res) {
      try {
        let lista = await axios.delete(
          Global.url + 'presentacion/delete/' + `${req}`,
          Headers
        )
        if (lista.status === 200) {
          Notify.create({
            type: 'positive',
            message: 'Presentación del producto eliminada!',
            color: 'positive',
            position:'bottom-right'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar eliminar presentación del producto!',
          color: 'warning',
          position: 'center'
        })
      }
    }
  }
}
</script>
