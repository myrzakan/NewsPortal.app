import React, { useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import {
  MdOutlineAdminPanelSettings,
  MdAdminPanelSettings,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { setGoogleUserData } from "store/slices/useGoogleSlice";
import { setUser } from "store/slices/userSlice";

import { AuthButton } from "./components/AuthButton";
import { ProfileSection } from "./components/ProfileMenu";
import {
  loadUserFromLocalStorage,
  loadGoogleUserDataFromLocalStorage,
} from "../../utils/LocalStorage";

import cls from "./Header.module.scss";

const Header = () => {
  const [theme, setTheme] = React.useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light";
  });

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    const localUser = loadUserFromLocalStorage();
    const localGoogleUserData = loadGoogleUserDataFromLocalStorage();
    if (localUser) {
      dispatch(setUser(localUser));
    }
    if (localGoogleUserData) {
      dispatch(setGoogleUserData(localGoogleUserData));
    }
  }, [dispatch]);

  const Google = useSelector((state) => state.google);
  const User = useSelector((state) => state.user);
  // console.log(User)
  // console.log(Google)

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={cls.headerContent}>
      <div onClick={toggleTheme} className="">
        {theme === "light" ? <BsMoon size="22px" /> : <BsSun size="22px" />}
      </div>

      <Link to="/">
        <div className={cls.headerLogo}>
          <h1>News Line</h1>
        </div>
      </Link>

      {User.isAuthenticated || Google.isAuthenticated ? (
        <ProfileSection addToast={addToast} />
      ) : (
        <AuthButton theme={theme} />
      )}

      <div className="bg-[var(--color-text-base)] w-[100%] h-[15px] relative top-[1 0px]"></div>
    </div>
  );
};

export default Header;
