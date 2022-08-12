import React from 'react';

import styles from './HeroItem.module.scss';
// import { UserInfo } from '../UserInfo';


export const HeroItem = ({
    id,
    nickname,
    images,
    real_name,
    viewsCount,
    user,
    origin_description,
    superpowers,
    catch_phrase,
}) => {    
  return (
      <div className={styles.root}>
          <ul className={styles.HeroList}>
              <li key={id} >
                    <div className={styles.container}>
                        <img className={styles.image} src={images} alt={nickname} />
                        <div className={styles.text}>
                            <p>Nickname: <span>{nickname}</span></p>
                            <p>Real name: <span>{real_name}</span></p>
                            <p>Description: <span>{origin_description}</span></p>
                            <p>Superpowers: <span>{superpowers}</span></p>
                            <p>Catch phrase:<span>{catch_phrase}</span></p>
                        </div>
                    </div>
                </li>
          </ul>
    </div>
  );
};