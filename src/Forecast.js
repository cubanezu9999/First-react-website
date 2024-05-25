import React from "react";
import moment from "moment";
import "moment/locale/en-gb";
import classes from "./Forecast.module.css";
export default function Forecast(props) {
  return (
    <div className={classes.container}>
      <div className={classes.date}>
        <div className={classes.day}>{moment(props.date).format("dddd")}</div>
        <div className={classes.dayvalue}>{moment(props.date).format("l")}</div>
      </div>
      <img src={`${props.img}.png`} alt="ico" className={classes.img}></img>
      <div className={classes.dayvalue}>{props.description}</div>
      <div className={classes.temp}>
        <div className={classes.value}>
          <div className={classes.dayvalue}>High</div>
          <div className={classes.tempvalues}>{Math.round(props.high)}°C</div>
        </div>
        <div className={classes.values}>
          <div className={classes.dayvalue}>Low</div>
          <div className={classes.tempvalues}>{Math.round(props.low)}°C</div>
        </div>
      </div>
    </div>
  );
}
