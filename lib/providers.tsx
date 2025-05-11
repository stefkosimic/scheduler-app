"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

export const Providers = ({ children }: any) => {
  return (
    <ProgressProvider
      height="2px"
      color="#0f172a"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
