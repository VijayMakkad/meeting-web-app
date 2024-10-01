import Image from "next/image";
import React from "react";

interface HomeCardProps {
  color: String;
  title: String;
  imageSrc: String;
  desc: String;
  handleClick: () => void;
}

const HomeCard: React.FC<HomeCardProps> = ({
  color,
  title,
  imageSrc,
  desc,
  handleClick,
}) => {
  return (
    <div
      className={`${color} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer `}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image
          src={`/icons/${imageSrc}.svg`}
          alt={`${title}`}
          width={25}
          height={25}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{desc}</p>
      </div>
    </div>
  );
};

export default HomeCard;
