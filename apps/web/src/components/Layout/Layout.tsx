import React from 'react';
import { Card } from '@repo/ui-components';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </Card>
      </div>
    </div>
  );
};
