import React from 'react';

// icons
import nickAvatar from '../images/nickAvatar.svg';
import binanceIcon from '../images/binanceIcon.svg';

function TopContent() {
  const hanldleGoToBinance = () => {
    window.location.href =
      'https://accounts.binance.com/ru/register?ref=941326358&gad_source=1&gclid=CjwKCAjw7s20BhBFEiwABVIMrZoXmq6xL1bmHgy2PSWwVJT41W5UUKy2O14snSK-X_o0rrpIeYIMLhoCAB8QAvD_BwE';
  };

  return (
    <article className="pt-[40px] w-full h-[175px] bg-[linear-gradient(180deg,rgba(33,36,41,1)_60%,rgba(254,221,60,1)_100%)]">
      <section className="flex justify-between items-center px-[30px]">
        <div className="flex gap-2 items-center">
          <img className="cursor-pointer" src={nickAvatar} alt="nickAvatar" />
          <h2 className="text-white text-[14px] cursor-pointer">Gevrok Sarkisyan</h2>
        </div>
        <button
          onClick={hanldleGoToBinance}
          className="w-[100px] h-[40px] flex gap-[8px] bg-[#32363C] rounded-[10px] p-[10px] justify-center items-center">
          <img src={binanceIcon} alt="binanceIcon" />
          <span className="text-white text-[12px]">Binance</span>
        </button>
      </section>
    </article>
  );
}

export default TopContent;
