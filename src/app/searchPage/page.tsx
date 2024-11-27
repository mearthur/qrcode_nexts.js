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
        setShowQrcode(true); 
      }
    );
  }

  function handleQrcode(event) {
    const value = event.target.value;
    setLink(value);
    setQrcodeLink("");  
    setShowQrcode(false);
    setErrorMessage("");  
  }

  function handleDownload(event) {
    if (!link) {
      event.preventDefault();
      setErrorMessage("Please enter a URL before downloading the QR Code.");
      return; 
    } 
  
    if (isValidURL(link)) {
      handleGenerate(link);
    } else {
      event.preventDefault(); 
      setErrorMessage("Please enter a valid URL");
    }
  }
  
  function isValidURL(url: string): boolean {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + 
      '((([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,})' + 
      '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + 
      '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' +
      '(\\#[-a-zA-Z0-9_]*)?$', 
      'i'
    );
    return !!pattern.test(url);
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="flex items-center justify-center flex-col gap-8">
          <Image alt="" src={Logo} width={400} />
          <section className="border-2 rounded-3xl border-[#3662E3] bg-[#030617] w-[800px] pl-3 pr-2 py-2 justify-between flex gap-4">
            <input
              type="url"
              pattern="https?://.+"
              className="bg-transparent border-none shadow-transparent font-bold w-[80%] text-[#9aa3b3] pl-2 outline-none"
              placeholder="Enter a URL"
              value={link}
              onChange={(e) => handleQrcode(e)}
              title="Please enter a valid URL starting with http:// or https://"
            />
            <a
              className={`px-6 py-4 ${link && !errorMessage
                ? "bg-[#3662E3] cursor-pointer hover:bg-[#2546a7]"
                : "bg-[#9aa3b3]  disabled"
                } rounded-2xl font-bold text-white transition-all`}
              href={qrcodelink}
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
        {showQrcode && (
          <section className="m-9 flex flex-col items-center justify-center">
          <section className="bg-[#1F2E55] rounded-full p-10 flex flex-col items-center justify-center gap-8">
          <QRCode value={link} className="rounded-2xl p-3 bg-white" />
        </section>
          <a
            className="px-6 py-4 mt-3 bg-[#3662E3] rounded-lg cursor-pointer font-bold text-white hover:bg-[#2546a7] transition-all"
            href={qrcodelink}
            download={`qrcode.png`}
            onClick={(e) => handleDownload(e)}
          >
            Download
          </a>
          </section>
        )}
      </div>
    </>
  );
}