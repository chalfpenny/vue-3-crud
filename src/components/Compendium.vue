<template>
  <div v-if="currentCompendium" class="edit-form">
    <h4>Compendium</h4>
    <form>
      <div class="form-group">
        <label for="customerName">Customer Name</label>
        <input type="text" class="form-control" id="customerName"
          v-model="currentCompendium.customerName"
        />
      </div>
      <div class="form-group">
        <label for="description">File Name</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCompendium.fileName"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCompendium.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button class="badge badge-primary mr-2"
      v-if="currentCompendium.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2"
      @click="deleteCompendium"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateCompendium"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Compendium...</p>
  </div>
</template>
<script>
import CompendiumDataService from "../services/CompendiumDataService";
export default {
  name: "compendium",
  data() {
    return {
      currentCompendium: null,
      message: ''
    };
  },
  methods: {
    getCompendium(id) {
      CompendiumDataService.get(id)
        .then(response => {
          this.currentCompendium = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentCompendium.id,
        customerName: this.currentCompendium.customerName,
        description: this.currentCompendium.fileName,
        published: status
      };
      CompendiumDataService.update(this.currentCompendium.id, data)
        .then(response => {
          console.log(response.data);
          this.currentCompendium.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCompendium() {
      CompendiumDataService.update(this.currentCompendium.id, this.currentCompendium)
        .then(response => {
          console.log(response.data);
          this.message = 'The compendium was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteCompendium() {
      CompendiumDataService.delete(this.currentCompendium.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "compendiums" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCompendium(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>