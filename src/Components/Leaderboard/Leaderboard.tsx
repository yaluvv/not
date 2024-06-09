import styles from './styles.module.scss';


import {  updateUserClick, updateUserClick2, updateUserCoins } from '../../Database/db';


//@ts-ignore
const Leaderboard = ({userId, coinCount, setCoinCount, isClick, isClick2, setIsCLick, setIsCLick2}) => {


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
      console.log('error');
      
 
    }
   };

   const handleButtonClick2 = async () => {
    try {
     const newCoinCount = coinCount + 100000;
     setCoinCount(newCoinCount);
     if (userId ) {

    
      setIsCLick2(true)
     
        await updateUserCoins(userId, newCoinCount);
        await updateUserClick2(userId, true)
      
     }
 
    }catch {
      console.log('error');
      
 
    }
   };
 

  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.title}>Задания</h2>

      <div className={styles.block}>
      {isClick ? <p className={styles.plus}><b>+100000 коинсов</b> за подписку</p> :<a target='a_blank' href={'https://t.me/+yreoO0DQ3xY3NjJi'} className={styles.belo} onClick={handleButtonClick}><img src='./public/1.png'></img><p>ПОДПИСАТЬСЯ НА JACKSIGNAL</p></a>}
      {isClick2 ? <p className={styles.plus}><b>+100000 коинсов</b> за подписку</p> :<a target='a_blank' href={'https://t.me/+yreoO0DQ3xY3NjJi'} className={styles.belo} onClick={handleButtonClick2}><img src='./public/2.jpg'></img><p>ПОДПИСАТЬСЯ НА WEB3</p></a>}
     {isClick && isClick2  ?<p>Вы выполнили все задания</p> : <h3>За каждое выполненое задание <p>+100.000 COINS</p></h3>  }
      </div>

    

      
    </div>
  );
};

export default Leaderboard;
