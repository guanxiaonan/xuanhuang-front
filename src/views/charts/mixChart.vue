<template>
  <div class='chart-container'>
    <mixchart height='100%' width='100%' :inputava=avarge></mixchart>
  </div>
</template>

<script>
 import Chart from '@/components/Charts/mixChart'
export default {
   name: 'mixChart',
   components: {
     mixchart: Chart
   },
   data() {
     return {
       avarge: [1900, 3917, 4455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
     }
   }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
</style>

