import { stateSightingsHandler } from '../homepage.js'

function _chart(d3,topojson,us,path)
{
  const width = 1280;
  const height = 800;

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .on("click", reset);

  const g = svg.append("g");

  const states = g.append("g")
      .attr("fill", "#444")
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path)
      .attr("class", "js-modal-trigger")
      .attr("data-target", "sightings-modal");
  
  states.append("title")
      .text(d => d.properties.name);

  g.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-linejoin", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)));

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "#15fc12");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())
    );

    stateSightingsHandler(event);
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
  }

  return svg.node();
}

function _1(html){return(
html`<p id="map-credit">Map by Mike Bostock: <a href="https://observablehq.com/@d3/zoom-to-bounding-box">Zoom to Bounding Box</a></p>`
)}

function _comments(html){return(
  html`
    <div class="content container" id="comment-container">
      <ul class="container" id="comment-list">
        <li>
          <div class="box">
            <div class="content">

              <strong>John Smith</strong>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.

            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="container" id="comment-textarea">
      <div class="field container">
        <div class="control">
          <textarea class="textarea" name="comment-body" placeholder="Leave a comment" id="comment"></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right container">
        <div class="control">
          <button class="button is-link" id="comment-submit" disabled>Submit</button>
        </div>
      </div>
    </div>
  `
)}

function _path(d3){return(
d3.geoPath()
)}

function _us(FileAttachment){return(
FileAttachment("states-albers-10m.json").json()
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@7")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["states-albers-10m.json", {url: new URL("./files/75faaaca1f1a4f415145b9db520349a3a0b93a53c1071346a30e6824586a7c251f45367d9262ed148b7a2b5c2694aa7703f3ac88051abc65066fd0074fdf9c9e", import.meta.url), mimeType: null, toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("chart")).define("chart", ["d3","topojson","us","path"], _chart);
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["html"], _comments);
  return main;
}
