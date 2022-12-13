import { useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import "../styles/css/ErrorPopup.css"

export const ErrorPopup = ({
  err,
  setOpen,
}: {
  err: string;
  setOpen: SetterOrUpdater<string | null>;
}) => {


  useEffect(() => {
    setTimeout(() => {
      setOpen(null)
    }, 3000)
  })

  return (
    <>
    <div className="error-container">
        <div>{err}</div>
        <button onClick={() => setOpen(null)}>Закрыть</button>
    </div>
    </>
  );
};
