<template>
  <v-app>
    <v-app-bar app variant="elevated" elevation="1">
      <v-app-bar-title class="ma-0 text-center pa-0">Vuetivo.kh</v-app-bar-title>
    </v-app-bar>
    
    <add-new-grade-dialog></add-new-grade-dialog>
    <update-grade-dialog></update-grade-dialog>
    
    <snack-bar></snack-bar>
    <router-view />
  </v-app>
</template>

<script setup>
  
</script>