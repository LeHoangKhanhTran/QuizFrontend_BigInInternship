import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TopicView from "../views/TopicView.vue";
import ResultView from "../views/ResultView.vue";
import QuizView from "../views/QuizView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/topic/:id', component: TopicView, props: true },
    { path: '/topic/:id/quiz', component: QuizView, props: true },
    { path: '/result/:id', component: ResultView, props: true }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})