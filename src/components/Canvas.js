import React, { Component } from "react";
import * as d3 from "d3";
import nanoid from "nanoid";
export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      default: { r: null, x0: null, y0: null, fill: "#ccc", stroke: "#000" },
      Rect: {
        id: nanoid(),
        r: null,
        x0: null,
        y0: null,
        fill: "#ccc",
        stroke: "#000"
      },
      Shapes: [],
      active: null
    };

    this.canvasRef = React.createRef();
    this.ellipses = [
      { cx: 25, cy: 25, rx: 15, ry: 20 },
      { cx: 75, cy: 75, rx: 15, ry: 20 },
      { cx: 125, cy: 125, rx: 15, ry: 20 },
      { cx: 175, cy: 175, rx: 15, ry: 20 }
    ];
  }

  componentDidMount() {
    this.createCanvas();

    // this.drawElipses(this.ellipses);
    this.eipseSetupEventHandlers();
    this.canvas.on("keydown", this.keydownEventHandlers);
  }

  createCanvas() {
    this.canvas = d3
      .select(this.canvasRef.current)
      .append("svg")
      .attr("width", this.canvasRef.current.clientWidth)
      .attr("height", window.innerHeight)
      .style("border", "1px solid black");

    this.canvas.call(
      d3
        .drag()
        .on("start", this.addRectStart)
        .on("drag", this.addRectDrag)
        .on("end", this.addRectEnd)
    );
  }

  // fire on every new ellipse
  eipseSetupEventHandlers() {
    let nodes = this.canvas.selectAll("ellipse");
    nodes.on("click", this.ellipseClickHandler(this));
    nodes.call(
      d3
        .drag()
        .on("start", this.ellipseDragStartHandler(this))
        .on("drag", this.ellipseDragHandler(this))
    );
  }
  keydownEventHandlers() {
    if (d3.event.key === "Delete") {
      //@TODO add delete functionality
    }
  }
  // take id from node and pass to our handler
  // add closure because we use this from nodes.call
  // and that function set this to svg ellipse node element
  ellipseClickHandler = componentContext => {
    return function(i) {
      componentContext.setActive(this.getAttribute("uuid"));
    };
  };
  ellipseDragStartHandler = componentContext => {
    return function() {
      console.log("THIS", this, componentContext);
    };
  };
  ellipseDragHandler = componentContext => {
    return function(d, i) {
      d.cx = d.cx + d3.event.dx;
      d.cy = d.cy + d3.event.dy;
      const coords = d3.event;
      d3.select(this)
        .attr("cy", d3.event.y)
        .attr("cx", d3.event.x);
    };
  };
  //elipse creation methods
  addRectStart = () => {
    const m = d3.event;

    this.setState(state => ({
      ...state,
      Rect: {
        ...state.Rect,
        x0: m.x,
        y0: m.y,
        r: this.canvas
          .append("g")
          .append("ellipse")
          .data([
            {
              сx: m.x,
              сy: m.y
            }
          ])
          .attr("cx", m.x)
          .attr("cy", m.y)
          .attr("fill", state.Rect.fill)
          .attr("stroke", state.Rect.stroke)
          .attr("uuid", state.Rect.id)
          .attr("width", 1)
          .attr("height", 1)
      }
    }));
  };
  addRectDrag = () => {
    const m = d3.event;

    this.setState(state => {
      const r = { ...state.Rect };
      r.r
        .attr("rx", Math.abs(state.Rect.x0 - m.x))
        .attr("ry", Math.abs(state.Rect.y0 - m.y));
      return { ...state, Rect: r };
    });
  };
  addRectEnd = () => {
    this.setState(state => ({
      ...state,
      active: state.Rect,
      Shapes: [...state.Shapes, state.Rect],
      Rect: {
        id: nanoid(),
        r: null,
        x0: null,
        y0: null,
        fill: "#ccc",
        stroke: "#000"
      }
    }));

    this.eipseSetupEventHandlers();
  };
  mouseOffset() {
    return d3.event;
  }
  setActive(id) {
    this.setState(state => {
      return { active: state.Shapes.find(ellips => ellips.id === id) };
    });
  }
  drawElipses(ellipses) {
    const svgEllipses = this.canvas
      .selectAll("ellipse")
      .data(ellipses)
      .enter()
      .append("ellipse");

    svgEllipses
      .attr("cx", (d, i) => {
        return d.cx;
      })
      .attr("cy", (d, i) => {
        return d.cy;
      })
      .attr("rx", (d, i) => {
        return d.rx;
      })
      .attr("ry", (d, i) => {
        return d.ry;
      });
  }

  render() {
    return (
      <div className="app__canvas">
        <div>{JSON.stringify(this.state.active)}</div>
        <div ref={this.canvasRef}></div>
      </div>
    );
  }
}
