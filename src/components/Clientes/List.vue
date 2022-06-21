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
              />
              <q-btn
                flat
                dense
                icon="edit"
                size="xs"
                color="primary"
                class="q-ma-none"
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
  </div>
</template>

<script>
const columns = [
  {
    name: 'nac_client',
    required: true,
    label: 'Nacionalidad',
    align: 'left',
    field: row => row.nac_client,
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'cedula_client',
    align: 'center',
    label: 'Cedula',
    field: 'cedula_client'
  },
  {
    name: 'nombre_client',
    label: 'Nombres',
    align: 'center',
    field: 'nombre_client'
  },
  {
    name: 'apellido_client',
    label: 'Apellidos',
    align: 'center',
    field: 'apellido_client'
  },
  {
    name: 'razonsocial_client',
    label: 'Razón Social',
    align: 'center',
    field: 'razonsocial_client'
  },
  {
    name: 'tlf_client',
    label: 'Telefono',
    align: 'center',
    field: 'tlf_client'
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

  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns,
      rows,
      filter: ''
    }
  },
  props: ['pcapiList']
}
</script>
