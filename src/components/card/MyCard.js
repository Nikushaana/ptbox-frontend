import { IconButton } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosFront } from "../axios/Axios";
import { DomainsAxiosContext } from "../domainsData/DomainsData";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";

export default function MyCard({ item, index }) {
  const { setNewRenderDomains, setDomainModalData } =
    useContext(DomainsAxiosContext);
  const [removeDomainLoader, setRemoveDomainLoader] = useState(false);

  const handleRemove = () => {
    setRemoveDomainLoader(true);
    axiosFront
      .delete(`domains/${item.id}`)
      .then((res) => {
        setNewRenderDomains(res);
        toast.success("Domain removed successfully!", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        setRemoveDomainLoader(false);
        toast.error("Domain doesn't removed!", {
          autoClose: 3000,
        });
      })
      .finally(() => {});
  };

  useEffect(() => {
    Aos.init({
      duration: 500,
      once: false,
    });
  }, []);

  return (
    <div
      data-aos={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}
      className={`w-full p-[15px] rounded-[14px] flex items-center justify-between shadow-md hover:shadow-lg duration-100 bg-white ${
        removeDomainLoader && "opacity-[0.7] pointer-events-none"
      }`}
    >
      <div>
        <div className="flex items-center gap-[20px]">
          <p className="">#{item.id}</p>
          <h1 className="truncate line-clamp-1">{item.name}</h1>
        </div>
        <p className="text-[12px]">
          Created:{" "}
          <span className="text-[14px]">{item.startTime.split("T")[0]}</span>
        </p>
      </div>

      <div className="flex items-center gap-[10px]">
        <IconButton
          onClick={() => {
            handleRemove();
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setDomainModalData(item);
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
    </div>
  );
}
