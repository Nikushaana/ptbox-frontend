import React, { useContext, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ScanIcon from "@mui/icons-material/Flip";
import MyCard from "../../card/MyCard";
import { DomainsAxiosContext } from "../../domainsData/DomainsData";
import { axiosFront } from "../../axios/Axios";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Home() {
  const { DomainsData, setNewRenderDomains } = useContext(DomainsAxiosContext);

  const [addDomainLoader, setAddDomainLoader] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setInputError("");
  };

  const domainSchema = Yup.string()
    .required("Domain is required")
    .matches(/^[^www.]/, "Domain should not start with 'www.'")
    .matches(/\./, "Domain must include a '.' character");

  const handleAddDomain = () => {
    setAddDomainLoader(true);

    try {
      domainSchema.validateSync(inputValue);

      toast.success("Domain is scanning!", {
        autoClose: 3000,
      });

      axiosFront
        .post(`domains`, { name: inputValue })
        .then((res) => {
          setNewRenderDomains(res.data);
          setInputValue("");
          toast.success("Domain added successfully!", {
            autoClose: 3000,
          });
        })
        .catch((error) => {
          toast.error("Domain wasn't uploaded! Please try again.", {
            autoClose: 3000,
          });
        })
        .finally(() => {
          setAddDomainLoader(false);
        });
    } catch (validationError) {
      toast.error(validationError.message, {
        autoClose: 3000,
      });
      setAddDomainLoader(false);

      setInputError(validationError.message);
    }
  };

  return (
    <div className="mt-[-100px] pb-[50px] flex flex-col gap-[120px] overflow-hidden">
      <div className="bg-[#51087E] px-[100px] max-lg:px-[50px] max-sm:px-[16px] pt-[100px] h-[70vh] flex items-center relative">
        <div className="flex flex-col gap-y-[50px] w-full z-[2]">
          <TypeAnimation
            sequence={[
              "These scans aim to collect information about a domain",
              3000,
              "Enter the domain, what are you waiting for? :)",
              4000,
            ]}
            speed={80}
            wrapper="h1"
            className="text-[35px] text-white max-lg:h-[100px] max-sm:h-[150px]"
            cursor={true}
            repeat={Infinity}
          />

          <div className="flex max-sm:flex-col items-center self-start gap-[20px] w-[60%] max-lg:w-full">
            <TextField
              label="Domain"
              placeholder="Write any domain you want"
              variant="outlined"
              value={inputValue}
              onChange={handleChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: `${inputError ? "red" : "black"}`,
                  },
                  "&:hover fieldset": {
                    borderColor: "#342f2f",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#bab6b6",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#afafaf",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#d5d5d5",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
            />
            <LoadingButton
              onClick={handleAddDomain}
              endIcon={<ScanIcon />}
              loading={addDomainLoader}
              loadingPosition="end"
              variant="contained"
              sx={{
                borderRadius: "10px",
                height: "60px",
                width: "200px",
                fontSize: "20px",
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#45A049",
                },
              }}
            >
              Scan
            </LoadingButton>
          </div>
        </div>

        <div className="z-[1] w-[100vw] aspect-square rounded-[40%] animate-spin-slow bg-[#51087E] absolute bottom-[-20px] left-[-40vw] pointer-events-none select-none"></div>
        <div className="z-[1] w-[100vw] aspect-square rounded-[40%] animate-spin-slow1 bg-[#51087E] absolute bottom-[-30px] left-[-10vw] pointer-events-none select-none"></div>
        <div className="z-[1] w-[100vw] aspect-square rounded-[40%] animate-spin-slow2 bg-[#51087E] absolute bottom-[-50px] right-[-10vw] pointer-events-none select-none"></div>
        <div className="z-[1] w-[100vw] aspect-square rounded-[40%] animate-spin-slow bg-[#51087E] absolute bottom-[-20px] right-[-40vw] pointer-events-none select-none"></div>
      </div>

      <div className="px-[100px] max-lg:px-[50px] max-sm:px-[16px] flex flex-col gap-y-[20px]">
        <h1 className="text-[25px]">Your Scanned Domains</h1>
        {DomainsData.length > 0 && (
          <p className="text-[13px] text-gray-600">
            The number of domains is{" "}
            <span className="text-[16px] text-black">{DomainsData.length}</span>
          </p>
        )}
        {DomainsData.length > 0 ? (
          DomainsData.map((item, index) => (
            <MyCard key={item.id} item={item} index={index} />
          ))
        ) : (
          <p>You don't have any scanned domain yet..</p>
        )}
      </div>
    </div>
  );
}
