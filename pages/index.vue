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
      <input class="border rounded p-2" type="number" name="chipnumber" id="chipnumber" v-model="chipNumber">
      <input class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej" @click="next();">
      </div>
      <span v-show="isicError" style="color:red">Nesprávne číslo čipu!</span>
      <span v-show="checkChipError" style="color:red">Chyba komunikácie!</span>
      </div>
      </div>
      <div class="self-end">
        <p class="text-s text-gray-500 mb-20">Používaním aplikácie súhlasíte so všeobecnými podmienkami ochrany osobných údajov a používaním cookies.</p>
        </div>
    </div>
    <div class="container" v-if="visiblestep == 1">
      <div>
      <h1 v-text="'Ahoj, si ' + firstname + '?'"></h1>
      <h2 class="text-xl" v-text="'Chodíš do ' + schoolclass + ', však?'"></h2>
      </div>
      <div class="flex flex-row justify-center gap-5">
      <input @click="next()" class="bg-blue-700 text-white text-xl py-4 px-8 rounded" type="button" value="Áno">
      <input @click="tostart()" class="bg-red-700 text-white text-xl py-4 px-8 rounded" type="button" value="Nie">
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="container" v-if="visiblestep == 2">
      <div>
      <h1>Máš test? Si zaočkovaný? Zadaj to sem</h1>
      <h2 class="mt-3">Ako dátum zadaj dátum testovania, očkovania alebo pozitívneho testu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
        <label for="testtype">Vyplň typ testu</label>
      <select class="border p-2" name="testtype" id="testtype" v-model="testtype">
        <option value="test">Negatívny test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vaccination">Očkovanie druhou dávkou</option>
      </select>
      <input class="border p-2" type="date" name="testdate" id="testdate" v-model="testdate">
      <input @click="adultnextpage()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej">
      <span v-show="emptystudent" style="color:red">Nesprávne vyplnené údaje!</span>
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="container" v-if="visiblestep == 3">
      <div>
      <h1>A tvoj zákonný zástupca?</h1>
      <h2 class="mt-3">Zadaj informácie o testovaní/očkovaní tvojho zákonného zástupcu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
        <label for="testtype">Vyplň typ testu</label>
      <select class="border p-2" name="testtype" id="testtype" v-model="parenttesttype">
        <option value="test">Negatívny test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vaccination">Očkovanie druhou dávkou</option>
      </select>
      <input class="border p-2" type="date" name="testdate" id="testdate" v-model="parenttestdate">
      <input @click="parentnext();" class="bg-blue-700 text-white p-2 rounded" type="button" value="Odoslať">
      <span v-show="emptyparent" style="color:red">Nesprávne vyplnené údaje!</span>
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="container" v-if="visiblestep == 4">
      <div>
      <h1>Ďakujeme!</h1>
      <h2>Pomáhajme si navzájom.</h2>
      </div>
      <h1 class="text-7xl" v-text="token"></h1>
      <h2>Tento pin si uschovajte, budete ho potrebovať vovnútri.</h2>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-cookies@1.7.4/vue-cookies.js"></script>
<script>
const isicReg = /(^\d{10}$)/g;
const axios = require('axios').default;

export default {
  data() {
    return {
      visiblestep: 0,
      chipNumber: 31,
      covidpass: "",
      adultstudent: false,
      emptystudent: false,
      emptyparent: false,
      testtype: "",
      testdate: "",
      parenttesttype: "",
      parenttestdate: "",
      checkChipError: false,
      isicError: false,
      firstname: "Jozko",
      schoolclass: "3.GMB",
      token: "55688",
    };
  },
  methods: {
   /* isicCheck() { //isic kontrola
      console.log(this.chipNumber);
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
    /*checkChip() {
      axios.get('https://vratnica.polygraficka.sk/checkChip',{
        params: {
          chipNumber:this.chipNumber,
        }
      })
      .then(function (response) {
        console.log(response);
        default.firstname = response.data.firstName;
        this.next();
       })
      .catch(function (error) {
        console.log(error);
        this.checkChipError = true;
      });
      },

  */
    submit() {
      axios.post('https://vratnica.polygraficka.sk/checkChip',{
        params: {
          chipNumber:this.chipNumber,
          testdate:this.testdate,
          testtype:this.testtype,
          parenttestdate:this.parenttestdate,
          parenttesttype:this.parenttesttype,
        }
      })
      .then(function (response) {
        console.log(response);
       })
      .catch(function (error) {
        console.log(error);
      });
      //this.savecookies();
      },
    debug() {
      console.log(this.visiblestep);
    },
    adultnextpage(){
      if (this.checkstudentempty() == true) {
        return
      }
      if (this.adultstudent == true) {
        this.visiblestep = 4;
        this.submit();
      }
      else {
        this.next();
      }
    },
    checkstudentempty(){
      if (this.testtype == "" || this.testdate == "") {
        this.emptystudent = true;
        return true;
      } else {
        this.emptystudent = false;
        return false;
      }
    },
    checkparentempty(){
      if (this.parenttesttype == "" || this.parenttestdate == "") {
        this.emptyparent = true;
        return true;
      } else {
        this.emptyparent = false;
        return false;
      }
    },
    parentnext(){
      if (this.checkparentempty() == true) {
        return
      }
      else {
        this.submit();
        this.next();
      }
    },
    /*savecookies(){
      this.$cookies.set("token", this.token, "8d")
    },
    existingcookiescheck(){
      if (this.$cookies.isKey("token") == true) {
        this.token = this.$cookies.get("token");
        this.visiblestep = 4;
      }
    }*/
  },
  beforeMount(){
    this.existingcookiescheck();
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
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

body{
  font-family: 'Lato', sans-serif;
}

.container {
  @apply h-screen w-screen flex flex-col justify-around text-center px-4;
}
h1{
  @apply text-5xl;
}
p.back{
  @apply text-left text-gray-500;
}
h2{
  @apply mt-1
}
</style>
