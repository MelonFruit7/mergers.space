import dynamic from "next/dynamic";
// import FirstView from "@/components/FirstView";
// import Preview from "@/components/Preview";
// import Core from "@/components/Core";
// import Footer from "@/components/Footer";
const FirstView = dynamic(() => import('../components/FirstView'), { ssr: false });
const Preview = dynamic(() => import('../components/Preview'), { ssr: false });
const Core = dynamic(() => import('../components/Core'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), {ssr: false});

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
