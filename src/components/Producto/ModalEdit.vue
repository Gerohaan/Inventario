<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-secondary text-white" style="width: 700px">
      <q-card-section>
        <div class="text-h6">Editar Proveedor</div>
      </q-card-section>
      <!-- <pre>{{apipersona}}</pre>
 -->
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="updateProveedor()">
          <div class="row">
            <div class="col q-pt-none q-pl-md q-pr-md q-pb-md">
              <div class="q-gutter-sm">
                <q-radio
                  dense
                  v-model="apiedit.status_prov"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="ACTIVO"
                  label="ACTIVO"
                />
                <q-radio
                  dense
                  v-model="apiedit.status_prov"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="INACTIVO"
                  label="INACTIVO"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md"
            >
              <q-select
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                dense
                filled
                v-model="apiedit.personaId"
                :options="apipersona"
                :option-label="
                  apipersona =>
                    apipersona === null
                      ? null
                      : apipersona.nombres_per + ' ' + apipersona.apellidos_per
                "
                :option-value="
                  apipersona => (apipersona === null ? null : apipersona.id)
                "
                emit-value
                map-options
                standout
                bg-color="accent"
                label="Persona "
                hint="Seleccione Persona"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-pr-md q-pt-md"
            >
              <q-select
                dense
                standout
                bg-color="accent"
                v-model="apiedit.empresaId"
                :options="apiempresa"
                :option-label="
                  apiempresa =>
                    apiempresa === null
                      ? null
                      : apiempresa.nombre_empre +
                        '  Rif:' +
                        apiempresa.rif_empre
                "
                :option-value="
                  apiempresa => (apiempresa === null ? null : apiempresa.id)
                "
                emit-value
                map-options
                filled
                label="Empresa"
                hint="Seleccione una Empresa"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="person" />
                </template>
              </q-select>
            </div>
          </div>

          <div class="col-12 q-pr-md q-pt-md">
            <q-input
              dense
              standout="bg-teal text-blue"
              color="black"
              bg-color="accent"
              v-model="apiedit.detalle_prov"
              label="Detalles"
              hint="Escriba Algún detalle"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Razón Social no Valida'
              ]"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="storefront" />
              </template>
            </q-input>
          </div>

          <div class="col-12 q-pt-md">
            <q-btn label="Guardar" type="submit" color="primary" v-close-popup />
            <q-btn
              label="Cancelar"
              color="primary"
              flat
              class="q-ml-sm"
              @click="closeModal()"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { Headers } from '../../../Headers'
import axios from 'axios'
import { Global } from '../../Global'
import { Notify } from 'quasar'

export default {
  props: {
    persistent: Boolean,
    apiedit: '',
    apipersona: Array,
    apiempresa: Array
  },
  name: 'ModalEdit',
  data () {
    return {}
  },
  methods: {
    async updateProveedor (req, res) {
      let params = {
        personaId: this.apiedit.personaId,
        empresaId: this.apiedit.empresaId,
        status_prov: this.apiedit.status_prov,
        detalle_prov: this.apiedit.detalle_prov
      }
      let persistent = false
      try {
        let edit = await axios.put(
          Global.url + 'proveedor/update/' + `${this.apiedit.id}`,
          params,
          Headers
        )

        if (edit.status === 200) {
          this.$emit('closeModel', persistent)
          Notify.create({
            type: 'positive',
            message: 'Proveedor Actualizado!',
            color: 'positive'
            //position:'center'
          })
        }
      } catch (error) {
        console.log(error)
        Notify.create({
          type: 'warning',
          message: 'Error al intentar Actualizar el Proveedor!',
          color: 'warning',
          position: 'center'
        })
      }
    },
    closeModal () {
      let persistent = false
      this.$emit('closeModel', persistent)
    }
  }
}
</script>
