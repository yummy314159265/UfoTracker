import define from "/js/us_map/index.js";
import {Runtime, Library, Inspector} from "/js/us_map/runtime.js";

const runtime = new Runtime();
const main = runtime.module(define, Inspector.into(document.body));