import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios';
import VueAxios from 'vue-axios';
import MasonryWall from '@yeger/vue-masonry-wall'

let app = createApp(App)
app.use(VueAxios, axios);
app.use(MasonryWall)
app.mount('#app')

