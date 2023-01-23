<template>
  <div class="container3">
    <h1 class="text-center text-muted">Pokemon</h1>
  </div>
  
  <form id="add_form">
    <div class="container">
      <div class="input-group mb-3">
        <span class="input-group-text">Nombre</span>
        <input type="text" class="form-control" v-model="nombre" maxlength="200">
      </div>
      <div class="form-group" align="center">
        <button type="button" @click="addusuario()" class="btn btn-primary">Registrar</button>
      </div>
    </div>

    <div class="wrapper">
      <div class="container2" v-for="(data, index) in pokemons" :key="index">
        <input type="checkbox" :id="data.number_pokemon" :value="data.number_pokemon" v-model="numeropokemon" />
        <label :for="data.number_pokemon">
          {{data.name}}
          <img :src="data.url">
        </label>
      </div>
    </div>
  </form>

</template>

<script>
import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


export default {
  name: 'listPokemon',
  data() {
    return {
      nombre: '',
      number_pokemon:'',
      numeropokemon:[],
      pokemons: [],
      addpokemons: []
    };
  },
  methods: {
    addusuario(){

      console.log(this.numeropokemon)
      if(this.numeropokemon.length == 6){
        
        axios.post("http://127.0.0.1:8000/api/user", {
          name: this.nombre,
          number_pokemon: this.numeropokemon
        }).then((response) => {
          if(response){
            console.log("exito")
            Swal.fire({
              title: 'Exito!',
              text: 'Registro guardado correctamente',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            })
          }
        }).catch((err) => {
          console.log(err);
        });

      }else{
        Swal.fire({
              title: 'Error!',
              text: 'Deben ser 6 pokemons',
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
        console.log("faltan")
      }
      
    },
    entrenadorespokemon(){

    }

  },
  created(){
    for (let j = 0; j <= 150; j++){
      axios.get(`https://pokeapi.co/api/v2/pokemon/${j + 1}`).then((response) => {
        let pokemon = {
          name: response.data.name,
          url: response.data.sprites.front_default,
          number_pokemon: j + 1
        };

        this.pokemons.push(pokemon)
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  gap: 15px;
}
.container2 {
  height: 500px;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 0 25px rgba(17, 1, 68, 0.08);
  border-radius: 8px;
  position: relative;
}
.container2 img {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 20px;
  bottom: 0;
  /*cursor: pointer;*/
}
input[type="checkbox"] {
  -webkit-appearance: none;
  position: relative;
  width: 100%;
  cursor: pointer;
}
input[type="checkbox"]:after {
  position: absolute;
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: "\f111";
  font-size: 18px;
  color: #478bfb;
  right: 10px;
  top: -5px;
}
input[type="checkbox"]:checked:after {
  font-weight: 900;
  content: "\f058";
  color: #478bfb;
}
.container2 img {
  width: 70%;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
}
.container{
  margin-bottom: 50px;
}
.container3{
  margin-top: 20px;
}
@media screen and (min-width: 950px) {
  .wrapper {
    grid-template-columns: repeat(9, 1fr);
    gap: 10px;
  }
  .container2 {
    height: 150px;
    width: 150px;
  }

  input[type="checkbox"]:after {
    font-size: 22px;
  }
}</style>
