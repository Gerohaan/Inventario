<template>
<q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
        <q-toolbar class="bg-blue-grey-1 text-blue-grey-7">
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

            <q-toolbar-title> Quasar App </q-toolbar-title>



                <q-input rounded dense standout label="Busqueda..." bg-color="blue-grey-2" v-model="text" class="q-ml-md text-black">
                    <template v-slot:append>
                        <q-icon v-if="text === ''" name="search" />
                        <q-icon v-else name="search" class="cursor-pointer" @click="text = ''" />
                    </template>
                </q-input>
                <q-btn flat round dense icon="build" class="q-mr-sm q-ml-sm" size="md" />
                <q-btn flat round dense icon="notifications" size="md" class="q-mr-sm" />
                <q-btn flat round dense icon="more_vert" size="md" />

        </q-toolbar>
    </q-header>

    <q-drawer class="bg-blue-grey-1" v-model="leftDrawerOpen" show-if-above>
        <div align="center">
            <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 100px; height: 100px display: block" />
        </div>
        <!--  -->
        <div class="q-pa-md" style="max-width: 350px">
            <q-list dense>
                <q-expansion-item expand-separator icon="mail" label="Inbox" caption="5 unread emails" default-opened>
                    <q-expansion-item :header-inset-level="1" expand-separator icon="receipt" label="Receipts" default-opened>
                        <q-expansion-item switch-toggle-side dense-toggle label="Today" :header-inset-level="1" :content-inset-level="2">
                            <q-card>
                                <q-card-section>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Quidem, eius reprehenderit eos corrupti commodi magni
                                    quaerat ex numquam, dolorum officiis modi facere maiores
                                    architecto suscipit iste eveniet doloribus ullam aliquid.
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-expansion-item switch-toggle-side dense-toggle label="Yesterday" :header-inset-level="1" :content-inset-level="2">
                            <q-card>
                                <q-card-section>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Quidem, eius reprehenderit eos corrupti commodi magni
                                    quaerat ex numquam, dolorum officiis modi facere maiores
                                    architecto suscipit iste eveniet doloribus ullam aliquid.
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-expansion-item>

                    <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="Postponed">
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

                <q-expansion-item :content-inset-level="0.5" expand-separator icon="mail" label="Inbox" caption="5 unread emails" default-opened>
                    <q-expansion-item expand-separator :content-inset-level="0.5" icon="receipt" label="Receipts">
                        <q-expansion-item label="Today" :content-inset-level="0.5">
                            <q-card>
                                <q-card-section>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Quidem, eius reprehenderit eos corrupti commodi magni
                                    quaerat ex numquam, dolorum officiis modi facere maiores
                                    architecto suscipit iste eveniet doloribus ullam aliquid.
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-expansion-item label="Yesterday" :content-inset-level="0.5">
                            <q-card>
                                <q-card-section>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Quidem, eius reprehenderit eos corrupti commodi magni
                                    quaerat ex numquam, dolorum officiis modi facere maiores
                                    architecto suscipit iste eveniet doloribus ullam aliquid.
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-expansion-item>

                    <q-expansion-item :content-inset-level="0.5" expand-separator icon="schedule" label="Postponed">
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
            </q-list>
        </div>
    </q-drawer>
    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import {
    defineComponent,
    ref
} from "vue";

export default defineComponent({
    name: "MainLayout",

    setup() {
        const leftDrawerOpen = ref(false);

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            drawer: false,
            miniState: true,
            text: ''

        };
    },
});
</script>
