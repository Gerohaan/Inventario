<template>
<q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
        <q-toolbar class="bg-blue-grey-1 text-blue-grey-7">
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="drawer = !drawer" />
            <q-toolbar-title> Inventario App </q-toolbar-title>
            <q-input rounded dense standout label="Busqueda..." bg-color="blue-grey-2" v-model="text" class="q-ml-md text-black">
                <template v-slot:append>
                    <q-icon v-if="text === ''" name="search" />
                    <q-icon v-else name="search" class="cursor-pointer" @click="text = ''" />
                </template>
            </q-input>
            <q-chip class="q-mr-sm q-ml-md">
                <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                John
            </q-chip>
            <q-btn flat round dense icon="build" class="q-mr-sm q-ml-sm" size="md" />
            <q-btn flat round dense icon="notifications" size="md" class="q-mr-sm" />
            <q-btn flat round dense icon="more_vert" size="md" />
        </q-toolbar>
    </q-header>
    <q-drawer class="bg-blue-grey-1" v-model="drawer" show-if-above :width="250" :breakpoint="0" :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true">
        <div class="relative-position text-center">
            <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" sizes="(max-width: 100px) 100w,
              " style="height: 60px; max-width: 60px" />
        </div>
        <q-list dense padding>
            <q-item active clickable v-ripple>
                <q-btn flat icon="dashboard" label="Tablero" no-caps></q-btn>
            </q-item>
            <q-expansion-item class="rounded-borders" expand-separator icon="home_work" label="Adminstración" no-caps>
                <q-expansion-item :header-inset-level="1" expand-separator icon="receipt" label="Receipts">
                    <q-expansion-item switch-toggle-side dense-toggle label="Today" :header-inset-level="1" :content-inset-level="2">
                        <q-card>
                            <q-card-section>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                                ex numquam, dolorum officiis modi facere maiores architecto
                                suscipit iste eveniet doloribus ullam aliquid.
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                    <q-expansion-item switch-toggle-side dense-toggle label="Yesterday" :header-inset-level="1" :content-inset-level="2">
                        <q-card>
                            <q-card-section>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                                ex numquam, dolorum officiis modi facere maiores architecto
                                suscipit iste eveniet doloribus ullam aliquid.
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-expansion-item>
                <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="Postponed">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                            numquam, dolorum officiis modi facere maiores architecto
                            suscipit iste eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-expansion-item>
            <q-expansion-item :content-inset-level="0.5" expand-separator icon="person" label="Terceros" no-caps>
                <q-item-section>
                    <q-btn flat icon="person_add" label="Nuevo Cliente" no-caps></q-btn>
                </q-item-section>
                <q-item-section>
                    <q-btn flat icon="group_add" label="Nuevo Proveedor" no-caps></q-btn>
                </q-item-section>
            </q-expansion-item>
            <q-expansion-item :content-inset-level="0.5" expand-separator icon="payments" label="Ventas" no-caps>
                <q-expansion-item expand-separator :content-inset-level="0.5" icon="receipt" label="Receipts">
                    <q-expansion-item label="Today" :content-inset-level="0.5">
                        <q-card>
                            <q-card-section>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                                ex numquam, dolorum officiis modi facere maiores architecto
                                suscipit iste eveniet doloribus ullam aliquid.
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                    <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                        <q-card>
                            <q-card-section>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                                ex numquam, dolorum officiis modi facere maiores architecto
                                suscipit iste eveniet doloribus ullam aliquid.
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-expansion-item>
                <q-expansion-item :content-inset-level="0.5" expand-separator icon="schedule" label="Postponed">
                    <q-card>
                        <q-card-section>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Quidem, eius reprehenderit eos corrupti commodi magni quaerat ex
                            numquam, dolorum officiis modi facere maiores architecto
                            suscipit iste eveniet doloribus ullam aliquid.
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-expansion-item>
        </q-list>
    </q-drawer>
    <q-page-container>
        <router-view />
    </q-page-container>
    <q-footer class="bg-grey-1">
        <q-card-section class="col-12 text-right no-padding">
            <div class="text-body2 col-12 text-grey-8 text-weight-bold">
                © 2020 Inventario.
                <q-btn size="10px" :icon="fabInstagram" flat dense color="grey-8"></q-btn>
                <q-btn size="10px" :icon="fabFacebook" flat dense color="grey-8"></q-btn>
                <q-btn size="10px" :icon="fabGithub" flat dense color="grey-8"></q-btn>
            </div>
        </q-card-section>
    </q-footer>
</q-layout>
</template>

<script>
import {
    fabGithub,
    fabFacebook,
    fabInstagram,
}
from "@quasar/extras/fontawesome-v6";

export default ({
    name: "MainLayout",
    data() {
        return {
            drawer: false,
            miniState: true,
            text: "",
            fabGithub,
            fabFacebook,
            fabInstagram,
        }
    },
});
</script>
