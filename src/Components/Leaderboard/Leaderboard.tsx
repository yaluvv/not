import styles from './styles.module.scss';


import {  updateUserClick, updateUserCoins } from '../../Database/db';
import { useState } from 'react';


//@ts-ignore
const Leaderboard = ({userId, coinCount, setCoinCount, isClick, setIsCLick}) => {


  const handleButtonClick = async () => {
    try {
     const newCoinCount = coinCount + 100000;
     setCoinCount(newCoinCount);
     if (userId ) {

    
      setIsCLick(true)
     
        await updateUserCoins(userId, newCoinCount);
        await updateUserClick(userId, true)


     
 
      
     }
 
    }catch {
 
    }
   };
 

  return (
    <div className={styles.leaderboard}>
      <h2>Задания</h2>

      {isClick ? <p>+100000 коинсов за подписку</p> :<a target='a_blank' href={'https://t.me/+yreoO0DQ3xY3NjJi'} className={styles.belo} onClick={handleButtonClick}>ПОДПИСАТЬСЯ НА JACKSIGNAL</a>}

      
    </div>
  );
};

export default Leaderboard;
