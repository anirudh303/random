"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../Form-error";
import { FormSuccess } from "../Form-success";
const NewVerificationForm = () => {
  const [success, SetSuccess] = useState("");
  const [error, SetError] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onPageLoadCalled = useRef(false);

  const onPageLoad = useCallback(async () => {
    if (!token) return;

    try {
      const action = await newVerification(token);
      if (action.success) {
        SetSuccess(action.success);
      }
      if (action.error) {
        SetError(action.error);
      }
    } catch (error) {
      SetError(`Server error: ${error}`);
    }
  }, [token]);

  useEffect(() => {
    if (!onPageLoadCalled.current) {
      onPageLoad();
      onPageLoadCalled.current = true;
    }
  }, [onPageLoad]);
  return (
    <div className="w-full flex items-center justify-center flex-col p-10 space-y-4">
      {!success && !error ? <HashLoader color="#151515" /> : null}
      <p className="text-sm ">
        <Link href="/auth/login">Back to login</Link>
      </p>
      {!success && <FormError message={error} />}
      <FormSuccess message={success} />
    </div>
  );
};

export default NewVerificationForm;
