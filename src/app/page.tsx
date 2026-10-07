import Agent from '@/components/Agent';
import Facts from '@/components/Facts';
import Footer from '@/components/Footer';
import Formats from '@/components/Formats';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Infrastructure from '@/components/Infrastructure';
import Layouts from '@/components/Layouts';
import Location from '@/components/Location';
import Motion from '@/components/Motion';
import Mountain from '@/components/Mountain';
import Terms from '@/components/Terms';
import Why from '@/components/Why';

export default function Page() {
  return (
    <div style={{ width: '100%', background: '#0E1311', color: '#F4F1EC', fontFamily: 'var(--fb)', overflow: 'hidden' }}>
      <main>
        <Hero />
        <Facts />
        <Why />
        <Formats />
        <Mountain />
        <Layouts />
        <Gallery />
        <Infrastructure />
        <Terms />
        <Location />
        <Agent />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
