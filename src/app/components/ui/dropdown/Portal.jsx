"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setMounted(true);
    const customContainer = container || document.body;
    
    if (!customContainer) return;

    // Create a dedicated container for the portal
    const portalNode = document.createElement("div");
    portalNode.setAttribute("data-portal-container", "");
    customContainer.appendChild(portalNode);
    setPortalContainer(portalNode);

    return () => {
      if (portalNode && portalNode.parentElement) {
        portalNode.parentElement.removeChild(portalNode);
      }
      setMounted(false);
    };
  }, [container]);

  if (!mounted || !portalContainer) return null;

  return createPortal(children, portalContainer);
};

Portal.displayName = "Portal";

export { Portal }; 