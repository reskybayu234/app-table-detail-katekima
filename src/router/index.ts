import { createRouter, createWebHistory } from "vue-router";
import ListComp from "../views/ListComp.vue";
import DetailComp from "../views/DetailComp.vue";
import AddComp from "../views/AddComp.vue";
import EditComp from "../views/EditComp.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListComp,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: DetailComp,
    },
    {
      path: "/add",
      name: "add",
      component: AddComp,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditComp,
    },
  ],
});

export default router;
