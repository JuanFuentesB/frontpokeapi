<template>
<div class="container3">
    <h1 class="text-center text-muted">Pokemon</h1>
</div>
<div class="row">
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Detalles</h5>
                    <button type="button" class="close" @click="cerrarmodal()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">ID Usuario:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="user_id">
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" id="recipient-name" v-model="name">
                        </div>

                        <div class="col-md-4 card1" v-for="pu in pokemonU">
                            <div class="card" style="width: 150px; height: 200px;">
                                <img :src="pu.url" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">{{ pu.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger"  @click="cerrarmodal()">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Tabla -->
    <div class="col-lg-8 offset-lg-2">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>ID Usuario</th>
                        <th>Nickname Usuario</th>
                        <th>Pokémon 1</th>
                        <th>Pokémon 2</th>
                        <th>Pokémon 3</th>
                        <th>Detalle del equipo</th> 
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="poke in pokemons">
                        <td>{{ poke.user_id }}</td>
                        <td>{{ poke.name }}</td>
                        <td>{{ poke.pokemons[0] }}</td>
                        <td>{{ poke.pokemons[1] }}</td>
                        <td>{{ poke.pokemons[2] }}</td>
                        <td><button type="button" class="btn btn-primary" @click="abrirModal(poke)">Detalles</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            pokemons: [],
            pokemonU: [],
            user_id: '',
            name: ''
        }
    },
    mounted(){
        this.getusuario();
    },
    methods:{
        getusuario(){
            axios.get('http://127.0.0.1:8000/api/user').then((response) => {
            this.pokemons = response.data;
            console.log(this.pokemons)
        }).catch((err) => {
            console.log(err);
        });
        },
        abrirModal(poke){

            this.user_id = poke.user_id;
            this.name = poke.name;

            this.pokemonU = [];

            for (let j = 0; j < poke.pokemons.length; j++){
                axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.pokemons[j]}`).then((response) => {
                    let pokemon = {
                    name: response.data.name,
                    url: response.data.sprites.front_default,
                    
                    };

                    this.pokemonU.push(pokemon)
                }).catch((err) => {
                    console.log(err);
                });
            }

            $('#exampleModal').modal('show')
            
        },
        cerrarmodal(){
            $('#exampleModal').modal('hide')
        }
    }
}

</script>

<style scoped>
.card1{
    margin-top: 20px;
}
</style>
