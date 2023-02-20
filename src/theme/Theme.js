import { Button, createTheme, styled } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6059C9",
    },
    secondary: {
      main: "#DC5F5F",
    },
    theme_green: {
      main: "#00BF78",
    },
  },
});

//buttons
export const GreenButton = styled(Button)(() => ({
  backgroundColor: "#01BF78",
  width: "12rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: "#01BF78",
  },
}));

export const PurpleButton = styled(Button)(() => ({
  backgroundColor: "#6059C9",
  width: "12rem",
  my: 2,
  height: "3rem",
  "&:hover": {
    backgroundColor: "#6059C9",
  },
}));

export const PaisaKartGreyButton = styled(Button)(() => ({
  backgroundColor: "#3f3f3f",
  width: "12rem",
  height: "3rem",
  "&:hover": {
    backgroundColor: "#3f3f3f",
  },
}));
export const YellowButton = styled(Button)(() => ({
  backgroundColor: "#f48f26",
  width: "12rem",
  my: 2,
  height: "3rem",
  "&:hover": {
    backgroundColor: "#f48f26",
  },
}));

export const PurpleOutline = styled(Button)(({ theme }) => ({
  color: "#6059c9",
  backgroundColor: "#fff",
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 16,
  paddingRight: 16,
  border: "1px dashed #314259",
  "&:hover": {
    backgroundColor: "#d6d6d6",
  },
}));
