import {format} from "date-fns";
import loadTasks from "./tasks";
function loadToday() {
    const today=format(new Date(),"yyyy-MM-dd");
    loadTasks(today);
}
export default loadToday;