import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchSiteConfig } from "../services/api.js";
import { defaultSiteConfig } from "../data/content.js";

const SiteConfigContext = createContext(null);

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultSiteConfig);

  useEffect(() => {
    fetchSiteConfig()
      .then((data) => setConfig((prev) => ({ ...prev, ...data })))
      .catch(() => null);
  }, []);

  const value = useMemo(() => ({ config, setConfig }), [config]);

  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
};

export const useSiteConfig = () => useContext(SiteConfigContext);
