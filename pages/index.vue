<template>
  <div class="container">
    <div v-if="visiblestep == 0">
      <h1>Ahoj, vitaj v škole!</h1>
      <h2>Zadaj svoje ISIC číslo čipu.</h2>
      <input type="number" name="chipnumber" id="chipnumber" v-model="isic">
      <span v-show="wrongIsic" style="color:red">Nespravne cislo cipu</span>
      <input type="button" value="Ďalej" @click="isicCheck(); next()">
    </div>
    <div v-if="visiblestep == 1">
      <h1 v-text="name + ' z ' + schoolclass + '?'"></h1>
      <h2>Si to ty?</h2>
      <input type="button" value="Áno">
      <input type="button" value="Nie">
    </div>
  </div>
</template>

<script>
const isicReg = /(^\d{10}$)/g;
export default {
  data() {
    return {
      visiblestep: 0,
      isic: 180,
      covidpass: "",
      testtype: "",
      testdate: "",
      parenttype: "",
      parenttesttype: "",
      age: false,
      wrongIsic: false,
      name: "Jozko",
      schoolclass: "3.GMB",
    };
  },
  methods: {
    isicCheck() {
      console.log(this.isic)
      if (isicReg.test(this.isic)) {
      this.wrongIsic = false;
    } else {
      this.wrongIsic = true;
    }
    },
    next() {
      visiblestep = visiblestep + 1;
      console.log(visiblestep);
      //go to next step
      },
    submit() {
      //final send to database
      },
  },
  mounted () {
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  @apply h-screen w-screen flex flex-col justify-center content-center text-center;
}
</style>
