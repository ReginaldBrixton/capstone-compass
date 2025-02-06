'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import Button from './Button';
const ButtonDemo = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="button-demo space-y-8 p-8" data-oid="i5x:b1.">
      <div className="theme-switcher space-x-4" data-oid=".lv.-dy">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTheme('light')}
          className={theme === 'light' ? 'ring-2 ring-blue-500' : ''}
          data-oid="z-w0ory"
        >
          Light Mode
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTheme('dark')}
          className={theme === 'dark' ? 'ring-2 ring-blue-500' : ''}
          data-oid="umowfyi"
        >
          Dark Mode
        </Button>
      </div>

      <div className="variants space-y-4" data-oid="m59rneg">
        <h3 className="mb-2 text-lg font-semibold" data-oid="wektvwo">
          Button Variants
        </h3>
        <div className="space-x-4" data-oid="9tr2xvp">
          <Button variant="primary" data-oid="7ruoedq">
            Primary
          </Button>
          <Button variant="secondary" data-oid="y:e:fam">
            Secondary
          </Button>
          <Button variant="success" data-oid="of6mhui">
            Success
          </Button>
          <Button variant="error" data-oid="edyj21r">
            Error
          </Button>
          <Button variant="warning" data-oid="yd.3f:s">
            Warning
          </Button>
        </div>
      </div>

      <div className="sizes space-y-4" data-oid="ddb:bhj">
        <h3 className="mb-2 text-lg font-semibold" data-oid="129:epv">
          Button Sizes
        </h3>
        <div className="space-x-4" data-oid="q115knp">
          <Button size="sm" data-oid="cht19.g">
            Small
          </Button>
          <Button size="md" data-oid="k1nypye">
            Medium
          </Button>
          <Button size="lg" data-oid="vba38d4">
            Large
          </Button>
        </div>
      </div>

      <div className="states space-y-4" data-oid="yj_:mij">
        <h3 className="mb-2 text-lg font-semibold" data-oid="99.yoow">
          Button States
        </h3>
        <div className="space-x-4" data-oid="3:_229n">
          <Button data-oid="08lpl7h">Normal</Button>
          <Button disabled data-oid="ckz0nfi">
            Disabled
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ButtonDemo;
