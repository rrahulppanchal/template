import React from 'react';
import { Button, Card } from '@repo/ui-components';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          Welcome to our documentation. This monorepo contains a React frontend,
          Express backend, and shared utilities.
        </p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = '/components')}
        >
          View Components
        </Button>
      </Card>
    </div>
  );
}
