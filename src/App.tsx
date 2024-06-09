import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import { addUser, updateUserCoins, getUser } from './Database/db';
import Leaderboard from './Components/Leaderboard/Leaderboard';
import { DollarOutlined, BarsOutlined   } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import buttonSvg from './assets/luna1.png';
import moneySvg from './assets/meteor.png';
import airIcon from './assets/airicon.png';

function App() {
  const [coinCount, setCoinCount] = useState<number>(0);
  const [userId, setUserId] = useState<string>('');
  const [currentView, setCurrentView] = useState<string>('coin');
  const [isClick, setIsClick] = useState<boolean>(false);
  const [isClick2, setIsClick2] = useState<boolean>(false);

  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent)

  console.log(isMobile);
  

  useEffect(() => {
    const initializeApp = async () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        const user = await getUser(storedUserId);
        if (user) {
          setCoinCount(user.coins);
          setIsClick(user.isClick)
          setIsClick2(user.isClick2)

        }
      } else {
        const newUserId = 'You';
        localStorage.setItem('userId',newUserId);
        setUserId(newUserId);
        await addUser({ userid: newUserId, coins: 0, isClick: false, isClick2: false });
      }
    };

      initializeApp();

   
      
  
  }, []);





  const handleButtonClick = async () => {
   try {
    const newCoinCount = coinCount + 5;
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
        <div className={styles.fuckingMain}>
          <div >
            <div className={styles.score}>
            <img src={moneySvg} alt="money" className={styles.scoreImg} />
            <h1 className={styles.scoreTitle}>{coinCount}</h1>
            </div>
            <p className={styles.x5}><img src={moneySvg} alt='x5'></img>X5 БОНУС</p>
          </div>
          <div className={styles.clickButton} onClick={handleButtonClick} >
          <img src={buttonSvg} alt="Click to earn coins" />
          </div>
         
        </div>
      );
    }

    if (currentView === 'leaderboard') {
      return <Leaderboard userId={userId} coinCount={coinCount} setCoinCount={setCoinCount} isClick={isClick} setIsClick={setIsClick} isClick2={isClick2} setIsClick2={setIsClick2}/>;
    }

    return null;
  };

  return (
    <div className={styles.app}>

      {!isMobile ? <h1 className={styles.not1}>Играть можно только с телефона!</h1> : renderContent()}

      {!isMobile ? <h1 className={styles.not1}>Перейдите в бот <a href='t.me/lunamton_bot/lunamton'>t.me/lunamton_bot/lunamton</a>c телефона</h1>:  <div className={styles.menu}>
          <ConfigProvider wave={{ disabled: true }}>
          <Button ghost className={styles.menuBtn} onClick={() => setCurrentView('coin')} icon={<DollarOutlined className={styles.icon} />}> 
               <p>ИГРАТЬ</p>
               </Button>  
               </ConfigProvider>    
               <ConfigProvider wave={{ disabled: true }}>
         <Button ghost className={styles.menuBtn} onClick={() => setCurrentView('leaderboard')} icon={<BarsOutlined  className={styles.icon} />}>
         <p>ЗАДАНИЯ</p>
         </Button>
         </ConfigProvider>   
     
         <div className={`${styles.menuBtn} ${styles.menuBtnAir}` }>
<img src={airIcon} alt="airicon" />
<p>AIRDROP</p>
</div>
        

        </div>}
 
       
  
    </div>
  );
}

export default App;
