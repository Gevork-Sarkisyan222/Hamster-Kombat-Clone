import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TopContent from './components/TopContent';
// @ts-ignore
import numeral from 'numeral';

// icons
import coinIcon from './images/coinIcon.svg';
import bigCoinIcon from './images/bigCoin.svg';
import blueCenter from './images/blue-center.svg';
import hamsterImage from './images/hamster.svg';
import stormIcon from './images/storm.svg';
import binanceIcon from './images/binanceIcon.svg';
import mineIcon from './images/mine.svg';
import friendsIcon from './images/humans.svg';
import moneyIcon from './images/moneys.svg';

//  not mine
import Hamster from './icons/Hamster';
import {
  binanceLogo,
  dailyCipher,
  dailyCombo,
  dailyReward,
  dollarCoin,
  hamsterCoin,
  mainCharacter,
} from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';

interface Iitem {
  icon: string;
  title: string;
}

function App() {
  const epicText = 'Grandmaster >';
  const [coins, setCoins] = useState(541507981);
  let formattedCoinsCount = numeral(coins).format('0,0');

  const handleIncreaseCoins = () => {
    setCoins(coins + 300);
  };

  const handleWarning = () => {
    prompt('Пользователь скрыл эти информации введите пароль');
  };

  const items: Iitem[] = [
    {
      icon: binanceIcon,
      title: 'Exchange',
    },
    {
      icon: mineIcon,
      title: 'Mine',
    },
    {
      icon: friendsIcon,
      title: 'Friends',
    },
    {
      icon: moneyIcon,
      title: 'Earn',
    },
    {
      icon: coinIcon,
      title: 'Airdrop',
    },
  ];

  const levelNames = [
    'Bronze', // From 0 to 4999 coins
    'Silver', // From 5000 coins to 24,999 coins
    'Gold', // From 25,000 coins to 99,999 coins
    'Platinum', // From 100,000 coins to 999,999 coins
    'Diamond', // From 1,000,000 coins to 2,000,000 coins
    'Epic', // From 2,000,000 coins to 10,000,000 coins
    'Legendary', // From 10,000,000 coins to 50,000,000 coins
    'Master', // From 50,000,000 coins to 100,000,000 coins
    'Grandmaster', // From 100,000,000 coins to 1,000,000,000 coins
    'Lord', // From 1,000,000,000 coins to ∞
  ];

  const levelMinPoints = [
    0, // Bronze
    5000, // Silver
    25000, // Gold
    100000, // Platinum
    1000000, // Diamond
    2000000, // Epic
    10000000, // Legendary
    50000000, // Master
    100000000, // GrandMaster
    1000000000, // Lord
  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 732749365;
  });

  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const pointsToAdd = 300;
  const profitPerHour = 15126420;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState('');
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState('');
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState('');

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
  };

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + pointsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [profitPerHour]);

  return (
    // no my code
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Hamster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">Gevork Sarkisyan</p>
            </div>
          </div>
          <div onClick={handleWarning} className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-[12px]">{levelNames[levelIndex]}</p>
                  <p className="text-sm">
                    {levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="progress-gradient h-2 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={handleWarning}
              className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64">
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">Profit per hour</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-[18px] h-[18px]" />
                  <p className="text-sm">{formatProfitPerHour(profitPerHour)}</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <div className="h-[32px] w-[2px] bg-[#43433b] mx-2"></div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyRewardTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyCipherTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
                <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyComboTimeLeft}
                </p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-[37px] h-[37px]" />
                <p className="leading-[2.5rem] text-[34px] text-white">{points.toLocaleString()}</p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="w-80 h-80 p-4 rounded-full circle-outer" onClick={handleCardClick}>
                <div className="w-full h-full rounded-full circle-inner">
                  <img
                    src={
                      'https://hamsterkombat.me/_next/image?url=%2Fhamster-kombat-9.png&w=1080&q=75'
                    }
                    alt="Main Character"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs">
        <div
          onClick={handleWarning}
          className="text-center text-[#85827d] w-1/5 bg-[#1c1f24] m-1 p-2 rounded-2xl">
          <img src={binanceLogo} alt="Exchange" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Exchange</p>
        </div>
        <div onClick={handleWarning} className="text-center text-[#85827d] w-1/5">
          <Mine className="w-8 h-8 mx-auto" />
          <p className="mt-1">Mine</p>
        </div>
        <div onClick={handleWarning} className="text-center text-[#85827d] w-1/5">
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
        <div onClick={handleWarning} className="text-center text-[#85827d] w-1/5">
          <Coins className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn</p>
        </div>
        <div onClick={handleWarning} className="text-center text-[#85827d] w-1/5">
          <img src={hamsterCoin} alt="Airdrop" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Airdrop</p>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}>
          {pointsToAdd}
        </div>
      ))}
    </div>
    // down my code
    // <div className="flex justify-center mt-[5px] h-screen text-center">
    //   <div className="w-[430px] h-[104vh] md:h-[820px]  bg-[#2C2F35] rounded-[40px] overflow-hidden relative">
    //     <TopContent />
    //     <div className="w-full h-full rounded-[40px] bg-[#2C2F35] mt-[-40px] pt-[30px] px-[30px]">
    //       {/* buttons */}
    //       <section className="flex items-center gap-[15px] justify-center">
    //         <div className="flex items-center justify-center flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
    //           <span className="text-[#F79841] text-[10px]">Earn per tap</span>
    //           <article className="flex gap-[2px] items-center">
    //             <img src={coinIcon} alt="coinIcon" />
    //             <span className="text-white text-[10px] mt-[3px]">+300</span>
    //           </article>
    //         </div>
    //         <div className="flex items-center justify-center  flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
    //           <span className="text-[#6F72E2] text-[10px]">Coins to level up</span>
    //           <span className="text-white text-[10px]">10 M</span>
    //         </div>
    //         <div className="flex items-center justify-center  flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
    //           <span className="text-[#84CB69] text-[10px]">Profit per hour</span>
    //           <article className="flex gap-[2px] items-center">
    //             <img src={coinIcon} alt="coinIcon" />
    //             <span className="text-white text-[10px] mt-[3px]">+13.31M</span>
    //           </article>
    //         </div>
    //       </section>

    //       {/* center */}
    //       <div className="flex justify-center mt-[24px]">
    //         <article className="flex items-center justify-center gap-[8px]">
    //           <img className="w-[42px] h-[42px]" src={bigCoinIcon} alt="coin icon" />
    //           <h1 className="text-[30px] text-white font-bold">{formattedCoinsCount}</h1>
    //         </article>
    //       </div>

    //       {/* line bar */}
    //       <div className="w-370 mt-[12px] mb-[20px]">
    //         <article className="flex justify-between items-center cursor-pointer">
    //           <h3 className="text-white text-[10px]">{epicText}</h3>
    //           <h3 className="text-[grey] text-[10px]">
    //             Level <span className="text-white font-[5px]">9/10</span>
    //           </h3>
    //         </article>
    //         <div className="w-full h-[10px] border-white bg-[#32363C] mt-[7px] rounded-[30px] overflow-hidden cursor-pointer">
    //           <div className="w-[75%] h-full bg-yellow-300 bg-gradient-to-tr from-yellow-300 via-green-400 to-pink-400"></div>
    //         </div>
    //       </div>

    //       {/* click section */}
    //       <section className="flex justify-center">
    //         <div
    //           onClick={handleIncreaseCoins}
    //           className="w-[320px] h-[320px] bg-[#5155DA] rounded-[500px] flex items-center justify-center shadow-black cursor-pointer relative">
    //           <img src={blueCenter} alt="blueCenter" />
    //           <img
    //             className="absolute"
    //             src={'https://hamsterkombat.me/_next/image?url=%2Fhamster-kombat-9.png&w=1080&q=75'}
    //             alt="hamsterImage"
    //           />
    //         </div>
    //       </section>

    //       {/* down section */}
    //       <div className="flex flex-col items-center">
    //         <div className="mt-[10px] bottom-[75px] absolute max-h-820:bottom-[45px] max-h-790:bottom-[20px] md:bottom-[30px]">
    //           <div className="flex items-center justify-between text-white">
    //             <article className="flex items-center gap-[5px]">
    //               <img src={stormIcon} alt="stormIcon" />
    //               <h3>3500 / 9500</h3>
    //             </article>
    //             <div>
    //               <h3>Boost</h3>
    //             </div>
    //           </div>

    //           <div className="flex justify-center">
    //             <div className="flex justify-center relative">
    //               <section className="flex w-[310px] lt:w-[368px] h-[60px] bg-[#30333a] mt-[25px] rounded-[12px] items-center justify-around">
    //                 {items.map((item: Iitem, index: number) => (
    //                   <div
    //                     onClick={() => handleActive(index)}
    //                     key={index}
    //                     className={`w-[65px] h-[50px] rounded-[8px] p-[6px] flex flex-col items-center cursor-pointer justify-between ${
    //                       active === index ? 'bg-[#292c33]' : ''
    //                     }`}>
    //                     <img width={24} height={24} src={item.icon} alt={`icon of ${item.title}`} />
    //                     <h2
    //                       className={`text-[12px] ${
    //                         active === index ? 'text-white' : 'text-[#97999c]'
    //                       }`}>
    //                       {item.title}
    //                     </h2>
    //                   </div>
    //                 ))}
    //               </section>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
