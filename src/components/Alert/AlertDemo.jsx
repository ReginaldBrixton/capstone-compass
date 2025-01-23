import React from 'react';

import { Alert } from './';

const AlertDemo = () => {
  const handleViewMore = (variant) => {
    console.log(`View more clicked for ${variant} alert`);
  };

  const handleDismiss = (variant) => {
    console.log(`Dismiss clicked for ${variant} alert`);
  };

  const requirements = [
    'At least 10 characters (and up to 100 characters)',
    'At least one lowercase character',
    'Inclusion of at least one special character, e.g., ! @ # ?',
  ];

  return (
    <div className="p-4 space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Default Alerts</h2>
        <Alert
          id="info-alert-1"
          variant="info"
          title="Info alert!"
          message="Change a few things up and try submitting again."
          size="sm"
        />
        <Alert
          id="danger-alert-1"
          variant="danger"
          title="Danger alert!"
          message="Change a few things up and try submitting again."
          size="sm"
        />
        <Alert
          id="success-alert-1"
          variant="success"
          title="Success alert!"
          message="Change a few things up and try submitting again."
          size="sm"
        />
        <Alert
          id="warning-alert-1"
          variant="warning"
          title="Warning alert!"
          message="Change a few things up and try submitting again."
          size="sm"
        />
        <Alert
          id="dark-alert-1"
          variant="dark"
          title="Dark alert!"
          message="Change a few things up and try submitting again."
          size="sm"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Bordered Alerts</h2>
        <Alert
          id="info-alert-2"
          variant="info"
          title="Info alert!"
          message="Change a few things up and try submitting again."
          bordered
          size="sm"
        />
        <Alert
          id="danger-alert-2"
          variant="danger"
          title="Danger alert!"
          message="Change a few things up and try submitting again."
          bordered
          size="sm"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Border Accent Alerts</h2>
        <Alert
          id="success-alert-3"
          variant="success"
          title="Success alert!"
          message="Change a few things up and try submitting again."
          borderAccent
          size="sm"
        />
        <Alert
          id="warning-alert-3"
          variant="warning"
          title="Warning alert!"
          message="Change a few things up and try submitting again."
          borderAccent
          size="sm"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Alerts with Links</h2>
        <Alert
          id="info-alert-4"
          variant="info"
          title="Info alert!"
          message="A simple info alert with an "
          link="#"
          linkText="example link"
          size="sm"
        />
        <Alert
          id="danger-alert-4"
          variant="danger"
          title="Danger alert!"
          message="A simple danger alert with an "
          link="#"
          linkText="example link"
          size="sm"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Alerts with Lists</h2>
        <Alert
          id="info-alert-5"
          variant="info"
          title="Ensure that these requirements are met:"
          list={requirements}
          size="sm"
        />
        <Alert
          id="danger-alert-5"
          variant="danger"
          title="Ensure that these requirements are met:"
          list={requirements}
          size="sm"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Dismissible Alerts with Actions</h2>
        <Alert
          id="info-alert-6"
          variant="info"
          title="This is an info alert"
          message="More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
          onViewMore={() => handleViewMore('info')}
          onDismiss={() => handleDismiss('info')}
          bordered
        />
        <Alert
          id="danger-alert-6"
          variant="danger"
          title="This is a danger alert"
          message="More info about this danger alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
          onViewMore={() => handleViewMore('danger')}
          onDismiss={() => handleDismiss('danger')}
          borderAccent
        />
      </div>
    </div>
  );
};

export default AlertDemo;
