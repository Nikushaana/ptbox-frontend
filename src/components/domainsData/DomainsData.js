import { createContext, useEffect, useState } from "react";
import axiosFront from "../axios/Axios";

export const DomainsAxiosContext = createContext(null);

const DomainsContext = ({ children }) => {
  const [newRenderDomains, setNewRenderDomains] = useState(null);
  const [DomainsData, setDomainsData] = useState([]);
  const [DomainsLoader, setDomainsLoader] = useState(true);
  const [DomainModalData, setDomainModalData] = useState({});

  useEffect(() => {
    axiosFront
      .get("domains")
      .then(({ data }) => {
        setDomainsData(data);
        setDomainsLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderDomains]);

  //

  useEffect(() => {
    if (DomainModalData.id) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [DomainModalData]);

  return (
    <DomainsAxiosContext.Provider
      value={{
        DomainsData,
        setNewRenderDomains,
        DomainsLoader,
        DomainModalData,
        setDomainModalData,
      }}
    >
      {children}
    </DomainsAxiosContext.Provider>
  );
};

export default DomainsContext;
