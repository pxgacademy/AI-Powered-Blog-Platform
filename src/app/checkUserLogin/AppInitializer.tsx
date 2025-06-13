"use client";
import { useGetSessionUserQuery } from "@/states/myApi";
import { setUser } from "@/states/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppInitializer() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSessionUserQuery();

  useEffect(() => {
    if (data?.user) dispatch(setUser(data.user));
  }, [data, dispatch]);

  return null;
}
