import React, { Component } from "react";
import * as d3 from "d3";
export default class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      default: { r: null, x0: null, y0: null, fill: "#ccc", stroke: "#000" },
      Rect: { r: null, x0: null, y0: null, fill: "#ccc", stroke: "#000" },
      Shapes: []
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

    //this.drawElipses(this.ellipses);
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
  addRectStart = () => {
    const m = d3.event;
    console.log(m);

    this.setState(state => ({
      ...state,
      Rect: {
        x0: m.x,
        y0: m.y,
        r: this.canvas
          .append("g")
          .append("ellipse")
          .attr("cx", m.x)
          .attr("cy", m.y)
          .attr("fill", state.Rect.fill)
          .attr("stroke", state.Rect.stroke)
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
      Shapes: [...state.Shapes, state.Rect],
      Rect: { r: null, x0: null, y0: null, fill: "#ccc", stroke: "#000" }
    }));
  };
  mouseOffset() {
    return d3.event;
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
    return <div className="app__canvas" ref={this.canvasRef}></div>;
  }
}
