import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './index';

// Icon component for the demo
const InfoIcon = () => (
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    data-oid="84s81sf"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
      data-oid="0z_5lyw"
    />
  </svg>
);
const AccordionDemo = () => {
  return (
    <div className="space-y-8 p-4" data-oid="9g-pi_6">
      <div data-oid=":hd:unv">
        <h2 className="mb-4 text-lg font-semibold" data-oid="cyrtc49">
          Default Accordion
        </h2>
        <Accordion type="single" collapsible data-oid="cn.xrz2">
          <AccordionItem value="item-1" data-oid="op-tqtf">
            <AccordionTrigger data-oid="ma.jabz">Is it accessible?</AccordionTrigger>
            <AccordionContent data-oid="js1b:z7">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div data-oid="klbe2em">
        <h2 className="mb-4 text-lg font-semibold" data-oid="ny-kypw">
          Always Open Accordion
        </h2>
        <Accordion type="multiple" data-oid="yi_.43g">
          <AccordionItem value="item-1" data-oid="z71-l10">
            <AccordionTrigger data-oid="uhq_g-4">Is it accessible?</AccordionTrigger>
            <AccordionContent data-oid="7-qzmbw">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div data-oid="fsvg2:w">
        <h2 className="mb-4 text-lg font-semibold" data-oid="i1t2zc8">
          Flush Accordion
        </h2>
        <Accordion type="single" collapsible flush data-oid="85drhja">
          <AccordionItem value="item-1" data-oid="spa8cas">
            <AccordionTrigger data-oid="ki-rs23">Is it accessible?</AccordionTrigger>
            <AccordionContent data-oid="xsv3t-8">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div data-oid="dmdmcnv">
        <h2 className="mb-4 text-lg font-semibold" data-oid="5dvc6p8">
          Colored Accordion
        </h2>
        <Accordion type="single" collapsible variant="colored" data-oid="rrfc8ee">
          <AccordionItem value="item-1" data-oid="s03r2tn">
            <AccordionTrigger data-oid="i-zq60h">Is it accessible?</AccordionTrigger>
            <AccordionContent data-oid="v.0yewr">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div data-oid="bwq0h__">
        <h2 className="mb-4 text-lg font-semibold" data-oid="_tny3yz">
          Accordion with Icons
        </h2>
        <Accordion type="single" collapsible data-oid="gi-s7bw">
          <AccordionItem value="item-1" data-oid="5lguj9s">
            <AccordionTrigger icon={<InfoIcon data-oid="pzvekt-" />} data-oid="_f09.a_">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent data-oid="l9ftmcb">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default AccordionDemo;
