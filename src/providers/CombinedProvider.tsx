'use client';

import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { store } from "@/redux/app/store";
import { ThemeRegistery } from "@/app/_theme/ThemeRegistery";

const CombinedProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeRegistery>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeRegistery>
  );
};

export { CombinedProvider };
