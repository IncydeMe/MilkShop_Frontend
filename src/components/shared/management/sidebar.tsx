import { useState } from 'react';
import Link from 'next/link'
import SidebarButton from '@/components/shared/management/sidebar-button'
import { ChevronRightCircle, ChevronLeftCircle, LucideIcon, Milk } from 'lucide-react'

interface SidebarLinkProps {
  icon: LucideIcon;
  link: string;
  label: string;
  isExpanded: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, link, label, isExpanded }) => (
  <SidebarButton icon={icon} className={` text-black ${isExpanded ? '' : 'w-20 justify-center'}`}>
    <Link href={link}>
      {isExpanded && <p className='text-[16px]'>{label}</p>}
    </Link>
  </SidebarButton>
)

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
  isExpanded: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children, isExpanded }) => (
  <section>
    {title && <h4 className={`font-semibold p-2 text-[20px] text-slate-600 mb-2 ${isExpanded ? '' : 'hidden'}`}>{title}</h4>}
    <div className='flex flex-col gap-4'>
      {children}
    </div>
    <hr className={`w-${isExpanded ? '[240px]' : '[80px]'} h-[2px] rounded-[999px] bg-gray-400 my-2`} />
  </section>
)

interface SidebarProps {
  sections: {
    title?: string;
    links: SidebarLinkProps[];
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={`w-${isExpanded ? '[270px]' : '[120px]'} max-w-[18rem] min-h-screen border-r-[1px] shadow-small`}>
      <div className='h-full px-3 py-4'>
        <div className='flex items-center justify-center gap-x-4 p-2 mb-4'>
          <Milk size={32}/>
          {isExpanded && <h3 className='mx-3 text-[24px] font-semibold text-center uppercase text-foreground'>Milk Store</h3>}
          <button onClick={() => setIsExpanded(!isExpanded)} className={`absolute top-[48px] ${isExpanded? 'left-[250px]': 'left-[100px]'}`}>
            {isExpanded ? <ChevronLeftCircle size={32}/> : <ChevronRightCircle size={32}/>}
          </button>
        </div>
        <div className='mt-5'>
          <div className='flex flex-col gap-1 w-full'>
            {sections.map((section, i) => (
              <SidebarSection key={i} title={section.title} isExpanded={isExpanded}>
                {section.links.map((link, j) => (
                  <SidebarLink key={j} {...link} isExpanded={isExpanded} />
                ))}
              </SidebarSection>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar