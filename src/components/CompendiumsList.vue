<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Customer Name"
          v-model="customer_name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Compendiums List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(compendium, index) in compendiums"
          :key="index"
          @click="setActiveCompendium(compendium, index)"
        >
          {{ compendium.customer_name }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCompendiums">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCompendium">
        <h4>Compendium</h4>
        <div>
          <label><strong>Customer Name:</strong></label> {{ currentCompendium.customer_name }}
        </div>
        <div>
          <label><strong>File Name:</strong></label> {{ currentCompendium.file_name }}
        </div>

        <router-link :to="'/compendiums/' + currentCompendium.compendium_key" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Compendium...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CompendiumDataService from "../services/CompendiumDataService";
export default {
  name: "compendiums-list",
  data() {
    return {
      compendiums: [],
      currentCompendium: null,
      currentIndex: -1,
      customer_name: ""
    };
  },
  methods: {
    retrieveCompendiums() {
      CompendiumDataService.getAll()
        .then(response => {
          this.compendiums = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveCompendiums();
      this.currentCompendium = null;
      this.currentIndex = -1;
    },
    setActiveCompendium(compendium, index) {
      this.currentCompendium = compendium;
      this.currentIndex = compendium ? index : -1;
    },
    removeAllCompendiums() {
      CompendiumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      CompendiumDataService.findByTitle(this.customer_name)
        .then(response => {
          this.compendiums = response.data;
          this.setActiveCompendium(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCompendiums();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>