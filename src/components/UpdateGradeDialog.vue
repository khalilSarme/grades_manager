<template>
  <div class="updating_dg">
    <v-dialog persistent max-width="767px" v-model="udg">
      <form @submit.prevent>
        <v-card class="rounded-xl pa-2" elevation="0">
          <v-card-title class="d-flex align-center justify-space-between py-3">
            <h3>Edit Grade</h3>
            <v-btn icon variant="outlined" color="red" @click="fireClose()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-2 mt-2">
            <v-text-field label="Subject Name" variant="outlined" v-model="g_name"></v-text-field>

            <v-number-input label="Paractical degree" variant="outlined" v-model="g_pcl" :min="0" :max="30"></v-number-input>

            <v-number-input label="Theoretical degree" variant="outlined" v-model="g_tcl" :min="0" :max="g_pcl > 0 ? 70 : 100"></v-number-input>
          </v-card-text>
          <v-card-actions class="pb-4 px-4 d-flex justify-start" v-if="(g_name && (g_pcl || g_tcl) && (g_pcl + g_tcl <= 100))">
            <v-btn variant="elevated" elevation="0" class="rounded-xl px-5" color="primary" @click="fireUpdate()" style="text-transform: none;">
              Apply
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>
<script setup>
  import {
    inject,
    ref
  } from 'vue'

  import {
    storeToRefs
  } from 'pinia'

  import {
    initMixin
  } from '@/mixins'

  const em = inject('em')

  const udg = ref(false)

  em.on('tg_udg', () => {
    udg.value = !udg.value
  })

  const mxn = initMixin()

  const {
    g_id,
    g_name,
    g_pcl,
    g_tcl,
    grades
  } = storeToRefs(mxn)


  const fireUpdate = async () => {
    await mxn.applyUpdating(g_id.value)
    mxn.clearGradeData()
    udg.value = !udg.value
    em.emit('tg_ntfy', "Updated Successfally")
  }
  
  const fireClose = () => {
    mxn.clearGradeData()
    udg.value = !udg.value
  }

</script>