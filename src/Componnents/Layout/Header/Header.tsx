import hamburber from "../../../assets/hamburber.svg";
import account from "../../../assets/account.svg";
import cart from "../../../assets/cart.svg";
import logo from "../../../assets/logo.svg";
import BagInside from "../../../assets/BagInside.svg";
import x from "../../../assets/x.svg";
import search from "../../../assets/search.svg";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import {
  MiddleBar,
  RightBar,
  ItemsMove,
  XOut,
  RightSearch,
  RightProfile,
  RightCart,
  OpenedSearch,
  SearchBar,
  SearchImgInBar,
  BarSearchItems,
  LinkStyle,
  Header,
  StyledDialog,
  InCart,
  ImageInCart,
  AccountContainer,
  TitleContainer,
  TitleOfAccount,
  SubTitleOfAccount,
  EmailInput,
  InputInfo,
  BorderUnder,
  PasswordInput,
  LoginBtn,
  AccountButtonsContainer,
  SignUpBtn,
  ForgotPass,
  Left,
  Mid,
  ORContainer,
  Right,
  XOutAccount,
} from "../Style";
import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  backdropClasses,
  BackdropRoot,
  TextField,
} from "@mui/material";
import HamburgerHeader from "./Hamburger/Hamburger";
import Searchfiltered from "../Header/Hamburger/SearchBar/Search";
import axios from "axios";

const Head = () => {
  const [ifSearch, setIfSearch] = useState<boolean>(false);
  const [ifAccount, setIfAccount] = useState<boolean>(false);
  const [ifCart, setIfCart] = useState<boolean>(false);
  const [CanLogIn, SetCanLogIn] = useState<boolean>(false);

  const email = useRef<String>("");
  const password = useRef<String>("");
  let [count, setCount] = useState<number>(0);
  const onClickHandler = () => {
    count++;
    if (count === 1) return setIfCart(true);
    else count = 0;
    setIfCart(false);
  };

  const ResetTheProfile = () => {
    email.current = "";
    password.current = "";
    setIfAccount(false);
    SetCanLogIn(false);
  };
  const CheckProfileLogin = () => {
    if (String(email.current) !== "" && String(password.current) !== "") {
      SetCanLogIn(true);
    } else SetCanLogIn(false);
  };
  const logEnabled = async () => {
    const checker = {
      userName: String(email.current),
      password: String(password.current),
      email: String(email.current),
    };
    let a = true;
    try {
      const data = await axios.post(
        "http://localhost:3001/api/users/logIn",
        checker
      );
    } catch {
      a = false;
    } finally {
      if (a) {
        toast.success("Log in Succsesful!");
        SetCanLogIn(true);
      } else {
        toast.error("Eroor!");
      }
    }
  };

  return (
    <>
      <Header>
        <HamburgerHeader></HamburgerHeader>
        <MiddleBar>
          <LinkStyle to="/">
            <img src={logo} alt="" />
          </LinkStyle>
        </MiddleBar>
        <RightBar>
          <ItemsMove>
            <Searchfiltered></Searchfiltered>
            <RightProfile
              src={account}
              alt=""
              onClick={() => setIfAccount(true)}
            />
            <Dialog
              open={ifAccount}
              scroll="body"
              fullScreen={true}
              style={{ height: "590px" }}
              BackdropProps={{ invisible: true }}
              onClose={() => {
                ResetTheProfile();
              }}
            >
              <XOutAccount>
                <XOut src={x} alt="" onClick={() => ResetTheProfile()}></XOut>
              </XOutAccount>
              <AccountContainer>
                <TitleContainer>
                  <TitleOfAccount>Sign in</TitleOfAccount>
                  <SubTitleOfAccount>
                    To continue the order, please sign in
                  </SubTitleOfAccount>
                  <InputInfo>
                    {/* <EmailInput
                      type="text"
                      placeholder="Email Adress"
                      onChange={(eE: React.FormEvent<HTMLInputElement>) =>
                        SetEmail(eE.currentTarget.value)
                      }
                    /> */}
                    <TextField
                      id="standard-password-input"
                      label="Email address"
                      type="text"
                      autoComplete="current-password"
                      variant="standard"
                      onChange={(e: {
                        currentTarget: { value: React.SetStateAction<string> };
                      }) => {
                        email.current = String(e.currentTarget.value);
                        CheckProfileLogin();
                      }}
                    />
                  </InputInfo>

                  <InputInfo>
                    <TextField
                      id="standard-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      variant="standard"
                      onChange={(eP: {
                        currentTarget: { value: React.SetStateAction<string> };
                      }) => {
                        password.current = String(eP.currentTarget.value);
                        CheckProfileLogin();
                      }}
                    />
                  </InputInfo>
                </TitleContainer>
              </AccountContainer>
              <AccountButtonsContainer>
                {CanLogIn ? (
                  <LoginBtn onClick={logEnabled}>LOGIN</LoginBtn>
                ) : (
                  <LoginBtn disabled>LOGIN</LoginBtn>
                )}
                <ForgotPass>Forget password?</ForgotPass>

                <ORContainer>
                  <Left></Left>
                  <Mid>or</Mid>
                  <Right></Right>
                </ORContainer>
                <SignUpBtn>SIGN UP</SignUpBtn>
              </AccountButtonsContainer>
            </Dialog>

            <RightCart src={cart} alt="" onClick={onClickHandler} />
            <Dialog
              open={ifCart}
              scroll="body"
              fullScreen={true}
              style={{
                height: "26%",
                top: "45px",
              }}
              onClose={() => setIfCart(false)}
              BackdropProps={{ invisible: true }}
            >
              <InCart>
                <ImageInCart src={BagInside} alt="" />
              </InCart>
            </Dialog>
          </ItemsMove>
        </RightBar>
      </Header>
    </>
  );
};

export default Head;
