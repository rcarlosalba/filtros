import { createApp } from 'vue';
import { plugin, defaultConfig } from '@formkit/vue';
import theme from '../formkit.config';
import './style.css';
import App from './App.vue';

createApp(App).use(plugin, defaultConfig(theme)).mount('#app');
