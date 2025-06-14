"use client";

import { useGetSessionUserQuery } from "@/states/myApi";
import { selectCurrentUser, setUser } from "@/states/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AppInitializer() {
  const dispatch = useDispatch();
  const { data } = useGetSessionUserQuery();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (data?.user && !user) dispatch(setUser(data.user));
  }, [data, dispatch]);

  return null;
}
