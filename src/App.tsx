import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import { addUser, updateUserCoins, getUser } from './Database/db';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import {TrophyOutlined, DollarOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import buttonSvg from './assets/button.png';
import moneySvg from './assets/money.png';

function App() {
  const [coinCount, setCoinCount] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [currentView, setCurrentView] = useState<string>('coin');
  const [isClick, setIsCLick] = useState<boolean>(false);

  useEffect(() => {
    const initializeApp = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        const user = await getUser(storedUserId);
        if (user) {
          setCoinCount(user.coins);
          setIsCLick(user.isClick)
          console.log('1'+ localStorage.getItem('userId'));

        }
      } else {
        const newUserId = 'You';
        localStorage.setItem('userId',newUserId);
        setUserId(newUserId);
        await addUser({ userid: newUserId, coins: 0, isClick: false });
      }
    };

      initializeApp();

   
      
  
  }, []);

  const handleButtonClick = async () => {
   try {
    const newCoinCount = coinCount + 2;
    setCoinCount(newCoinCount);
    if (userId ) {
      await updateUserCoins(userId, newCoinCount);
    }

   }catch {

   }
  };




  const renderContent = () => {
 

    if (currentView === 'coin') {
      return (
        <div>
          <div className={styles.score}>
            <img src={moneySvg} alt="money" className={styles.scoreImg} />
            <h1>{coinCount}</h1>
          </div>
          <img src={buttonSvg} alt="Click to earn coins" className={styles.clickButton} onClick={handleButtonClick} />
        </div>
      );
    }

    if (currentView === 'leaderboard') {
      return <Leaderboard userId={userId} coinCount={coinCount} setCoinCount={setCoinCount} isClick={isClick} setIsCLick={setIsCLick}/>;
    }

    return null;
  };

  return (
    <div className={styles.app}>
      {renderContent()}
 
        <div className={styles.menu}>
          <Button ghost className={styles.btn} onClick={() => setCurrentView('coin')} shape="circle" icon={<DollarOutlined className={styles.icon} />} />
          <Button ghost className={styles.btn} onClick={() => setCurrentView('leaderboard')} shape="circle" icon={<TrophyOutlined className={styles.icon} />} />
        </div>
  
    </div>
  );
}

export default App;
