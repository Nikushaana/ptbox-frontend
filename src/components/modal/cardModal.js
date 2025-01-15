import React, { useContext } from "react";
import { DomainsAxiosContext } from "../domainsData/DomainsData";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CardModal() {
  const { DomainModalData, setDomainModalData } =
    useContext(DomainsAxiosContext);
  return (
    <div
      className={`w-[100vw] h-[100vh] items-center justify-center top-0 left-0 duration-200 ${
        DomainModalData?.id ? "flex fixed z-20" : "hidden z-[-2]"
      }`}
    >
      <div
        onClick={() => {
          setDomainModalData({});
        }}
        className="w-full h-full backdrop-blur-sm absolute"
      ></div>
      <div className="bg-white rounded-[15px] max-h-[80%] max-w-[90%] max-sm:w-[calc(100%-32px)] shadow-md relative px-[20px] pb-[10px] flex flex-col gap-y-[20px] showScroll overflow-y-scroll">
        <div className="flex items-center justify-between pt-[10px] max-[470px]:sticky max-[470px]:top-0 max-[470px]:bg-white">
          <div className="flex items-end max-[470px]:items-start max-[470px]:flex-col gap-[20px] max-[470px]:gap-0">
            <h1 className="text-[22px]">{DomainModalData?.name}</h1>
            <p className="text-[12px] text-gray-500">
              Created:{" "}
              <span className="text-[14px]">
                {DomainModalData?.startTime?.split("T")[0]}
              </span>
            </p>
          </div>
          <IconButton
            onClick={() => {
              setDomainModalData({});
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {DomainModalData?.hosts && (
          <div className="flex flex-col gap-y-[10px]">
            <h1 className="text-[17px]">Subdomains</h1>
            <div className="grid grid-cols-4 max-lg:grid-cols-3  max-sm:grid-cols-2  max-[470px]:grid-cols-1 gap-[15px] gap-y-[5px]">
              {DomainModalData?.hosts?.map((item1) => (
                <p key={item1} className="text-[15px]">
                  {item1}
                </p>
              ))}
            </div>
          </div>
        )}
        {DomainModalData?.ips && (
          <div className="flex flex-col gap-y-[10px]">
            <h1 className="text-[17px]">Ips</h1>
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 max-[470px]:grid-cols-1 gap-[15px] gap-y-[5px]">
              {DomainModalData?.ips?.map((item1) => (
                <p key={item1} className="text-[15px]">
                  {item1}
                </p>
              ))}
            </div>
          </div>
        )}
        {DomainModalData?.emails && (
          <div className="flex flex-col gap-y-[10px]">
            <h1 className="text-[17px]">Emails</h1>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[15px] gap-y-[5px]">
              {DomainModalData?.emails?.map((item1) => (
                <p key={item1} className="text-[15px]">
                  {item1}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
