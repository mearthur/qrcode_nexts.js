"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo-qr-generator.svg";
import Backgrund from "@/public/bg-illustration.svg";
import QRCode from "react-qr-code";
import QRcodeLink from "qrcode";

export default function SearchPage() {
  const [link, setLink] = useState("");
  const [qrcodelink, setQrcodeLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [showQrcode, setShowQrcode] = useState(false)

  function handleGenerate(linkUrl: string) {
    QRcodeLink.toDataURL(
      linkUrl,
      {
        width: 600,
        margin: 2,
      },
      function (err, url) {
        setQrcodeLink(url);
      }
    );
  }

  function handleQrcode(e: any) {
    const value = e.target.value;
    setLink(value);
  
    setQrcodeLink("");
    setShowQrcode(false);
  
    if (value) {
      setErrorMessage("");
      handleGenerate(value);
    }
  }

  function handleDownload(e: any) {
    if (!link) {
      e.preventDefault();
      setErrorMessage("Please enter a URL before downloading the QR Code.");
    } else {
      setShowQrcode(true)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="flex items-center justify-center flex-col gap-8">
          <Image alt="" src={Logo} width={400} />
          <section className="border-2 rounded-xl border-[#3662E3] bg-[#030617] w-[800px] px-3 py-2 justify-between flex gap-4">
            <input
              type="text"
              className="bg-transparent border-none shadow-transparent font-bold w-[80%] text-[#9aa3b3] pl-2 outline-none"
              placeholder="Enter a URL"
              value={link}
              onChange={(e) => handleQrcode(e)}
            />
            <a
              className="px-6 py-4 bg-[#3662E3] rounded-lg cursor-pointer font-bold text-white hover:bg-[#2546a7] transition-all"
              download={`qrcode.png`}
              onClick={(e) => handleDownload(e)}
            >
            QR Code
            </a>
          </section>
          {errorMessage && (
            <p className="text-red-500 font-bold">{errorMessage}</p>
          )}
        <section className="absolute -z-20">
          <Image
            alt=""
            src={Backgrund}
            width={600}
            className="relative right-96 bg-fixed left-72 -bottom-14"
          />
        </section>
        </div>
        <div className={showQrcode ? "" : "hidden"}>
          <section className=" m-9 bg-[#1F2E55] rounded-full p-10 flex flex-col items-center justify-center gap-8">
          <QRCode value={link} className="rounded-2xl p-3 bg-white" />
          <a
              className="px-6 py-4 bg-[#3662E3] rounded-lg cursor-pointer font-bold text-white hover:bg-[#2546a7] transition-all"
              href={qrcodelink}
              download={`qrcode.png`}
              onClick={(e) => handleDownload(e)}
            >
              Download
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
