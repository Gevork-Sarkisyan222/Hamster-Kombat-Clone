import React, { useState } from 'react';
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

  const [active, setActive] = useState(0);

  const handleWarning = () => {
    prompt('Пользователь скрыл эти информации введите пароль');
  };

  const handleActive = (id: number) => {
    handleWarning();
    // setActive(id);
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

  return (
    <div className="flex justify-center mt-[5px] h-screen text-center">
      <div className="w-[430px] h-[104vh] md:h-[820px]  bg-[#2C2F35] rounded-[40px] overflow-hidden relative">
        <TopContent />
        <div className="w-full h-full rounded-[40px] bg-[#2C2F35] mt-[-40px] pt-[30px] px-[30px]">
          {/* buttons */}
          <section className="flex items-center gap-[15px] justify-center">
            <div className="flex items-center justify-center flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
              <span className="text-[#F79841] text-[10px]">Earn per tap</span>
              <article className="flex gap-[2px] items-center">
                <img src={coinIcon} alt="coinIcon" />
                <span className="text-white text-[10px] mt-[3px]">+300</span>
              </article>
            </div>
            <div className="flex items-center justify-center  flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
              <span className="text-[#6F72E2] text-[10px]">Coins to level up</span>
              <span className="text-white text-[10px]">10 M</span>
            </div>
            <div className="flex items-center justify-center  flex-col w-[120px] h-[50px] bg-[#32363C] px-30px py-[5px] rounded-[10px]">
              <span className="text-[#84CB69] text-[10px]">Profit per hour</span>
              <article className="flex gap-[2px] items-center">
                <img src={coinIcon} alt="coinIcon" />
                <span className="text-white text-[10px] mt-[3px]">+13.31M</span>
              </article>
            </div>
          </section>

          {/* center */}
          <div className="flex justify-center mt-[24px]">
            <article className="flex items-center justify-center gap-[8px]">
              <img className="w-[42px] h-[42px]" src={bigCoinIcon} alt="coin icon" />
              <h1 className="text-[30px] text-white font-bold">{formattedCoinsCount}</h1>
            </article>
          </div>

          {/* line bar */}
          <div className="w-370 mt-[12px] mb-[20px]">
            <article className="flex justify-between items-center cursor-pointer">
              <h3 className="text-white text-[10px]">{epicText}</h3>
              <h3 className="text-[grey] text-[10px]">
                Level <span className="text-white font-[5px]">9/10</span>
              </h3>
            </article>
            <div className="w-full h-[10px] border-white bg-[#32363C] mt-[7px] rounded-[30px] overflow-hidden cursor-pointer">
              <div className="w-[75%] h-full bg-yellow-300 bg-gradient-to-tr from-yellow-300 via-green-400 to-pink-400"></div>
            </div>
          </div>

          {/* click section */}
          <section className="flex justify-center">
            <div
              onClick={handleIncreaseCoins}
              className="w-[320px] h-[320px] bg-[#5155DA] rounded-[500px] flex items-center justify-center shadow-black cursor-pointer relative">
              <img src={blueCenter} alt="blueCenter" />
              <img
                className="absolute"
                src={'https://hamsterkombat.me/_next/image?url=%2Fhamster-kombat-9.png&w=1080&q=75'}
                alt="hamsterImage"
              />
            </div>
          </section>

          {/* down section */}
          <div className="flex flex-col items-center">
            <div className="mt-[10px] absolute bottom-[75px] md:bottom-[30px]">
              <div className="flex items-center justify-between text-white">
                <article className="flex items-center gap-[5px]">
                  <img src={stormIcon} alt="stormIcon" />
                  <h3>3500 / 9500</h3>
                </article>
                <div>
                  <h3>Boost</h3>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex justify-center relative">
                  <section className="flex w-[310px] lt:w-[368px] h-[60px] bg-[#30333a] mt-[25px] rounded-[12px] items-center justify-around">
                    {items.map((item: Iitem, index: number) => (
                      <div
                        onClick={() => handleActive(index)}
                        key={index}
                        className={`w-[65px] h-[50px] rounded-[8px] p-[6px] flex flex-col items-center cursor-pointer justify-between ${
                          active === index ? 'bg-[#292c33]' : ''
                        }`}>
                        <img width={24} height={24} src={item.icon} alt={`icon of ${item.title}`} />
                        <h2
                          className={`text-[12px] ${
                            active === index ? 'text-white' : 'text-[#97999c]'
                          }`}>
                          {item.title}
                        </h2>
                      </div>
                    ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
