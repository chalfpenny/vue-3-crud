<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="customer_name">Customer Name</label>
        <input
          type="text"
          class="form-control"
          id="customer_name"
          required
          v-model="compendium.customer_name"
          name="customer_name"
        />
      </div>
      <div class="form-group">
        <label for="file_name">File Name</label>
        <input
          class="form-control"
          id="file_name"
          required
          v-model="compendium.file_name"
          name="file_name"
        />
      </div>
      <button @click="saveCompendium" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCompendium">Add</button>
    </div>
  </div>
</template>

<script>
import CompendiumDataService from "../services/CompendiumDataService";
export default {
  name: "add-compendium",
  data() {
    return {
      compendium: {
        id: null,
        customer_name: "",
        file_name: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveCompendium() {
      var data = {
        customer_name: this.compendium.customer_name,
        file_name: this.compendium.file_name
      };
      CompendiumDataService.create(data)
        .then(response => {
          this.compendium.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCompendium() {
      this.submitted = false;
      this.compendium = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>