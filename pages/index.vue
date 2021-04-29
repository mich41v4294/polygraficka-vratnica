<template>
  <div>
    <div class="container" v-if="visiblestep == 0">
      <img @click="debug();" class="w-3/5 mx-auto mt-10 self-start" src="~/assets/vratnicalogo.png">
      <div>
      <div>
      <h1 class="justify-self-center">Vitaj v škole!</h1>
      <h2>Budeme od teba potrebovať pár údajov.</h2>
      </div>
      <div class="text-center mt-10">
      <p class="text-lg">Číslo tvojho ISIC čipu</p>
      <div class="flex flex-row justify-center gap-2">
      <input class="border rounded p-2" type="number" name="chipnumber" id="chipnumber" v-model="isic">
      <input class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej" @click="next();">
      </div>
      <span v-show="isicError" style="color:red">Nespravne cislo cipu</span>
      </div>
      </div>
      <div class="self-end">
        <p class="text-s text-gray-500">Používaním aplikácie súhlasíte so všeobecnými podmienkami ochrany osobných údajov.</p>
        <p class="text-s text-gray-500">Admin panel</p>
        </div>
    </div>
    <div class="container" v-if="visiblestep == 1">
      <div>
      <h1 v-text="'Ahoj, ' + name + '!'"></h1>
      <h2 class="text-xl" v-text="'Chodíš do ' + schoolclass + ', však?'"></h2>
      </div>
      <div class="flex flex-row justify-center gap-5">
      <input @click="next()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Áno">
      <input @click="tostart()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Nie">
      </div>
    </div>
    <div class="container" v-if="visiblestep == 2">
      <div>
      <h1>Test? Prekonal si? Zadaj to sem</h1>
      <h2>Ako dátum zadaj dátum testovania, očkovania alebo pozitívneho testu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
      <select name="testtype" id="testtype" v-model="testtype">
        <option value="test">Negatívny test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vaccination">Očkovanie druhou dávkou</option>
      </select>
      <input type="date" name="testdate" id="testdate" v-model="testdate">
      <input @click="adultnextpage()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej">
      </div>
    </div>
    <div class="container" v-if="visiblestep == 3">
      <div>
      <h1>A tvoj zákonný záastupca?</h1>
      <h2>Zadaj informácie o testovaní/očkovaní tvojho zákonného zástupcu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
      <select name="testtype" id="testtype" v-model="testtype">
        <option value="test">Negatívny test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vaccination">Očkovanie druhou dávkou</option>
      </select>
      <input type="date" name="testdate" id="testdate" v-model="testdate">
      <input @click="next(); submit()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej">
      </div>
    </div>
    <div class="container" v-if="visiblestep == 4">
      <div>
      <h1>Ďakujeme!</h1>
      <h2>Pomáhajme si navzájom.</h2>
      </div>
      <div>
      
      </div>
    </div>
  </div>
</template>

<script>
const isicReg = /(^\d{10}$)/g;
const axios = require('axios').default;

export default {
  data() {
    return {
      visiblestep: 0,
      isic: 180,
      covidpass: "",
      adultstudent: false,
      testtype: "",
      testdate: "",
      parenttesttype: "",
      parenttestdate: "",
      isicError: false,
      name: "Jozko",
      schoolclass: "3.GMB",
    };
  },
  methods: {
   /* isicCheck() { //isic kontrola
      console.log(this.isic);
      if () {                   
      this.wrongIsic = false;//ak v poriadku
      this.next();
    } else {
      this.wrongIsic = true;//ak chyba
    }
    },*/
    next() {
      this.visiblestep = this.visiblestep + 1;
      console.log(this.visiblestep);
      //go to next step
      },
    tostart() {
      this.visiblestep = 0;
      console.log(this.visiblestep);
      //go to start
      },  
    submit() {
      axios.post('/action.php',{
        isic:this.isic,
        covidpass:this.covidpass,
        testtype:this.testtype,
        parenttestdate:this.parenttestdate,
        parenttestdate:this.parenttestdate,
      })
      .then(function (response) {
        console.log(response);
       })
      .catch(function (error) {
        console.log(error);
      });
      },
    debug() {
      console.log(this.visiblestep);
    },
    adultnextpage(){
      if (this.adultstudent == true) {
        this.visiblestep = 4;
        this.submit();
      }
      else {
        this.next();
      }
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
  @apply h-screen w-screen flex flex-col justify-around text-center px-4;
}
h1{
  @apply text-5xl;
}
</style>
