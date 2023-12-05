import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
    let avatar = avatarUrl
    if (!avatarUrl){
        avatar = 'https://mui.com/static/images/avatar/2.jpg'
    }

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
