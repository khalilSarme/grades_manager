<template>
  <div class="home">
    <v-container>
      <div v-if="grades.length">
        <h2>My Grades</h2>
      </div>
      <v-card v-if="grades.length" elevation="0" class="rounded-lg my-3" v-for="g in grades" :key="g.iid" max-width="767px">
        <v-card-title style="white-space: pre-wrap">
          <h3>{{ g.name }}</h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="d-flex justify-space-between align-center py-2">
          <div class="flex-grow-1">
            <h3 class="text-secondary">Paractical Grade</h3>
            <p class="font-weight-light pt-1" style="font-size: 17px;">
              {{ g.pcl }}
            </p>
          </div>
          
          <div style="width: 50px; height: 1px;rotate: 90deg;background: #424242;"></div>
          
          <div class="flex-grow-1">
            <h3 class="text-secondary">Theoretical Grade</h3>
            <p class="font-weight-light pt-1" style="font-size: 17px;">
              {{ g.tcl }}
            </p>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="py-2">
          <h3 class="text-secondary">Full Grade</h3>
          <p class="font-weight-light pt-1" style="font-size: 17px;">
            {{ g.pcl + g.tcl }}
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-1">
          <v-btn icon color="blue" @click="fireUpdate(g.iid)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn class="ms-1" color="red" icon @click="fireDelete(g.iid)"><v-icon>mdi-delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else elevation="0" class="rounded-lg" max-width="767px">
        <v-card-text style="font-size: 17px">
          <h3 class="font-weight-light">Your Certifecate Board is empty.
          Try to register your grades </h3>
          <v-btn @click="em.emit('tg_adg')" color="primary" variant="elevated" elevation="0" class="mt-5" style="text-transform: none;">Register Grade</v-btn>
        </v-card-text>
      </v-card>
      <v-btn icon color="primary" style="position: fixed;bottom: 30px; right: 20px;height: 56px; width: 56px;" v-if="grades.length" @click="em.emit('tg_adg')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-container>
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
  
  const mxn = initMixin()
  
  const {
    grades
  } = storeToRefs(mxn)
  
  const fireUpdate = async (id$) => {
    let exist = grades.value.findIndex(e => e.iid == id$)
    
    await mxn.uploadGrade(id$, grades.value[exist].name,grades.value[exist].pcl,grades.value[exist].tcl)
    
    exist = ''
    em.emit("tg_udg")
  }
  
  const fireDelete = async (id$) => {
    await mxn.deleteGrade(id$)
    em.emit('tg_ntfy', "Deleted Succeccfally")
  }
  
</script>