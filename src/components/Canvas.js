import React, { Component } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import nanoid from "nanoid";
import {
  getShapes,
  addShape,
  deleteShape,
  modifyShape,
  selectShape
} from "../actions";
import colorsArray from "../helpers/randomColorsArray";
class Canvas extends Component {
  constructor(props) {
    super(props);

    //save local state to don't trigger redux on every drag update
    this.state = {
      Shape: this.generateDefaultShape()
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.createCanvas();
    this.eipseSetupEventHandlers();
    this.canvas.on("keydown", this.keydownEventHandlers);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.shapes.length !== this.props.shapes.length) {
      console.log("test");

      this.redrawCanvas();
    }
  }
  generateDefaultShape() {
    const fillIndex = Math.floor(Math.random() * colorsArray.length);
    const strokeIndex = Math.floor(Math.random() * colorsArray.length);
    const fillColor = colorsArray[fillIndex];
    const strokeColor = colorsArray[strokeIndex];
    return {
      id: nanoid(),
      r: null,
      x0: null,
      y0: null,
      cx: null,
      cy: null,
      rx: null,
      ry: null,
      fill: fillColor,
      stroke: strokeColor
    };
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
        .on("start", this.addShapeStart)
        .on("drag", this.addShapeDrag)
        .on("end", this.addShapeEnd)
    );
  }
  //redraw is data changed outside
  redrawCanvas() {
    console.log(this.props.shapes);
    this.canvas.selectAll("g").remove();
    this.props.shapes.forEach(element => {
      this.canvas
        .append("g")
        .append("ellipse")
        .data([
          {
            cx: element.cx,
            cy: element.cy,
            rx: element.rx,
            ry: element.ry
          }
        ])
        .attr("cx", element.cx)
        .attr("cy", element.cy)
        .attr("rx", element.rx)
        .attr("ry", element.ry)
        .attr("fill", element.fill)
        .attr("stroke", element.stroke)
        .attr("uuid", element.id)
        .attr("width", 1)
        .attr("height", 1);
    });
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
        .on("end", this.ellipseDragEndHandler(this))
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
      const shape = componentContext.props.shapes.find(
        shape => shape.id == this.getAttribute("uuid")
      );
      componentContext.props.selectShape(shape);
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
  ellipseDragEndHandler = componentContext => {
    return function(d, i) {
      console.log("DRAGEND", d, i);

      const shape = componentContext.props.shapes.find(
        shape => shape.id == this.getAttribute("uuid")
      );

      componentContext.props.modifyShape({ ...shape, ...d });
    };
  };
  //elipse creation methods
  addShapeStart = () => {
    const m = d3.event;

    this.setState(state => ({
      ...state,
      Shape: {
        ...state.Shape,
        x0: m.x,
        y0: m.y,
        cx: m.x,
        cy: m.y,
        rx: 0,
        ry: 0,
        r: this.canvas
          .append("g")
          .append("ellipse")
          .data([
            {
              cx: m.x,
              cy: m.y
            }
          ])
          .attr("cx", m.x)
          .attr("cy", m.y)
          .attr("fill", state.Shape.fill)
          .attr("stroke", state.Shape.stroke)
          .attr("uuid", state.Shape.id)
          .attr("width", 1)
          .attr("height", 1)
      }
    }));
  };
  addShapeDrag = () => {
    const m = d3.event;

    this.setState(state => {
      const updatedShape = {
        ...state.Shape,
        rx: Math.abs(state.Shape.x0 - m.x),
        ry: Math.abs(state.Shape.y0 - m.y)
      };
      updatedShape.r
        .attr("rx", Math.abs(state.Shape.x0 - m.x))
        .attr("ry", Math.abs(state.Shape.y0 - m.y));
      return {
        ...state,
        Shape: updatedShape
      };
    });
  };
  addShapeEnd = () => {
    this.props.addShape(this.state.Shape);
    this.props.selectShape(this.state.Shape);
    this.setState(state => ({
      Shape: this.generateDefaultShape()
    }));

    this.eipseSetupEventHandlers();
  };
  mouseOffset() {
    return d3.event;
  }

  render() {
    return (
      <div className="app__canvas">
        {/* <div>{JSON.stringify(this.state.active)}</div> */}
        <div ref={this.canvasRef}></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shapes: state.shapes
  };
};
export default connect(
  mapStateToProps,
  { getShapes, addShape, deleteShape, modifyShape, selectShape }
)(Canvas);
