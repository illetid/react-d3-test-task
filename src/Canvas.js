import React, { Component } from "react";
import * as d3 from "d3";
export default class Canvas extends Component {
  componentDidMount() {
    console.log(d3);
    this.canvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", 600)
      .attr("height", 400)
      .style("border", "1px solid black");

    const ellipses = [
      { cx: 25, cy: 25, rx: 15, ry: 20 },
      { cx: 75, cy: 75, rx: 15, ry: 20 },
      { cx: 125, cy: 125, rx: 15, ry: 20 },
      { cx: 175, cy: 175, rx: 15, ry: 20 }
    ];
    this.drawElipses(ellipses);
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
    return <div ref="canvas"></div>;
  }
}
