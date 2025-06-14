import logo from '../../public/images/logo.png';
import Image from 'next/image';

export const SanityLogo = () => {
  return (
    <Image src={logo} alt="logo" width={25} height={25} /> 
  );
}