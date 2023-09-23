import React from "react";
import styles from "./result.module.css"

export default function ShowResult(props) {

  const { result } = props;

  return(
    <div className={styles.container}>
      {result}
    </div>
  )
}