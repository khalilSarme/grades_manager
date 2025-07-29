import {
  defineStore
} from 'pinia'

import {
  ref
} from 'vue'

export const useGradeStore = defineStore('grade', () => {

  // state
  const [
    g_id,
    g_name,
    g_pcl,
    g_tcl,
    $reset
  ] = [
    ref(null),
    ref(""),
    ref(null),
    ref(null),
    () => {
      [g_id.value,
        g_name.value,
        g_pcl.value,
        g_tcl.value] = [null, "", null, null]
    }]

  return {
    g_id,
    g_name,
    g_pcl,
    g_tcl,
    $reset
  }

})