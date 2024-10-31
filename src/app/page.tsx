import dynamic from "next/dynamic";
const FirstView = dynamic(() => import('../components/FirstView'), { ssr: false });
const Preview = dynamic(() => import('../components/Preview'), { ssr: false });
const Core = dynamic(() => import('../components/Core'), { ssr: false });
import Footer from '@/components/Footer';


export default function Home() {
  return (
      <main className="w-[100vw] overflow-hidden">
        <FirstView></FirstView>
        <Preview></Preview>
        <Core></Core>
        <Footer></Footer>
      </main>
  )
};
