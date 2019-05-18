<template>
  <div class="home">


    <img alt="Vue logo" src="../assets/logo.png">
    <div class="dashboard">
      <div v-for="item in this.$store.state.posts" class="dashboard__card">
        <v-card>
          <v-img v-if="item.data.thumbnail && item.data.thumbnail.includes('http')"
            :src="item.data.thumbnail"
            alt="no photo"
            aspect-ratio="2.75">
          </v-img>

          <v-card-title primary-title>
            <div class="card__title">
              <h3 class="headline mb-0">{{ item.data.title }}</h3>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange"
                   v-on:click="vote(`${item.kind}_${item.data.id}`, 1)">Like</v-btn>
            <v-btn flat color="orange"
                   v-on:click="vote(`${item.kind}_${item.data.id}`, -1)">Dislike</v-btn>
            <v-btn flat color="orange"
                   v-on:click="bookmark(`${item.kind}_${item.data.id}`, true)">Save</v-btn>
            <v-btn flat color="orange"
                   v-on:click="bookmark(`${item.kind}_${item.data.id}`, false)">Unsave</v-btn>
            <v-btn flat color="orange" :href="item.data.url" target="_blank">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: add mapping to actions and getters
  name: 'home',
  mounted() {
    if (localStorage.getItem('token') === null) {
      if (window.location.search === '') {
        this.redirectToRedditAuth();
      } else {
        this.$store.dispatch('login', this.getQueryVariable('code'));
      }
    } else {
      this.$store.dispatch('feed');
    }
  },
  methods: {
    getQueryVariable(queryString) {
      const query = window.location.search.substring(1);
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i += 1) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === queryString) {
          return decodeURIComponent(pair[1]);
        }
      }
      return null;
    },
    redirectToRedditAuth() {
      window.location = 'https://www.reddit.com/api/v1/authorize?'
        + 'client_id=-uZjNOY1vnbd-A&'
        + 'response_type=code&'
        + 'state=KcDScdscds&'
        + 'redirect_uri=http://localhost:8080/&'
        + 'duration=temporary&'
        + 'scope=identity, edit, flair, history, modconfig, modflair, modlog, '
        + 'modposts, modwiki, mysubreddits, privatemessages, read, report, '
        + 'save, submit, subscribe, vote, wikiedit, wikiread';
    },
    vote(id, dir) {
      const data = { id, dir, rank: 1 };
      this.$store.dispatch('vote', data);
    },
    bookmark(id, bookmark) {
      this.$store.dispatch('bookmark', { id, bookmark });
    },
  },
};
</script>
<style scoped>
  .dashboard {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .dashboard__card {
    width: 500px;
    margin: 30px;
  }
  .card__title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10; /* number of lines to show */
    line-height: 50;        /* fallback */
    max-height: 500px;
  }
</style>
