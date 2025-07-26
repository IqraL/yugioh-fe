import { ReactElement } from "react";
import { ValidateToken } from "./components/Auth/ValidateToken";
import { NavigationColumn } from "./components/NavigationColumn";

export const ComponentWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <ValidateToken>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1>YU-GI-OH</h1>
        </div>
        <hr
          style={{
            width: "100%",
            borderTop: "2px solid black",
            marginTop: "8px",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 7fr",
            gap: 10,
          }}
        >
          <NavigationColumn />
          <div>{children}</div>
        </div>
      </>
    </ValidateToken>
  );
};
