import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ministry Analytics | SAHAYAK-AI',
  description: 'National predictive crime analytics and atrocity prevention metrics for the Ministry of Social Justice & Empowerment.',
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
