import React from 'react';
import { Button, Card, Input } from '@repo/ui-components';

export default function ComponentsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Component Library</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <Card className="p-6 space-y-4">
            <div className="space-x-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
          <Card className="p-6 space-y-4">
            <Input label="Default Input" placeholder="Enter some text" />
            <Input
              label="Error Input"
              error="This is an error message"
              placeholder="Enter some text"
            />
          </Card>
        </section>
      </div>
    </div>
  );
}
