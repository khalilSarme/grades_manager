<template>
  <div class="adding_dg">
    <v-dialog persistent v-model="adg" max-width="767px">
      <form @submit.prevent>
        <v-card class="rounded-xl pa-2" elevation="0">
          <v-card-title class="d-flex align-center justify-space-between py-3">
            <h3>Register A new grade</h3>
            <v-btn icon variant="outlined" color="red" @click="adg = !adg">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="px-2 mt-2">
            <v-text-field label="Subject Name" variant="outlined" v-model="g_name"></v-text-field>
            
            <v-number-input label="Paractical degree" variant="outlined" v-model="g_pcl" :min="0" :max="30"></v-number-input>
            
            <v-number-input label="Theoretical degree" variant="outlined" v-model="g_tcl" :min="0" :max="g_pcl > 0 ? 70 : 100"></v-number-input>
          </v-card-text>
          <v-card-actions class="d-flex align-center justify-space-between pb-4 px-4" v-if="(g_name && (g_pcl >= 0 || g_tcl >= 0) && (g_pcl + g_tcl <= 100))">
            <v-btn variant="elevated" elevation="0" class="rounded-xl px-5" color="primary" @click="fireReg()" style="text-transform: none">
              Register
            </v-btn>
            <v-btn variant="outlined" color="grey" class="rounded-xl px-5" @click="mxn.clearGradeData()" style="text-transform: none">
              Clear
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

  const adg = ref(false)

  em.on('tg_adg', () => {
    adg.value = !adg.value
  })

  const mxn = initMixin()

  const {
    g_name,
    g_pcl,
    g_tcl,
  } = storeToRefs(mxn)

  const fireReg = async () => {
    await mxn.AddNewGrade()
    mxn.clearGradeData()
    adg.value = !adg.value
    em.emit('tg_ntfy', "Registered Successfally")
  }
  
</script>