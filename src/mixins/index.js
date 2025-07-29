import {
  storeToRefs
} from 'pinia'

import {
  ref,
  watch
} from 'vue'

import {
  useGradeStore
} from '@/stores/useGradeStore'

import {
  useGradesStore
} from '@/stores/useGradesStore'




export const initMixin = () => {

  // init Stores
  const myGrade = useGradeStore()
  const myGrades = useGradesStore()

  // Extract Store's data
  const {
    g_id,
    g_name,
    g_pcl,
    g_tcl,
  } = storeToRefs(myGrade)
  const {
    grades,
  } = storeToRefs(myGrades)

  // update Storage automatically
  watch(() => grades.value, async (oldVal, newVal) => {
    if (!grades.value.length) {
      await localStorage.removeItem('gds_stack')
    } else {
      await localStorage.setItem('gds_stack', JSON.stringify(newVal))
    }
  },
    {
      deep: true
    })

  // reset stores
  const clearGradeData = myGrade.$reset
  const clearGradesData = myGrades.$reset
  
  // Generate new grade
  const AddNewGrade = async () => {
    await grades.value.push({
      iid: Date() + " " + Date.now(),
      name: g_name.value,
      pcl: g_pcl.value,
      tcl: g_tcl.value,
    })
  }

  // delete or remove grade
  const deleteGrade = async (i) => {
    let existIndex = grades.value.findIndex(e => e.iid == i)
    
    await grades.value.splice(existIndex, 1);
    
    existIndex = null
  }

  // send grade's data to store
  const uploadGrade = (iid,
    name,
    pcl,
    tcl) => {
    [g_id.value,g_name.value,g_pcl.value,g_tcl.value] = [iid, name, pcl, tcl]
  }
  
  // update grade
  const applyUpdating = (i) => {
    let existIndex = grades.value.findIndex(e => e.iid == i)
    grades.value[existIndex] = {
      iid: g_id.value,
      name: g_name.value,
      pcl: g_pcl.value,
      tcl: g_tcl.value,
    }
    clearGradeData()
    existIndex = null
  }


  return {
    g_id,
    g_name,
    g_pcl,
    g_tcl,
    grades,
    AddNewGrade,
    deleteGrade,
    uploadGrade,
    clearGradeData,
    clearGradesData,
    applyUpdating
  }

}