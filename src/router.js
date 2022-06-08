import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/compendiums",
    name: "compendiums",
    component: () => import("./components/CompendiumsList")
  },
  {
    path: "/compendiums/:id",
    name: "compendium-details",
    component: () => import("./components/Compendium")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddCompendium")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;