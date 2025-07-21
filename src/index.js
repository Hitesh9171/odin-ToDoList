import './style.css';
import loadSidebar from './scripts/sidebar.js';
import loadTasks from "./scripts/tasks.js";
import loadToday from './scripts/loadToday.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  const sidebar = loadSidebar();
  const main = document.createElement("div");
  main.classList.add("main-content");

  // Add both sidebar and main directly inside #app
  app.appendChild(sidebar);
  app.appendChild(main);
  //sidepanel
  const sidepanel=document.createElement("div");
  sidepanel.classList.add("side-panel");
  app.appendChild(sidepanel);
  sidepanel.classList.add("visible");
  loadToday();

});
