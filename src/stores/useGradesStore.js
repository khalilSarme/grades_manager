import {
  defineStore
} from 'pinia'

import {
  ref
} from 'vue'

export const useGradesStore = defineStore('grades', () => {
  
  // state
  const [
    grades,
    $reset
  ] = [
    ref(JSON.parse(localStorage.getItem('gds_stack')) || []),
    async () => {
      grades.value = []
      await localStorage.removeItem('gds_stack')
    }
  ]
  
  return {
    grades,
    $reset
  }
  
})