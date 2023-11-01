import { useLottie } from "lottie-react";

const style = {
  height: 300,
};

interface FirstLoadingProps {
    animation: any; // รับข้อมูลอนิเมชัน
  }

const Example: React.FC<FirstLoadingProps> = ({ animation }) => {
  const options = {
    animationData: animation.default,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  return <div>{View}</div>;
};

export default Example;
