<template>  
  <div class="wrapper">
    <form action="/action_page.php" @submit.prevent="onRequest">
    <label for="mbid">Artist MBID: </label>
    <input class="inputfield" v-model="mbid" type="text" id="mbid" name="mbid"><button type="submit">Get data</button><br><br>
    
    </form>
    <div v-html="getDescription" class="content"></div>
    <div v-if="!loading" class="container">
    <h3>Albums:</h3>
    <div class="albums">
      <div class="album" v-for="(a, i) in getAlbums" :key="i">
        <div>
          <div class="title">
            {{a.title}}
          </div>
          <img class="img" :src="a.image" :alt=i>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      mbid: '',
      description: '',
      albums: [],
      loading: true,
    }
  },
  computed:{
    getDescription()
    {
      return this.description;
    },
    getAlbums()
    {
      console.log(this.albums)
      return this.albums;
    },
    albumsSet()
    {
      return this.albums.size > 0;
    }

  },
  methods: {
    onRequest: async function(){
      try {
        const url = "http://localhost:4000/?mbid="+this.mbid;
        await axios.get(url).then(d =>{
          this.description = d.data.description;
          this.albums = d.data.albums;
          this.loading = false;
        })
      } catch (error) {
        console.log(error);
      }
    },
}
}
</script>

<style scoped>
.wrapper{
  height: auto;
}
.content{
  height: auto;
}
.img{
  width: 50px;
  height: 50px;
}
.albums {
  display: grid;
  grid-template-columns: repeat(5, minmax(92px,1fr));
  gap: 10px;
}
.inputfield{
  width: 300px;
  height: 30px;
  border-radius: 5px;
}
button{
  width: 70px;
  height: 40px;
}
</style>
