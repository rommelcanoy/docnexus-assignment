import docnexusLogo from '@/public/docnexus.svg';
import Image from 'next/image';
import Link from 'next/link';
interface NavigationProps {
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className='bg-white py-2 px-5 fixed top-0 left-0 right-0 z-30 shadow-sm border-b'>
      <div className="mx-auto xl:px-30 max-w-5xl flex justify-center">
        <Link href="/"><Image src={docnexusLogo} alt="DocNexus" className='w-24 h-auto rounded-md' /></Link>
      </div>
    </div>
  )
}

export default Navigation