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
    <div className="space-y-8 p-4" data-oid=":cy5sc5">
      <div data-oid="_x0vlm8">
        <h2 className="mb-4 text-lg font-semibold" data-oid="av2uokn">
          Default Alerts
        </h2>
        <Alert
          id="info-alert-1"
          variant="info"
          title="Info alert!"
          message="Change a few things up and try submitting again."
          size="sm"
          data-oid="alwhpw2"
        />
        <Alert
          id="danger-alert-1"
          variant="danger"
          title="Danger alert!"
          message="Change a few things up and try submitting again."
          size="sm"
          data-oid="0szwjar"
        />
        <Alert
          id="success-alert-1"
          variant="success"
          title="Success alert!"
          message="Change a few things up and try submitting again."
          size="sm"
          data-oid="wq:rl8e"
        />
        <Alert
          id="warning-alert-1"
          variant="warning"
          title="Warning alert!"
          message="Change a few things up and try submitting again."
          size="sm"
          data-oid="ln04s4w"
        />
        <Alert
          id="dark-alert-1"
          variant="dark"
          title="Dark alert!"
          message="Change a few things up and try submitting again."
          size="sm"
          data-oid="8-dykw."
        />
      </div>

      <div data-oid=":_fn.rz">
        <h2 className="mb-4 text-lg font-semibold" data-oid="nkd9d77">
          Bordered Alerts
        </h2>
        <Alert
          id="info-alert-2"
          variant="info"
          title="Info alert!"
          message="Change a few things up and try submitting again."
          bordered
          size="sm"
          data-oid="wwd2f_z"
        />
        <Alert
          id="danger-alert-2"
          variant="danger"
          title="Danger alert!"
          message="Change a few things up and try submitting again."
          bordered
          size="sm"
          data-oid="6:vkqr8"
        />
      </div>

      <div data-oid="2yx28do">
        <h2 className="mb-4 text-lg font-semibold" data-oid="6odpme2">
          Border Accent Alerts
        </h2>
        <Alert
          id="success-alert-3"
          variant="success"
          title="Success alert!"
          message="Change a few things up and try submitting again."
          borderAccent
          size="sm"
          data-oid="p5:p87w"
        />
        <Alert
          id="warning-alert-3"
          variant="warning"
          title="Warning alert!"
          message="Change a few things up and try submitting again."
          borderAccent
          size="sm"
          data-oid="xv-eu3k"
        />
      </div>

      <div data-oid="orkcfiq">
        <h2 className="mb-4 text-lg font-semibold" data-oid="-d-f1vu">
          Alerts with Links
        </h2>
        <Alert
          id="info-alert-4"
          variant="info"
          title="Info alert!"
          message="A simple info alert with an "
          link="#"
          linkText="example link"
          size="sm"
          data-oid="wtl5h:8"
        />
        <Alert
          id="danger-alert-4"
          variant="danger"
          title="Danger alert!"
          message="A simple danger alert with an "
          link="#"
          linkText="example link"
          size="sm"
          data-oid="3xlvk5-"
        />
      </div>

      <div data-oid="l5lm5tt">
        <h2 className="mb-4 text-lg font-semibold" data-oid="jwhip:e">
          Alerts with Lists
        </h2>
        <Alert
          id="info-alert-5"
          variant="info"
          title="Ensure that these requirements are met:"
          list={requirements}
          size="sm"
          data-oid="ewbe.sr"
        />
        <Alert
          id="danger-alert-5"
          variant="danger"
          title="Ensure that these requirements are met:"
          list={requirements}
          size="sm"
          data-oid="9_r4kkc"
        />
      </div>

      <div data-oid="pqoh9rp">
        <h2 className="mb-4 text-lg font-semibold" data-oid="91ldx8s">
          Dismissible Alerts with Actions
        </h2>
        <Alert
          id="info-alert-6"
          variant="info"
          title="This is an info alert"
          message="More info about this info alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
          onViewMore={() => handleViewMore('info')}
          onDismiss={() => handleDismiss('info')}
          bordered
          data-oid="dv6422g"
        />
        <Alert
          id="danger-alert-6"
          variant="danger"
          title="This is a danger alert"
          message="More info about this danger alert goes here. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content."
          onViewMore={() => handleViewMore('danger')}
          onDismiss={() => handleDismiss('danger')}
          borderAccent
          data-oid="41dw35q"
        />
      </div>
    </div>
  );
};
export default AlertDemo;
