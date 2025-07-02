import type React from 'react';

interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <section className="flex-grow-1 py-5 px-5 bg-white min-vh-100">
      {children}
    </section>
  );
};

export default Section;
