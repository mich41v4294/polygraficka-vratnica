<template>
  <div class="w-screen h-screen">
    <div class="header">
      <img @click="debug();" class="w-3/5 mx-auto self-start" src="~/assets/vratnicalogo.png">
    </div>
    <div class="content" v-if="visiblestep == 0">
      <div>
      <div>
      <h1 class="justify-self-center">Vitaj v škole!</h1>
      <h2>Budeme od teba potrebovať pár údajov.</h2>
      </div>
      <div class="text-center mt-5 shadow-lg py-8 flex flex-col justify-center items-center gap-2">
      <p class="text-lg">Číslo tvojho ISIC čipu</p>  
      <input class="border rounded p-2 w-56" type="number" name="chipnumber" id="chipnumber" v-bind:placeholder="chipNumberPlaceholder" v-model="chipNumber">
      <p class="text-lg">Posledné písmeno čísla ISIC</p>
      <input class="border rounded p-2 w-56" type="text" name="isicCheckLetter" id="isicCheckLetter" v-bind:placeholder="isicCheckLetterPlaceholder" maxlength="1" v-model="isicCheckLetter">
      <p class="bg-blue-700 text-white p-2 rounded w-56 flex justify-center items-center gap-2" type="button" value="Ďalej" @click="checkChip();">Ďalej
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></p>
      <span v-show="wrongIsic" style="color:red">Nesprávne číslo čipu/kontrolné písmeno!</span>
      <span v-show="checkChipError" style="color:red">Chyba komunikácie!</span>
      <span v-show="emptyIsicInput" style="color:red">Vypíšte požadovené údaje</span>
      <div v-if="this.pin !== ''">
        <p>Tvoj pin je</p>
        <h1 v-text="pin"></h1>
      </div>
      </div>
      </div>
      <div class="self-end">
        <p class="text-s text-gray-500 mb-10">Používaním aplikácie súhlasíte so všeobecnými podmienkami ochrany osobných údajov a používaním cookies.</p>
        </div>
    </div>
    <div class="content" v-if="visiblestep == 1">
      <div>
      <h1 v-text="'Ahoj, si ' + firstname + '?'"></h1>
      <h2 class="text-xl" v-text="'Chodíš do ' + schoolclass + ', však?'"></h2>
      </div>
      <div class="flex flex-row justify-center gap-5">
      <input @click="next()" class="bg-blue-700 text-white text-xl py-4 px-8 rounded" type="button" value="Áno">
      <input @click="tostart(); resetIsicInput();" class="bg-red-700 text-white text-xl py-4 px-8 rounded" type="button" value="Nie">
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="content" v-if="visiblestep == 2">
      <div>
      <h1>Máš test? Si zaočkovaný? Zadaj to sem</h1>
      <h2 class="mt-3">Ako dátum zadaj dátum testovania, očkovania alebo pozitívneho testu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
        <label for="testtype">Vyber typ dokladu o negativite:</label>
      <select class="border p-2" name="testtype" id="testtype" v-model="testtype">
        <option value="test">Negatívny AG alebo PCR test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vectorVaccine">Očkovanie 1. dávkou vektorovej vakcíny</option>
        <option value="mRnaVaccine">Očkovanie 2. dávkou mRNA vakcíny</option>
      </select>
      <input class="border p-2" type="date" name="testdate" id="testdate" v-model="testdate">
      <input @click="adultnextpage()" class="bg-blue-700 text-white p-2 rounded" type="button" value="Ďalej">
      <span v-show="emptystudent" style="color:red">Nesprávne vyplnené údaje!</span>
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="content" v-if="visiblestep == 3">
      <div>
      <h1>A tvoj zákonný zástupca?</h1>
      <h2 class="mt-3">Zadaj informácie o testovaní/očkovaní tvojho zákonného zástupcu.</h2>
      </div>
      <div class="flex flex-col justify-center gap-5">
        <label for="testtype">Vyber typ dokladu o negativite:</label>
      <select class="border p-2" name="testtype" id="testtype" v-model="parenttesttype">
        <option value="test">Negatívny AG alebo PCR test</option>
        <option value="postcovid">Prekonané ochorenie COVID-19</option>
        <option value="vectorVaccine">Očkovanie 1. dávkou vektorovej vakcíny</option>
        <option value="mRnaVaccine">Očkovanie 2. dávkou mRNA vakcíny</option>
      </select>
      <input class="border p-2" type="date" name="testdate" id="testdate" v-model="parenttestdate">
      <input @click="parentnext();" class="bg-blue-700 text-white p-2 rounded" type="button" value="Odoslať">
      <span v-show="emptyparent" style="color:red">Nesprávne vyplnené údaje!</span>
      </div>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
    <div class="content" v-if="visiblestep == 4">
      <div>
      <h1>Ďakujeme!</h1>
      <h2>Pomáhajme si navzájom.</h2>
      </div>
      <h1 class="text-7xl" v-text="pin"></h1>
      <h2>Tento pin si uschovajte, budete ho potrebovať vovnútri.</h2>
      <p class="back" @click="tostart()">Na začiatok</p>
    </div>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-cookies@1.7.4/vue-cookies.js"></script>
<script>
const axios = require('axios').default;
export default {
  data() {
    return {
      visiblestep: 0,
      chipNumber: "",
      chipNumberPlaceholder: "",
      isicCheckLetterPlaceholder: "A",
      isicCheckLetter: "",
      covidpass: "",
      adultstudent: false,
      emptystudent: false,
      emptyparent: false,
      testtype: "",
      testdate: "",
      parenttesttype: "",
      parenttestdate: "",
      checkChipError: false,
      wrongIsic: false,
      wrongIsicToken: false,
      emptyIsicInput: false,
      firstname: "",
      schoolclass: "",
      validToken: false,
      pin: "",
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
    checkChip(){
      if (this.chipNumber !== "" || this.isicCheckLetter !== "") {
        this.checkChipNumber();
      } else if (this.validToken == true) {
        this.checkChipToken();
      } else {
        this.emptyIsicInput = true;
      }
    },
    checkChipToken() {
      axios.get('https://vratnica.polygraficka.sk/checkChip',{
        params: {
          token:this.$cookies.get("token"),
        }
      })
      .then( (response) => {
        console.log(response);
        this.firstname = response.data.firstName;
        this.schoolclass = response.data.schoolClass;
        this.adult = response.data.adult;
        if (this.firstname === "" || this.schoolclass === "" || this.adult === "") {
          this.emptyIsicInput = true;
        } else {
          this.emptyIsicInput = false;
          this.next();
        }
       })
      .catch((error) => {
        console.log(error);
        this.checkChipError = true;
      });
      },
      checkChipNumber() {
      axios.get('https://vratnica.polygraficka.sk/checkChip',{
        params: {
          chipNumber:this.chipNumber,
          checkLetter: this.isicCheckLetter,
        }
      })
      .then( (response) => {
        console.log(response);
        this.firstname = response.data.firstName;
        this.schoolclass = response.data.schoolClass;
        this.adult = response.data.adult;
        if (this.firstname === "" || this.schoolclass === "" || this.adult === "") {
          this.wrongIsic = true;
        } else {
          this.wrongIsic = false;
          this.next();
        }
       })
      .catch((error) => {
        console.log(error);
        this.checkChipError = true;
      });
      },
    submit() {
      axios.get('https://vratnica.polygraficka.sk/userData',{
        params: {
          token:this.$cookies.get("token"),
          chipNumber:this.chipNumber,
          testdate:this.testdate,
          testtype:this.testtype,
          parenttestdate:this.parenttestdate,
          parenttesttype:this.parenttesttype,
        }
      })
      .then((response) => {
        console.log(response);
        this.pin = response.data.pin;
        this.$cookies.set("token", response.data.token, "30d")
       })
      .catch((error) => {
        console.log(error);
      });
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
    existingcookiescheck() {
      axios.get('https://vratnica.polygraficka.sk/checkToken',{
        params: {
          token:this.$cookies.get("token"),
        }
      })
      .then((response) => {
        console.log(response);
        this.pin = response.data.pin;
        this.chipNumberPlaceholder = response.data.chipNumber;
        this.isicCheckLetterPlaceholder = "*";
        this.validToken = true;
       })
      .catch((error) => {
        console.log(error);
        this.validToken = false;
      });
      
      },
    resetIsicInput(){
      this.chipNumber = "";
      this.isicCheckLetter = "";
    }
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
.header{
  height: 15vh;
  @apply pt-8;
}
.content {
  height: 85vh;
  @apply w-screen flex flex-col justify-between text-center px-4;
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